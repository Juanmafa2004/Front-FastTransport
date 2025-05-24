import { RequestHttp } from "@HttpRequest";

export const getClientes = async (filters) => {
  const clientes = await RequestHttp(
    {},
    {
      base: "clients",
      entry: "getClients",
      method: "GET",
      id: `?id_cliente=${filters.idCliente || ""}&id_usuario=${
        filters.id_usuario || ""
      }`,
    }
  );
  return {
    
    data: { ...clientes.data },
    msg: clientes.msg,
    status: clientes.code,
  };
};
