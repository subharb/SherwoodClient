import * as types from "../../constants";
import { decryptData } from '../../utils';
/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */

 
export default function reducer(state = [], action){
    console.log(action)
    let newState = { ...state};
    switch(action.type){
        case types.FETCH_INVESTIGATIONS_SUCCESS:
            //Desencripto los datos de los pacientes
            let tempInvestigations = [];
            for(const investigation of action.investigations){
                if(investigation.patientsPersonalData.length !== 0){
                    //const rawKeyResearcher = await decryptData("U2FsdGVkX1+vRAPd6EOpOTY53I8LLfs9iyX0mGh1Xesn6rwUS4UnTQvqTyWQvu0VeYLHUScUUtM22K8+4zJqZQ==", "Cabezadesherwood2")
                    let tempDecryptedData = [];
                    for(const patient of investigation.patientsPersonalData){
                        let encryptedFields = {};
                        if(investigation.permissions !== 0){
                            const rawKeyResearcher = investigation.encryptedKeyUsed === 0 ? process.env.REACT_APP_DEFAULT_RESEARCH_PASSWORD : localStorage.getItem("rawKeyResearcher");
                            
                            const keyInvestigation = decryptData(investigation.keyResearcherInvestigation, rawKeyResearcher);
                            
                            for(const personalField of investigation.personalFields){
                                const encryptedField = patient.personalData[personalField];
                                if(!encryptedField){
                                    console.error("No coinciden campos!");
                                    return "error!";
                                }
                                const decryptedField = decryptData(encryptedField, keyInvestigation);
                                encryptedFields[personalField] = decryptedField; 
                            }
                        }
                        
                        tempDecryptedData.push({id:patient.id, personalData:encryptedFields});
                    }
                    
                    investigation.patientsPersonalData = tempDecryptedData;
                    tempInvestigations.push(investigation);
                }
            }
            
            newState = tempInvestigations;                            
            return newState;
        default:
            return state;
    }
}