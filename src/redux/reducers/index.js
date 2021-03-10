import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import investigationsReducer from "./investigationsReducer";
import submissionsReducer from "./submissionsReducer";

export const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  investigations: investigationsReducer,
  submissions: submissionsReducer,
  form:formReducer
});
