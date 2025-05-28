import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { QuestionIcon } from "@Assets";
import { updateShipmentState } from "@Adapters";
import { useEffect, useState } from "react";
import { useNotifyHandler } from "@Hooks";

export const FinishShipmentModal = ({ isOpen, onClose, reloadData, data }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { alertNotify } = useNotifyHandler();
  const [dataM, setDataM] = useState(null);

  const getData = async () => {
    if (data) {
      setDataM(data);
      setIsDataLoaded(true);
    }
  };

  const closeModal = () => {
    reloadData(); // Call the function to reload data
    alertNotify("Pedido entregado de manera exitosa", "bottom", "center", "success");
    onClose();
  };

  const finishShipment = async () => {
    try {
      const response = await updateShipmentState(dataM.id_envio);
      if (response.status === 200) {
        // Close the modal after successful update
        closeModal();
      } else {
        console.error("Failed to update shipment state");
      }
    } catch (error) {
      console.error("Error updating shipment state:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  if (!isDataLoaded) {
    return null;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        className="h-[372px] w-[500px] "
        hideCloseButton
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col justify-center align-middle items-center mt-[40px] mb-[15px]">
              <img src={QuestionIcon} alt="Question icon" />
            </ModalHeader>
            <ModalBody>
              <div className="w-[400px] h-[100px] relative">
                <div className="w-[400px] h-[45px] absolute left-0 top-0 text-center text-black text-[18px] font-montserrat font-bold break-words">
                  ¿Confirmas la entrega del pedido?
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center mb-[20px]">
              <Button
                className="w-[131px] text-[#F2F2F1] h-[46px]  bg-[#88888a] rounded-[4px] flex justify-center items-center "
                onPress={onClose}
              >
                Volver
              </Button>
              <Button
                className="w-[131px] text-[#F2F2F1] h-[46px]  bg-main rounded-[4px] flex justify-center items-center "
                onPress={finishShipment}
              >
                Entregar pedido
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
