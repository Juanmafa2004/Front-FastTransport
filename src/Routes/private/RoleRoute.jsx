import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";

const RoleRoute = ({ allowedRoles, children }) => {
  const id_rol = useSelector((state) => state.user?.id_rol);
  if (!allowedRoles.includes(id_rol)) {
    return <Navigate to="/tablero/homepage" replace />;
  }
  return children ? children : <Outlet />;
};

export default RoleRoute;