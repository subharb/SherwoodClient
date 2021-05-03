import * as types from "../../constants";
import { decryptPatientsData, decryptSinglePatientData } from '../../utils'; 
/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */

 const initialState = {
    data: null,
    loading: false,
    error: null
}
export default function reducer(state = initialState, action){
    console.log(action)
    let newState = { ...state};
    switch(action.type){
        case types.FETCH_INVESTIGATIONS_SUCCESS:
            //Desencripto los datos de los pacientes
            let tempInvestigations = {};
            for(const investigation of action.investigations){
                if(investigation.patientsPersonalData.length !== 0){
                    let tempDecryptedData = [];
                    for(const patient of investigation.patientsPersonalData){
                        patient.personalData = decryptSinglePatientData(patient.personalData, investigation);
                        tempDecryptedData.push(patient);
                    }
                    tempInvestigations[investigation.uuid] = tempDecryptedData;
                }
            }
            newState.data = tempInvestigations;                            
            return newState;
        case types.SAVE_PATIENT_LOADING:
            newState.loading = true;
            newState.error = initialState.error;
            return newState;
        case types.UPDATE_PATIENT_SUCCESS:    
        case types.SAVE_PATIENT_SUCCESS:
            let newPatient = {...action.patient};
            newPatient.personalData = decryptSinglePatientData(action.patient.personalData, action.investigation);
            if(action.type === types.UPDATE_PATIENT_SUCCESS){
                const indexPat = newState.data[action.investigation.uuid].findIndex(pat => pat.uuid === action.uuidPatient);
                newState.data[action.investigation.uuid][indexPat] = newPatient;
            }
            else{
                newState.data[action.investigation.uuid].push(newPatient);
            }

            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        default:
            return state;
    }
}