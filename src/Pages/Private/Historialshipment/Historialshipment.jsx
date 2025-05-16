import React from "react";
import HistorialshipmentViewModel from "./Historialshipment.viewmodel";
import { ContentTable } from "./Components/ContentTable";

const Historialshipment = () => {
  const { Increment, count } = HistorialshipmentViewModel();
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="mt-5 w-full text-center text-black text-lg font-semibold leading-[21px] mb-3">
        Historico de pedidos
      </div>
      <div className="w-[90%] flex justify-center items-center gap-4 mx-4 ">
        <ContentTable />
      </div>
    </div>
  );
};

export default Historialshipment;
