import http from "@/utils/http";
import type {
  ResRecordsData,
  SendCode,
  ValidCode,
  User,
  IUserListParma,
  IUserListData,
} from "@/types";
import { Md5 } from "ts-md5";

/**
 * 登录/创建
 */
export const apiLogin = (mobile: string) => {
  return http.post<User>({
    url: "/merchant/user/mobile/" + mobile,
    headers: {
      mobile: JSON.stringify(mobile),
      keys: JSON.stringify(["mobile"]),
      sign: Md5.hashStr(`mobile=${JSON.stringify(mobile)}Potato`),
    },
  });
};

/**
 * 查询用户
 */
export const apiUserGet = (id: number) => {
  return http.post<User>({
    url: `/merchant/user/get/${id}`,
    headers: {
      id,
      keys: JSON.stringify(["id"]),
      sign: Md5.hashStr(`id=${id}Potato`),
    },
  });
};

/**
 * 用户列表
 */
export const apiUserList = (data: IUserListData) => {
  let params: IUserListParma = {
    current: data.current,
    size: data.size,
    descs: data.descs,
  };
  params.current = data.current;
  return http.post<ResRecordsData<Required<User>>>({
    url: `/merchant/user/list`,
    data,
    params,
  });
};

/**
 * 发送验证码
 */
export const apiSendCode = (data: SendCode) => {
  return http.post({ url: "/merchant/user/sendCode", data });
};

/**
 * 校验验证码
 */
export const apiOnlyValidCode = (data: ValidCode) => {
  return http.post({ url: "/merchant/user/onlyValidCode", data });
};

/**
 * 更新用户
 */
export const apiUpdateUser = (data: User) => {
  return http.post<User>({ url: "/merchant/user/update", data });
};

/**
 * 删除用户（物理删除）
 */
export const apiDelUser = (id: number) => {
  return http.post({
    url: `/merchant/user/del/${id}`,
    headers: {
      id: id,
      keys: JSON.stringify(["id"]),
      sign: Md5.hashStr(`id=${id}Potato`),
    },
  });
};
