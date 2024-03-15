import Http from "@/utils/http";

const http = new Http();

export const createUser = (data: unknown) => {
  return http.post("/merchant/user/create", data);
};
