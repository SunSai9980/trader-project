export * from "./path";
export * from "./login";

export enum InquiryStatus {
  start = 1,
  end,
}

export enum Open {
  open = 1,
  close = 0,
}

export enum RiskType {
  highRisk = 1,
  loweRisk,
}
export enum CooperateTime {
  moreThanThreeMonths = 1,
  lessThanThreeMonths,
}
export enum ServiceRange {
  aboveDistrictLevel = 1,
  belowDistrictLevel,
}

export const SECRET = "Potato";
