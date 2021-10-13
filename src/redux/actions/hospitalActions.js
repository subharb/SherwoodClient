import * as types from "../../constants";
import {
  signIn as authSignIn,
  signUp as authSignUp,
  resetPassword as authResetPassword,
} from "../../services/authService";
import { assignDepartmentToResearcherService, deleteBedService, deleteWardService, getDepartmentsInstitutionService, saveDepartmentInstitutionService, saveUpdateWardService, updateBedService } from "../../services/sherwoodService";




export function getDepartmentsInstitutionAction(uuidInstitution) {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_HOSPITAL_LOADING });
  
      return getDepartmentsInstitutionService(uuidInstitution)
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



export function assignDepartmentToResearcherAction(uuidResearcher, uuidDepartment) {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_HOSPITAL_LOADING });
  
      return assignDepartmentToResearcherService(uuidResearcher, uuidDepartment)
        .then((response) => {
          dispatch({
            type: types.ASSIGN_RESEARCHER_DEPARTMENT_SUCCESS,
            departments: response.departments,
            uuidResearcher : uuidResearcher
          });
        })
        .catch((error) => {
          dispatch({ type: types.HOSPITAL_ERROR });
          throw error;
        });
    };
}

export function saveDepartmentAction(uuidInstitution, department) {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_HOSPITAL_LOADING });
  
      return saveDepartmentInstitutionService(uuidInstitution, department)
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

export function saveUpdateWardAction(uuidInstitution, uuidDepartment, ward) {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_HOSPITAL_LOADING });
  
      return saveUpdateWardService(uuidInstitution, uuidDepartment, ward)
        .then((response) => {
          dispatch({
            type: types.SAVE_WARD_SUCCESS,
            uuidDepartment:uuidDepartment,
            ward: response.ward,
          });
        })
        .catch((error) => {
          dispatch({ type: types.HOSPITAL_ERROR,
                    errorCode:error.errorCode });
          throw error;
        });
    };
}

export function deleteWardAction(uuidInstitution, uuidDepartment, uuidWard) {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_HOSPITAL_LOADING });

    return deleteWardService(uuidInstitution, uuidWard)
      .then((response) => {
        dispatch({
          type: types.DELETE_WARD_SUCCESS,
          wards: response.wards,
          uuidDepartment:uuidDepartment
        });
      })
      .catch((error) => {
        dispatch({ type: types.HOSPITAL_ERROR });
        throw error;
      });
  };
}

export function updateBedAction(uuidInstitution, uuidDepartment, uuidWard, bedInfo) {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_HOSPITAL_LOADING });

    return updateBedService(uuidInstitution, bedInfo)
      .then((response) => {
        dispatch({
          type: types.UPDATE_BED_WARD_SUCCESS,
          bed: response.bed,
          uuidDepartment:uuidDepartment,
          uuidWard:uuidWard
        });
      })
      .catch((error) => {
        dispatch({ type: types.HOSPITAL_ERROR });
        throw error;
      });
  };
}

export function deleteBedAction(uuidInstitution, uuidDepartment, uuidWard, bedInfo) {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_HOSPITAL_LOADING });

    return deleteBedService(uuidInstitution, bedInfo)
      .then((response) => {
        dispatch({
          type: types.DELETE_BED_WARD_SUCCESS,
          beds: response.beds,
          uuidDepartment:uuidDepartment,
          uuidWard:uuidWard
        });
      })
      .catch((error) => {
        dispatch({ type: types.HOSPITAL_ERROR });
        throw error;
      });
  };
}
