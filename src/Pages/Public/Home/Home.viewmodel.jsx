import { useState } from "react";
import { validarEmail } from "@Utils";
import { useNavigate } from "react-router-dom";
import { useNotifyHandler } from "@Hooks";
import { AdapterLogin } from "@Adapters";
import { useDispatch } from "react-redux";
import { setUser } from "@Slice";
export const HomeViewmodel = () => {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });
  const dispatch = useDispatch();
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

  const handleSubmit = async () => {
    const { user, password } = formData;
    const newErrors = {};

    if (!user) {
      newErrors.user = "el correo es requerido";
    } else if (!validarEmail(user)) {
      newErrors.user = "el correo es inválido";
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
    try {
      const response = await AdapterLogin(formData);
      if (response.status === 200) {
        alertNotify("Inicio de sesión exitoso", "bottom", "center", "success");
        await dispatch(setUser(response.data));
        navigate("/tablero/homepage", { replace: true });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alertNotify(
        error.msg || "Error al iniciar sesión",
        "bottom",
        "center",
        "error"
      );
    }
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
