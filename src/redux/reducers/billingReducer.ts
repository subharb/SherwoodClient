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
        billables:Billable[] | null
    },
    loading:boolean,
    error:null | string
}
 const initialState = {
    data: {
        //bills:null,
        billables:null,
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

    let currentBillItems;
    let currentBillables;

    switch(action.type){
        case types.SAVE_BILL_ITEMS:
            newState.data.billItems = [...action.billItems]
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.PUSH_BILL_ITEMS:
            currentBillItems = newState.data.billItems ? newState.data.billItems : [];
            newState.data.billItems = [...currentBillItems,...action.billItems]
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        case types.PUSH_BILLABLES:
            currentBillItems = newState.data.billItems ? newState.data.billItems : [];
            currentBillables = newState.data.billables ? newState.data.billables : [];
            console.log("currentBillables",currentBillables);
            for(let i = 0; i < action.billablesId.length; i++){
                const billableId = action.billablesId[i];
                console.log("BillableId",billableId);
                const indexBillable = currentBillables.findIndex((b:Billable) => b.id === billableId.id);
                console.log("indexBillable",indexBillable);
                if( indexBillable !== -1){
                    currentBillItems.push(currentBillables[indexBillable]);
                }
            }
            newState.data.billItems = [...currentBillItems]
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