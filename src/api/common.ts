import http from "@/utils/http";

/**
 * 上传
 */
export const apiUpload = (data: FormData) => {
  return http.post({ url: "/merchant/oss/upload", data });
};
