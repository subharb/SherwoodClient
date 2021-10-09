import * as types from "../../constants";
import {
  signIn as authSignIn,
  signUp as authSignUp,
  resetPassword as authResetPassword,
} from "../../services/authService";
import { assignDepartmentToResearcherService, deleteWardService, getDepartmentsInstitutionService, saveDepartmentInstitutionService, saveUpdateWardService } from "../../services/sherwoodService";




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
          dispatch({ type: types.HOSPITAL_ERROR });
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