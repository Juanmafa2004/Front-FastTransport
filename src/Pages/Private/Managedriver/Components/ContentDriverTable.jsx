import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptInformation } from "@Utils";
import { useNotifyHandler } from "@Hooks";
import { ChevronRight } from "../../Components/ChevronRight";
import { CheckIcon } from "../../Components/CheckIcon";
import { CrossIcon } from "../../Components/CrossIcon";
import { ActivateRoute, desactivateRoute } from "@Adapters";

export const ContentDriverTable = ({ data, reloadData }) => {
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();
  const [nextPath, setNextPath] = useState(false);
  const { alertNotify } = useNotifyHandler();

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

  const returnStateColor = (id) => {
    switch (id) {
      case 1: //pendiente
        return "bg-inactive";
      case 2: //en Proceso
        return "bg-status";
      default:
        return "bg-gray-500";
    }
  };

  const startRuta = async (ruta) => {
    try {
      const response = await desactivateRoute(ruta.id_ruta);
      if (response.status === 200) {
        await reloadData();
        alertNotify("Ruta iniciada exitosamente", "bottom", "center", "success");
      }
    } catch (error) {
      console.error("Error al iniciar la ruta:", error);
      alertNotify("Error al iniciar la ruta", "bottom", "center", "error");
    }
  };
  const resetRuta = async (ruta) => {
    try {
      const response = await ActivateRoute(ruta.id_ruta);
      if (response.status === 200) {
        await reloadData();
        alertNotify("Ruta detenida exitosamente", "bottom", "center", "success");
      }
    } catch (error) {
      console.error("Error al detener la ruta:", error);
      alertNotify("Error al detener la ruta", "bottom", "center", "error");
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
          <TableColumn className="w-[50px]">Estado </TableColumn>
          <TableColumn className="w-[100px]"> Acciones</TableColumn>
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
                  className={`px-[18px] py-0.5 text-[9px] font-bold text-white rounded ${returnStateColor(
                    item?.id_estado
                  )}`}
                >
                  {item.id_estado === 1 ? "Inactiva" : "Activa"}
                </span>
              </TableCell>
              <TableCell className="">
                <div className="flex justify-start">
                  {item.id_estado === 2 ? (
                    <Tooltip
                      closeDelay={0}
                      content="Detener ruta"
                      placement="top"
                      offset={7}
                      crossOffset={16}
                      classNames={{
                        base: ["before:bg-tooltip dark:before:bg-tooltip"],
                        content: ["py-2 px-4", "text-white bg-tooltip"],
                      }}
                    >
                      <span
                        className=" cursor-pointer active:opacity-50 flex mx-2  "
                        onClick={() => resetRuta(item)}
                      >
                        <CrossIcon className="text-2xl w-8 text-default-400 " />
                      </span>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      closeDelay={0}
                      content="Iniciar ruta"
                      placement="top"
                      offset={7}
                      crossOffset={16}
                      classNames={{
                        base: ["before:bg-tooltip dark:before:bg-tooltip"],
                        content: ["py-2 px-4", "text-white bg-tooltip"],
                      }}
                    >
                      <span
                        className=" cursor-pointer active:opacity-50 flex justify-center mx-2 border border-default-500 rounded-full"
                        onClick={() => startRuta(item)}
                      >
                        <CheckIcon className="text-2xl w-6.5 text-default-500 " />
                      </span>
                    </Tooltip>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Tooltip
                  closeDelay={0}
                  content="Ver pedidos asociados"
                  placement="top"
                  offset={7}
                  crossOffset={16}
                  classNames={{
                    base: ["before:bg-tooltip dark:before:bg-tooltip"],
                    content: ["py-2 px-4", "text-white bg-tooltip"],
                  }}
                >
                  <span
                    className=" cursor-pointer active:opacity-50 flex justify-end mx-2"
                    onClick={() => rowData(item)}
                  >
                    <ChevronRight className="w-[30%] text-2xl text-default-500" />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
