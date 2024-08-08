import * as types from "../../constants";
import { doesDBPatientsExist, doesInvestigationPatientsStoreExist, getAllPatients, initDB, savePatientData } from "../../db";
import { decryptPatientsData, decryptSinglePatientData } from '../../utils/index.jsx'; 
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
export default async function reducer(state = initialState, action){
    let patientsData = null;
    let newState = { ...state};
    let tempInvestigations;
    switch(action.type){
        case types.FETCH_NEW_PATIENTS_SUCCESS:
            let tempPatients = newState.data[action.investigation.uuid] ? [...newState.data[action.investigation.uuid]] : [];
            
            for(const patient of action.patients){
                patient.personalData = patient.personalData ? decryptSinglePatientData(patient.personalData, action.investigation) : null;
                tempPatients.push(patient);
            }
            newState.data[action.investigation.uuid] = tempPatients;
            newState.loading = initialState.loading;
            newState.error = initialState.error;                         
            return newState;
        case types.FETCH_INVESTIGATIONS_SUCCESS:
            //Desencripto los datos de los pacientes
            tempInvestigations = {};
            for(const investigation of action.investigations){
                
                let tempDecryptedData = [];
                console.log(investigation.name);
                if(await doesInvestigationPatientsStoreExist()){
                    tempInvestigations[investigation.uuid] = await getAllPatients();
                }
                else{
                    await initDB(investigation.uuid);
                    for(const patient of investigation.patientsPersonalData){
                        console.log(patient);
                        patient.personalData = patient.personalData ? decryptSinglePatientData(patient.personalData, investigation) : null;
                        tempDecryptedData.push(patient);
                        await savePatientData(patient);
                    }
                }
                tempInvestigations[investigation.uuid] = await getAllPatients();   
            }
            newState.data = tempInvestigations;                            
            return newState;
        case types.SAVE_PATIENT_LOADING:
            newState.loading = true;
            newState.error = initialState.error;
            return newState;
        case types.SUBMISSIONS_PATIENT_RESET_ERROR:
            newState.error = initialState.error;
            return newState;
        case types.UPDATE_PATIENT_OFFLINE:
        case types.UPDATE_PATIENT_SUCCESS:    
        case types.SAVE_PATIENT_OFFLINE:
        case types.SAVE_PATIENT_SUCCESS:
            let newPatient = {...action.patient};
            console.log(action.patient);
            patientsData = {...newState.data};
            newPatient.personalData = action.patient.personalData ? decryptSinglePatientData(action.patient.personalData, action.investigation) : null;
            if([types.UPDATE_PATIENT_SUCCESS, types.UPDATE_PATIENT_OFFLINE].includes(action.type)){
                const indexPat = newState.data[action.investigation.uuid].findIndex(pat => pat.uuid === action.uuidPatient);
                patientsData[action.investigation.uuid][indexPat] = newPatient;
            }
            else{
                //Para los pacientes metido en offline
                if(!newPatient.id){
                    const maxiId =  patientsData[action.investigation.uuid].sort((a,b)=>b.id-a.id)[0].id;
                    newPatient.id = maxiId +1;
                }
                patientsData[action.investigation.uuid].push(newPatient);
            }

            newState.loading = initialState.loading;
            newState.error = initialState.error;
            newState.data = patientsData;
            if([types.SAVE_PATIENT_OFFLINE, types.UPDATE_PATIENT_OFFLINE].includes(action.type)){
                newState.error = 2;//Saved but offline
            }
            else{
                newState.error = initialState.error;
            }
            
            return newState;
            case types.INITIALIZE_PATIENTS:
                newState.data = {};
                newState.data[action.payload.uuidInvestigation] = action.payload.patients
                
                return newState;
            case types.AUTH_SIGN_OUT:
                newState = {...initialState};
                return newState;
        default:
            return state;
    }
}