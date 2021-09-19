import * as types from "../../constants";

const initialState = {
    loading: false,
    error:false,
    info:null
}

export default function reducer(state = initialState, action){
    
    let newState = { ...state};
    switch(action.type){
        case types.FETCH_PROFILE_SUCCESS:
            newState.info = action.profile;
            newState.loading = false;
            newState.error = false;
            return newState;
        case types.FETCH_PROFILE_LOADING:
            newState.loading = true
            return newState;
        default:
            return state;    
    }

     
}