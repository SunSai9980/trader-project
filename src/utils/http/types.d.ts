import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestConfig extends AxiosRequestConfig {
  interceptorHooks?: InterceptorHooks;
}

export interface Result<T> {
  code: number;
  data: T;
}

export interface ResultData<T = any> {
  code: number;
  data: T;
  message: string;
}
