export interface DealRequest {
  class: DealClass;
  dealType: "fixed" | "percentaage" | "free-delivery";
  discountValue: number;
  mov: number;
  startDate: string;
  endDate?: string;
  vendors: string[];
  recurMode?: RecurMode;
}

export interface OffersAPIDeal {
  dealType: "fixed" | "percentaage" | "free-delivery";
  discountValue: number;
  mov: number;
  startDate: string;
  endDate: string;
  isPandaPro: boolean;
}

export enum RecurMode {
  Perpetual = "perpetual",
}

export enum DealClass {
  VFD = "vfd",
  PandaPro = "pandapro",
}

export type FakeRecurringBehavior = (deal: DealRequest) => { endDate: string };