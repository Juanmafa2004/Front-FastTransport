import { RequestHttp } from "@HttpRequest";

export const AdapterLogin = async (creds) => {
  const credentials = await RequestHttp(
    { correo: creds.user, contrasena: creds.password },
    { base: "uses", entry: "login", method: "POST" }
  );
  return {
    //TODO: En data mapear el objeto credentials
    data: {...credentials.data},
    msg: credentials.msg,
    status: credentials.code,
  };
};


