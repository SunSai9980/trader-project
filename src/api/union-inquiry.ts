import http from "@/utils/http";

import type {
  SupplierCreateParams,
  SupplierWelfareListParams,
  SupplierWelfareItem,
  SupplierListParams,
  SupplierListItem,
  ResponseData,
} from "@/types/union-inquiry";
import { Md5 } from "ts-md5";

/**
 * 创建询价
 */
export const apiSupplierCreate = (data: SupplierCreateParams) => {
  return http.post({
    url: "/merchant/sunlight/welfare/supplier/create",
    data,
  });
};

/**
 * 工会询价列表
 */
export const apiSupplierList = (data: SupplierWelfareListParams) => {
  return http.post<ResponseData<SupplierWelfareItem>>({
    url: "/merchant/sunlight/welfare/list",
    data,
  });
};

/**
 * 工会询价详情
 */
export const apiSupplierGet = (id: number) => {
  return http.post({
    url: `/merchant/sunlight/welfare/get/${id}`,
    headers: {
      id: id,
      keys: JSON.stringify(["id"]),
      sign: Md5.hashStr(`id=id}Potato`),
    },
  });
};

/**
 * 询价回应列表
 */
export const apiWelfareSupplierGet = (data: SupplierListParams) => {
  return http.post<ResponseData<SupplierListItem>>({
    url: `/merchant/sunlight/welfare/supplier/list`,
    data,
  });
};
