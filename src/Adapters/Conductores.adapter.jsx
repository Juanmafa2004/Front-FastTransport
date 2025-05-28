import { RequestHttp } from "@HttpRequest";

export const getConductores = async (filters) => {
  const conductores = await RequestHttp(
    {},
    {
      base: "conductores",
      entry: "getConductores",
      method: "GET",
      id: `?id_conductor=${filters.id_conductor || ""}&nombre=${
        filters.nombre || ""
      }&id_usuario=${filters.id_usuario || ""}`,
    }
  );
  return {
    data: { ...conductores.data },
    msg: conductores.msg,
    status: conductores.code,
  };
};

export const getConductoresByRuta = async (id_ruta) => {
  const conductores = await RequestHttp(
    {},
    {
      base: "conductores",
      entry: "getConductoresByRuta",
      method: "GET",
      id: id_ruta,
    }
  );
  return {
    data: { ...conductores.data },
    msg: conductores.msg,
    status: conductores.code,
  };
};
