import * as types from "../../constants";
import {
    addPatient as addPatientService, updatePersonalDataPatientService,
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
        if(!error.response){
          const offlinePost = patientData;
          //offlinePost.surveyRecords = postObj.submission[0].answers;
          offlinePost.uuid = Math.random().toString(36).substring(2); 
          dispatch({
            type: types.SAVE_PATIENT_SUCCESS,
            patient: {...offlinePost},
            investigation:investigation
          });
        }
        else{
          dispatch({ type: types.SAVE_PATIENT_ERROR });
          throw error;
        }
        
       
      });
  };
}

export function updatePatientAction(investigation, uuidPatient, patientData) {
    return async (dispatch) => {
      dispatch({ type: types.SAVE_PATIENT_LOADING });
  
      return updatePersonalDataPatientService(investigation.uuid, uuidPatient, patientData)
        .then((response) => {
          dispatch({
            type: types.UPDATE_PATIENT_SUCCESS,
            patient: {...response.patient},
            uuidPatient:uuidPatient,
            investigation:investigation
          });
        })
        .catch((error) => {
          if(!error.response){
            const offlinePost = patientData.personalData;
            //offlinePost.surveyRecords = postObj.submission[0].answers;
            offlinePost.uuid = Math.random().toString(36).substring(2); 
            dispatch({
              type: types.UPDATE_PATIENT_SUCCESS,
              patient: {...offlinePost},
              uuidPatient:uuidPatient,
            investigation:investigation
            });
          }
          else{
            dispatch({ type: types.SAVE_PATIENT_ERROR });
            throw error;
          }
          
          
        });
    };
  }

