import * as types from "../../constants";
import {
    addPatient as addPatientService
} from "../../services/sherwoodService";

export function savePatientAction(investigation, patientData) {
  return async (dispatch) => {
    dispatch({ type: types.SAVE_PATIENT_LOADING });

    return addPatientService(investigation.uuid, patientData)
      .then((response) => {
        dispatch({
          type: types.SAVE_PATIENT_SUCCESS,
          patient: {...response.patient},
          investigation:investigation
        });
      })
      .catch((error) => {
        dispatch({ type: types.SAVE_PATIENT_ERROR });
        throw error;
      });
  };
}
