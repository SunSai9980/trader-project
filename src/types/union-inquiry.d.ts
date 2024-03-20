import type { InquiryStatus, Open } from "@/enums";

export interface SupplierWebList {
  annex: AnnexItem[];
  createTime: Date;
  deleted: boolean;
  id: number;
  mobile: string;
  modifyTime: Date;
  sunlightWelfareId: number;
  supplierId: number;
  supplierName: string;
}

export interface AnnexItem {
  name: string;
  url: string;
}

export interface FormData {
  mobile: string;
  annex: AnnexItem[];
}

export interface SupplierCreateParams {
  annex: string;
  mobile: string;
  loginMobile: string;
  sunlightWelfareId: number;
}

export interface SupplierWelfareListParams {
  deleted: boolean;
  supplierMobile: string;
  pageIndex: number;
  pageSize: number;
  state?: InquiryStatus;
  open: Open;
}

export interface SupplierWelfareItem {
  askEndTime: Date;
  content: string;
  createTime: Date;
  createUserId: number;
  createUserName: string;
  deleted: boolean;
  id: number;
  modifyTime: Date;
  modifyUserId: number;
  modifyUserName: string;
  open: boolean;
  orgId: number;
  orgName: string;
  receiveEndTime: Date;
  receiveStartTime: Date;
  supplierIds: string;
  supplierNames: string;
  type: number;
  unitPrice: number;
  userNum: number;
  welfareName: string;
}

export interface ResponseData<T> {
  list: T[];
  total: number;
}

export interface SupplierListParams {
  supplierMobile: string;
  sunlightWelfareId: number;
  pageIndex: number;
  pageSize: number;
  deleted: boolean;
}

export interface ResponseSupplierDate {
  list: SupplierListItem[];
  total: number;
}

export interface SupplierListItem {
  annex: string;
  createTime: Date;
  deleted: boolean;
  id: number;
  mobile: string;
  modifyTime: Date;
  sunlightWelfareId: number;
  supplierId: number;
  supplierName: string;
}
