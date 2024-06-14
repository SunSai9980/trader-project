import { Md5 } from "ts-md5";
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { Result, ResultData } from "./types";
import { sortASCII, signMd5 } from "../index";
import { SECRET } from "@/constants";

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
        if (config.data || config.params) {
          let obj = sortASCII(config.data || config.params);
          for (let key in obj) {
            config.headers[key] = encodeURIComponent(obj[key]) || "-";
          }
          let sign = signMd5(obj);
          config.headers.sign = sign;
          config.headers.keys = JSON.stringify(Object.keys(obj));
        }
        config.headers.sign = config.headers.sign || Md5.hashStr(SECRET);
        config.headers.keys = config.headers.keys || JSON.stringify([]);
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
