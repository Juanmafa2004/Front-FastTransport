import { validarEmail, validarSoloLetrasYTildes } from "@Utils";
import { useState, useEffect } from "react";
import { useNotifyHandler } from "@Hooks";
const SendshipmentViewModel = () => {
  const initialState = {
    name: "",
    email: "",
    rol: "",
    estado: true,
  };
  const [formData, setFormData] = useState(initialState);
  const { alertNotify } = useNotifyHandler();
  const [openModal, setOpenModal] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCanContinue(
      formData.name &&
        formData.email &&
        (typeof formData.rol === "object"
          ? formData.rol.size
            ? true
            : false
          : formData.rol
          ? true
          : false)
    );
  }, [formData]);

  const validate = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "El nombre es requerido";
    }

    if (!formData.email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!validarEmail(formData.email)) {
      errors.email = "Debe ingresar un correo válido";
    }

    return errors;
  };

  const handleValueChangeForm = (val, key) => {
    let writing = true;

    if (key === "name") {
      const cleanedValue = val.replace(/\s{2,}/g, " ");
      writing = validarSoloLetrasYTildes(cleanedValue);
      val = cleanedValue;
    }

    if (writing) {
      setFormData({
        ...formData,
        [key]: typeof val === "object" ? [...val][0] : val,
      });
    }
  };

  const handleBlur = (key) => {
    if (key === "email") {
      if (!formData.email) {
        setErrors((prev) => ({
          ...prev,
          email: "El correo es requerido.",
        }));
      } else if (!validarEmail(formData.email)) {
        setErrors((prev) => ({
          ...prev,
          email: "Debe ingresar un correo válido.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
    if (key === "name") {
      if (!formData.name) {
        setErrors((prev) => ({
          ...prev,
          name: "El nombre es requerido.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    }

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
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const sendForm = async () => {
    const formatedData = {
      user: {
        username: formData.name,
        email: formData.email,
      },
      rol: formData.rol,
      company: companyUser?.id,
      status: formData.estado ? "ACTIVO" : "INACTIVO",
      date_accept_habeas_data: null,
      date_accept_tc: null,
      version_habeas_data: null,
      version_tc: null,
      active: true,
    };

    // try {
    //   const response = await CreateUserRequest(formatedData);
    //   if (response.status === 200) {
    //     setFormData(initialState);
    //     alertNotify(response.msg, "bottom", "center", "success");
    //     setOpenModal(false);
    //   } else {
    //     alertNotify(response.msg, "bottom", "center", "error");
    //     setOpenModal(false);
    //     if (response.data?.user) {
    //       setErrors({
    //         email: response.data?.user?.email || "",
    //         name: response.data.user?.username || "",
    //       });
    //     }
    //   }
    // } catch (error) {
    //   console.log("Error al crear usuario", error);
    //   alertNotify(
    //     "Ha sucedido un error inesperado, recarga la pagina o vuelve a intentar más tarde",
    //     "bottom",
    //     "center",
    //     "error"
    //   );
    // }
  };

  const resetData = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    sendForm,
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
