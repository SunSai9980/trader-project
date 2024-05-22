import type { InquiryStatus, Open } from "@/enums";

export interface AnnexItem {
  name: string;
  url: string;
}

export interface FormData {
  mobile: string;
  annex: AnnexItem[];
  orderPrice: number;
  inspection: AnnexItem[];
  remark: string;
}

export interface SupplierCreateParams {
  annex: string;
  mobile: string;
  loginMobile: string;
  sunlightWelfareId: number;
  orderPrice: number;
  selected: 1 | 0;
  inspection?: string;
  remark?: string;
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
export interface ResRecordsData<T> {
  records: T[];
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
  createTime: string;
  deleted: boolean;
  id: number;
  mobile: string;
  modifyTime: string;
  sunlightWelfareId: number;
  supplierId: number;
  supplierName: string;
  orderPrice: number;
  selected: boolean;
  inspection: string;
  remark: string;
}
export interface SupplierWebList {
  annex: AnnexItem[];
  createTime: string;
  deleted: boolean;
  id: number;
  mobile: string;
  modifyTime: string;
  sunlightWelfareId: number;
  supplierId: number;
  supplierName: string;
  orderPrice: number;
  selected: boolean;
  inspection: AnnexItem[];
  remark: string;
}
