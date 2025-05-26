import { useState } from "react";
import { useSelector } from "react-redux";

const ManagedriverViewModel = () => {
  const [data, setData] = useState({});
  const id_rol = useSelector((state) => state.user?.id_rol);
  const id_usuario = useSelector((state) => state.user?.id_usuario);
  const [isLoading, setIsLoading] = useState(false);

  return {
    data,
    setData,
    id_rol,
    id_usuario,
    isLoading,
    setIsLoading,
  };
};

export default ManagedriverViewModel;
