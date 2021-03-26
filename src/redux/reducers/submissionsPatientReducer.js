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
    console.log(action);
    let tempData;
    let newState = { ...state};
    switch(action.type){
        case types.FETCH_SUBMISSIONS_PATIENT_SUCCESS:
            tempData = newState.data === initialState.data ? {} : newState.data;
            let dictSurveys = {};
            action.surveys.forEach(sur => {
                dictSurveys[sur.uuid] = sur;
            })
            
            tempData[action.meta.uuidPatient] = dictSurveys;
            newState.data = tempData;
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        case types.SUBMISSIONS_PATIENT_LOADING:
            newState.loading = true;
            newState.error = initialState.error;
            return newState;
        case types.UPDATE_SUBMISSIONS_PATIENT_SUCCESS:
        case types.SAVE_SUBMISSIONS_PATIENT_SUCCESS:
            tempData = newState.data === initialState.data ? {} : newState.data;
            let tempDict = {};
            if(tempData[action.meta.uuidPatient].hasOwnProperty(action.meta.surveyUUID)){
                tempDict = tempData[action.meta.uuidPatient][action.meta.surveyUUID];
                if(action.type === types.UPDATE_SUBMISSIONS_PATIENT_SUCCESS){
                    const indexSub = tempDict.submissions.findIndex(sub => sub.id === action.meta.idSubmission);
                    tempDict.submissions[indexSub] = action.submission;
                }
                else{
                    tempDict.submissions.push(action.submission);
                }
                
            }
            else{
                tempDict = {
                    surveyName : action.meta.surveyName,
                    uuid : action.meta.surveyUUID,
                    submissions:[action.submission]
                }
            }
            tempData[action.meta.uuidPatient][action.meta.surveyUUID] = tempDict;                   
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        

        return newState;
        case types.SAVE_SUBMISSIONS_PATIENT_ERROR:
            newState.loading = initialState.loading;
            newState.error = true;
            return newState;
        default:
            return state;
    }
}