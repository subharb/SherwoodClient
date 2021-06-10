import * as types from "../../constants";

const initialState = {
    loading: false,
}

export default function reducer(state = initialState, action){
    console.log(action)
    let newState = { ...state};
    switch(action.type){
        case types.UPDATE_RECORDS_LOADING:
            newState.loading = action.loading;
            return newState;
        default:
            return state;    
    }

     
}