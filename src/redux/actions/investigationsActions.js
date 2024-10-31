import * as types from "../../constants";
import { deleteAllPatientsFromInvestigation, getAllPatientsInvestigation, saveListPatients, savePatient } from "../../db";
import {
    fetchInvestigations as fetchInvestigationsService
} from "../../services";
import { createUpdateBillingInfoService, getBillablesService, updateBillablesService } from "../../services/billing";
import { decryptSinglePatientData } from "../../utils";
import { fetchPatientsAction } from "./patientsActions";

export function fetchInvestigations() {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_INVESTIGATIONS_LOADING });

    return fetchInvestigationsService()
      .then(async (response) => {
        
        dispatch({
            type: types.FETCH_INVESTIGATIONS_SUCCESS,
            investigations: response.investigations,
        });

        if(response.investigations.length === 1){
            dispatch(selectInvestigation(response.investigations[0].uuid));
        }
        else if(localStorage.getItem("uuidInvestigation")){
            const investigation = response.investigations.find((investigation) => investigation.uuid === localStorage.getItem("uuidInvestigation"));
            if(investigation){
                dispatch(selectInvestigation(investigation.uuid));
            }
        }
        
      })
      .catch((error) => {
        dispatch({ type: types.FETCH_INVESTIGATIONS_ERROR });
        throw error;
      });
  };
}

export function createUpdateBillingInfoAction(uuidInvestigation, billingInfo) {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_INVESTIGATIONS_LOADING });
  
      return createUpdateBillingInfoService(uuidInvestigation, billingInfo)
        .then((response) => {
          dispatch({
            type: types.UPDATE_BILLING_INFO_SUCCESS,
            billingInfo: response.billingInfo,
          });
        })
        .catch((error) => {
          dispatch({ type: types.UPDATE_BILLING_INFO_ERROR });
          throw error;
        });
    };
}

export function updateBillables(uuidInvestigation, idBillingInfo, billables) {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_INVESTIGATIONS_LOADING });
  
      return updateBillablesService(uuidInvestigation, idBillingInfo, billables)
        .then((response) => {
          dispatch({
            type: types.UPDATE_BILLABLES_SUCCESS,
            billables: response.billables,
          });
        })
        .catch((error) => {
          dispatch({ type: types.UPDATE_BILLABLES_ERROR });
          throw error;
        });
    };
}

export function getBillablesAction(uuidInvestigation, idBillingInfo, idInsurance){
    return async (dispatch) => {
        dispatch({ type: types.FETCH_BILLING_LOADING });
        return getBillablesService(uuidInvestigation, idBillingInfo, idInsurance)
            .then((response) => {
                dispatch({
                    type: types.GET_BILLABLES_SUCCESS,
                    billables: response.billables,
                });
            })
            .catch((error) => {
                dispatch({ type: types.GET_BILLABLES_ERROR });
                throw error;
            });
    };
}
export function selectInvestigation(uuidInvestigation) {
    return async (dispatch, getState) => {
        dispatch({ 
            type: types.SELECT_INVESTIGATION,
            selectedInvestigation :  uuidInvestigation
        });
        const currentState = getState().investigations;
        const investigation = currentState.data.find((investigation) => investigation.uuid === uuidInvestigation);
        dispatch(fetchPatientsAction(investigation))
  }
}

export function initializeBilling(newState) {
    return async (dispatch) => {
      dispatch({ 
            type: types.INITIALIZE_INVESTIGATIONS,
            newState:newState
      });
    };
}