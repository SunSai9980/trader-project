import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { Result, ResultData } from "./types";

const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
};
class Http {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig = defaultConfig) {
    this.instance = axios.create(config);
    this.setupInterceptor();
  }

  private setupInterceptor(): void {
    // 添加所有实例都有的请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.url = config.url + "?token=" + token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 添加所有实例都有的响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<ResultData<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, Result<ResultData<T>>>(config)
        .then((response) => {
          const { code, message } = response?.data;
          if (code >= 400) {
            ElMessage({ message: message, type: "error" });
            reject(response.data);
          }
          resolve(response.data);
        })
        .catch((error) => {
          ElMessage({ message: error, type: "error" });
          reject(error);
        });
    });
  }

  get<T = any>(config: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.request({ ...config, method: "GET" });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.request({ ...config, method: "POST" });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.request({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.request({ ...config, method: "PATCH" });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.request({ ...config, method: "PUT" });
  }
}

export default new Http();
