import * as types from "../../constants";
import {
    addPatient as addPatientService
} from "../../services/sherwoodService";

export function savePatientAction(uuid, patientData) {
  return async (dispatch) => {
    dispatch({ type: types.SAVE_PATIENT_LOADING });

    return addPatientService(uuid, patientData)
      .then((response) => {
        dispatch({
          type: types.SAVE_PATIENT_SUCCESS,
          investigations: response.investigations,
        });
      })
      .catch((error) => {
        dispatch({ type: types.SAVE_PATIENT_ERROR });
        throw error;
      });
  };
}
