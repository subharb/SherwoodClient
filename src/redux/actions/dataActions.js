import * as types from "../../constants";


export function updateDataConsumption(value) {
  
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_TOTAL_DATA, data:value, date:new Date() });
  };
}