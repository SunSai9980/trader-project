import {
  State,
  MaterialApplyState,
  RiskType,
  CooperateTime,
  CooperateType,
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
  cooperateType?: CooperateType;
  remark?: string;
  companyProfile?: string;
}

type Tuple = [
  CooperateType.BirthdayBenefits,
  CooperateType.ConsumptionAssistance,
  CooperateType.HuishiCooperation,
  CooperateType.SunshineBenefits
];

// 构建所有可能的子序列
type Subset<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [First, ...Subset<Rest>] | Subset<Rest>
  : [];

// 将 a 定义为 Tuple 的所有可能子序列的联合类型

export interface IUserListData {
  deleted: boolean;
  current: number;
  size: number;
  enterpriseName?: string;
  states: State[];
  materialApplyState?: MaterialApplyState.fulfil;
  descs: string;
  cooperateTypes?: Subset<Tuple>;
}

export interface IUserListParma {
  current: number;
  size: number;
  descs: string;
}
