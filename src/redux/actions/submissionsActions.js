import * as types from "../../constants";
import {
    postRecordPatientService, fetchSubmissionsAllPatientsInvestigationService
} from "../../services/sherwoodService";

export function saveSubmissionAction(postObj, uuidInvestigation, patientId, surveyUUID) {
  return async (dispatch) => {
    dispatch({ type: types.SUBMISSIONS_LOADING });

    return postRecordPatientService(postObj, uuidInvestigation, patientId, surveyUUID)
      .then((response) => {
        dispatch({
          type: types.SAVE_SUBMISSION_SUCCESS,
          investigations: response.investigations,
        });
      })
      .catch((error) => {
        dispatch({ type: types.SAVE_SUBMISSION_ERROR });
        throw error;
      });
  };
}

export function fetchSubmissionsInvestigationAction(uuidInvestigation, ) {
    return async (dispatch) => {
      dispatch({ type: types.SUBMISSIONS_LOADING });
  
      return fetchSubmissionsAllPatientsInvestigationService(uuidInvestigation)
        .then((response) => {
          dispatch({
            type: types.FETCH_SUBMISSIONS_SUCCESS,
            surveys: response.surveys,
            meta:{uuidInvestigation}
          });
        })
        .catch((error) => {
          dispatch({ type: types.FETCH_SUBMISSIONS_ERROR });
          throw error;
        });
    };
  }