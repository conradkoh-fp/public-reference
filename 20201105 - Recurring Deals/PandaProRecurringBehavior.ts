import { FakeRecurringBehavior, RecurMode } from "./types";

export const PandaProReucrringBehavior = (recurMode: RecurMode): FakeRecurringBehavior =>  (deal)  => {
  switch(recurMode) {
    case RecurMode.Perpetual: {
      return {
        endDate: deal.startDate + "1 years",
      };
    }
    default: {
      throw new Error(`Invalid recur mode '${recurMode}'`)
    }
  }
};