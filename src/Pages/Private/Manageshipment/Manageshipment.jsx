import React from "react";
import ManageshipmentViewModel from "./Manageshipment.viewmodel";
import { ContentAdminTable } from "./Components/ContentAdminTable";

const Manageshipment = () => {
  const { Increment, count } = ManageshipmentViewModel();
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="mt-5 w-full text-center text-black text-lg font-semibold leading-[21px] mb-3">
        Gestion de pedidos
      </div>
      <div className="w-[90%] flex justify-center items-center gap-4 mx-4 ">
        <ContentAdminTable />
      </div>
    </div>
  );
};

export default Manageshipment;
