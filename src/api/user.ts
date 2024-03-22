import http from "@/utils/http";
import type {
  ResRecordsData,
  SendCode,
  ValidCode,
  User,
  IUserListParma,
} from "@/types";

export const apiLogin = (mobile: string) => {
  return http.post<User>({ url: "/merchant/user/mobile/" + mobile });
};

export const apiUserGet = (id: number) => {
  return http.post<User>({ url: `/merchant/user/get/${id}` });
};

export const apiUserList = (data: IUserListParma) => {
  return http.post<ResRecordsData<Required<User>>>({
    url: `/merchant/user/list?current=${data.current}&size=${data.size}`,
    data,
  });
};

export const apiSendCode = (data: SendCode) => {
  return http.post({ url: "/merchant/user/sendCode", data });
};

export const apiOnlyValidCode = (data: ValidCode) => {
  return http.post({ url: "/merchant/user/onlyValidCode", data });
};

export const apiUpdateUser = (data: User) => {
  return http.post<User>({ url: "/merchant/user/update", data });
};

export const apiDelUser = (id: number) => {
  return http.post({ url: `/merchant/user/del/${id}` });
};
