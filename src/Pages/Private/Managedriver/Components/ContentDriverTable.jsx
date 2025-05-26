import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptInformation } from "@Utils";
import { ChevronRight } from "../../Components/ChevronRight";

export const ContentDriverTable = ({ data }) => {
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();
  const [nextPath, setNextPath] = useState(false);

  useEffect(() => {
    if (data) {
      const dataTransformed = Object.values(data);
      setDataArray(dataTransformed);
    } else {
      setDataArray([]);
    }
  }, [data]);

  const rowData = (rowData = null) => {
    if (rowData) {
      const encryptedData = encryptInformation(rowData);
      localStorage.setItem("shipments", encryptedData);
      setNextPath(true);
    }
  };

  useEffect(() => {
    if (nextPath) {
      navigate("/tablero/drivershipment");
    }
  }, [nextPath, navigate]);

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
          <TableColumn className="w-[156px]">Nombre ruta</TableColumn>
          <TableColumn className="w-[150px]">Descripción</TableColumn>
          <TableColumn className="w-[50px]"> </TableColumn>
        </TableHeader>
        <TableBody
          items={dataArray || []}
          emptyContent={"No hay datos para mostrar."}
        >
          {(item) => (
            <TableRow key={`${item?.id_ruta}-${item?.id_estado}`}>
              <TableCell>{item?.nombre_ruta}</TableCell>
              <TableCell>{item?.descripcion}</TableCell>

              <TableCell>
                <span
                  className=" cursor-pointer active:opacity-50 flex justify-end mx-2"
                  onClick={() => rowData(item)}
                >
                  <ChevronRight className="w-[20%] text-xs text-default-400" />
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
