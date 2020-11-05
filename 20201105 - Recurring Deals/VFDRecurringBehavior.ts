import { RecurMode, FakeRecurringBehavior } from "./types";

export const VFDRecurringBehavior = (recurMode: RecurMode): FakeRecurringBehavior =>  (deal) => {
  switch(recurMode) {
    case RecurMode.Perpetual: {
      return {
        endDate: deal.startDate + "5 years",
      };
    }
    default: {
      throw new Error(`Invalid recur mode '${recurMode}'`)
    }
  }
};