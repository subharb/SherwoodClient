import * as types from "../../constants";
import { getAllPatientsInvestigation, saveListPatients, savePatient } from "../../db";
import {
    addPatient as addPatientService, updatePersonalDataPatientService, getPatientsFromId,
} from "../../services";

export function savePatientAction(investigation, patientData) {
  //Añado un uuid por si falla la conexión tener una referencia de este paciente
  //Para también usarlo en el reenvio.
  patientData.uuid = Math.random().toString(36).substring(2); 
  return async (dispatch) => {
    dispatch({ type: types.SAVE_PATIENT_LOADING });

    return addPatientService(investigation.uuid, patientData)
        .then(async (response) => {
            await saveListPatients([response.patient], investigation);
            const updatedListPatients = await getAllPatientsInvestigation(investigation.uuid);
            investigation.patientsPersonalData = updatedListPatients;
            dispatch({
                type: types.SAVE_PATIENT_SUCCESS,
                patient: {...response.patient},
                investigation:investigation
            });
      })
      .catch((error) => {
        if(!error.status && !error.response){
          const offlinePost = patientData;          
          dispatch({
            type: types.SAVE_PATIENT_OFFLINE,
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

export function updatePatientsFromId(investigation, idPatient) {
 
  return async (dispatch) => {
    dispatch({ type: types.SAVE_PATIENT_LOADING });

    return getPatientsFromId(investigation.uuid, idPatient)
        .then(async (response) => {
            await saveListPatients(response.patients, investigation);
            const updatedListPatients = await getAllPatientsInvestigation(investigation.uuid);
            investigation.patientsPersonalData = updatedListPatients;
            dispatch({
                type: types.FETCH_NEW_PATIENTS_SUCCESS,
                patients: [...response.patients],
                investigation: investigation
            });
      })
      .catch((error) => {
        if(!error.status && !error.response){
                  
          dispatch({
            type: types.FETCH_NEW_PATIENTS_SUCCESS,
            investigation:{investigation:{investigation:{patientsPersonalData:[]}}},
            patients: [],
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
          if(!error.status && !error.response){
            const offlinePost = patientData;  
            offlinePost.uuid = uuidPatient;
            dispatch({
                type: types.UPDATE_PATIENT_OFFLINE,
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

