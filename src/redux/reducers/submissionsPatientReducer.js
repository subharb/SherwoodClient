import _ from "lodash";
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
    error: null,
    nUpdatedRegisters : 0
}

 
export default function reducer(state = initialState, action){
    
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
        case types.UPDATE_SUBMISSIONS_PATIENT_OFFLINE:
        case types.SAVE_SUBMISSIONS_PATIENT_OFFLINE:
        case types.SAVE_SUBMISSIONS_PATIENT_SUCCESS:
            tempData = newState.data === initialState.data ? {} : newState.data;
            let tempDict = {};
            let tempSubmissions = [];
            //Si se genera en offline, no hay id
            if( _.isEmpty(tempData) || !tempData[action.meta.uuidPatient]){
                
                tempDict = {};
                tempDict[action.meta.surveyUUID] = {};
                tempDict[action.meta.surveyUUID]["submissions"] = [action.submission];
                tempData[action.meta.uuidPatient] = tempDict;

                newState.data = tempData;
                newState.loading = initialState.loading;
                newState.error = initialState.error;
                return newState;
            }
            else if(tempData[action.meta.uuidPatient].hasOwnProperty(action.meta.surveyUUID)){
                tempDict = {...tempData[action.meta.uuidPatient][action.meta.surveyUUID]};
                tempSubmissions = [...tempDict.submissions];
                if([types.UPDATE_SUBMISSIONS_PATIENT_OFFLINE, types.UPDATE_SUBMISSIONS_PATIENT_SUCCESS].includes(action.type)){
                    const indexSub = tempDict.submissions.findIndex(sub => sub.id === action.meta.idSubmission);
                    tempSubmissions[indexSub] = action.submission;
                }
                else{
                    if(!action.submission.id){
                        action.submission.id =  Math.floor(Math.random() * 10000);
                        action.submission.offline = true;
                    }
                    if(action.meta.oldIdSubmission){
                        const indexOldSub = tempSubmissions.findIndex((sub) => {
                            return sub.id === action.meta.oldIdSubmission
                        })
                        if(indexOldSub !== -1){
                            tempSubmissions.splice(indexOldSub, 1)
                        }
                    }
                    tempSubmissions.push(action.submission);
                }
            }
            else{
                if(!action.submission.id){
                    action.submission.id = Math.floor(Math.random() * 10000 );
                    action.submission.offline = true;
                }
                tempDict = {
                    surveyName : action.meta.surveyName,
                    uuid : action.meta.surveyUUID,
                    type : action.meta.surveyType,
                }
                tempSubmissions.push(action.submission);
            }
            tempDict.submissions = tempSubmissions; 
            
            tempData[action.meta.uuidPatient][action.meta.surveyUUID] = tempDict;                   
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            if([types.SAVE_SUBMISSIONS_PATIENT_OFFLINE, types.UPDATE_SUBMISSIONS_PATIENT_OFFLINE].includes(action.type)){
                newState.error = 2;//Offline
            }
            else{
                newState.error = initialState.error;
            }
            
            newState.nUpdatedRegisters++ 
            
            return newState;

        case types.SAVE_SUBMISSIONS_PATIENT_ERROR:
            newState.loading = initialState.loading;
            newState.error = true;
            return newState;
        case types.SUBMISSIONS_PATIENT_RESET_ERROR:
            newState.error = initialState.error;
            return newState;
        case types.AUTH_SIGN_OUT:
            newState = {...initialState};
            return newState;
        default:
            return state;
    }
}