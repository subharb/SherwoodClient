import * as types from "../../constants";
import { decryptPatientData } from '../../utils'; 
/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */

 const initialState = {
    data: null,
    loading: false,
    error: null
}
 
export default function reducer(state = initialState, action){
    console.log(action)
    let newState = { ...state};
    switch(action.type){
        case types.FETCH_INVESTIGATIONS_SUCCESS:
            newState.data = action.investigations;    
            newState.loading = false; 
            newState.error = null;   
            return newState;
        case types.FETCH_INVESTIGATIONS_LOADING:
            newState.loading = true;   
            newState.error = null;                           
            return newState;
            
        default:
            return state;
    }
}