export interface DealRequest {
  class: DealClass;
  dealType: "fixed" | "percentage" | "free-delivery";
  discountValue: number;
  mov: number;
  startDate: string;
  endDateType: EndDateType;
  endDate: string;
  vendors: string[];
}

export enum EndDateType {
  Recurring = 'recurring'
}


export interface OffersAPIDeal {
  dealType: "fixed" | "percentage" | "free-delivery";
  discountValue: number;
  mov: number;
  startDate: string;
  endDate: string;
  isPandaPro: boolean;
}

export enum DealClass {
  VFD = "vfd",
  PandaPro = "pandapro",
}

export type EndDateStrategy = (deal: DealRequest) => { endDate: string };