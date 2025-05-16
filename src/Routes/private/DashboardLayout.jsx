import { Outlet } from "react-router-dom";
import { SideBar } from "@Pages";

export const DashboardLayout = () => {
  return (
    <div className="flex ">
      <SideBar />
      <div className="flex-1 bg-sidebar">
        <Outlet />
      </div>
    </div>
  );
};
