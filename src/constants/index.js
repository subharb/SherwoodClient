
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
export const INITIALIZE_INVESTIGATIONS = "INITIALIZE_INVESTIGATIONS";
export const FETCH_INVESTIGATIONS_DECRYPTING_DATA = "FETCH_INVESTIGATIONS_DECRYPTING_DATA";

//Billing Info
export const UPDATE_BILLING_INFO_SUCCESS = "UPDATE_BILLING_INFO_SUCCESS";
export const UPDATE_BILLING_INFO_ERROR = "UPDATE_BILLING_INFO_ERROR";
export const UPDATE_BILLABLES_SUCCESS = "UPDATE_BILLABLES_SUCCESS";
export const UPDATE_BILLABLES_ERROR = "UPDATE_BILLABLES_ERROR";
export const GET_BILLABLES_SUCCESS = "GET_BILLABLES_SUCCESS";
export const GET_BILLABLES_ERROR = "GET_BILLABLES_ERROR";
export const SAVE_BILL_ITEMS = "SAVE_BILL_ITEMS";
export const INITIALIZE_BILLING = "INITIALIZE_BILLING";
export const PUSH_BILL_ITEMS = "PUSH_BILL_ITEMS";
export const PUSH_BILLABLES = "PUSH_BILLABLES";
export const RESET_BILL_ITEMS = "RESET_BILL_ITEMS";
export const GET_BILLABLE_COMBO_SUCCESS = "GET_BILLABLE_COMBO_SUCCESS";
export const FETCH_BILLING_LOADING = "FETCH_BILLING_LOADING";


//Patients
export const SAVE_PATIENT_LOADING = "SAVE_PATIENT_LOADING";
export const SAVE_PATIENT_SUCCESS = "SAVE_PATIENT_SUCCESS";
export const UPDATE_PATIENT_SUCCESS = "UPDATE_PATIENT_SUCCESS";
export const UPDATE_PATIENT_OFFLINE = "UPDATE_PATIENT_OFFLINE";
export const SAVE_PATIENT_ERROR = "SAVE_PATIENT_ERROR";
export const SAVE_PATIENT_OFFLINE = "SAVE_PATIENT_OFFLINE";
export const FETCH_NEW_PATIENTS_SUCCESS = "FETCH_NEW_PATIENTS_SUCCESS";
export const INITIALIZE_PATIENTS = "INITIALIZE_PATIENTS";
export const UPDATING_PATIENTS_LOADING = "UPDATING_PATIENTS_LOADING";

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
export const FETCH_SINGLE_SUBMISSIONS_PATIENT_SUCCESS = "FETCH_SINGLE_SUBMISSIONS_PATIENT_SUCCESS";
export const FETCH_SUBMISSIONS_PATIENT_ERROR = "FETCH_SUBMISSIONS_PATIENT_ERROR";
export const SAVE_SUBMISSIONS_PATIENT_SUCCESS = "SAVE_SUBMISSIONS_PATIENT_SUCCESS";
export const SAVE_SUBMISSIONS_PATIENT_OFFLINE = "SAVE_SUBMISSIONS_PATIENT_OFFLINE";
export const SUBMISSIONS_PATIENT_LOADING = "SAVE_SUBMISSIONS_PATIENT_LOADING";
export const SAVE_SUBMISSIONS_PATIENT_ERROR = "SAVE_SUBMISSIONS_PATIENT_ERROR";
export const UPDATE_SUBMISSIONS_PATIENT_SUCCESS = "UPDATE_SUBMISSIONS_PATIENT_SUCCESS";
export const UPDATE_SUBMISSIONS_PATIENT_OFFLINE = "UPDATE_SUBMISSIONS_PATIENT_OFFLINE";
export const SUBMISSIONS_PATIENT_RESET_ERROR = "SUBMISSIONS_PATIENT_RESET_ERROR";
export const REMOVE_SUBMISSIONS_PATIENT = "REMOVE_SUBMISSIONS_PATIENT";
export const INITIALIZE_SUBMISSION_PATIENT = "INITIALIZE_SUBMISSION_PATIENT";

//Hospital
export const HOSPITAL_ERROR = "HOSPITAL_ERROR";
export const HOSPITAL_RESET_ERROR = "HOSPITAL_RESET_ERROR";
export const SAVE_DEPARTMENT_SUCCESS = "SAVE_DEPARTMENT_SUCCESS";
export const EDIT_DEPARTMENT_SUCCESS = "EDIT_DEPARTMENT_SUCCESS";
export const DELETE_DEPARTMENT_SUCCESS = "DELETE_DEPARTMENT_SUCCESS";
export const INITIALIZE_HOSPITAL = "INITIALIZE_HOSPITAL";

