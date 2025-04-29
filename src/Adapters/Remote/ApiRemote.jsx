import axios from "axios";
export class AxiosRequest {
  urlBase = "";
  instanceAxios = null;
  prod = false;

  constructor(url, isProd) {
    this.urlBase = url;
    this.executeBuilder();
    this.prod = isProd;
  }

  createInstance = () => {
    return axios.create({
      baseURL: this.urlBase,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  executeBuilder = () => {
    this.instanceAxios = this.createInstance();
    this.instanceAxios.interceptors.response.use((opt) => {
      if(!this.prod) {
        console.log("Code: ", opt.status);
      }
      return opt;
    });
    this.instanceAxios.interceptors.request.use((opt) => {
      if(!this.prod) {
        console.log(
          opt.baseURL + opt.url,
          opt.method,
          opt.data ? "Data: " + JSON.stringify(opt.data) : ""
        );
      }
      return opt;
    });
  }

    ExecutePetition = async (url, data = null) => {
    try {
      const res = await this.instanceAxios['post'](url, data);
      return res.data;
    } catch (e) {
      return e.response.data;
    }
  }
}
