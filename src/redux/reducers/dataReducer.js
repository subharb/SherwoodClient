import * as types from "../../constants";

const initialState = {
    totalData: 0,
    date:new Date()
}

export default function reducer(state = initialState, action){
    
    let newState = { ...state};
    switch(action.type){
        case types.UPDATE_TOTAL_DATA:
            if(newState.date.toDateString() === action.date.toDateString()){
                newState.totalData =+ action.totalData;
            }
            else{
                newState.date = new Date();
                newState.totalData = action.totalData;
            }
            return newState;
        default:
            return state;    
    }

     
}