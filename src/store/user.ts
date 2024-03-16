import { defineStore } from "pinia";
import type { User } from "@/api/user/types";

interface State {
  user: User;
}
export const useUserInfo = defineStore("userInfo", {
  persist: true,
  // other options...
  state(): State {
    return {
      user: {
        mobile: "",
      },
    };
  },
  getters: {},
  actions: {
    initUserInfo(data: User) {
      this.user = data;
    },
  },
});
