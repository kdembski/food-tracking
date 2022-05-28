import axios from "axios";
import store from "@/store";

const ApiService = {
  setHeader() {
    const accessToken: string | null = store.getters["user/getAccessToken"];

    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer" + accessToken;
    }
    axios.defaults.headers.common["Content-Type"] = "application/json";
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  get(url: string) {
    return axios.get(url);
  },

  post(url: string, data: object) {
    return axios.post(url, data);
  },

  put(url: string, data: object) {
    return axios.put(url, data);
  },

  delete(url: string) {
    return axios.delete(url);
  },

  customRequest(data: object) {
    return axios(data);
  },
};

export default ApiService;
