export const ROOT_ROUTE = "/";
export const SIGN_IN_ROUTE = "/auth/sign-in";
export const SIGN_UP_ROUTE = "/auth/sign-up";
export const SIGN_UP_ROUTE_INVESTIGATION = "/auth/sign-up/new-investigation";
export const SHARE_INVESTIGATION_ROUTE = "/investigation/share/:uuid";
export const SHOW_INVESTIGATION_ROUTE = "/investigation/show/:uuid";
export const EDIT_INVESTIGATION_ROUTE = "/investigation/edit/:uuid";
export const CREATE_INVESTIGATION_ROUTE = "/investigation/create";
export const PROFILE_ROUTE = "/profile";
export const PENDING_INVESTIGATIONS_ROUTE = "/investigations/pending";
export const LIVE_INVESTIGATIONS_ROUTE = "/investigations/live";
export const DRAFT_INVESTIGATIONS_ROUTE = "/investigations/draft";
export const ALL_INVESTIGATIONS_ROUTE = "/investigations/all";
export const HOSPITAL_HOME_ROUTE = "/hospital";
export const MY_SCHEDULE_ROUTE = "/my-schedule";
export const SEARCH_PATIENT_ROUTE = "/search-patient";
export const ADD_PATIENT_ROUTE = "/add-patient";
export const HOSPITAL_WARD_SETTINGS_ROUTE = "/ward/settings/:uuidWard";
export const HOSPITAL_WARD_ROUTE = "/ward/:uuidWard";
export const HOSPITAL_WARD_ASSIGN_PATIENT_ROUTE = "/ward/settings/:uuidWard/patient/:uuidPatient";
export const OUTPATIENTS_ROUTE = "/outpatients";
export const HOSPITAL_PATIENT = "/patient/:uuidPatient";
export const HOSPITAL_PATIENT_SECTION = "/patient/:uuidPatient/:action/data-collection/:uuidDataCollection/section/:uuidSection/:idSubmission?";
export const HOSPITAL_PATIENT_DATACOLLECTION = "/patient/:uuidPatient/:action/data-collection/:uuidDataCollection";
export const HOSPITAL_PATIENT_SUBMISSION = "/patient/:uuidPatient/:action/submission/:idSubmission/:typeTest";
export const HOSPITAL_PATIENT_SINGLE_SUBMISSION = "/patient/:uuidPatient/:action/submission/:idSubmission/:typeTest?";
export const HOSPITAL_PATIENT_EDIT_PERSONAL_DATA = "/patient/:uuidPatient/edit/personal-data";
export const HOSPITAL_PATIENT_MEDICAL_NOTE = "/patient/:uuidPatient/medical-note/:idMedicalNote";
export const HOSPITAL_PATIENT_TESTS = "/patient/:uuidPatient/tests/:typeTest";
export const HOSPITAL_PATIENT_MAKE_TESTS = "/patient/:uuidPatient/tests/:typeTest/request";
export const HOSPITAL_IMAGES = "/images";
export const HOSPITAL_ANALYTICS = "/analytics";
export const HOSPITAL_USER_MGMT = "/users";
export const HOSPITAL_LAB = "/lab";
export const HOSPITAL_LAB_REQUEST = "/lab/request/:idRequest";
export const HOSPITAL_PHARMACY_REQUEST = "/pharmacy/request/:idRequest";
export const HOSPITAL_PHARMACY_REQUEST_NEW = "/pharmacy/request/new";
export const HOSPITAL_PHARMACY_REQUEST_INVENTORY = "/pharmacy/inventory";
export const HOSPITAL_IMAGING_REQUEST = "/images/request/:idRequest";
export const HOSPITAL_LAB_RESULT = "/lab/result/:idSubmission/patient/:uuidPatient";
export const ROUTE_401 = "/auth/401";
export const HOSPITAL_BILLING = "/billing";
export const HOSPITAL_BILLING_CREATE_BILL = "/billing/create_bill";
export const HOSPITAL_SHOES = "/shoes";
export const HOSPITAL_SHOES_REQUEST = "/shoes/request/:idRequest";
export const HOSPITAL_BILLING_PATIENT = "/billing/patient/:uuidPatient";
export const HOSPITAL_DEPARTMENTS_SETTINGS_ROUTE = "/departments/settings";
export const HOSPITAL_MY_DEPARTMENTS_ROUTE = "/departments";
export const HOSPITAL_PHARMACY_CENTRAL_ROUTE = "/pharmacy";
export const HOSPITAL_OUTPATIENTS_ROUTE = "/outpatients";
export const HOSPITAL_OUTPATIENTS_EDIT_ROUTE = "/outpatients/:action";
export const HOSPITAL_AGENDA_ROUTE = "/agenda/:uuidAgenda";
export const HOSPITAL_ACTION_AGENDA_ROUTE = "/agenda/:uuidAgenda/:action";