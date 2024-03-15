import Axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";

const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
};
interface Response<T = unknown> {
  data: T;
  code: number;
  message: string;
}

class Http {
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  private httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (token) config.url = `${config.url}?token=${token}`;
      return config;
    });
  }
  private httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use(
      (response) => {
        if (response.status >= 400) {
          return Promise.reject(response);
        }
        return response.data;
      },
      (err) => {
        ElMessage({
          type: "error",
          message: err,
        });
      }
    );
  }
  post(url: string, data: unknown, config = {}) {
    return Http.axiosInstance.post(url, data, config);
  }
}

export default Http;
