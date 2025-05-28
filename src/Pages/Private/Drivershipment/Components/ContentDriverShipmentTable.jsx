import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@heroui/react";
import { formatISOToDate } from "@Utils";
import { WatchIcon } from "../../Components/WatchIcon";
import { InfoShipmentDriverModal } from "./modals/InfoShipmentDriverModal";
import { CheckIcon } from "../../Components/CheckIcon";
import { FinishShipmentModal } from "./modals/FinishShipmentModal";

export const ContentDriverShipmentTable = ({
  data,
  toggleModal,
  modals,
  reloadData,
}) => {
  const [dataArray, setDataArray] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  useEffect(() => {
    if (data) {
      const dataTransformed = Object.values(data);
      setDataArray(dataTransformed);
    } else {
      setDataArray([]);
    }
  }, [data]);
  const toggleModalWithRowData = (modalName, rowData = null) => {
    toggleModal(modalName);
    if (rowData) {
      setSelectedRowData(rowData);
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

  return (
    <>
      <Table
        aria-label="Tabla de conductor de pedidos"
        removeWrapper
        classNames={{
          base: "max-w-full",
          table: "min-w-full",
          th: "bg-transparent text-sm font-semibold text-[#5B73A0] py-2",
          td: "text-xs text-[#111215] py-2.5 border-b-2 border-[#F2F2F1]",
        }}
      >
        <TableHeader>
          <TableColumn className="w-[110px]">Fecha de entrega</TableColumn>
          <TableColumn className="w-[150px]">Descripción</TableColumn>
          <TableColumn className="w-[100px]">Estado</TableColumn>
          <TableColumn className="w-[100px]">Acciones</TableColumn>
        </TableHeader>
        <TableBody
          items={dataArray || []}
          emptyContent={"No hay datos para mostrar."}
        >
          {(item) => (
            <TableRow key={`${item?.id_envio}-${item?.id_cliente}`}>
              <TableCell>{formatISOToDate(item?.fecha_entrega)}</TableCell>
              <TableCell>{item.descripcion}</TableCell>
              <TableCell>
                <span
                  className={`px-[18px] py-0.5 text-[9px] font-bold text-white rounded ${returnStateColor(
                    item?.id_estado_envio
                  )}`}
                >
                  {item.nombre_estado}
                </span>
              </TableCell>
              <TableCell className="flex">
                <span
                  className=" cursor-pointer active:opacity-50 flex mx-2"
                  onClick={() => toggleModalWithRowData("modalInfo", item)}
                >
                  <WatchIcon className="text-2xl text-default-400" />
                </span>
                {item.id_estado_envio !== 4 ? (
                  <Tooltip
                    closeDelay={0}
                    content="Entregar pedido"
                    placement="top"
                    offset={7}
                    crossOffset={16}
                    classNames={{
                      base: ["before:bg-tooltip dark:before:bg-tooltip"],
                      content: ["py-2 px-4", "text-white bg-tooltip"],
                    }}
                  >
                    <span
                      className=" cursor-pointer active:opacity-50 flex mx-2 border border-default-300 rounded-full"
                      onClick={() => toggleModalWithRowData("modalState", item)}
                    >
                      <CheckIcon className="text-2xl text-default-400 " />
                    </span>
                  </Tooltip>
                ) : null}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <InfoShipmentDriverModal
        isOpen={modals.modalInfo}
        onClose={() => toggleModal("modalInfo")}
        data={selectedRowData}
      />
      <FinishShipmentModal
        isOpen={modals.modalState}
        onClose={() => toggleModal("modalState")}
        reloadData={reloadData}
        data={selectedRowData}
      />
    </>
  );
};
