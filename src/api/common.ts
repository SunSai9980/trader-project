import http from "@/utils/http";

export const apiUpload = (data: FormData) => {
  return http.post({ url: "/sys/oss/upload", data });
};
