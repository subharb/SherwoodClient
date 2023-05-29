import * as types from "../../constants";
import { decryptPatientsData } from '../../utils/index.jsx'; 
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
    
    let newState = { ...state};
    let tempData;
    switch(action.type){
        //Requiere factorizacion
        case types.FETCH_SUBMISSIONS_SUCCESS:
            tempData = newState.data === initialState.data ? {} : newState.data;
            
            tempData[action.meta.uuidInvestigation] = action.surveys;
            newState.data = tempData;
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        case types.FETCH_SUBMISSIONS_SURVEY_SUCCESS:
            tempData = newState.data === initialState.data ? {} : newState.data;
            const tempSurvey = {};
            tempSurvey[action.survey.uuid] = action.survey;

            tempData[action.meta.uuidInvestigation] = tempSurvey;

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
        case types.AUTH_SIGN_OUT:
            newState = {...initialState};
            return newState;
        default:
            return state;
    }
}