import * as types from "../../constants";
import { decryptPatientData } from '../../utils'; 
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
            newState = action.investigations;                            
            return newState;
        default:
            return state;
    }
}