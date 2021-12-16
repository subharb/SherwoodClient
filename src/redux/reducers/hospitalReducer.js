import * as types from "../../constants";
import { decryptPatientsData } from '../../utils'; 
/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */

 const initialState = {
    data: {
        researchers:null,
        departments:null,
        stays:null
    },
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
    let allPatientsStays = {};
    switch(action.type){
        case types.FETCH_HOSPITAL_SUCCESS:
            newState.data.researchers = action.researchers;
            newState.data.departments = action.departments;
           
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
        case types.CREATE_BED_WARD_SUCCESS:
            indexDepartment = findIndexDepartment(newState.data.departments, action.uuidDepartment);
            tempDepartments = [...newState.data.departments];
            department = tempDepartments[indexDepartment];
            indexWard = findIndexWard(department, action.uuidWard);

            ward = department.wards[indexWard];
            ward.beds.push(action.bed);

            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error; 
            return newState;
        case types.CREATE_STAY_SUCCESS:
            indexDepartment = findIndexDepartment(newState.data.departments, action.uuidDepartment);
            tempDepartments = [...newState.data.departments];
            department = tempDepartments[indexDepartment];
            indexWard = findIndexWard(department, action.uuidWard);

            ward = department.wards[indexWard];
            bedIndex = ward.beds.findIndex((bed) => bed.id === action.stay.bed.id);
            const tempBedsC = [...ward.beds];
            const tempBedC = {...tempBedsC[bedIndex]};
            tempBedC.stay = {...action.stay};
            tempBedsC[bedIndex] = {...tempBedC};
            ward.beds = [...tempBedsC];
            department.wards[indexWard] = {...ward};

            allPatientsStays = newState.data["stays"] ? newState.data["stays"] : {};
            const patientStays = allPatientsStays.hasOwnProperty(action.stay.patientInvestigation.uuid) ? allPatientsStays[action.stay.patientInvestigation.uuid] : [];
            patientStays.push(action.stay);
            allPatientsStays[action.stay.patientInvestigation.uuid] = [...patientStays];
            newState.data.stay = {...allPatientsStays};
            newState.data.departments = tempDepartments;
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
            const tempBeds = [...ward.beds];

            tempBeds[bedIndex] = {...action.bed};
            ward.beds = tempBeds;
            department.wards[indexWard] = {...ward};

            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error; 
            return newState;
        case types.UPDATE_ORDER_BEDS_SUCCESS:
            indexDepartment = findIndexDepartment(newState.data.departments, action.uuidDepartment);
            tempDepartments = [...newState.data.departments];
            department = tempDepartments[indexDepartment];
            indexWard = findIndexWard(department, action.uuidWard);

            ward = department.wards[indexWard];
            ward.beds = [...action.beds];
            department.wards[indexWard] = {...ward};

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
        case types.FETCH_PATIENT_STAYS:
            
            if(newState.data.stays){
                allPatientsStays = newState.data.stays;
            }
            allPatientsStays[action.uuidPatient] = [...action.stays];
            newState.data["stays"] = {...allPatientsStays};

            newState.loading = true;   
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