import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";

export const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  form:formReducer
});
