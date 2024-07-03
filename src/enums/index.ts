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
  LargeCityArea = 1,
  CountyScope,
  GrassrootsScope,
}

export enum CourierRange {
  NBFreeShipping = 1,
  ZJFreeShipping,
  JZHFreeShipping,
  FreeShipping,
  DeliveryToSchool,
}

export enum CooperateType {
  SunshineBenefits = 1,
  ConsumptionAssistance,
  BirthdayBenefits,
  HuishiCooperation,
}

export enum RefusalType {
  MaterialRefusal,
  AuditsRefusal,
  CooperativeRefusal,
}
