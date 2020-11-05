export interface DealRequest {
  class: DealClass;
  dealType: "fixed" | "percentage" | "free-delivery";
  discountValue: number;
  mov: number;
  startDate: string;
  endDate: {
    value?: string,
    type: EndDateType
  };
  vendors: string[];
}

export enum EndDateType {
  Recurring = 'recurring',
  Fixed = 'fixed'
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

export type FakeRecurringBehavior = (deal: DealRequest) => { endDate: {
  value: string,
  type: EndDateType
} };