import * as types from "../../constants";
import { deleteAllPatientsFromInvestigation, getAllPatientsInvestigation, savePatient } from "../../db";
import {
    fetchInvestigations as fetchInvestigationsService
} from "../../services";
import { createUpdateBillingInfoService, getBillablesService, updateBillablesService } from "../../services/billing";
import { decryptSinglePatientData } from "../../utils";

export function fetchInvestigations() {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_INVESTIGATIONS_LOADING });

    return fetchInvestigationsService()
      .then(async (response) => {
        for(const investigation of response.investigations){
            let patientsInvestigation = await getAllPatientsInvestigation(investigation.uuid);
            if(patientsInvestigation.length !== investigation.patientsPersonalData.length){
                await deleteAllPatientsFromInvestigation(investigation.uuid);
                for(const patient of investigation.patientsPersonalData){
                    try{
                        patient.personalData = patient.personalData ? decryptSinglePatientData(patient.personalData, investigation) : null;
                        await savePatient(patient, investigation.uuid);
                    }
                    catch(e){
                        console.log(e);
                        console.log(patient);
                    }
                }
                patientsInvestigation = await getAllPatientsInvestigation(investigation.uuid);
            }
            investigation.patientsPersonalData = patientsInvestigation;
        }
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

export function initializeBilling(newState) {
    return async (dispatch) => {
      dispatch({ 
            type: types.INITIALIZE_INVESTIGATIONS,
            newState:newState
      });
    };
}