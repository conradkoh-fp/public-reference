import { EndDateStrategy, EndDateType } from "./types";

export const VFDEndDateStrategy = (endDateType: EndDateType): EndDateStrategy =>  (deal) => {
  switch(endDateType) {
    case EndDateType.Recurring: {
      return {
        endDate: deal.endDate + '1 year'
      };
    }
    default: { //Default strategy is to not modify
      return {
        endDate: deal.endDate
      }
    }
  }
};