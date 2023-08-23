import * as types from "../../constants";
import { BillItem } from "../../pages/hospital/Billing/types";


export function saveBillingItems(billItems:BillItem[]) {
    console.log("saveBillingItems",billItems)
    console.log("saveBillingItems",types.SAVE_BILL_ITEMS)
    return async (dispatch:any) => {
      dispatch({ 
            type: types.SAVE_BILL_ITEMS,
            billItems:billItems
      });
    };
}

export function pushBillingItems(billItems:BillItem[]) {
    return async (dispatch:any) => {
      dispatch({ 
            type: types.PUSH_BILL_ITEMS,
            billItems:billItems
      });
    };
}

export function pushBillables(billables:{id:number}[]) {
    return async (dispatch:any) => {
      dispatch({ 
            type: types.PUSH_BILLABLES,
            billablesId:billables
      });
    };
}



export function initializeBilling(newState:any) {
    return async (dispatch:any) => {
      dispatch({ 
            type: types.INITIALIZE_BILLING,
            newState:newState
      });
    };
}
