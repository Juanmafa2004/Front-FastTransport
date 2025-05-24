import { RequestHttp } from "@HttpRequest";

export const getEstadosEnvio = async (filters) => {
  const estadoEnvio = await RequestHttp(
    {},
    {
      base: "estadoEnvio",
      entry: "getEstadoEnvios",
      method: "GET",
      id: `?id_estado_envio=${filters.idEstadoEnvio || ""}&nombre_estado=${
        filters.nombreEstado || ""
      }`,
    }
  );
  return {
    data: { ...estadoEnvio.data },
    msg: estadoEnvio.msg,
    status: estadoEnvio.code,
  };
};
