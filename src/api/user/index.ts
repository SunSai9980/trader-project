import http from "@/utils/http";
import type { SendCode, ValidCode, User } from "./types";

export const apiLogin = (mobile: string) => {
  return http.post<User>({ url: "/merchant/user/mobile/" + mobile });
};

export const apiSendCode = (data: SendCode) => {
  return http.post({ url: "/merchant/user/sendCode", data });
};

export const apiOnlyValidCode = (data: ValidCode) => {
  return http.post({ url: "/merchant/user/onlyValidCode", data });
};
