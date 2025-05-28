import { formatDate } from "@Utils";
import { useState, useEffect } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useNotifyHandler } from "@Hooks";
import { getClientes, sendshipmentClient } from "@Adapters";
import { useSelector } from "react-redux";

const SendshipmentViewModel = () => {
  const initialState = {
    startDirection: "",
    recolectDay: today(getLocalTimeZone()),
    endDirection: "",
    deliveryDay: null,
    observations: "",
  };
  const id_usuario = useSelector((state) => state.user?.id_usuario);
  const [formData, setFormData] = useState(initialState);
  const { alertNotify } = useNotifyHandler();
  const [openModal, setOpenModal] = useState(false);

  const [canContinue, setCanContinue] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCanContinue(
      formData.startDirection &&
        formData.recolectDay &&
        formData.endDirection &&
        formData.deliveryDay &&
        formData.observations
    );
  }, [formData]);

  const toDateOnly = (calendarDate) => {
    if (!calendarDate) return null;
    const { year, month, day } = calendarDate;
    const jsDate = new Date(year, month - 1, day);
    jsDate.setHours(0, 0, 0, 0); // normaliza a medianoche
    return jsDate;
  };
  const validate = () => {
    const errors = {};
    const today = toDateOnly({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    });
    const currentYear = today.getFullYear();

    if (!formData.startDirection) {
      errors.startDirection = "La dirección de recogida es requerida";
    }

    if (!formData.endDirection) {
      errors.endDirection = "La dirección de destino es requerida";
    }

    const recolectDate = formData.recolectDay
      ? toDateOnly(formData.recolectDay)
      : null;

    const deliveryDate = formData.deliveryDay
      ? toDateOnly(formData.deliveryDay)
      : null;

    if (!recolectDate) {
      errors.recolectDay = "La fecha de recogida es requerida";
    } else {
      if (recolectDate < today) {
        errors.recolectDay = "La fecha de recogida no puede ser antes de hoy";
      }
      if (deliveryDate && recolectDate > deliveryDate) {
        errors.recolectDay =
          "La fecha de recogida no puede ser después de la fecha de entrega";
      }
      if (recolectDate.getFullYear() > currentYear) {
        errors.recolectDay = "La fecha de recogida debe ser de este año";
      }
    }

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

  const handleValueChangeForm = (val, key) => {
    let writing = true;
    let newValue = val;

    if (
      key === "startDirection" ||
      key === "endDirection" ||
      key === "observations"
    ) {
      const cleanedValue = newValue.replace(/\s{2,}/g, " ");
      newValue = cleanedValue;
    }

    if (key === "observations" && val.length > 200) {
      return; // Ignoras el cambio si pasa el límite
    }

    if (writing) {
      setFormData({
        ...formData,
        [key]: newValue,
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: "",
      }));
    }
  };

  const handleBlur = (key) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // id_usuario
    const client = await getClientes({
      id_usuario: id_usuario,
    });

    const firstClient = Object.values(client.data)[0];
    const clientId = firstClient.id_cliente;

    const formattedData = {
      direccion_origen: formData.startDirection.trim(),
      fecha_solicitud: formatDate(formData.recolectDay),
      direccion_destino: formData.endDirection.trim(),
      fecha_entrega: formatDate(formData.deliveryDay),
      descripcion: formData.observations.trim(),
      id_cliente: clientId,
    };
    try {
      const response = await sendshipmentClient(formattedData);
      if (response.status >= 200 < 300 ) {
        setOpenModal(true);
      } else {
        alertNotify(response.msg, "bottom", "center", "error");
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
      alertNotify(
        "Ha sucedido un error inesperado, recarga la pagina o vuelve a intentar más tarde",
        "bottom",
        "center",
        "error"
      );
      setOpenModal(false);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
    resetData();
  };

  const resetData = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleSubmit,
    handleValueChangeForm,
    canContinue,
    handleBlur,
    openModal,
    onCloseModal,
    resetData,
  };
};

export default SendshipmentViewModel;
