import * as types from "../../constants";


export function updateLoadingRecords(value) {
  console.log("updateLoadingRecords:", value);
  return async (dispatch) => {
    dispatch({ type: types.UPDATE_RECORDS_LOADING, loading:value });
  };
}