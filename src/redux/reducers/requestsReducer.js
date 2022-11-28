import * as types from "../../constants";
import { decryptPatientsData } from '../../utils'; 
/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */

 const initialState = {
    data: {
        requests:null
    },
    loading: false,
    error: null
}
 
export default function reducer(state = initialState, action){
    let newState = { ...state};
    let tempRequests;
    switch(action.type){
        case types.FETCH_REQUEST_PHARMACY_SUCCESS:
            newState.data.requests = action.requests;           
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.SAVE_REQUEST_PHARMACY_SUCCESS:
            tempRequests = newState.data.requests ? [...newState.data.requests] : [];
            tempRequests.push(action.request);

            newState.data.requests = tempRequests;
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.UPDATE_REQUEST_PHARMACY_SUCCESS:
            tempRequests = newState.data.requests ? [...newState.data.requests] : [];
            const requestIndex = tempRequests.findIndex(aRequest => aRequest.id === action.request.id);
            if(requestIndex !== -1){
                tempRequests[requestIndex] = action.request;
            }
            else{
                tempRequests.push(action.request);
            }
            newState.data.requests = tempRequests;
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.REQUESTS_LOADING:
            newState.loading = true;   
            return newState;
        case types.REQUESTS_ERROR:
            newState.loading = initialState.loading;   
            newState.error = action.errorCode;                           
            return newState;
        case types.REQUESTS_RESET_ERROR:
            newState.error = initialState.error;
            return newState;
        default:
            return state;
    }
}