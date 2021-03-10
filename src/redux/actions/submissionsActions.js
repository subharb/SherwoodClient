import * as types from "../../constants";
import {
    postRecordPatient as postRecordPatientService, fetchSubmissionsAllPatientsFromSurveyService
} from "../../services/sherwoodService";

export function saveSubmissionAction(postObj, uuidInvestigation, patientId, surveyUUID) {
  return async (dispatch) => {
    dispatch({ type: types.SAVE_SUBMISSION_LOADING });

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

export function fetchSubmissionsSurveyAction(uuidInvestigation, surveyUUID) {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_SUBMISSIONS_LOADING });
  
      return fetchSubmissionsAllPatientsFromSurveyService(uuidInvestigation, surveyUUID)
        .then((response) => {
          dispatch({
            type: types.FETCH_SUBMISSIONS_SUCCESS,
            submissions: response.submissions,
            meta:{surveyUUID}
          });
        })
        .catch((error) => {
          dispatch({ type: types.FETCH_SUBMISSIONS_ERROR });
          throw error;
        });
    };
  }
