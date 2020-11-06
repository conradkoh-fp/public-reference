import { EndDateOffsetStrategy } from "./EndDateOffsetStrategy";
import { PandaProEndDateStrategy } from "./PandaProEndDateStrategy";
import {
  DealRequest,
  DealClass,
  EndDateType,
  OffersAPIDeal,
  EndDateStrategy,
} from "./types";
import { VFDEndDateStrategy } from "./VFDEndDateStrategy";

/**
 * Handle API request for recurring deals
 * @param dealRequest
 */
function handleDealRequest(dealRequest: DealRequest) {
  //Determine what the recurring behavior should be given the class and the recur mode
  const endDateStrategy = getDealEndDateStrategy(dealRequest);
  //Apply the recurring behavior and create a new payload
  const recurringDeal = applyEndDateStrategy(dealRequest, endDateStrategy);
  createOffersAPIDeal(recurringDeal);
}

/**
 * Get the assigned behavior for a recurring deal
 * @param dealClass
 * @param recurMode
 */
const getDealEndDateStrategy = (dealRequest: DealRequest): EndDateStrategy => {
  switch (dealRequest.class) {
    case DealClass.PandaPro: {
      return EndDateOffsetStrategy("5 years");
    }
    case DealClass.VFD: {
      return EndDateOffsetStrategy("1 year");
    }
    default: {
      throw new Error(
        `Recurring behaviour for class ${dealRequest.class} not implemented`
      );
    }
  }
};

function applyEndDateStrategy(
  deal: DealRequest,
  endDateStrategy: EndDateStrategy
): DealRequest {
  return {
    ...deal,
    ...endDateStrategy(deal),
  };
}

function createOffersAPIDeal(deal: DealRequest) {
  if (deal.endDate) {
    const offersAPIDeal: OffersAPIDeal = {
      dealType: deal.dealType,
      discountValue: deal.discountValue,
      mov: deal.mov,
      startDate: deal.startDate,
      endDate: deal.endDate,
      isPandaPro: deal.class === DealClass.PandaPro,
    };
    //Create deal
  } else {
    throw new Error("Deal must have end date");
  }
}
