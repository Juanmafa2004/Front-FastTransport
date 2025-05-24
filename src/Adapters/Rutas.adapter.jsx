import { RequestHttp } from "@HttpRequest";

export const getRutas = async (filters) => {
  const rutas = await RequestHttp(
    {},
    {
      base: "rutas",
      entry: "getRutas",
      method: "GET",
      id: `?id_ruta=${filters.id_ruta || ""}&nombre_ruta=${
        filters.nombre_ruta || ""
      }`,
    }
  );
  return {
    data: { ...rutas.data },
    msg: rutas.msg,
    status: rutas.code,
  };
};
