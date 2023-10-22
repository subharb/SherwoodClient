import { te } from "date-fns/locale";
import * as types from "../../constants";
import { BillItem, Billable, BillableCombo } from "../../pages/hospital/Billing/types";
import { t } from "vitest/dist/types-198fd1d9";
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

    let newState = { ...state};

    let currentBillItems;
    let currentBillables;

    switch(action.type){
        case types.FETCH_BILLING_LOADING:
            newState.loading = true;
            newState.error = null;
            return newState;
        case types.SAVE_BILL_ITEMS:
            newState.data.billItems = [...action.billItems]
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.RESET_BILL_ITEMS:
            newState.data.billItems = [];
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        case types.PUSH_BILL_ITEMS:
            currentBillItems = newState.data.billItems ? newState.data.billItems : [];
            newState.data.billItems = [...currentBillItems,...action.billItems]
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        case types.GET_BILLABLES_SUCCESS:
        case types.UPDATE_BILLABLES_SUCCESS:
            newState.data.billables = action.billables;
            newState.loading = false; 
            newState.error = null; 
            return newState;     
        case types.GET_BILLABLE_COMBO_SUCCESS:
            newState.data.billableCombos = action.billableCombos;
            newState.loading = false;
            newState.error = null;
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
                    currentBillItems.push({...currentBillables[indexBillable], quantity:1});
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