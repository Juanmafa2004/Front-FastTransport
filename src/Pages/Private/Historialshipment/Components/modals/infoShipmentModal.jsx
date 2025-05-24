import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { formatISOToDate } from "@Utils";
import { useEffect, useState } from "react";

export const InfoShipmentModal = ({ isOpen, onClose, data }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [dataM, setDataM] = useState(null);

  const getData = async () => {
    if (data) {
      setDataM(data);
      setIsDataLoaded(true);
    }
  };

  const returnStateColor = (id) => {
    switch (id) {
      case 1: //pendiente
        return "bg-tooltipProgres";
      case 2: //en Proceso
        return "bg-tooltipProcess";
      case 3: //en Transito
        return "bg-inTransit";
      case 4: //Entregado
        return "bg-status";
      case 5: //cancelado
        return "bg-inactive";
      default:
        return "bg-gray-500";
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
        onClose={onClose}
        size="3xl"
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex justify-between gap-1  mt-[30px] mb-[5px]  ">
            <h2 className="text-md font-bold">Información del pedido</h2>
            <span
              className={`px-[18px] py-0.5 text-[9px] font-bold text-white rounded ${returnStateColor(
                dataM?.id_estado_envio
              )}`}
            >
              {dataM.nombre_estado}
            </span>
          </ModalHeader>
          <ModalBody className="">
            <div className="flex  gap-3">
              <section className="flex flex-col gap-3 mx-3">
                <div className="flex gap-2 text-md">
                  <span className="font-bold">Fecha de solicitud:</span>{" "}
                  {formatISOToDate(dataM.fecha_solicitud)}
                </div>
                <div className="flex gap-2 text-md mr-6">
                  <span className="font-bold">Fecha de entrega:</span>{" "}
                  {formatISOToDate(dataM.fecha_entrega)}
                </div>
              </section>
              <section className="flex flex-col gap-3 mx-3">
                <div className="flex gap-2 text-md">
                  <span className="font-bold">Dirección de origen:</span>{" "}
                  {dataM.direccion_origen}
                </div>
                <div className="flex gap-2 text-md">
                  <span className="font-bold">Dirección de destino:</span>{" "}
                  {dataM.direccion_destino}
                </div>
              </section>
            </div>
            <section className="flex flex-col mx-3">
              <span className="font-bold">Descripción:</span>
              <p>{dataM.descripcion}</p>
            </section>
          </ModalBody>
          <ModalFooter className="flex justify-center mb-[30]"> </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
