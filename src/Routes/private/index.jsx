import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import RoleRoute from "./RoleRoute";
import {
  Homepage,
  Sendshipment,
  Historialshipment,
  Manageshipment,
  Managedriver,
} from "@Pages";

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route element={<RoleRoute allowedRoles={[2, 4]} />}>
          <Route path="/sendshipment" element={<Sendshipment />} />
          <Route path="/historialshipment" element={<Historialshipment />} />
        </Route>
        <Route element={<RoleRoute allowedRoles={[1, 4]} />}>
          <Route path="/manageshipment" element={<Manageshipment />} />
        </Route>
        <Route element={<RoleRoute allowedRoles={[3, 4]} />} />
        <Route path="/managedriver" element={<Managedriver />} />
        <Route />
      </Route>
    </Routes>
  );
};

export default Dashboard;
