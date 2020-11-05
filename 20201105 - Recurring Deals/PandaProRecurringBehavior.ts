import { FakeRecurringBehavior, EndDateType } from "./types";

export const PandaProReucrringBehavior = (endDateType: EndDateType): FakeRecurringBehavior =>  (deal)  => {
  switch(endDateType) {
    case EndDateType.Recurring: {
      return {
        endDate: {
          type: EndDateType.Recurring,
          value: deal.endDate + '5 years'
        }
      };
    }
    default: {
      throw new Error(`Invalid end date type '${endDateType}'`)
    }
  }
};