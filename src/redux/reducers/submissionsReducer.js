import * as types from "../../constants";
import { decryptPatientsData } from '../../utils'; 
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
        case types.FETCH_SUBMISSIONS_SUCCESS:
            let tempData = newState.data === initialState.data ? {} : newState.data;
            
            tempData[action.meta.uuidInvestigation] = action.surveys;
            newState.data = tempData;
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        case types.SUBMISSIONS_LOADING:
            newState.loading = true;
            newState.error = initialState.error;
            return newState;
        case types.SAVE_SUBMISSION_SUCCESS:
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        default:
            return state;
    }
}