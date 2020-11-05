import { FakeRecurringBehavior, EndDateType } from "./types";

export const VFDRecurringBehavior = (endDateType: EndDateType): FakeRecurringBehavior =>  (deal) => {
  switch(endDateType) {
    case EndDateType.Recurring: {
      return {
        endDate: {
          type: EndDateType.Recurring,
          value: deal.endDate + '1 year'
        }
      };
    }
    default: {
      throw new Error(`Invalid end date type '${endDateType}'`)
    }
  }
};