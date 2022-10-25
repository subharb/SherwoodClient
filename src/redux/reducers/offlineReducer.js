import * as types from "../../constants";

const initialState = {
    loading: false,
    pendingActions : []
}

export default function reducer(state = initialState, action){
    
    let newState = { ...state};
    let tempPendingActions;
    switch(action.type){
        case types.UPDATE_RECORDS_LOADING:
            newState.loading = action.loading;
            if(!action.loading){
                newState.pendingActions = [];
            }
            return newState;
        case types.UPDATE_PATIENT_OFFLINE:
        case types.SAVE_PATIENT_OFFLINE:
            tempPendingActions = [...newState.pendingActions];
            tempPendingActions.push({action : "patient"});
            newState.pendingActions = tempPendingActions;

            return newState;
        case types.SAVE_SUBMISSIONS_PATIENT_OFFLINE:
            tempPendingActions = [...newState.pendingActions];
            tempPendingActions.push({action : "submission"});
            newState.pendingActions = tempPendingActions;
            return newState;
        case types.RESET_OFFLINE_NOTIFICATIONS:
            return initialState;
        default:
            return state;    
    }

     
}