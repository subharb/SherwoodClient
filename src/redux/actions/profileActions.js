import * as types from "../../constants";
import { fetchProfileService } from "../../services";


export function fetchProfileInfoAction(uuidInvestigation) {
  
    return async (dispatch, getState) => {
        const loadingState = getState().profile.loading;
        
        if (loadingState) {
            console.log('Profile fetch already in progress');
            return;
        }
        dispatch({ type: types.FETCH_PROFILE_LOADING })
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