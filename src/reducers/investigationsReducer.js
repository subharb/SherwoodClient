import { FETCH_INVESTIGATION } from '../actions/types';
/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */
export default function(state = false, action){
    console.log(action)
    let newState = { ...state};
    switch(action.type){
        case FETCH_INVESTIGATION:
            if(action.payload.status === 200){
                newState[action.meta] = action.payload.data.investigation;               
            } 
            return newState;
        default:
            return state;
    }
}