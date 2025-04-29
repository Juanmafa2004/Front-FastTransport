import { requestHttp } from "@HttpRequest";

const AdapterLogin = async (creds) => {
  const credentials = await requestHttp(
    { email: creds.email, password: creds.password },
    { base: "auth", entry: "login", method: "POST" }
  );
  return {
    //TODO: En data mapear el objeto credentials
    data: {...credentials},
    msg: credentials.msg,
    status: credentials.status,
  };
};

export { AdapterLogin };
