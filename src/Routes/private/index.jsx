import { Managedriver } from "@Pages";
import {
  Homepage,
  Sendshipment,
  Historialshipment,
  Manageshipment,
} from "@Pages";
import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/sendshipment" element={<Sendshipment />} />
        <Route path="/historialshipment" element={<Historialshipment />} />
        <Route path="/manageshipment" element={<Manageshipment />} />
        <Route path="/managedriver" element={<Managedriver />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
