import * as types from "../../constants";
import { assignUnitToResearcherService, createBedService, createStayPatientService, deleteBedService, deleteDepartmentService, deleteUnitService, deleteWardService, dischargePatientService, editDepartmentService, editUnitService, getAgendasInvestigationService, getDepartmentsInstitutionService as getDepartmentsInsvestigationService, getPatientStaysService, makeAppointmentService, removeUnitToResearcherService, saveDepartmentService, saveUnitService, saveUpdateWardService, transferPatientService, updateBedService, updateOrderBedsService } from "../../services";
import { saveAgendaService } from "../../services/agenda";


export function getAgendasInvestigationAction(uuidInvestigation) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return getAgendasInvestigationService(uuidInvestigation)
            .then((response) => {
                dispatch({
                    type: types.FETCH_HOSPITAL_AGENDAS_SUCCESS,
                    agendas: response.agendas
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function saveAgendaInvestigationAction(uuidInvestigation) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return saveAgendaService(uuidInvestigation)
            .then((response) => {
                dispatch({
                    type: types.FETCH_HOSPITAL_SUCCESS,
                    agendas: response.agenda
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function makeAppointmentAction(uuidInvestigation, uuidAgenda, uuidPatient, date) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return makeAppointmentService(uuidInvestigation, uuidAgenda, uuidPatient, date)
            .then((response) => {
                dispatch({
                    type: types.FETCH_HOSPITAL_APPOINTMENT_SUCCESS,
                    appointment: response.appointment
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR, errorCode: error.errorCode });
                throw error;
            });
    };
}

export function getDepartmentsInvestigationAction(uuidInstitution) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return getDepartmentsInsvestigationService(uuidInstitution)
            .then((response) => {
                dispatch({
                    type: types.FETCH_HOSPITAL_SUCCESS,
                    researchers: response.researchers,
                    departments: response.departments,
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function saveUnitAction(uuidInvestigation, uuidDepartment, unit) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return saveUnitService(uuidInvestigation, uuidDepartment, unit)
            .then((response) => {
                dispatch({
                    type: types.SAVE_UNIT_SUCCESS,
                    unit: response.unit,
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}


export function editUnitAction(uuidInvestigation, unit) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return editUnitService(uuidInvestigation, unit.uuid, unit)
            .then((response) => {
                dispatch({
                    type: types.SAVE_UNIT_SUCCESS,
                    unit: response.unit,
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function assignUnitToResearcherAction(uuidInvestigation, uuidResearcher, uuidDepartment) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return assignUnitToResearcherService(uuidInvestigation, uuidResearcher, uuidDepartment)
            .then((response) => {
                dispatch({
                    type: types.ASSIGN_RESEARCHER_UNIT_SUCCESS,
                    units: response.units,
                    uuidResearcher: uuidResearcher
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function removeResearcherFromUnitAction(uuidInvestigation, researcherUnit) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return removeUnitToResearcherService(uuidInvestigation, researcherUnit.researcher.uuid, researcherUnit.unit.uuid)
            .then((response) => {
                dispatch({
                    type: types.REMOVE_RESEARCHER_UNIT_SUCCESS,
                    units: response.units,
                    uuidResearcher: researcherUnit.researcher.uuid
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function editDepartmentAction(uuidInvestigation, department) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return editDepartmentService(uuidInvestigation, department)
            .then((response) => {
                dispatch({
                    type: types.EDIT_DEPARTMENT_SUCCESS,
                    department: response.department,
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function deleteDepartmentAction(uuidInvestigation, department) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return deleteDepartmentService(uuidInvestigation, department)
            .then((response) => {
                dispatch({
                    type: types.DELETE_DEPARTMENT_SUCCESS,
                    department: department,
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function saveDepartmentAction(uuidInvestigation, department) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return saveDepartmentService(uuidInvestigation, department)
            .then((response) => {
                dispatch({
                    type: types.SAVE_DEPARTMENT_SUCCESS,
                    department: response.department,
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function saveUpdateWardAction(uuidInvestigation, uuidDepartment, ward) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return saveUpdateWardService(uuidInvestigation, uuidDepartment, ward)
            .then((response) => {
                dispatch({
                    type: types.SAVE_WARD_SUCCESS,
                    uuidDepartment: uuidDepartment,
                    ward: response.ward,
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.HOSPITAL_ERROR,
                    errorCode: error.errorCode
                });
                throw error;
            });
    };
}

export function deleteUnitAction(uuidInvestigation, uuidUnit) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return deleteUnitService(uuidInvestigation, uuidUnit)
            .then((response) => {
                dispatch({
                    type: types.DELETE_UNIT_SUCCESS,
                    uuidUnit: uuidUnit
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.HOSPITAL_ERROR,
                    errorCode: error.errorCode
                });
                throw error;
            });
    };
}

export function deleteWardAction(uuidInvestigation, uuidDepartment, uuidWard) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return deleteWardService(uuidInvestigation, uuidWard)
            .then((response) => {
                dispatch({
                    type: types.DELETE_WARD_SUCCESS,
                    wards: response.wards,
                    uuidDepartment: uuidDepartment
                });
            })
            .catch((error) => {
                if (error.status === 400) {
                    dispatch({
                        type: types.DELETE_WARD_ERROR,
                        error: 400
                    });
                }
                else {
                    dispatch({ type: types.HOSPITAL_ERROR });
                }

                throw error;
            });
    };
}

export function updateBedAction(uuidInvestigation, uuidDepartment, uuidWard, bedInfo) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return updateBedService(uuidInvestigation, bedInfo)
            .then((response) => {
                dispatch({
                    type: types.UPDATE_BED_WARD_SUCCESS,
                    bed: response.bed,
                    uuidDepartment: uuidDepartment,
                    uuidWard: uuidWard
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function deleteBedAction(uuidInvestigation, uuidDepartment, uuidWard, bedInfo) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return deleteBedService(uuidInvestigation, bedInfo)
            .then((response) => {
                dispatch({
                    type: types.DELETE_BED_WARD_SUCCESS,
                    beds: response.beds,
                    uuidDepartment: uuidDepartment,
                    uuidWard: uuidWard
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR, errorCode: error.errorCode });
                throw error;
            });
    };
}


export function createBedAction(uuidInvestigation, uuidDepartment, uuidWard, bedInfo) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return createBedService(uuidInvestigation, uuidWard, bedInfo)
            .then((response) => {
                dispatch({
                    type: types.CREATE_BED_WARD_SUCCESS,
                    bed: response.bed,
                    uuidDepartment: uuidDepartment,
                    uuidWard: uuidWard
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR, errorCode: error.errorCode });
                throw error;
            });
    };
}

export function updateOrderBedsAction(uuidInvestigation, uuidDepartment, uuidWard, bedsReorder) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return updateOrderBedsService(uuidInvestigation, uuidWard, bedsReorder)
            .then((response) => {
                dispatch({
                    type: types.UPDATE_ORDER_BEDS_SUCCESS,
                    beds: response.beds,
                    uuidDepartment: uuidDepartment,
                    uuidWard: uuidWard
                });
            })
            .catch((error) => {
                dispatch({ type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function createStayPatientAction(uuidInvestigation, uuidDepartment, uuidWard, uuidPatient, idBed) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return createStayPatientService(uuidInvestigation, idBed, uuidPatient)
            .then((response) => {
                dispatch({
                    type: types.CREATE_STAY_SUCCESS,
                    stay: response.stay,
                    uuidDepartment: uuidDepartment,
                    uuidWard: uuidWard
                });
            })
            .catch((error) => {

                dispatch({ ...error, type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function transferPatientAction(uuidInvestigation, uuidCurrentDepartment, uuidCurrentWard, idCurrentBed, uuidDepartmentDestination, uuidWardDestination, uuidPatient) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return transferPatientService(uuidInvestigation, uuidWardDestination, uuidPatient)
            .then((response) => {
                dispatch({
                    type: types.TRANSFER_PATIENT_SUCCESS,
                    stay: response.stay,
                    uuidCurrentDepartment: uuidCurrentDepartment,
                    uuidCurrentWard : uuidCurrentWard,
                    idCurrentBed : idCurrentBed,
                    uuidWardDestination: uuidWardDestination,
                    uuidDepartmentDestination : uuidDepartmentDestination,
                    uuidPatient :uuidPatient
                });
            })
            .catch((error) => {

                dispatch({ ...error, type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
    
}

export function getPatientStaysAction(uuidInvestigation, uuidPatient) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return getPatientStaysService(uuidInvestigation, uuidPatient)
            .then((response) => {
                dispatch({
                    type: types.FETCH_PATIENT_STAYS,
                    stays: response.stays,
                    uuidPatient: uuidPatient
                });
            })
            .catch((error) => {

                dispatch({ ...error, type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function dischargePatientAction(uuidInvestigation, uuidPatient) {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_HOSPITAL_LOADING });

        return dischargePatientService(uuidInvestigation, uuidPatient)
            .then((response) => {
                dispatch({
                    type: types.FETCH_PATIENT_STAYS,
                    stays: response.stays,
                    uuidPatient: uuidPatient
                });
            })
            .catch((error) => {
                dispatch({ ...error, type: types.HOSPITAL_ERROR });
                throw error;
            });
    };
}

export function saveUpdateAgendaAction(agenda) {
    return async (dispatch) => {
      dispatch({ 
            type: types.FETCH_HOSPITAL_SAVE_UPDATE_AGENDA_SUCCESS,
            agenda:agenda
      });
    };
}

export function deleteAgendaAction(uuidAgenda) {
    return async (dispatch) => {
      dispatch({ 
            type: types.FETCH_HOSPITAL_DELETE_AGENDA_SUCCESS,
            uuidAgenda:uuidAgenda
      });
    };
}

export async function resetHospitalAction() {
    return async (dispatch) => {
        dispatch({ type: types.HOSPITAL_RESET_ERROR })
    }
}

export function initializeHospital(newState) {
    return async (dispatch) => {
      dispatch({ 
            type: types.INITIALIZE_HOSPITAL,
            newState:newState
      });
    };
}