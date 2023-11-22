import * as types from "../../constants";
import {
    getInsurancesService
} from "../../services";

export function getInsurancesAction(uuidInvestigation) {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_INSURANCES_LOADING });

    return getInsurancesService(uuidInvestigation)
      .then((response) => {
        dispatch({
          type: types.FETCH_INSURANCES_SUCCESS,
          insurances: response.insurances,
        });
      })
      .catch((error) => {
        dispatch({ type: types.FETCH_INSURANCES_ERROR });
          throw error;
      });
  };
}
