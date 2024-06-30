import * as types from "../../constants";
import { makePharmacyRequestService, updatePharmacyRequestService } from "../../services/request";




export function makePharmacyRequestAction(uuidInvestigation, idPharmacy, request) {
    return async (dispatch) => {
      dispatch({ type: types.REQUESTS_LOADING });
  
      return makePharmacyRequestService(uuidInvestigation, idPharmacy, request)
        .then((response) => {
          dispatch({
            type: types.SAVE_REQUEST_PHARMACY_SUCCESS,
            request: response.request
          });
        })
        .catch((error) => {
          dispatch({ type: types.REQUESTS_ERROR });
          throw error;
        });
    };
}

export function updatePharmacyRequestAction(uuidInvestigation, idPharmacy, request, approved) {
    return async (dispatch) => {
      dispatch({ type: types.REQUESTS_LOADING });
  
      return updatePharmacyRequestService(uuidInvestigation, idPharmacy, request, approved)
        .then((response) => {
          dispatch({
            type: types.UPDATE_REQUEST_PHARMACY_SUCCESS,
            request: response.request
          });
        })
        .catch((error) => {
          dispatch({ type: types.REQUESTS_ERROR });
          throw error;
        });
    };
}





