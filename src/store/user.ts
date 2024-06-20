import { defineStore } from "pinia";
import type { User } from "@/types";
import { MaterialApplyState, State } from "@/enums";

export const useUserInfo = defineStore("userInfo", {
  persist: true,
  // other options...
  state(): User {
    return {
      mobile: "",
      id: 0,
      state: State.know,
      materialApplyState: MaterialApplyState.unfinished,
      businessLicense: undefined,
      commitment: undefined,
      createTime: undefined,
      cooperateType: undefined,
      creditCode: undefined,
      deleted: undefined,
      email: undefined,
      enterpriseName: undefined,
      idCardFront: undefined,
      idCardOpposite: undefined,
      modifyTime: undefined,
      name: undefined,
      operatePermit: undefined,
      password: undefined,
      recommendUser: undefined,
      reason: undefined,
      loginMobile: undefined,
      servicePrice: undefined,
      serviceJoinUserNum: undefined,
      serviceRange: undefined,
      cooperateTime: undefined,
      riskType: undefined,
      companyProfile: "",
    };
  },
  getters: {},
  actions: {
    initUserInfo(data: User) {
      this.$state = data;
    },
  },
});
