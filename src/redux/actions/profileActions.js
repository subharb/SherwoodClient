import * as types from "../../constants";
import { fetchProfileService } from "../../services";


export function fetchProfileInfo(uuidInvestigation) {
  
  return async (dispatch) => {
    dispatch({ type: types.FETCH_PROFILE_LOADING });
    return fetchProfileService(uuidInvestigation)
        .then((response) => {
            dispatch({
            type: types.FETCH_PROFILE_SUCCESS,
            profile: response.profileInfo,
            });
        })
        .catch((error) => {
            dispatch({ type: types.FETCH_PROFILE_ERROR });
            throw error;
      });
  };
}