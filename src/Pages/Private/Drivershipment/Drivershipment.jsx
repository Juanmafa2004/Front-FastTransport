import { useEffect, useState } from "react";
import DrivershipmentViewModel from "./Drivershipment.viewmodel";
import LoadingComp from "../Components/LoadingComp";
import { getEnvios } from "@Adapters";
import { ContentDriverShipmentTable } from "./Components/ContentDriverShipmentTable";
import { decryptInformation } from "@Utils";
import { ArrowLeft } from "../Components/ArrowLeft";
import { useNavigate } from "react-router-dom";

const Drivershipment = () => {
  const { modals, toggleModal, data, setData } = DrivershipmentViewModel();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [returnPage, setReturnPage] = useState(false);

  const shipments = localStorage.getItem("shipments");
  const decryptShipment = decryptInformation(shipments);
  const id_ruta = decryptShipment.id_ruta;
  const nombre_ruta = decryptShipment.nombre_ruta;

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getEnvios({ id_ruta });
      if (response.status === 200) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (returnPage) {
      navigate("/tablero/managedriver");
    }
  }, [returnPage, navigate]);

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <LoadingComp isOpen={isLoading} />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <span
        className="self-start mx-5 mt-3 flex justify-center gap-2 items- text-default-400 cursor-pointer" 
        onClick={() => setReturnPage(true)}
      >
        <ArrowLeft className="text-2xl text-default-400 w-6 mt-0.5" /> <span>volver</span>
      </span>
      <div className=" w-full text-center text-black text-lg font-semibold leading-[21px] mb-3">
        Gestion de pedidos de la ruta {nombre_ruta}
      </div>
      <div className="w-[90%] flex justify-center items-center gap-4 mx-4 ">
        <ContentDriverShipmentTable
          modals={modals}
          toggleModal={toggleModal}
          data={data}
          reloadData={getData}
        />
      </div>
    </div>
  );
};

export default Drivershipment;
