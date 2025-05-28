import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Tooltip,
  SelectItem,
  Select,
  Textarea,
  DatePicker,
} from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useEffect,  } from "react";
import { EditAdminModalViewModel } from "./EditAdminModal.viewModel";
import styles from "../../Manageshipment.style.module.css";
import { ExclamationIcon } from "../../../Components/ExclamationIcon";

export const EditAdminShipmentModal = ({
  isOpen,
  onClose,
  data,
  reloadData,
}) => {



  const {
    formData,
    setFormData,
    initialState,
    errors,
    setErrors,
    handleValueChangeForm,
    canContinue,
    handleBlur,
  } = EditAdminModalViewModel();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        placement="center"
        scrollBehavior="inside"
        backdrop="blur"
        size="4xl"
      >
        <ModalContent >
          <form>
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
                    <DatePicker
                      label="Fecha de entrega (*)"
                      value={formData.deliveryDay}
                      dateInputClassNames={{
                        label: "!text-formLabel font-semibold",
                        inputWrapper: "data-[invalid=true]:border-inactive",
                        errorMessage: "text-inactive",
                      }}
                      placeholder=" "
                      labelPlacement="outside"
                      onChange={(val) =>
                        handleValueChangeForm(val, "deliveryDay")
                      }
                      isInvalid={!!errors.deliveryDay}
                      errorMessage={errors.deliveryDay}
                      minValue={today(getLocalTimeZone())}
                    />
                  </div>
                  <section className="w-full mt-5 flex gap-4">
                    <Select
                      classNames={{
                        label: "!text-formLabel font-semibold",
                        inputWrapper: "data-[invalid=true]:border-inactive",
                        errorMessage: "text-inactive",
                        value: "text-placeHolder",
                      }}
                      label="Ruta"
                      placeholder="Ruta"
                      labelPlacement="outside"
                      aria-label="Informacion a solicitar"
                      selectedKeys={formData.id_ruta}
                      //   defaultSelectedKeys={[formData.params?.toString()]}
                      onSelectionChange={(val) =>
                        handleValueChangeForm(val, "id_ruta")
                      }
                      isInvalid={!!errors.id_ruta}
                      errorMessage={errors.id_ruta}
                    >
                      <SelectItem key={"1"} value={1}>
                        Tipo y número de documento
                      </SelectItem>
                      <SelectItem key={"2"} value={2}>
                        Placa
                      </SelectItem>
                    </Select>
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
                onPress={onClose}
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
