import * as types from "../../constants";
import {
    fetchRecordsPatientAllSurveysService, postRecordPatientService, updateRecordPatientService, fetchRecordsSurveysService
} from "../../services";



export function fetchSubmissionsPatientInvestigationAction(uuidInvestigation, uuidPatient) {
    return async (dispatch) => {
      dispatch({ type: types.SUBMISSIONS_PATIENT_LOADING });
  
      return fetchRecordsPatientAllSurveysService(uuidInvestigation, uuidPatient)
        .then((response) => {
          dispatch({
            type: types.FETCH_SUBMISSIONS_PATIENT_SUCCESS,
            surveys: response.surveys,
            meta:{uuidPatient}
          });
        })
        .catch((error) => {
          if(!error.response){
            dispatch({
              type: types.FETCH_SUBMISSIONS_PATIENT_SUCCESS,
              surveys: [],
              meta:{uuidPatient}
            });
          }
          else{
              dispatch({ type: types.FETCH_SUBMISSIONS_PATIENT_ERROR });
              throw error;
          }
          
        });
    };
}

export function postSubmissionPatientAction(postObj, uuidInvestigation, uuidPatient, surveyUUID, surveyName, surveyType, oldIdSubmission) {
    return async (dispatch) => {
      dispatch({ type: types.SUBMISSIONS_PATIENT_LOADING });
  
      return postRecordPatientService(postObj, uuidInvestigation, uuidPatient, surveyUUID)
        .then((response) => {
          dispatch({
            type: types.SAVE_SUBMISSIONS_PATIENT_SUCCESS,
            submission: response.submission,
            meta:{uuidPatient, surveyUUID, surveyName, surveyType, oldIdSubmission}
          });
        })
        .catch(function (error) {
          if(!error.status && !error.response){
                const offlinePost = postObj;
                //offlinePost.surveyRecords = postObj.submission[0].answers;
                dispatch({
                  type: types.SAVE_SUBMISSIONS_PATIENT_OFFLINE,
                  submission: offlinePost,
                  meta:{uuidPatient, surveyUUID, surveyName, surveyType}
                });
          }
          else{
            dispatch({ type: types.SAVE_SUBMISSIONS_PATIENT_ERROR });
            throw error;  
          }
          
        });
    };
}

export function updateSubmissionPatientAction(postObj, uuidInvestigation, uuidPatient, surveyUUID, surveyName, idSubmission) {
    return async (dispatch) => {
      dispatch({ type: types.SUBMISSIONS_PATIENT_LOADING });
  
      return updateRecordPatientService(postObj, uuidInvestigation, uuidPatient, surveyUUID, idSubmission)
        .then((response) => {
          dispatch({
            type: types.UPDATE_SUBMISSIONS_PATIENT_SUCCESS,
            submission: response.submission,
            meta:{uuidPatient, surveyUUID, surveyName, idSubmission}
          });
        })
        .catch((error) => {
          
          if(!error.status && !error.response){
            const offlinePost = postObj;
            //offlinePost.surveyRecords = postObj.submission[0].answers;
            dispatch({
              type: types.UPDATE_SUBMISSIONS_PATIENT_OFFLINE,
              submission: offlinePost,
              meta:{uuidPatient, surveyUUID, surveyName, idSubmission}
                  });
            }
            else{
              dispatch({ type: types.SAVE_SUBMISSIONS_PATIENT_ERROR });
              throw error;  
            }
         
        });
    };
}

export function resendOfflineRecords(offlineRecords, uuidInvestigation){
    return async (dispatch) => {
        let hasSentRecords = false;
        Object.keys(offlineRecords.data).forEach((uuidPatient) => {
            const surveysOffline = offlineRecords.data[uuidPatient]
            Object.keys(surveysOffline).forEach((uuidSurvey) => {
                const records = surveysOffline[uuidSurvey]; 
                records.submissions.forEach(async(submission) => { 
                    if(submission.offline){
                        await dispatch( postSubmissionPatientAction(submission, uuidInvestigation, uuidPatient, uuidSurvey, records.surveyName, records.type, submission.id));
                        dispatch({ type: types.RESET_OFFLINE_NOTIFICATIONS});
                    }
                })
                
            })
        })
        if(hasSentRecords){
            
        }
    }
}

export function resetPatientsSubmissionsError() {
  return async (dispatch) => {
    dispatch({ type: types.SUBMISSIONS_PATIENT_RESET_ERROR});

  };
}