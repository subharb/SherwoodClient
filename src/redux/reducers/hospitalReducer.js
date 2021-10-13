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
 
function findIndexDepartment(departments, uuidDepartment){
    let tempDepartments = [...departments];
    const indexDepartment = tempDepartments.findIndex(dep => dep.uuid === uuidDepartment);

    return indexDepartment;
    
}

function findIndexWard(department, uuidWard){
    const indexWard = department.wards.findIndex(ward => ward.uuid === uuidWard);
    return indexWard;
}
export default function reducer(state = initialState, action){
    
    let newState = { ...state};
    let tempDepartments;
    let indexDepartment;
    let department;
    let indexWard;
    let ward;
    let bedIndex;
    switch(action.type){
        case types.FETCH_HOSPITAL_SUCCESS:
            newState.data = {
                researchers : action.researchers,
                departments : action.departments
            };    
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.SAVE_DEPARTMENT_SUCCESS:
            tempDepartments = [...newState.data.departments];
            tempDepartments.push(action.department);

            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.SAVE_WARD_SUCCESS:
            tempDepartments = [...newState.data.departments];
            indexDepartment = tempDepartments.findIndex(dep => dep.uuid === action.uuidDepartment);
            if(indexDepartment !== -1){
                indexWard = tempDepartments[indexDepartment].wards.findIndex(ward => ward.uuid === action.ward.uuid);
                if(indexWard !== -1){
                    tempDepartments[indexDepartment].wards[indexWard] = action.ward;
                }
                else{
                    tempDepartments[indexDepartment].wards.push(action.ward);
                }
                
            }
            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.ASSIGN_RESEARCHER_DEPARTMENT_SUCCESS:
            const indexResearcher = newState.data.researchers.findIndex(res => res.uuid === action.uuidResearcher);
            if(indexResearcher !== -1){
                newState.data.researchers[indexResearcher].departments = action.departments;
            }
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;  
        case types.UPDATE_BED_WARD_SUCCESS:
            indexDepartment = findIndexDepartment(newState.data.departments, action.uuidDepartment);
            tempDepartments = [...newState.data.departments];
            department = tempDepartments[indexDepartment];
            indexWard = findIndexWard(department, action.uuidWard);

            ward = department.wards[indexWard];
            bedIndex = ward.beds.findIndex((bed) => bed.id === action.bed.id);
            ward.beds[bedIndex] = action.bed;

            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error; 
            return newState;
        case types.DELETE_BED_WARD_SUCCESS:
            indexDepartment = findIndexDepartment(newState.data.departments, action.uuidDepartment);
            tempDepartments = [...newState.data.departments];
            department = tempDepartments[indexDepartment];
            indexWard = findIndexWard(department, action.uuidWard);

            ward = department.wards[indexWard];
            ward.beds = action.beds;
            

            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error; 
            return newState;
        case types.DELETE_WARD_SUCCESS:
            tempDepartments = [...newState.data.departments];
            indexDepartment = tempDepartments.findIndex(dep => dep.uuid === action.uuidDepartment);
            if(indexDepartment !== -1){
                tempDepartments[indexDepartment].wards = action.wards;
            }
            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error; 
            return newState;  
        case types.FETCH_HOSPITAL_LOADING:
            newState.loading = true;   
            newState.error = initialState.error;                           
            return newState;
        case types.HOSPITAL_ERROR:
            newState.loading = initialState.loading;   
            newState.error = action.errorCode;                           
            return newState;
        case types.HOSPITAL_RESET_ERROR:
            newState.error = initialState.error;
            return newState;
        default:
            return state;
    }
}