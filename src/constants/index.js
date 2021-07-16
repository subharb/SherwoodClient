// Theme
export const THEME_SET = "THEME_SET";
export const THEMES = {
  DEFAULT: "DEFAULT",
  DARK: "DARK",
  LIGHT: "LIGHT",
  BLUE: "BLUE",
  GREEN: "GREEN",
  INDIGO: "INDIGO",
};

// Auth
export const AUTH_SIGN_IN_REQUEST = "AUTH_SIGN_IN_REQUEST";
export const AUTH_SIGN_IN_SUCCESS = "AUTH_SIGN_IN_SUCCESS";
export const AUTH_SIGN_IN_FAILURE = "AUTH_SIGN_IN_FAILURE";
export const AUTH_SIGN_OUT = "AUTH_SIGN_OUT";
export const AUTH_SIGN_UP_REQUEST = "AUTH_SIGN_UP_REQUEST";
export const AUTH_SIGN_UP_SUCCESS = "AUTH_SIGN_UP_SUCCESS";
export const AUTH_SIGN_UP_FAILURE = "AUTH_SIGN_UP_FAILURE";
export const AUTH_RESET_PASSWORD_REQUEST = "AUTH_RESET_PASSWORD_REQUEST";
export const AUTH_RESET_PASSWORD_SUCCESS = "AUTH_RESET_PASSWORD_SUCCESS";
export const AUTH_RESET_PASSWORD_FAILURE = "AUTH_RESET_PASSWORD_FAILURE";

//Investigations
export const FETCH_INVESTIGATIONS_LOADING = "FETCH_INVESTIGATIONS_LOADING";
export const FETCH_INVESTIGATIONS_SUCCESS = "FETCH_INVESTIGATIONS_SUCCESS";
export const FETCH_INVESTIGATIONS_ERROR = "FETCH_INVESTIGATIONS_ERROR";
export const SELECT_INVESTIGATION = "SELECT_INVESTIGATION";


//Patients
export const SAVE_PATIENT_LOADING = "SAVE_PATIENT_LOADING";
export const SAVE_PATIENT_SUCCESS = "SAVE_PATIENT_SUCCESS";
export const UPDATE_PATIENT_SUCCESS = "UPDATE_PATIENT_SUCCESS";
export const UPDATE_PATIENT_OFFLINE = "UPDATE_PATIENT_OFFLINE";
export const SAVE_PATIENT_ERROR = "SAVE_PATIENT_ERROR";
export const SAVE_PATIENT_OFFLINE = "SAVE_PATIENT_OFFLINE";

//Submissions
export const FETCH_SUBMISSIONS_SUCCESS = "FETCH_SUBMISSIONS_SUCCESS";
export const FETCH_SUBMISSIONS_SURVEY_SUCCESS = "FETCH_SUBMISSIONS_SURVEY_SUCCESS";

export const SUBMISSIONS_LOADING = "SUBMISSIONS_LOADING";
export const FETCH_SUBMISSIONS_ERROR = "FETCH_SUBMISSIONS_ERROR";
export const SAVE_SUBMISSION_LOADING = "SAVE_SUBMISSION_LOADING";
export const SAVE_SUBMISSION_SUCCESS = "SAVE_SUBMISSION_SUCCESS";
export const SAVE_SUBMISSION_ERROR = "SAVE_SUBMISSION_ERROR";

//Submissions Patient
export const FETCH_SUBMISSIONS_PATIENT_SUCCESS = "FETCH_SUBMISSIONS_PATIENT_SUCCESS";
export const FETCH_SUBMISSIONS_PATIENT_ERROR = "FETCH_SUBMISSIONS_PATIENT_ERROR";
export const SAVE_SUBMISSIONS_PATIENT_SUCCESS = "SAVE_SUBMISSIONS_PATIENT_SUCCESS";
export const SAVE_SUBMISSIONS_PATIENT_OFFLINE = "SAVE_SUBMISSIONS_PATIENT_OFFLINE";
export const SUBMISSIONS_PATIENT_LOADING = "SAVE_SUBMISSIONS_PATIENT_LOADING";
export const SAVE_SUBMISSIONS_PATIENT_ERROR = "SAVE_SUBMISSIONS_PATIENT_ERROR";
export const UPDATE_SUBMISSIONS_PATIENT_SUCCESS = "UPDATE_SUBMISSIONS_PATIENT_SUCCESS";
export const UPDATE_SUBMISSIONS_PATIENT_OFFLINE = "UPDATE_SUBMISSIONS_PATIENT_OFFLINE";
export const SUBMISSIONS_PATIENT_RESET_ERROR = "SUBMISSIONS_PATIENT_RESET_ERROR";


export const TREATMENT_TYPE = "treatment"
export const DIAGNOSIS_TYPE = "ict"
export const SLAVES_TREATMENT = ["drug-code", "treatment-start", "treatment-finish", "treatment-posology"];
export const SLAVES_DIAGNOSIS = ["ict-code"];


//Offline
export const UPDATE_RECORDS_LOADING = "UPDATE_RECORDS_LOADING";

//PROFILE
export const FETCH_PROFILE_LOADING = "FETCH_PROFILE_LOADING";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_ERROR = "FETCH_PROFILE_ERROR";


//PERMISSIONS
export const MEDICAL_WRITE = "MEDICAL_WRITE";
export const MEDICAL_READ = "MEDICAL_READ";
export const PERSONAL_ACCESS = "PERSONAL_ACCESS";
export const BUSINESS_READ = "BUSINESS_READ";
export const EDIT_SUBMISSIONS = "EDIT_SUBMISSIONS";
export const EDIT_INVESTIGATION = "EDIT_INVESTIGATION";
export const SHARE_RESEARCHERS = "SHARE_RESEARCHERS";