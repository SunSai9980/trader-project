import { State, Commitment } from "@/enums";

export interface ValidCode {
  code: string;
  phone: string;
}

export interface SendCode {
  phone: string;
}

export interface User {
  businessLicense?: string;
  commitment?: Commitment;
  createTime?: Date;
  creditCode?: string;
  deleted?: boolean;
  email?: string;
  enterpriseName?: string;
  id?: number;
  idCardFront?: string;
  idCardOpposite?: string;
  materialApplyState?: number;
  mobile: string;
  modifyTime?: Date;
  name?: string;
  operatePermit?: string;
  password?: string;
  recommendUser?: string;
  state?: State;
}
