import * as types from "../../constants";
import {
    fetchInvestigations as fetchInvestigationsService
} from "../../services";
import { createUpdateBillingInfoService } from "../../services/billing";

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

export function createUpdateBillingInfo(uuidInvestigation, billingInfo) {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_INVESTIGATIONS_LOADING });
  
      return createUpdateBillingInfoService(uuidInvestigation, billingInfo)
        .then((response) => {
          dispatch({
            type: types.UPDATE_BILLING_INFO_SUCCESS,
            investigations: response.billingInfo,
          });
        })
        .catch((error) => {
          dispatch({ type: types.UPDATE_BILLING_INFO_ERROR });
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