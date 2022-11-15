import {PERMISSION} from './types';
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

export const UPDATE_TOTAL_DATA = "UPDATE_TOTAL_DATA";

export const LOADING = "LOADING";

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

//Billing Info
export const UPDATE_BILLING_INFO_SUCCESS = "UPDATE_BILLING_INFO_SUCCESS";
export const UPDATE_BILLING_INFO_ERROR = "UPDATE_BILLING_INFO_ERROR";
export const UPDATE_BILLABLES_SUCCESS = "UPDATE_BILLABLES_SUCCESS";
export const UPDATE_BILLABLES_ERROR = "UPDATE_BILLABLES_ERROR";
export const GET_BILLABLES_SUCCESS = "GET_BILLABLES_SUCCESS";
export const GET_BILLABLES_ERROR = "GET_BILLABLES_ERROR";


//Patients
export const SAVE_PATIENT_LOADING = "SAVE_PATIENT_LOADING";
export const SAVE_PATIENT_SUCCESS = "SAVE_PATIENT_SUCCESS";
export const UPDATE_PATIENT_SUCCESS = "UPDATE_PATIENT_SUCCESS";
export const UPDATE_PATIENT_OFFLINE = "UPDATE_PATIENT_OFFLINE";
export const SAVE_PATIENT_ERROR = "SAVE_PATIENT_ERROR";
export const SAVE_PATIENT_OFFLINE = "SAVE_PATIENT_OFFLINE";
export const FETCH_NEW_PATIENTS_SUCCESS = "FETCH_NEW_PATIENTS_SUCCESS";


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

//Hospital
export const HOSPITAL_ERROR = "HOSPITAL_ERROR";
export const HOSPITAL_RESET_ERROR = "HOSPITAL_RESET_ERROR";
export const SAVE_DEPARTMENT_SUCCESS = "SAVE_DEPARTMENT_SUCCESS";
export const SAVE_UNIT_SUCCESS = "SAVE_UNIT_SUCCESS";
export const FETCH_HOSPITAL_LOADING = "FETCH_HOSPITAL_LOADING";
export const FETCH_HOSPITAL_SUCCESS = "FETCH_HOSPITAL_SUCCESS";
export const SAVE_WARD_SUCCESS = "SAVE_WARD_SUCCESS";


export const ASSIGN_RESEARCHER_UNIT_SUCCESS = "ASSIGN_RESEARCHER_UNIT_SUCCESS";
export const REMOVE_RESEARCHER_UNIT_SUCCESS = "REMOVE_RESEARCHER_UNIT_SUCCESS";
export const DELETE_WARD_SUCCESS = "DELETE_WARD_SUCCESS";
export const DELETE_WARD_ERROR = "DELETE_WARD_ERROR";
export const UPDATE_BED_WARD_SUCCESS = "UPDATE_BED_WARD_SUCCESS";
export const UPDATE_ORDER_BEDS_SUCCESS = "UPDATE_ORDER_BEDS_SUCCESS";
export const CREATE_BED_WARD_SUCCESS = "CREATE_BED_WARD_SUCCESS";
export const CREATE_STAY_SUCCESS = "CREATE_STAY_SUCCESS";
export const FETCH_PATIENT_STAYS = "FETCH_PATIENT_STAYS";


export const DELETE_BED_WARD_SUCCESS = "DELETE_BED_WARD_SUCCESS";


export const TREATMENT_TYPE = "treatment"
export const DIAGNOSIS_TYPE = "ict"
export const SLAVES_TREATMENT = ["drug-code", "treatment-start", "treatment-finish", "treatment-posology"];
export const SLAVES_DIAGNOSIS = ["ict-code"];

export const ALL_SMARTFIELDS_TYPES = ["ict", "allergy", "background", "family-background", "treatment", "treatment_regular", "multioption"];

//Offline
export const UPDATE_RECORDS_LOADING = "UPDATE_RECORDS_LOADING";
export const RESET_OFFLINE_NOTIFICATIONS = "RESET_OFFLINE_NOTIFICATIONS";

//PROFILE
export const FETCH_PROFILE_LOADING = "FETCH_PROFILE_LOADING";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_ERROR = "FETCH_PROFILE_ERROR";
//Types de Survey
export const TYPE_MEDICAL_SURVEY = 0;
export const TYPE_IMAGE_SURVEY = 1;
export const TYPE_LAB_SURVEY = 2;
export const TYPE_FIRST_VISIT_SURVEY = 3;
export const TYPE_MONITORING_VISIT_SURVEY = 4;
export const TYPE_DISCHARGE_SURVEY = 5;
export const TYPE_SOCIAL_SURVEY = 6;
export const TYPE_SHOE_SURVEY = 7;
export const TYPE_FILL_LAB_SURVEY = 8;
export const TYPE_FILL_IMG_SURVEY = 9;

