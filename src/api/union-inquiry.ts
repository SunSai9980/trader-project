import http from "@/utils/http";

import type {
  SupplierCreateParams,
  SupplierWelfareListParams,
  SupplierWelfareItem,
  SupplierListParams,
  SupplierListItem,
  ResponseData,
} from "@/types/union-inquiry";

export const apiSupplierCreate = (data: SupplierCreateParams) => {
  return http.post({
    url: "/merchant/sunlight/welfare/supplier/create",
    data,
  });
};

export const apiSupplierList = (data: SupplierWelfareListParams) => {
  return http.post<ResponseData<SupplierWelfareItem>>({
    url: "/merchant/sunlight/welfare/list",
    data,
  });
};

export const apiSupplierGet = (id: number) => {
  return http.post({
    url: `/merchant/sunlight/welfare/get/${id}`,
  });
};

export const apiWelfareSupplierGet = (data: SupplierListParams) => {
  return http.post<ResponseData<SupplierListItem>>({
    url: `/merchant/sunlight/welfare/supplier/list`,
    data,
  });
};
