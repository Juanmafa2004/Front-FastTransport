import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { EditIcon } from "../../Components/EditIcon";

const tempData = [
  {
    id: 1,
    fechaSolicitud: "05/05/2025",
    estado: "Entregado",
  },
  {
    id: 2,
    fechaSolicitud: "02/05/2025",
    estado: "En progreso",
  },
  {
    id: 3,
    fechaSolicitud: "30/04/2025",
    estado: "Finalizado",
  },
];

export const ContentTable = () => {
  return (
    <>
      <Table
        aria-label="Tabla de usuarios"
        removeWrapper
        classNames={{
          base: "max-w-full",
          table: "min-w-full",
          th: "bg-transparent text-sm font-semibold text-[#5B73A0] py-2",
          td: "text-xs text-[#111215] py-2.5 border-b-2 border-[#F2F2F1]",
        }}
      >
        <TableHeader>
          <TableColumn className="w-[150px]">Id</TableColumn>
          <TableColumn className="w-[156px]">Fecha de solicitud</TableColumn>
          <TableColumn className="w-[150px]">Estado</TableColumn>
          <TableColumn className="w-[50px]">Acciones</TableColumn>
        </TableHeader>
        <TableBody
          items={tempData || []}
          emptyContent={"No hay datos para mostrar."}
        >
          {(item) => (
            <TableRow key={`${item.id}-${Math.random()}`}>
              <TableCell>{item?.id}</TableCell>
              <TableCell>{item?.fechaSolicitud}</TableCell>

              <TableCell>
                <span
                  className={`px-[18px] py-0.5 text-[8px] font-bold text-white rounded ${
                    item.estado.toLowerCase() === "entregado"
                      ? "bg-status"
                      : item.estado.toLocaleLowerCase() === "en progreso"
                      ? "bg-tooltipProcess"
                      : "bg-inactive"
                  }`}
                >
                  {item.estado}
                </span>
              </TableCell>
              <TableCell>
                <div className=" flex items-center justify-center w-full ">
                  <span
                    className=" cursor-pointer active:opacity-50"
                    //  onClick={() => toggleModalWithRowData("modalEdit", item)}
                  >
                    <EditIcon />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
