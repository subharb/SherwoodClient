import LOGIN_USER from '../actions/types';

export default function(state = null, action){
    console.log(action)
    switch(action.type){
        case LOGIN_USER:
            if(action.payload.status === 200){
                return action.payload.researcher;
            }
            else{
                return false;
            }

        default:
            return state;
    }
}