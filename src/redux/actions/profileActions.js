import * as types from "../../constants";
import { fetchProfileService } from "../../services/sherwoodService";


export function fetchProfileInfo(value) {
  
  return async (dispatch) => {
    dispatch({ type: types.FETCH_PROFILE_LOADING });
    return fetchProfileService()
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