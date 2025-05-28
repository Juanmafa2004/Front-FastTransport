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


export const getActiveRutas = async () => {
  const rutas = await RequestHttp(
    {},
    {
      base: "rutas",
      entry: "getActiveRutas",
      method: "GET",
    }
  );
  return {
    data: { ...rutas.data },
    msg: rutas.msg,
    status: rutas.code,
  };
}

export const getRutasByConductorId = async (id) => {
  const rutas = await RequestHttp(
    {},
    {
      base: "rutas",
      entry: "getRutasByConductor",
      method: "GET",
      id: id,
    }
  );
  return {
    data: { ...rutas.data },
    msg: rutas.msg,
    status: rutas.code,
  };
};

export const desactivateRoute = async (id) => {
  const rutas = await RequestHttp(
    {
      id_estado: 2, // 1 Activo, 2 Inactivo
    },
    {
      base: "rutas",
      entry: "getRutas",
      method: "PATCH",
      id: id,
    }
  );
  return {
    data: { ...rutas.data },
    msg: rutas.msg,
    status: rutas.code,
  };
};
export const ActivateRoute = async (id) => {
  const rutas = await RequestHttp(
    {
      id_estado: 1, // 1 Activo, 2 Inactivo
    },
    {
      base: "rutas",
      entry: "getRutas",
      method: "PATCH",
      id: id,
    }
  );
  return {
    data: { ...rutas.data },
    msg: rutas.msg,
    status: rutas.code,
  };
};
