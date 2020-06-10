import { LOADING } from '../actions/types';
/**
 * Loading reducer, it shows the loading screen. It's a reducer so it can be called from any component
 * @constructor
 * @param {boolean} state 
 */
export default function(state = false, action){
    console.log(action)
    
    switch(action.type){
        case LOADING:
            return !state;

        default:
            return state;
    }
}