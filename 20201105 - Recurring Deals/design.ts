import { PandaProReucrringBehavior } from "./PandaProRecurringBehavior";
import {
  DealRequest,
  DealClass,
  EndDateType,
  OffersAPIDeal,
  FakeRecurringBehavior,
} from "./types";
import { VFDRecurringBehavior } from "./VFDRecurringBehavior";

/**
 * Handle API request for recurring deals
 * @param dealRequest 
 */
function handleDealRequest(dealRequest: DealRequest) {
  if (isRecurringDeal(dealRequest)) {
    //Determine what the recurring behavior should be given the class and the recur mode
    const recurBehavior = getDealRecurBehavior(
      dealRequest.class,
      dealRequest.endDate.type
    );
    //Apply the recurring behavior and create a new payload
    const recurringDeal = withDealRecurrence(dealRequest, recurBehavior);
    createOffersAPIDeal(recurringDeal);
  } else {
    createOffersAPIDeal(dealRequest);
  }
}

/**
 * Get the assigned behavior for a recurring deal
 * @param dealClass 
 * @param recurMode 
 */
const getDealRecurBehavior = (
  dealClass: DealClass,
  endDateType: EndDateType
): FakeRecurringBehavior => {
  switch (dealClass) {
    case DealClass.PandaPro: {
      return PandaProReucrringBehavior(endDateType);
    }
    case DealClass.VFD: {
      return VFDRecurringBehavior(endDateType);
    }
    default: {
      throw new Error(
        `Recurring behaviour for class ${dealClass} not implemented`
      );
    }
  }
};

function withDealRecurrence(
  deal: DealRequest,
  recurBehavior: FakeRecurringBehavior
): DealRequest {
  return {
    ...deal,
    ...recurBehavior(deal),
  };
}

function isRecurringDeal(deal: DealRequest): boolean {
  return deal.endDate.type === EndDateType.Recurring;
}


function createOffersAPIDeal(deal: DealRequest) {
  if (deal.endDate && deal.endDate.value) {
    const offersAPIDeal: OffersAPIDeal = {
      dealType: deal.dealType,
      discountValue: deal.discountValue,
      mov: deal.mov,
      startDate: deal.startDate,
      endDate: deal.endDate.value,
      isPandaPro: deal.class === DealClass.PandaPro,
    };
    //Create deal
  } else {
    throw new Error("Deal must have end date");
  }
}
