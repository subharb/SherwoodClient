import * as types from "../../constants";
import {
    fetchRecordsPatientAllSurveysService, postRecordPatientService
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

export function postSubmissionPatientAction(postObj, uuidInvestigation, uuidPatient, surveyUUID) {
    return async (dispatch) => {
      dispatch({ type: types.SUBMISSIONS_PATIENT_LOADING });
  
      return postRecordPatientService(postObj, uuidInvestigation, uuidPatient, surveyUUID)
        .then((response) => {
          dispatch({
            type: types.SAVE_SUBMISSIONS_PATIENT_SUCCESS,
            submission: response.submission,
            meta:{uuidPatient, surveyUUID}
          });
        })
        .catch((error) => {
          dispatch({ type: types.SAVE_SUBMISSIONS_PATIENT_ERROR });
          throw error;
        });
    };
}

