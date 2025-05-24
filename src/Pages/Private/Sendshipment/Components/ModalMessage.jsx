/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { CheckCircle } from "@Assets";

const ModalMessage = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        onClose={onClose}
        backdrop="blur"
        className="h-[406px]"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col justify-center align-middle items-center mt-[40px] mb-[15px]">
              <img src={CheckCircle} alt="" />
            </ModalHeader>
            <ModalBody>
              <div className="w-[400px] h-[100px] relative">
                <div className="w-[400px] h-[45px] absolute left-0 top-0 text-center text-black text-[18px] font-montserrat font-bold break-words">
                  Hemos enviado tu pedido, pronto uno de nuestros carros pasara
                  a recoger el paquete.
                </div>
                <div className="w-[400px] h-[45px] absolute left-0 top-[60px] text-center text-black text-[12px] font-montserrat font-normal break-words">
                  Recuerda que solo puedes llamar para solicitar un cambio en el
                  pedido dentro de los proximos 30 minutos o hasta que el pedido
                  sea asigando a una ruta.
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center mb-[10px]"></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalMessage;
