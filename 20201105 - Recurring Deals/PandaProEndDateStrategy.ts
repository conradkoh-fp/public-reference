import {EndDateStrategy, EndDateType } from "./types";

export const PandaProEndDateStrategy = (endDateType: EndDateType): EndDateStrategy =>  (deal)  => {
  switch(endDateType) {
    case EndDateType.Recurring: {
      return {
        endDate: deal.endDate + '5 years'
      };
    }
    default: {
      throw new Error(`Invalid end date type '${endDateType}'`)
    }
  }
};