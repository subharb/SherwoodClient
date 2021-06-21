import * as types from "../../constants";

const initialState = {
    loading: false,
    pendingActions : []
}

export default function reducer(state = initialState, action){
    console.log(action)
    let newState = { ...state};
    switch(action.type){
        case types.UPDATE_RECORDS_LOADING:
            newState.loading = action.loading;
            if(!action.loading){
                newState.pendingActions = [];
            }
            return newState;
        case types.SAVE_PATIENT_OFFLINE:
            const tempPendingActions = [...newState.pendingActions];
            tempPendingActions.push({action : "add_patient"});
            newState.pendingActions = tempPendingActions;

            return newState;
        default:
            return state;    
    }

     
}