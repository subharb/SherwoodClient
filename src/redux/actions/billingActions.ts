import * as types from "../../constants";
import { BillItem } from "../../pages/hospital/Billing/types";


export function saveBillingItems(billItems:BillItem[]) {
    return async (dispatch:any) => {
      dispatch({ 
            type: types.SAVE_BILL_ITEMS,
            billItems:billItems
      });
    };
}

