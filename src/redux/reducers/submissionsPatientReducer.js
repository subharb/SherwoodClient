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
        case types.SAVE_SUBMISSIONS_PATIENT_SUCCESS:
            tempData = newState.data === initialState.data ? {} : newState.data;
            let tempDict = {};
            if(tempData[action.meta.uuidPatient].hasOwnProperty(action.meta.surveyUUID)){
                tempDict = tempData[action.meta.uuidPatient][action.meta.surveyUUID];
                tempDict.submissions.push(action.submission);
            }
            else{
                tempDict = {
                    surveyName : action.meta.surveyName,
                    uuid : action.meta.surveyUUID,
                    submissions:[action.submission]
                }
            }
            tempData[action.meta.uuidPatient][action.meta.surveyUUID] = tempDict;
            // tempDict[action.meta.surveyUUID] = tempData[action.meta.uuidPatient].hasOwnProperty(action.meta.surveyUUID) ? tempData[action.meta.uuidPatient][action.meta.surveyUUID] : {};
            // //const indexSurvey = tempData[action.meta.uuidPatient].indexOf(sur=>sur.uuid === action.meta.surveyUUID)
            // tempDict[action.meta.surveyUUID].submissions.push(action.submission)
            // // if(indexSurvey !== -1){
            // //     tempData[action.meta.uuidPatient][indexSurvey]
            // // }
            // // else{
            // //     let survey = {
            // //         surveyName : action.meta.surveyName,
            // //         uuid : action.meta.surveyUUID,
            // //         submissions:[action.submission]
            // //     }
            // //     tempData[action.meta.uuidPatient].push(survey);
            // // }
                    
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        default:
            return state;
    }
}