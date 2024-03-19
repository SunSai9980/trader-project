import { defineStore } from "pinia";
import type { User } from "@/api/user/types";
import { MaterialApplyState, State } from "@/enums";

export const useUserInfo = defineStore("userInfo", {
  persist: true,
  // other options...
  state(): User {
    return {
      mobile: "",
      id: 1,
      state: State.know,
      materialApplyState: MaterialApplyState.unfinished,
      businessLicense: undefined,
      commitment: undefined,
      createTime: undefined,
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
    };
  },
  getters: {},
  actions: {
    initUserInfo(data: User) {
      this.$state = data;
    },
    // setUserInfo<K extends keyof User>(key: K, value: User[K]) {
    //   this.$[key] = value;
    // },
  },
});
