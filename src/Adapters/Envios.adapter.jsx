import { RequestHttp } from "@HttpRequest";

export const getEnvios = async (filters) => {
  const envios = await RequestHttp(
    {},
    {
      base: "envio",
      entry: "getEnvios",
      method: "GET",
      id: `?id_cliente=${filters.id_cliente || ""}&id_usuario=${
        filters.id_usuario || ""
      }&id_envio=${filters.id_envio || ""}&id_ruta=${filters.id_ruta}`,
    }
  );
  return {
    data: { ...envios.data },
    msg: envios.msg,
    status: envios.code,
  };
};

export const updateShipmentState = async (id) => {
  const envios = await RequestHttp(
    {
      id_estado_envio: 4, //1 pendiente 2 Proceso 3 En Transito 4 Entregado 5 Cancelado
    },
    {
      base: "envio",
      entry: "getEnvios",
      method: "PATCH",
      id: id,
    }
  );
  return {
    data: { ...envios.data },
    msg: envios.msg,
    status: envios.code,
  };
};



export const sendshipmentClient = async (data) => {
  const envios = await RequestHttp(
    {
      id_cliente: data.id_cliente,
      id_estado_envio: 2, //2 proceso
      descripcion: data.descripcion,
      fecha_solicitud: data.fecha_solicitud,
      fecha_entrega: data.fecha_entrega,
      direccion_origen: data.direccion_origen,
      direccion_destino: data.direccion_destino,
    },
    {
      base: "envio",
      entry: "getEnvios",
      method: "POST",
    }
  );
  return {
    data: { ...envios.data },
    msg: envios.msg,
    status: envios.code,
  };
};
