export * from "./layout";
export * from "./union-inquiry";
export * from "./merchant-audit";
export * from "./user";

export interface IBaseListParams {
  deleted: boolean;
  pageIndex: number;
  pageSize: number;
}
