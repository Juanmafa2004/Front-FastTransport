import React, { useEffect } from "react";

import ManagedriverViewModel from "./Managedriver.viewmodel";
import { ContentDriverTable } from "./Components/ContentDriverTable";
import LoadingComp from "../Components/LoadingComp";
import { getConductores, getRutas, getRutasByConductorId } from "@Adapters";

const Managedriver = () => {
  const { data, setData, id_rol, id_usuario, isLoading, setIsLoading } =
    ManagedriverViewModel();

  const getData = async () => {
    setIsLoading(true);
    try {
      if (id_rol !== 3) {
        const response = await getRutas({});
        if (response.status === 200) {
          setData(response.data);
          setIsLoading(false);
        }
      } else {
        const idConductor = await getConductores({
          id_usuario: id_usuario,
        });
        const idConductorValue =
          idConductor != null
            ? Object.values(idConductor.data)[0]?.id_conductor
            : "";

        const response = await getRutasByConductorId(idConductorValue);
        if (response.status === 200) {
          setData(response.data);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <LoadingComp isOpen={isLoading} />;
  }
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="mt-5 w-full text-center text-black text-lg font-semibold leading-[21px] mb-3">
        Gestion de rutas
      </div>
      <div className="w-[90%] flex justify-center items-center gap-4 mx-4 ">
        <ContentDriverTable data={data} />
      </div>
    </div>
  );
};

export default Managedriver;
