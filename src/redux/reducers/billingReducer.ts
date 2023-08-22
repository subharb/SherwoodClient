import { te } from "date-fns/locale";
import * as types from "../../constants";
import { BillItem, Billable } from "../../pages/hospital/Billing/types";
/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */

export interface BillingReducer{
    data:{
        billItems:BillItem[] | null
    },
    loading:boolean,
    error:null | string
}
 const initialState = {
    data: {
        //bills:null,
        // billables:null,
        // billablesCombo:null,
        billItems:null
    },
    loading: false,
    error: null
}
 
export default function reducer(state:BillingReducer = initialState, action:any){
    
    let newState = { ...state};
    
    let tempBillItems;

    switch(action.type){
        case types.SAVE_BILL_ITEMS:
            newState.data.billItems = [...action.billItems]
           
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        
        default:
            return state;
    }
}