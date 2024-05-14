import { defineStore } from "pinia";
import { InvitationInfo } from "@/types";

export const useInvitationInfo = defineStore("invitationInfo", {
  persist: true,
  state(): InvitationInfo {
    return {
      code: "",
      recommendUser: "",
    };
  },
});
