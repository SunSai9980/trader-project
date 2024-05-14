import http from "@/utils/http";
import { Md5 } from "ts-md5";

/**
 * 上传
 */
export const apiUpload = (data: FormData) => {
  return http.post({ url: "/merchant/oss/upload", data });
};

/**
 * 标记邀请链接已使用
 * @param code -校验code
 * @returns
 */
export const apiUseCode = (code: string) => {
  return http.post({
    url: `/merchant/sunlight/welfare/use/${code}`,
    headers: {
      code: code,
      keys: JSON.stringify(["code"]),
      sign: Md5.hashStr(`code=${code}Potato`),
    },
  });
};
