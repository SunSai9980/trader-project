import { State, RefusalType } from "@/enums";

export interface MerchantForm {
  enterpriseName?: string;
  state?: State;
}

export interface RefusalObject {
  message: string;
  createTime: string;
  type: RefusalType;
  operator: string;
}
