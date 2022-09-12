import * as types from "../../constants";
import { decryptPatientsData } from '../../utils'; 
/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */

 const initialState = {
    data: null,
    currentInvestigation:null,
    loading: false,
    error: null
}
 
export default function reducer(state = initialState, action){
    
    let newState = { ...state};
    switch(action.type){
        case types.FETCH_INVESTIGATIONS_SUCCESS:
            newState.data = action.investigations;    
            if(action.investigations.length === 1){
                newState.currentInvestigation = action.investigations[0];
            }
            else if(localStorage.getItem("indexHospital")){
                newState.currentInvestigation = action.investigations[localStorage.getItem("indexHospital")];
            }
            newState.loading = false; 
            newState.error = null;   
            return newState;
        case types.FETCH_INVESTIGATIONS_LOADING:
            newState.loading = true;   
            newState.error = null;                           
            return newState;
        case types.SELECT_INVESTIGATION:    
            newState.currentInvestigation = newState.data[action.selectedInvestigation];
            return newState;
        case types.UPDATE_BILLING_INFO_SUCCESS:
            newState.currentInvestigation.billingInfo = action.billingInfo;
            newState.loading = false; 
            newState.error = null; 
            return newState
        case types.AUTH_SIGN_OUT:
            newState = {...initialState};
            return newState;
        default:
            return state;
    }
}