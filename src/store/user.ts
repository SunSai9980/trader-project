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
        mobile: "19912345678",
        id: 10,
        commitment: 1,
      },
    };
  },
  getters: {},
  actions: {
    initUserInfo(data: User) {
      this.user = data;
    },
    setUserInfo<K extends keyof User>(key: K, value: User[K]) {
      this.user[key] = value;
    },
  },
});
