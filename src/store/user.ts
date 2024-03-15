import { defineStore } from "pinia";

interface User {
  id: number;
  name: string;
}
type Key = keyof User;

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserInfo = defineStore("userInfo", {
  persist: true,
  // other options...
  state() {
    return {
      id: 1,
      name: "张三",
    };
  },
  getters: {},
  actions: {
    initUserInfo(user: User) {
      this.$state = user;
    },
    updateUserInfo(key: Key, value: unknown) {},
  },
});