export const SAVE_UNIT_SUCCESS = "SAVE_UNIT_SUCCESS";
export const FETCH_HOSPITAL_LOADING = "FETCH_HOSPITAL_LOADING";
export const FETCH_HOSPITAL_SUCCESS = "FETCH_HOSPITAL_SUCCESS";
export const FETCH_HOSPITAL_APPOINTMENT_SUCCESS = "FETCH_HOSPITAL_APPOINTMENT_SUCCESS";
export const FETCH_HOSPITAL_AGENDAS_SUCCESS = "FETCH_HOSPITAL_AGENDAS_SUCCESS";
export const FETCH_HOSPITAL_SAVE_UPDATE_AGENDA_SUCCESS = "FETCH_HOSPITAL_SAVE_UPDATE_AGENDA_SUCCESS";
export const SAVE_WARD_SUCCESS = "SAVE_WARD_SUCCESS";
export const FETCH_HOSPITAL_DELETE_AGENDA_SUCCESS = "FETCH_HOSPITAL_DELETE_AGENDA_SUCCESS";

//Requests
export const FETCH_REQUEST_PHARMACY_SUCCESS = "FETCH_REQUEST_PHARMACY_SUCCESS";
export const SAVE_REQUEST_PHARMACY_SUCCESS = "SAVE_REQUEST_PHARMACY_SUCCESS";
export const REQUESTS_ERROR = "REQUESTS_ERROR";
export const REQUESTS_RESET_ERROR = "REQUESTS_RESET_ERROR";
export const REQUESTS_LOADING = "REQUESTS_LOADING";
export const UPDATE_REQUEST_PHARMACY_SUCCESS = "UPDATE_REQUEST_PHARMACY_SUCCESS";

export const ASSIGN_RESEARCHER_UNIT_SUCCESS = "ASSIGN_RESEARCHER_UNIT_SUCCESS";
export const REMOVE_RESEARCHER_UNIT_SUCCESS = "REMOVE_RESEARCHER_UNIT_SUCCESS";
export const DELETE_WARD_SUCCESS = "DELETE_WARD_SUCCESS";
export const DELETE_UNIT_SUCCESS = "DELETE_UNIT_SUCCESS";

export const DELETE_WARD_ERROR = "DELETE_WARD_ERROR";
export const UPDATE_BED_WARD_SUCCESS = "UPDATE_BED_WARD_SUCCESS";
export const UPDATE_ORDER_BEDS_SUCCESS = "UPDATE_ORDER_BEDS_SUCCESS";
export const CREATE_BED_WARD_SUCCESS = "CREATE_BED_WARD_SUCCESS";
export const CREATE_STAY_SUCCESS = "CREATE_STAY_SUCCESS";
export const FETCH_PATIENT_STAYS = "FETCH_PATIENT_STAYS";
export const TRANSFER_PATIENT_SUCCESS = "TRANSFER_PATIENT_SUCCESS";


export const DELETE_BED_WARD_SUCCESS = "DELETE_BED_WARD_SUCCESS";


export const TREATMENT_TYPE = "treatment"
export const DIAGNOSIS_TYPE = "ict"
export const SLAVES_TREATMENT = ["drug-code", "treatment-start", "treatment-finish", "treatment-posology"];
export const SLAVES_DIAGNOSIS = ["ict-code"];

export const MEDICAL_HISTORY_FIELDS = ["medical_history_ai", "medical_history_template", "medical_history_template_fill"];
export const ALL_SMARTFIELDS_TYPES = ["ict", "allergy", "background", "family-background", "treatment", "treatment_regular", "multioption", [...MEDICAL_HISTORY_FIELDS]];

//Offline
export const UPDATE_RECORDS_LOADING = "UPDATE_RECORDS_LOADING";
export const RESET_OFFLINE_NOTIFICATIONS = "RESET_OFFLINE_NOTIFICATIONS";

//Insurances

export const FETCH_INSURANCES_LOADING = "FETCH_INSURANCES_LOADING";
export const FETCH_INSURANCES_SUCCESS = "FETCH_INSURANCES_SUCCESS";
export const INITIALIZE_INSURANCES = "INITIALIZE_INSURANCES";
export const FETCH_INSURANCES_ERROR = "FETCH_INSURANCES_ERROR";

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
export const TYPE_EDITABLE_SURVEY = 10;
export const TYPE_ADDITIONAL_INFO_SURVEY = 11;
export const TYPE_NURSE = 12;
export const TYPE_PRESCRIPTIONS = 13;
export const TYPE_FILL_SHOE_SURVEY = 14;
export const TYPE_CARE_GIVER = 15;


