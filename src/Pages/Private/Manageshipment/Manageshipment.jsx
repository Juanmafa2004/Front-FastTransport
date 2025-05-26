import { useEffect, useState } from "react";
import { getEnvios } from "@Adapters";
import ManageshipmentViewModel from "./Manageshipment.viewmodel";
import { ContentAdminTable } from "./Components/ContentAdminTable";
import LoadingComp from "../Components/LoadingComp";

const Manageshipment = () => {
  const { modals, toggleModal, data, setData } = ManageshipmentViewModel();
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getEnvios({});
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
      <div className="mt-5 w-full text-center text-black text-lg font-semibold leading-[21px] mb-3">
        Gestion de pedidos
      </div>
      <div className="w-[90%] flex justify-center items-center gap-4 mx-4 ">
        <ContentAdminTable
          modals={modals}
          toggleModal={toggleModal}
          data={data}
        />
      </div>
    </div>
  );
};

export default Manageshipment;