export const TYPE_SURVEYS = [{value:TYPE_MEDICAL_SURVEY, name:"Medical"}, {value:TYPE_IMAGE_SURVEY , name:"Images"}, {value:TYPE_LAB_SURVEY, name:"Laboratory"},
                            {value:TYPE_FIRST_VISIT_SURVEY, name:"First Visit"}, {value:TYPE_MONITORING_VISIT_SURVEY, name:"Monitoring"},
                            {value:TYPE_DISCHARGE_SURVEY, name:"Discharge"}, {value:TYPE_SOCIAL_SURVEY, name:"Social"}, {value:TYPE_SHOE_SURVEY, name:"Shoe"},
                            {value:TYPE_FILL_LAB_SURVEY, name:"Fill Lab"}, {value:TYPE_FILL_IMG_SURVEY, name:"Fill IMG"}];

export const TYPE_FILL_SURVEY = [TYPE_FILL_LAB_SURVEY, TYPE_FILL_IMG_SURVEY];
export const LAB_SURVEYS = [TYPE_LAB_SURVEY, TYPE_FILL_LAB_SURVEY];
export const IMG_SURVEYS = [TYPE_IMAGE_SURVEY, TYPE_FILL_IMG_SURVEY];

export const MEDICAL_SURVEYS = [TYPE_MEDICAL_SURVEY,TYPE_FIRST_VISIT_SURVEY,TYPE_MONITORING_VISIT_SURVEY, TYPE_DISCHARGE_SURVEY];

//PERMISSIONS

export const PERMISSIONS_LIST = [PERMISSION.MEDICAL_WRITE, PERMISSION.MEDICAL_READ, PERMISSION.PERSONAL_ACCESS, PERMISSION.BUSINESS_READ, PERMISSION.SHARE_RESEARCHERS ]
//Roles
export const MEDICAL_DIRECTOR = [PERMISSION.MEDICAL_WRITE, PERMISSION.MEDICAL_READ, PERMISSION.PERSONAL_ACCESS, PERMISSION.BUSINESS_READ, PERMISSION.SHARE_RESEARCHERS ];
export const STUDENT = [PERMISSION.MEDICAL_READ, PERMISSION.PERSONAL_ACCESS, PERMISSION.BUSINESS_READ ];
export const SHERWOOD_STAFF = [PERMISSION.MEDICAL_WRITE, PERMISSION.MEDICAL_READ, PERMISSION.PERSONAL_ACCESS, PERMISSION.BUSINESS_READ, PERMISSION.BUSINESS_WRITE, PERMISSION.SHARE_RESEARCHERS, PERMISSION.EDIT_SUBMISSIONS, PERMISSION.EDIT_INVESTIGATION ];
export const DOCTOR = [PERMISSION.MEDICAL_WRITE, PERMISSION.MEDICAL_READ, PERMISSION.PERSONAL_ACCESS];
export const PRIVATE_DOCTOR = [PERMISSION.MEDICAL_WRITE, PERMISSION.MEDICAL_READ, PERMISSION.PERSONAL_ACCESS, PERMISSION.BUSINESS_READ];
export const BUSINESS_MANAGER = [PERMISSION.MEDICAL_WRITE, PERMISSION.MEDICAL_READ, PERMISSION.PERSONAL_ACCESS, PERMISSION.BUSINESS_READ, PERMISSION.SHARE_RESEARCHERS, PERMISSION.BUSINESS_WRITE ];
export const ADMIN = [ PERMISSION.MEDICAL_READ, PERMISSION.PERSONAL_ACCESS, PERMISSION.SHARE_RESEARCHERS ];
export const NURSE = [ PERMISSION.MEDICAL_READ, PERMISSION.PERSONAL_ACCESS ];
export const BUSINESS_ASSISTANT = [ PERMISSION.BUSINESS_READ ];
export const LAB_MANAGER = [PERMISSION.MEDICAL_WRITE, PERMISSION.MEDICAL_READ, PERMISSION.SHARE_RESEARCHERS ];
export const LAB_ASSISTANT = [PERMISSION.MEDICAL_READ, PERMISSION.MEDICAL_WRITE];

export const USER_ROLES = {"PRIVATE_DOCTOR" : PRIVATE_DOCTOR, "NURSE" : NURSE, "ADMIN" : ADMIN, "STUDENT" : STUDENT, "MEDICAL_DIRECTOR" : MEDICAL_DIRECTOR, "DOCTOR" : DOCTOR, "BUSINESS_MANAGER" : BUSINESS_MANAGER, "BUSINESS_ASSISTANT" : BUSINESS_ASSISTANT, "LAB_MANAGER" : LAB_MANAGER, "LAB_ASSISTANT" : LAB_ASSISTANT}
export const ALL_ROLES = {...USER_ROLES, "SHERWOOD_STAFF" : SHERWOOD_STAFF}
