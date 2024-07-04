import { te } from "date-fns/locale";
import * as types from "../../constants";

/**
 * Reducer that saves all the investigations loaded
 * @constructor
 * @param {boolean} state 
 */

 const initialState = {
    data: {
        researchers:null,
        departments:null,
        agendas:null,
        //appointments:null,
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
    let indexUnit;
    let ward;
    let bedIndex;
    let tempAgendas;
    let allPatientsStays = {};
    switch(action.type){
        case types.FETCH_HOSPITAL_SUCCESS:
            newState.data.researchers = action.researchers;
            newState.data.departments = action.departments;
           
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.FETCH_HOSPITAL_AGENDAS_SUCCESS:
            newState.data.agendas = action.agendas;
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        case types.FETCH_HOSPITAL_SAVE_UPDATE_AGENDA_SUCCESS:
            if(!newState.data.agendas){
                tempAgendas = [];
            }
            else{
                tempAgendas = [...newState.data.agendas];
            }
            const findIndex = tempAgendas.findIndex(agenda => agenda.uuid === action.agenda.uuid);
            if(findIndex !== -1){
                tempAgendas[findIndex] = action.agenda;
            }
            else{
                tempAgendas.push(action.agenda);
            }
            newState.data.agendas = tempAgendas;
            newState.loading = initialState.loading;
            newState.error = initialState.error;
            return newState;
        case types.FETCH_HOSPITAL_DELETE_AGENDA_SUCCESS:
            tempAgendas = [...newState.data.agendas];
            const indexAgenda = tempAgendas.findIndex(agenda => agenda.uuid === action.uuidAgenda);
            if(indexAgenda !== -1){
                tempAgendas.splice(indexAgenda, 1);
            }
            newState.data.agendas = tempAgendas;
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
        case types.EDIT_DEPARTMENT_SUCCESS:
            tempDepartments = [...newState.data.departments];
            indexDepartment = tempDepartments.findIndex(dep => dep.uuid === action.department.uuid);
            if(indexDepartment !== -1){
                tempDepartments[indexDepartment] = action.department;
            }
            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.DELETE_DEPARTMENT_SUCCESS:
            tempDepartments = [...newState.data.departments];
            const indexDeleteDepartement = tempDepartments.findIndex(dep => dep.uuid === action.department.uuid);
            if(indexDeleteDepartement !== -1){
                tempDepartments.splice(indexDeleteDepartement, 1);
            }
            
            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;
        case types.DELETE_UNIT_SUCCESS:
            tempDepartments = [...newState.data.departments];
            for(let i = 0;i < tempDepartments.length;i++){
                const indexDeleteUnit = tempDepartments[i].units.findIndex(unit => unit.uuid === action.uuidUnit);
                if(indexDeleteUnit !== -1){
                    tempDepartments[i].units.splice(indexDeleteUnit, 1);
                }
            }
            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState;

        case types.SAVE_UNIT_SUCCESS:
            tempDepartments = [...newState.data.departments];
            indexDepartment = tempDepartments.findIndex(dep => dep.uuid === action.unit.department.uuid);
            if(indexDepartment !== -1){
                indexUnit = tempDepartments[indexDepartment].units.findIndex(unit => unit.uuid === action.unit.uuid);
                if(indexUnit !== -1){
                    tempDepartments[indexDepartment].units[indexUnit] = action.unit;
                }
                else{
                    tempDepartments[indexDepartment].units.push(action.unit);
                }
                
            }
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
        case types.ASSIGN_RESEARCHER_UNIT_SUCCESS:
            const indexResearcher = newState.data.researchers.findIndex(res => res.uuid === action.uuidResearcher);
            const copyResearchers = [...newState.data.researchers];
            if(indexResearcher !== -1){
                copyResearchers[indexResearcher].units = [...action.units];
            }
            newState.data.researchers = [...copyResearchers];
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState; 
        case types.REMOVE_RESEARCHER_UNIT_SUCCESS:
            const indexResearcherRem = newState.data.researchers.findIndex(res => res.uuid === action.uuidResearcher);
            const copyResearchersRem = [...newState.data.researchers];
            if(indexResearcherRem !== -1){
                copyResearchersRem[indexResearcherRem].units = [...action.units];
            }
            newState.data.researchers = [...copyResearchersRem];
            newState.loading = initialState.loading; 
            newState.error = initialState.error;   
            return newState; 
        case types.CREATE_BED_WARD_SUCCESS:
            indexDepartment = findIndexDepartment(newState.data.departments, action.uuidDepartment);
            tempDepartments = [...newState.data.departments];
            department = tempDepartments[indexDepartment];
            indexWard = findIndexWard(department, action.uuidWard);

            ward = department.wards[indexWard];
            let wardBeds = [...ward.beds];
            wardBeds.push(action.bed);
            ward.beds = [...wardBeds];

            newState.data.departments = [...tempDepartments];
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
            tempBedC.stays = [{...action.stay}];
            tempBedsC[bedIndex] = {...tempBedC};
            ward.beds = [...tempBedsC];
            department.wards[indexWard] = {...ward};

            allPatientsStays = newState.data["stays"] ? newState.data["stays"] : {};
            const patientStays = allPatientsStays.hasOwnProperty(action.stay.patientInvestigation.uuid) ? allPatientsStays[action.stay.patientInvestigation.uuid] : [];
            patientStays.push(action.stay);
            allPatientsStays[action.stay.patientInvestigation.uuid] = [...patientStays];
            newState.data.stays = {...allPatientsStays};
            newState.data.departments = tempDepartments;
            newState.loading = initialState.loading; 
            newState.error = initialState.error; 
            return newState;
        case types.TRANSFER_PATIENT_SUCCESS:
            indexDepartment = findIndexDepartment(newState.data.departments, action.uuidCurrentDepartment);
            const indexDepartmentDestination = findIndexDepartment(newState.data.departments, action.uuidDepartmentDestination);
            tempDepartments = [...newState.data.departments];
            department = tempDepartments[indexDepartment];
            indexWard = findIndexWard(department, action.uuidCurrentWard);
            ward = department.wards[indexWard];
            bedIndex = ward.beds.findIndex((bed) => bed.id === action.idCurrentBed);
            
            const indexStay = ward.beds[bedIndex].stays.findIndex(stay => stay.patientInvestigation.uuid === action.uuidPatient);

            const departmentDestination = tempDepartments[indexDepartmentDestination];
            const indexWardDestination = findIndexWard(departmentDestination, action.uuidWardDestination);
            const wardDestination = department.wards[indexWardDestination];
            const bedIndexDestination = wardDestination.beds.findIndex((bed) => bed.id === action.stay.bed.id);
            const currentStay = ward.beds[bedIndexDestination].stays.filter((stay) => stay.dateOut === null)[0]
            tempDepartments[indexDepartmentDestination].wards[indexWardDestination].beds[bedIndexDestination].stays.push(action.stay);

            if (indexStay !== -1) {
                if(!ward.beds[bedIndexDestination].busy){
                    tempDepartments[indexDepartment].wards[indexWard].beds[bedIndex].stays.splice(indexStay, 1);
                    tempDepartments[indexDepartment].wards[indexWard].beds[bedIndex].busy = false;
                }
                else{
                    tempDepartments[indexDepartment].wards[indexWard].beds[bedIndex].stays[indexStay] = currentStay;
                }
            }

            indexDepartment = findIndexDepartment(tempDepartments, action.uuidDepartmentDestination);

            

            newState.data.departments = [...tempDepartments];
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
        case types.DELETE_WARD_ERROR:
        
            newState.loading = initialState.loading; 
            newState.error = action.error; 
            return newState; 
        case types.FETCH_PATIENT_STAYS:
            
            if(newState.data.stays){
                allPatientsStays = newState.data.stays;
            }
            allPatientsStays[action.uuidPatient] = [...action.stays];
            newState.data["stays"] = {...allPatientsStays};
            if(newState.data.departments){
                tempDepartments = [...newState.data.departments]
            }
            else{
                tempDepartments = []
            }
            
            tempDepartments.forEach((department) => {
                department.wards.forEach((ward) => {
                    ward.beds.forEach((bed) => {
                        action.stays.forEach((stay) => {
                            bed.stays.forEach((bedStay, index) => {
                                if(stay.id === bedStay.id){
                                    bed.stays[index] = {...stay};
                                }
                            })
                        })
                    })
                })
            });
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
            newState.loading = initialState.loading;   
            newState.error = initialState.error;
            return newState;
        case types.INITIALIZE_HOSPITAL:
            newState.data = action.payload;
            return newState;
        case types.AUTH_SIGN_OUT:
            newState = {...initialState};
            return newState;
        default:
            return state;
    }
}