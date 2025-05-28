/* eslint-disable react/prop-types */

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Tooltip,
  Textarea,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { EditAdminModalViewModel } from "./EditAdminModal.viewModel";
import styles from "../../Manageshipment.style.module.css";
import { ExclamationIcon } from "../../../Components/ExclamationIcon";
import { CustomDatePicker } from "../customComponents/CustomDatePicker";
import { calendarDateToISO, parseISOToCalendarDate } from "@Utils";

import { getConductoresByRuta, patchShipment } from "@Adapters";
import { useNotifyHandler } from "@Hooks";

export const EditAdminShipmentModal = ({
  isOpen,
  onClose,
  data,
  reloadData,
  routes,
  activeRoute,
  stateShipment,
}) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleValueChangeForm,
    canContinue,
    handleBlur,
    toDateOnly,
  } = EditAdminModalViewModel();
  const [actualizedRoutes, setActualizedRoutes] = useState([]);
  const [actualizedShipments, setActualizedShipments] = useState([]);
  const [desactivateSelect, setDesactivateSelect] = useState(false);
  const initialState = {
    endDirection: "",
    deliveryDay: null,
    observations: "",
    id_ruta: 0,
    driver: "",
    state: 0,
  };
  const { alertNotify } = useNotifyHandler();

  const getConductorByIdRuta = async (id_ruta) => {
    if (!id_ruta) return "";
    const response = await getConductoresByRuta(id_ruta);
    if (response.status >= 200 && response.status <= 299) {
      const dataArr = Object.values(response.data);
      if (dataArr.length > 0) {
        // Ajusta el nombre de la propiedad según tu backend
        return dataArr[0].nombre_conductor || dataArr[0].nombre || "";
      }
      return "";
    }
    return "";
  };

  const getData = async () => {
    const idRuta = data?.id_ruta;

    // Asegúrate de que activeRoute y routes sean arrays
    const activeRouteArray = Array.isArray(activeRoute)
      ? activeRoute
      : Object.values(activeRoute || {});
    const routesArray = Array.isArray(routes)
      ? routes
      : Object.values(routes || {});

    if (idRuta != null) {
      // Busca si el idRuta está en activeRoute
      const isInActiveRoute = activeRouteArray.some(
        (route) => route.id_ruta === idRuta
      );
      if (!isInActiveRoute) {
        setDesactivateSelect(true);
        setActualizedRoutes(routesArray);
      } else {
        setDesactivateSelect(false);
        setActualizedRoutes(activeRouteArray);
      }
    } else {
      setDesactivateSelect(false);
      setActualizedRoutes(activeRouteArray);
    }
    const shipmentStates = Array.isArray(stateShipment)
      ? stateShipment
      : Object.values(stateShipment || {});
    setActualizedShipments(shipmentStates);

    const initialData = {
      endDirection: data?.direccion_destino || "",
      deliveryDay: parseISOToCalendarDate(data?.fecha_entrega),
      observations: data?.descripcion || "",
      id_ruta: idRuta || 0,
      driver: idRuta != null ? await getConductorByIdRuta(idRuta) : "",
      state: data?.id_estado_envio || 0,
    };

    setFormData(initialData);
  };

  const getNewCondcutor = async (id) => {
    const newConductor = await getConductorByIdRuta(id);

    setFormData((prevData) => ({
      ...prevData,
      driver: newConductor,
    }));
  };
  useEffect(() => {
    if (formData.id_ruta) {
      getNewCondcutor(formData.id_ruta);
    }
  }, [formData.id_ruta, formData.driver]);

  useEffect(() => {
    if (data) {
      getData();
    } else {
      setFormData(initialState);
    }
  }, [data, routes, activeRoute]);

  const validate = () => {
    const errors = {};
    const today = toDateOnly({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    });
    const currentYear = today.getFullYear();

    if (!formData.endDirection) {
      errors.endDirection = "La dirección de destino es requerida";
    }

    const recolectDate = data?.fecha_solicitud
      ? toDateOnly(data.fecha_solicitud)
      : null;

    const deliveryDate = formData.deliveryDay
      ? toDateOnly(formData.deliveryDay)
      : null;

    if (!deliveryDate) {
      errors.deliveryDay = "La fecha de entrega es requerida";
    } else {
      if (deliveryDate < today) {
        errors.deliveryDay = "La fecha de entrega no puede ser antes de hoy";
      }
      if (recolectDate && deliveryDate < recolectDate) {
        errors.deliveryDay =
          "La fecha de entrega no puede ser antes de la fecha de recogida";
      }
      if (deliveryDate.getFullYear() > currentYear) {
        errors.deliveryDay = "La fecha de entrega debe ser de este año";
      }
    }

    if (!formData.observations) {
      errors.observations = "Las observaciones son requeridas";
    } else if (formData.observations.length > 200) {
      errors.observations =
        "Las observaciones no pueden superar los 200 caracteres";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const formattedData = {
      direccion_destino: formData.endDirection.trim(),
      fecha_entrega: calendarDateToISO(formData.deliveryDay),
      descripcion: formData.observations.trim(),
      id_ruta: formData.id_ruta === 0 ? null : formData.id_ruta,
      id_estado_envio: formData.state === 0 ? null : formData.state,
    };
    console.log("Datos del formulario:", formattedData, data?.id_envio);
    try {
      const response = await patchShipment(formattedData, data?.id_envio);
      if (response.status >= 200 && response.status <= 299) {
        alertNotify(
          "El pedido ha sido actualizado correctamente",
          "bottom",
          "center",
          "success"
        );
        reloadData(); // Recargar los datos en la página principal
        onCloseModal(); // Cerrar el modal y actualizar los datos
      } else {
        alertNotify(
          response.msg || "Error al actualizar el pedido",
          "bottom",
          "center",
          "error"
        );
      }
    } catch (error) {
      console.log(error);
      alertNotify(
        "Ha sucedido un error inesperado, recarga la pagina o vuelve a intentar más tarde",
        "bottom",
        "center",
        "error"
      );
    }
  };

  const onCloseModal = () => {
    getData(); // Actualizar los datos al cerrar el modal
    onClose();
    // Reiniciar el formulario al cerrar
    setErrors({}); // Reiniciar los errores al cerrar
  };

  if (!data || !routes || !activeRoute) {
    return null; // Si no hay datos, no renderizar nada
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        placement="center"
        backdrop="blur"
        size="4xl"
        hideCloseButton
      >
        <ModalContent>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <ModalHeader className="flex flex-col gap-1  mt-[30px] mb-[5px]  ">
              <h2 className="text-[#111215] text-[14px] font-bold">
                Diligencia los datos requeridos para editar el pedido
              </h2>
              <hr className="border-[#f2f2f1]" />
            </ModalHeader>
            <ModalBody className="">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <div className="flex gap-5 mb-2.5 mt-[10px]">
                    <Input
                      label="Dirección de destino (*)"
                      value={formData.endDirection}
                      className="w-full"
                      classNames={{
                        label:
                          "!text-formLabel font-semibold w-full flex justify-center",
                        inputWrapper: "data-[invalid=true]:border-inactive",
                        errorMessage: "text-inactive",
                        value: "text-placeHolder",
                      }}
                      placeholder=" "
                      labelPlacement="outside"
                      onValueChange={(val) =>
                        handleValueChangeForm(val, "endDirection")
                      }
                      isInvalid={!!errors.endDirection}
                      errorMessage={errors.endDirection}
                      onBlur={() => handleBlur("endDirection")}
                    />
                    <CustomDatePicker
                      value={formData.deliveryDay}
                      onChange={(date) =>
                        handleValueChangeForm(date, "deliveryDay")
                      }
                      error={errors.deliveryDay}
                    />
                  </div>
                  <section className="w-full mt-5 flex gap-4">
                    <div className="flex flex-col w-full">
                      <label className="!text-formLabel font-semibold mb-1">
                        Ruta
                      </label>
                      <select
                        className={`w-full h-[40px] rounded-md bg-[#f5f5f5] px-4 py-2 text-sm text-formLabel border ${
                          errors.id_ruta
                            ? "border-inactive"
                            : "border-transparent"
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                        value={formData.id_ruta}
                        disabled={desactivateSelect}
                        onChange={(e) =>
                          handleValueChangeForm(
                            Number(e.target.value),
                            "id_ruta"
                          )
                        }
                        onBlur={() => handleBlur("id_ruta")}
                      >
                        <option value={0} disabled>
                          Ruta
                        </option>
                        {actualizedRoutes.map((route) => (
                          <option key={route.id_ruta} value={route.id_ruta}>
                            {route.nombre_ruta}
                          </option>
                        ))}
                      </select>
                      {errors.id_ruta && (
                        <span className="text-inactive text-sm mt-1">
                          {errors.id_ruta}
                        </span>
                      )}
                    </div>
                    <Input
                      label="Conductor asociado"
                      value={formData.driver}
                      className="w-full"
                      classNames={{
                        label:
                          "!text-formLabel font-semibold w-full flex justify-center",
                        inputWrapper: "data-[invalid=true]:border-inactive",
                        errorMessage: "text-inactive",
                        value: "text-placeHolder",
                      }}
                      disabled
                      placeholder=" "
                      labelPlacement="outside"
                      onValueChange={(val) =>
                        handleValueChangeForm(val, "driver")
                      }
                    />
                  </section>
                  <section className="w-full mt-5 flex gap-4">
                    <div className="flex flex-col w-full">
                      <label className="!text-formLabel font-semibold mb-1">
                        Estado (*)
                      </label>
                      <select
                        className={`w-[50%] h-[40px] rounded-md bg-[#f5f5f5] px-4 py-2 text-sm text-formLabel border ${
                          errors.state
                            ? "border-inactive"
                            : "border-transparent"
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                        value={formData.state}
                        onChange={(e) =>
                          handleValueChangeForm(Number(e.target.value), "state")
                        }
                        onBlur={() => handleBlur("state")}
                      >
                        <option value={0} disabled>
                          Estado
                        </option>
                        {actualizedShipments.map((states) => (
                          <option
                            key={states.id_estado_envio}
                            value={states.id_estado_envio}
                          >
                            {states.nombre_estado}
                          </option>
                        ))}
                      </select>
                      {errors.id_ruta && (
                        <span className="text-inactive text-sm mt-1">
                          {errors.id_ruta}
                        </span>
                      )}
                    </div>
                  </section>
                  <section className="w-full mt-5 flex gap-4">
                    <Textarea
                      label={
                        <span className="flex items-center gap-1">
                          Observaciones (*)
                          <Tooltip
                            closeDelay={0}
                            content="Debe colocar las observaciones del pedido, por ejemplo: si el pedido tiene alguna condición especial, etc."
                            placement="top"
                            offset={7}
                            crossOffset={16}
                            classNames={{
                              base: [
                                "before:bg-tooltip dark:before:bg-tooltip",
                              ],
                              content: ["py-2 px-4", "text-white bg-tooltip"],
                            }}
                          >
                            <span className="cursor-pointer ">
                              <ExclamationIcon />{" "}
                            </span>
                          </Tooltip>
                        </span>
                      }
                      className="w-full"
                      value={formData.observations}
                      classNames={{
                        label:
                          "!text-formLabel font-semibold w-full flex justify-center",
                        inputWrapper: "data-[invalid=true]:border-inactive",
                        errorMessage: "text-inactive",
                        value: "text-placeHolder",
                      }}
                      placeholder=" "
                      labelPlacement="outside"
                      onValueChange={(val) =>
                        handleValueChangeForm(val, "observations")
                      }
                      isInvalid={!!errors.observations}
                      errorMessage={errors.observations}
                      maxRows={3}
                      onBlur={() => handleBlur("observations")}
                    />
                  </section>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center mb-[30]">
              <Button
                className={` rounded-md w-[150px] h-[40px] mt-8 px-8 py-4 text-base font-semibold transition-all duration-300  bg-[#b6b6b5] text-[#222224]`}
                onPress={onCloseModal}
              >
                Cancelar
              </Button>
              <Button
                className={`${styles.button} ${
                  canContinue ? styles.enabled : styles.disabled
                } w-[150px] h-[40px] mt-8 px-8 py-4 text-base font-semibold transition-all duration-300 bg-[#cbcbc9] text-[rgba(17,18,21,50)]`}
                type="submit"
                isDisabled={!canContinue}
                // onPress={handleSubmit}
              >
                Actualizar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
