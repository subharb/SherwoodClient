import * as types from "../../constants";
import {
    fetchRecordsPatientAllSurveysService, postRecordPatientService, updateRecordPatientService,
} from "../../services/sherwoodService";



export function fetchSubmissionsPatientInvestigationAction(uuidInvestigation, uuidPatient) {
    return async (dispatch) => {
      dispatch({ type: types.SUBMISSIONS_LOADING });
  
      return fetchRecordsPatientAllSurveysService(uuidInvestigation, uuidPatient)
        .then((response) => {
          dispatch({
            type: types.FETCH_SUBMISSIONS_PATIENT_SUCCESS,
            surveys: response.surveys,
            meta:{uuidPatient}
          });
        })
        .catch((error) => {
          dispatch({ type: types.FETCH_SUBMISSIONS_PATIENT_ERROR });
          throw error;
        });
    };
}

export function postSubmissionPatientAction(postObj, uuidInvestigation, uuidPatient, surveyUUID, surveyName) {
    return async (dispatch) => {
      dispatch({ type: types.SUBMISSIONS_PATIENT_LOADING });
  
      return postRecordPatientService(postObj, uuidInvestigation, uuidPatient, surveyUUID)
        .then((response) => {
          dispatch({
            type: types.SAVE_SUBMISSIONS_PATIENT_SUCCESS,
            submission: response.submission,
            meta:{uuidPatient, surveyUUID, surveyName}
          });
        })
        .catch((error) => {
          dispatch({ type: types.SAVE_SUBMISSIONS_PATIENT_ERROR });
          throw error;
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
          dispatch({ type: types.SAVE_SUBMISSIONS_PATIENT_ERROR });
          throw error;
        });
    };
}
