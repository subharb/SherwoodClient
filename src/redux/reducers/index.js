import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import investigationsReducer from "./investigationsReducer";
import submissionsReducer from "./submissionsReducer";
import patientsReducer from "./patientsReducer";
import patientsSubmissions from "./submissionsPatientReducer";
import offlineReducer from "./offlineReducer";
import profileReducer from "./profileReducer";


export const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  investigations: investigationsReducer,
  submissions: submissionsReducer,
  patients: patientsReducer,
  patientsSubmissions: patientsSubmissions,
  offline: offlineReducer,
  profile: profileReducer,
  form:formReducer
});
