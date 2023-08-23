import { te } from "date-fns/locale";
import * as types from "../../constants";
import { BillItem, Billable, BillableCombo } from "../../pages/hospital/Billing/types";
/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */

export interface BillingReducer{
    data:{
        billItems:BillItem[] | null,
        billableCombos:BillableCombo[] | null,
    },
    loading:boolean,
    error:null | string
}
 const initialState = {
    data: {
        //bills:null,
        // billables:null,
        billableCombos:null,
        billItems:null
    },
    loading: false,
    error: null
}
 
export default function reducer(state:BillingReducer = initialState, action:any){
    console.log("BillingReducer",state);
    console.log("BillingReducer",action);
    let newState = { ...state};

    switch(action.type){
        case types.SAVE_BILL_ITEMS:
            newState.data.billItems = [...action.billItems]
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.PUSH_BILL_ITEMS:
            const currentBillItems = newState.data.billItems ? newState.data.billItems : [];
            newState.data.billItems = [...currentBillItems,...action.billItems]
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        case types.INITIALIZE_BILLING:
            newState.data = action.payload;
            return newState;
        default:
            return state;
    }
}