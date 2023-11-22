import * as types from "../../constants";
import { IInsurance } from "../../constants/types";

interface IState {
    loading: boolean,
    data:IInsurance[] | null


}
const initialState:IState = {
    loading: false,
    data : null
}

export default function reducer(state = initialState, action:{type:string, insurances:IInsurance[]}){
    
    let newState = { ...state};
    let tempState;
    switch(action.type){
        case types.FETCH_INSURANCES_LOADING:
            newState.loading = true;
            return newState;
        case types.FETCH_INSURANCES_SUCCESS:
            newState.data = [...action.insurances];
            newState.loading = false;
            return newState;
       
        case types.AUTH_SIGN_OUT:
            newState = {...initialState};
            return newState;
        default:
            return state;    
    }

     
}