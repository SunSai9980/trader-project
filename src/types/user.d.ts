import {
  State,
  MaterialApplyState,
  RiskType,
  CooperateTime,
  ServiceRange,
} from "@/enums";
import type { IBaseListParams } from "@/types";

export interface ValidCode {
  code: string;
  phone: string;
}

export interface SendCode {
  phone: string;
}

export interface User {
  businessLicense?: string;
  commitment?: string;
  createTime?: Date;
  creditCode?: string;
  deleted?: boolean;
  email?: string;
  enterpriseName?: string;
  id: number;
  idCardFront?: string;
  idCardOpposite?: string;
  materialApplyState?: MaterialApplyState;
  mobile?: string;
  modifyTime?: Date;
  name?: string;
  operatePermit?: string;
  password?: string;
  recommendUser?: string;
  state?: State;
  reason?: string;
  loginMobile?: string;
  servicePrice?: number;
  serviceJoinUserNum?: number;
  serviceRange?: ServiceRange;
  cooperateTime?: CooperateTime;
  riskType?: RiskType;
}

export interface IUserListData {
  deleted: boolean;
  current: number;
  size: number;
  enterpriseName?: string;
  states: State[];
  materialApplyState?: MaterialApplyState.fulfil;
  descs: string;
}

export interface IUserListParma {
  current: number;
  size: number;
  descs: string;
}
