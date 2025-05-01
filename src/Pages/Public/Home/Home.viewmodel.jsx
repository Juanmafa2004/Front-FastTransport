import { useState } from "react";
import { validarEmail } from "@Utils";
import { useNavigate } from "react-router-dom";
import { useNotifyHandler } from "@Hooks";

export const HomeViewmodel = () => {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { alertNotify } = useNotifyHandler();

  const handleValueChange = (value, field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [field]: "",
    }));
  };

  const handleSubmit = () => {
    const { user, password } = formData;
    const newErrors = {};

    if (!user) {
      newErrors.user = "el correo es requerido";
    } else if (!validarEmail(user)) {
      newErrors.user = "el correoo es inválido";
    }

    if (!password) {
      newErrors.password = "la contraseña es requerida";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alertNotify(
        "Por favor completa todos los campos",
        "bottom",
        "center",
        "error"
      );
      return;
    }

    navigate("/tablero", { replace: true });
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleValueChange,
    handleSubmit,
  };
};

export default HomeViewmodel;
