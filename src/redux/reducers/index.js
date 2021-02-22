import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import investigationsReducer from "./investigationsReducer";

export const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  investigations: investigationsReducer,
  form:formReducer
});
