import * as types from "../../constants";
import { decryptPatientData } from '../../utils'; 
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
                    //const rawKeyResearcher = await decryptData("U2FsdGVkX1+vRAPd6EOpOTY53I8LLfs9iyX0mGh1Xesn6rwUS4UnTQvqTyWQvu0VeYLHUScUUtM22K8+4zJqZQ==", "Cabezadesherwood2")
                    let tempDecryptedData = decryptPatientData(investigation.patientsPersonalData, investigation);
                    
                    tempInvestigations[investigation.uuid] = tempDecryptedData;
                }
                
            }
            
            newState.data = tempInvestigations;                            
            return newState;
        case types.SAVE_PATIENT_LOADING:
            newState.loading = true;
            newState.error = initialState.error;
            return newState;
        case types.SAVE_PATIENT_SUCCESS:
            let tempDecryptedData = decryptPatientData([action.patient], action.investigation);
            newState.data[action.investigation.uuid].push(tempDecryptedData[0]);

            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        default:
            return state;
    }
}