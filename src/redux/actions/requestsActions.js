import * as types from "../../constants";
import { makePharmacyRequestService } from "../../services/request";




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



