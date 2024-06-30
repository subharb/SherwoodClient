import * as types from "../../constants";
import { BillItem } from "../../pages/hospital/Billing/types";
import { getBillableComboService } from "../../services/billing";


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

export function resetBillItems() {
    return async (dispatch:any) => {
      dispatch({ 
            type: types.RESET_BILL_ITEMS
      });
    };
}



export function getBillableComboAction(uuidInvestigation:string, idBillingInfo:number){
    return async (dispatch:any ) => {
        dispatch({ type: types.FETCH_BILLING_LOADING });
        return getBillableComboService(uuidInvestigation, idBillingInfo)
            .then((response:any) => {
                dispatch({
                    type: types.GET_BILLABLE_COMBO_SUCCESS,
                    billableCombos: response.billableCombos,
                });
            })
            .catch((error:any) => {
                dispatch({ type: types.GET_BILLABLES_ERROR });
                throw error;
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
