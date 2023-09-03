import * as types from "../../constants";
import {
    fetchInvestigations as fetchInvestigationsService
} from "../../services";
import { createUpdateBillingInfoService, getBillablesService, updateBillablesService } from "../../services/billing";

export function fetchInvestigations() {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_INVESTIGATIONS_LOADING });

    return fetchInvestigationsService()
      .then((response) => {
        dispatch({
          type: types.FETCH_INVESTIGATIONS_SUCCESS,
          investigations: response.investigations,
        });
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
export function selectInvestigation(idInvestigation) {
    return async (dispatch) => {
        dispatch({ 
            type: types.SELECT_INVESTIGATION,
            selectedInvestigation :  idInvestigation
        });
  }
}