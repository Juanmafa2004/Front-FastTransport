import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HistorialshipmentViewModel from "./Historialshipment.viewmodel";
import { ContentTable } from "./Components/ContentTable";
import LoadingComp from "../Components/LoadingComp";
import { getEnvios } from "@Adapters";

const Historialshipment = () => {
  const { modals, toggleModal, data, setData } = HistorialshipmentViewModel();
  const [isLoading, setIsLoading] = useState(false);
  const id_rol = useSelector((state) => state.user?.id_rol);
  const id_usuario = useSelector((state) => state.user?.id_usuario);

  const selectedUser = () => {
    if (id_rol !== 2) return "";
    return id_usuario;
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getEnvios({ id_usuario: selectedUser() });
      console.log("Response:", response);
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
    getData();
  }, []);

  if (isLoading) {
    return <LoadingComp isOpen={isLoading} />;
  }
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="mt-6 w-full text-center text-black text-lg font-semibold leading-[21px] mb-3">
        Historico de pedidos
      </div>
      <div className="w-[90%] flex justify-center items-center gap-4 mx-4 ">
        <ContentTable 
        modals={modals} 
        toggleModal={toggleModal} 
        data={data} 
        />
      </div>
    </div>
  );
};

export default Historialshipment;
