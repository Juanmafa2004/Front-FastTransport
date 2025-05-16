import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "@Slice";

const PrivateRoute = ({ children }) => {
  const redirecTo = "/";
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Solo intenta cargar si el usuario no está en memoria
    if (!user.id_rol || user.id_rol === 0) {
      dispatch(loadUser());
    }
    setChecked(true);
  }, [dispatch]);

  // Espera a que se intente cargar el usuario antes de decidir
  if (!checked) return null;

  if (!user.id_rol || user.id_rol === 0) {
    return <Navigate to={redirecTo} />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoute;
