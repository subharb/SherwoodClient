import * as types from "../../constants";
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
export default function reducer(state = initialState, action){
    let patientsData = null;
    let newState = { ...state};
    let tempInvestigations;
    switch(action.type){
        case types.FETCH_NEW_PATIENTS_SUCCESS:
            tempInvestigations = {...newState.data};
            tempInvestigations[action.investigation.uuid] = action.investigation.patientsPersonalData;
            newState.data = tempInvestigations;
            newState.loading = initialState.loading;
            newState.error = initialState.error;                         
            return newState;
        case types.FETCH_INVESTIGATIONS_SUCCESS:
            //Desencripto los datos de los pacientes
            tempInvestigations = {};
            for(const investigation of action.investigations){
                tempInvestigations[investigation.uuid] = investigation.patientsPersonalData;
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
            tempInvestigations = {...newState.data};
            tempInvestigations[action.investigation.uuid] = action.investigation.patientsPersonalData;
            newState.data = tempInvestigations;
            newState.loading = initialState.loading;
            newState.error = initialState.error; 
           
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