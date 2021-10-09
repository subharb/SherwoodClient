import * as types from "../../constants";
import { decryptPatientsData } from '../../utils'; 
/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */

 const initialState = {
    data: null,
    loading: false,
    error: null
}
 
export default function reducer(state = initialState, action){
    
    let newState = { ...state};
    let tempDepartments;
    let indexDepartment;
    switch(action.type){
        case types.FETCH_HOSPITAL_SUCCESS:
            newState.data = {
                researchers : action.researchers,
                departments : action.departments
            };    
            newState.loading = false; 
            newState.error = null;   
            return newState;
        case types.SAVE_DEPARTMENT_SUCCESS:
            newState.data.departments.push(action.department);
            newState.loading = false; 
            newState.error = null;   
            return newState;
        case types.SAVE_WARD_SUCCESS:
            tempDepartments = [...newState.data.departments];
            indexDepartment = tempDepartments.findIndex(dep => dep.uuid === action.uuidDepartment);
            if(indexDepartment !== -1){
                const indexWard = tempDepartments[indexDepartment].wards.findIndex(ward => ward.uuid === action.ward.uuid);
                if(indexWard !== -1){
                    tempDepartments[indexDepartment].wards[indexWard] = action.ward;
                }
                else{
                    tempDepartments[indexDepartment].wards.push(action.ward);
                }
                
            }
            newState.data.departments = tempDepartments;
            newState.loading = false; 
            newState.error = null;   
            return newState;
        case types.ASSIGN_RESEARCHER_DEPARTMENT_SUCCESS:
            const indexResearcher = newState.data.researchers.findIndex(res => res.uuid === action.uuidResearcher);
            if(indexResearcher !== -1){
                newState.data.researchers[indexResearcher].departments = action.departments;
            }
            newState.loading = false; 
            newState.error = null;   
            return newState;  
        case types.DELETE_WARD_SUCCESS:
            tempDepartments = [...newState.data.departments];
            indexDepartment = tempDepartments.findIndex(dep => dep.uuid === action.uuidDepartment);
            if(indexDepartment !== -1){
                tempDepartments[indexDepartment].wards = action.wards;
            }
            newState.data.departments = tempDepartments;
            newState.loading = false; 
            newState.error = null; 
            return newState;  
        case types.FETCH_HOSPITAL_LOADING:
            newState.loading = true;   
            newState.error = null;                           
            return newState;
        case types.HOSPITAL_ERROR:
            newState.loading = false;   
            newState.error = true;                           
            return newState;
        case types.HOSPITAL_RESET_ERROR:
            newState.error = initialState.error;
            return newState;
        default:
            return state;
    }
}