export const TYPE_SURVEYS = [{ value: TYPE_MEDICAL_SURVEY, name: "Medical" }, { value: TYPE_PRESCRIPTIONS, name: "Prescriptions" }, { value: TYPE_NURSE, name: "Nurse" }, { value: TYPE_CARE_GIVER, name: "Care giver" },{ value: TYPE_IMAGE_SURVEY, name: "Images" }, { value: TYPE_LAB_SURVEY, name: "Laboratory" },
{ value: TYPE_FIRST_VISIT_SURVEY, name: "First Visit" }, { value: TYPE_MONITORING_VISIT_SURVEY, name: "Monitoring" },
{ value: TYPE_DISCHARGE_SURVEY, name: "Discharge" }, { value: TYPE_SOCIAL_SURVEY, name: "Social" }, { value: TYPE_SHOE_SURVEY, name: "Shoe" },
{ value: TYPE_FILL_LAB_SURVEY, name: "Fill Lab" }, { value: TYPE_FILL_IMG_SURVEY, name: "Fill IMG" }, { value: TYPE_FILL_SHOE_SURVEY, name: "Fill Shoe" },
{ value: TYPE_EDITABLE_SURVEY, name: "Editable" }, { value: TYPE_ADDITIONAL_INFO_SURVEY, name: "Additional Info" }];


export const CATEGORY_DEPARTMENT_MEDICAL = 0;
export const CATEGORY_DEPARTMENT_SOCIAL = 1;
export const CATEGORY_DEPARTMENT_SHOE = 3;
export const CATEGORY_DEPARTMENT_NURSE = 4;
export const CATEGORY_DEPARTMENT_PRESCRIPTIONS = 5;
export const CATEGORY_DEPARTMENT_NURSE_FW = 6;
export const CATEGORY_DEPARTMENT_PRESCRIPTIONS_FW = 7;


export const CATEGORY_SURVEYS = [{ value: CATEGORY_DEPARTMENT_MEDICAL, name: "Medical" }, { value: CATEGORY_DEPARTMENT_SOCIAL, name: "Social", url: "social" }, 
                                    { value: CATEGORY_DEPARTMENT_SHOE, name: "Shoe", url: "shoe" }, { value: CATEGORY_DEPARTMENT_NURSE, name: "Nurse", url: "nurse" },
                                    { value: CATEGORY_DEPARTMENT_PRESCRIPTIONS, name: "Prescriptions", url: "prescriptions" }, 
                                    { value: CATEGORY_DEPARTMENT_NURSE_FW, name: "Nurse FW", url: "nurse-fw" }, 
                                    { value: CATEGORY_DEPARTMENT_PRESCRIPTIONS_FW, name: "Prescriptions FW", url: "prescriptions-fw" }];

export const TYPE_REQUEST_LAB = 0;
export const TYPE_REQUEST_IMG = 1;
export const TYPE_REQUEST_SHOE = 3;

export const TYPE_REQUEST_FUNC = [TYPE_LAB_SURVEY, TYPE_IMAGE_SURVEY];
export const TYPE_SERVICE_SURVEY = [TYPE_LAB_SURVEY, TYPE_IMAGE_SURVEY, TYPE_SHOE_SURVEY];
export const TYPE_FILL_SURVEY = [TYPE_FILL_LAB_SURVEY, TYPE_FILL_IMG_SURVEY];
export const LAB_SURVEYS = [TYPE_LAB_SURVEY, TYPE_FILL_LAB_SURVEY];
export const IMG_SURVEYS = [TYPE_IMAGE_SURVEY, TYPE_FILL_IMG_SURVEY];

export const MEDICAL_SURVEYS = [TYPE_MEDICAL_SURVEY, TYPE_FIRST_VISIT_SURVEY, TYPE_MONITORING_VISIT_SURVEY, TYPE_DISCHARGE_SURVEY, TYPE_EDITABLE_SURVEY];

export const PATIENT_TOOLBAR_SECTION_MEDICAL = 0;
export const PATIENT_TOOLBAR_SECTION_LAB = 1;
export const PATIENT_TOOLBAR_SECTION_IMAGE = 2;
export const PATIENT_TOOLBAR_SECTION_SOCIAL = 3;
export const PATIENT_TOOLBAR_SECTION_SHOE = 4;
export const PATIENT_TOOLBAR_SECTION_NURSE = 5;
export const PATIENT_TOOLBAR_SECTION_PRESCRIPTIONS = 6;

