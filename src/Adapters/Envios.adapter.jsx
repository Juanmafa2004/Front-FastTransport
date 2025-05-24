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
      }&id_envio=${filters.id_envio || ""}`,
    }
  );
  return {
    data: { ...envios.data },
    msg: envios.msg,
    status: envios.code,
  };
};
