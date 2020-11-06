import { EndDateStrategy } from "./types";

export const EndDateOffsetStrategy = (endDate: string): EndDateStrategy =>  (deal)  => {
    return {
        endDate: deal.startDate + endDate
    }
  };