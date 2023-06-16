import React from "react";

import async from "../components/Async";

import {
  Briefcase,
  Sliders,
  Users,
} from "react-feather";
import TimelineIcon from '@mui/icons-material/Timeline';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import GroupIcon from '@mui/icons-material/Group';
import { Home as HomeIcon, Search as SearchPatientIcon, Hotel as HotelIcon,
    PersonAddSharp as AddPatientIcon, Image as ImageIcon,
    PeopleOutline as PeopleOutlineIcon,
    MonetizationOn as MonetizationOnIcon,
    LocalPharmacy as LocalPharmacyIcon,
    Today as TodayIcon,
    DirectionsRun} from "@mui/icons-material";

import Profile from "../pages/pages/Profile";
import  SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page401 from "../pages/auth/Page401";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";
import {Translate} from 'react-localize-redux';

import CreateInvestigation from "../components/investigation/create";

import Investigations from "../components/investigation/show/all";
import Investigation  from "../components/investigation";
import ShareInvestigationRouter from "../components/investigation/share/wrapper";

import HomeSchedule from "../pages/hospital/HomeSchedule";

import Patient from "../pages/hospital/patient";
import SearchPatients from "../pages/hospital/SearchPatients";
import TestsHome from "../pages/hospital/Service";
import AddPatient from "../pages/hospital/AddPatient";
import Analytics from "../pages/hospital/Analytics";
import UserManagement from "../components/investigation/share";
import Departments from  "../pages/hospital/departments/Admin";
import InPatients from  "../pages/hospital/departments/Inpatients";
import PharmacyCentral from  "../pages/hospital/Pharmacy";
import Billing from  "../pages/hospital/Billing";
import { WardLocalized, WardModes } from  "../pages/hospital/departments/Ward";
import { FUNCTIONALITY } from "../constants/types";
import Pharmacy from "../pages/hospital/Pharmacy";
import Outpatients from "../pages/hospital/Outpatients";
import { PERMISSION } from "../components/investigation/share/user_roles";
import { CATEGORY_DEPARTMENT_SHOE } from "../constants";
import SingleAgenda from "../pages/hospital/Outpatients/SingleAgenda";
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
export const HOSPITAL_PATIENT_SUBMISSION = "/patient/:uuidPatient/:action/submission/:idSubmission";
export const HOSPITAL_PATIENT_SINGLE_SUBMISSION = "/patient/:uuidPatient/:action/submission/:idSubmission/:single?";
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


const hospitalRoutes = {
    id: "Hospital",
    path: HOSPITAL_HOME_ROUTE,
    icon: <Briefcase />,
    badge: "8",
    component: null,
    children: [
        {
            path: HOSPITAL_HOME_ROUTE,
            name: "Home",
            component: HomeSchedule
        },
        {
            path: ROOT_ROUTE,
            name: "Home",
            component: HomeSchedule
        },
        {
            path: MY_SCHEDULE_ROUTE,
            name: "My Schedule",
            component: HomeSchedule
        },
        {
            path: SEARCH_PATIENT_ROUTE,
            name: "Search Patient",
            component: SearchPatients
        },
        {
            path: HOSPITAL_PATIENT,
            name: "Patient",
            component: Patient
        },
        {
            path: ADD_PATIENT_ROUTE,
            name: "Add Patient",
            component: AddPatient
        },
        {
            path: HOSPITAL_PATIENT_EDIT_PERSONAL_DATA,
            name: "Edit Patient",
            component: AddPatient
        },
        {
            path: HOSPITAL_PATIENT_SECTION,
            name: "Patient Section",
            component: Patient
        },
        {
            path: HOSPITAL_PATIENT_MEDICAL_NOTE,
            name: "Patient Medidal Note",
            component: Patient
        },
        {
            path: HOSPITAL_PATIENT_DATACOLLECTION,
            name: "Patient Data Collection",
            component: Patient
        },
        {
            path: HOSPITAL_PATIENT_SUBMISSION,
            name: "Patient Submission",
            component: Patient
        },
        {
            path: HOSPITAL_PATIENT_SINGLE_SUBMISSION,
            name: "Patient Submission",
            component: Patient
        },
        {
            path: HOSPITAL_PATIENT_TESTS,
            name: "Patient Tests",
            component: Patient
        },
        {
            path: HOSPITAL_PATIENT_MAKE_TESTS,
            name: "Patient Tests",
            component: Patient
        },
        
        {
            path: HOSPITAL_IMAGES,
            name: "Hospital Images",
            component: TestsHome
        },
        {
            path: HOSPITAL_LAB_REQUEST,
            name: "Hospital Lab",
            component: TestsHome
        },
        {
            path: HOSPITAL_SHOES_REQUEST,
            name: "Hospital Lab",
            component: TestsHome
        },
        
        {
            path: HOSPITAL_PHARMACY_REQUEST,
            name: "Hospital Pharmacy",
            component: Pharmacy
        },
        {
            path: HOSPITAL_PHARMACY_REQUEST_NEW,
            name: "Hospital Pharmacy",
            component: Pharmacy
        },
        {
            path: HOSPITAL_PHARMACY_REQUEST_INVENTORY,
            name: "Hospital Pharmacy",
            component: Pharmacy
        },
        {
            path: HOSPITAL_IMAGING_REQUEST,
            name: "Hospital Lab",
            component: TestsHome
        },
        {
            path: HOSPITAL_LAB_RESULT,
            name: "Hospital Lab",
            component: TestsHome
        },
        
        {
            path: HOSPITAL_LAB,
            name: "Hospital Lab",
            component: TestsHome
        },
        {
            path: HOSPITAL_SHOES,
            name: "Shoes",
            component: TestsHome
        },
        {
            path: ROUTE_401,
            name: "401 Page",
            component: Page401,
        },
        {
            path: HOSPITAL_ANALYTICS,
            name: "Analytics",
            component: Analytics,
        },
        {
            path: HOSPITAL_USER_MGMT,
            name: "User Management",
            component: UserManagement,
        },
        {
            path: HOSPITAL_DEPARTMENTS_SETTINGS_ROUTE,
            name: "Departments",
            component: () => <Departments admin={true}/>,
        },
        {
            path: HOSPITAL_MY_DEPARTMENTS_ROUTE,
            name: "My Departments",
            component: () => <InPatients />,
        },
        {
            path: HOSPITAL_PHARMACY_CENTRAL_ROUTE,
            name: "Pharmacy Central",
            component: () => <PharmacyCentral />,
        },
        {
            path: HOSPITAL_OUTPATIENTS_ROUTE,
            name: "Outpatients",
            component: () => <Outpatients />,
        },

        {
            path: HOSPITAL_OUTPATIENTS_EDIT_ROUTE,
            name: "Outpatients",
            component: () => <Outpatients />,
        },
        {
            path: HOSPITAL_AGENDA_ROUTE,
            name: "Agenda",
            exact: true,
            component: () => <SingleAgenda  />,
        },
        {
            path: HOSPITAL_ACTION_AGENDA_ROUTE,
            name: "Agenda",
            exact: true,
            component: () => <SingleAgenda  />,
        },
        {
            path: HOSPITAL_WARD_ROUTE,
            name: "Ward",
            component: () => <WardLocalized mode={WardModes.View} />,
        },
        
        {
            path: HOSPITAL_WARD_SETTINGS_ROUTE,
            name: "Ward",
            component: () => <WardLocalized mode={WardModes.Edit} />,
        },
        {
            path: HOSPITAL_WARD_ASSIGN_PATIENT_ROUTE,
            name: "Ward",
            component: () =>  <WardLocalized mode={WardModes.AssignPatient} />,
        },
        {
            path: HOSPITAL_BILLING,
            name: "Billing",
            component: () =>  <Billing/>,
        },
        {
            path: HOSPITAL_BILLING_PATIENT,
            name: "Billing",
            component: () =>  <Billing/>,
        }
        
    ],
  };

const dashboardHomeRoutes = {
    id: <Translate id="pages.hospital.home" />,
    path: HOSPITAL_HOME_ROUTE,
    icon: <HomeIcon />,
    badge: "",
    permissions : [],
    functionalities:[],
    component: {
        path: ROOT_ROUTE,
        name: "Home",
        component: HomeSchedule
    },
    children: null
}

const dashboardSearchPatientRoutes = {
    id: <Translate id="pages.hospital.search-patient.title" />,
    path: SEARCH_PATIENT_ROUTE,
    icon: <FindInPageIcon />,
    badge: "",
    permissions : [PERMISSION.MEDICAL_READ],
    functionalities:[],
    component: {
        path: SEARCH_PATIENT_ROUTE,
        name: "Search Patient",
        component: SearchPatients
    },
    children: null
}


const dashboardImagesRoutes = {
    id: <Translate id="pages.hospital.medical-imaging.title" />,
    path: HOSPITAL_IMAGES,
    icon: <ImageIcon />,
    badge: "",
    permissions : [PERMISSION.MEDICAL_READ],
    functionalities:[],
    component: {
        path: HOSPITAL_IMAGES,
        name: "Images",
        component: TestsHome
    },
    children: null
}

const dashboardLabRoutes = {
    id: <Translate id="pages.hospital.laboratory.title" />,
    path: HOSPITAL_LAB,
    icon: <SearchPatientIcon />,
    badge: "",
    permissions : [PERMISSION.MEDICAL_READ],
    functionalities:[],
    component: {
        path: HOSPITAL_LAB,
        name: "Laboratory",
        component: TestsHome
    },
    children: null
}

const dashboardShoesRoutes = {
    id: <Translate id="hospital.shoe_shop.title" />,
    path: HOSPITAL_SHOES,
    icon: <DirectionsRun />,
    badge: "",
    categoryDepartment:[CATEGORY_DEPARTMENT_SHOE],
    permissions : [],
    functionalities:[FUNCTIONALITY.SHOE_SHOP],
    component: {
        path: HOSPITAL_SHOES,
        name: "Shoe Shop",
        component: TestsHome
    },
    children: null
}

const dashboardAddPatientRoutes = {
    id: <Translate id="pages.hospital.add-patient" />,
    path: ADD_PATIENT_ROUTE,
    icon: <AddPatientIcon />,
    badge: "",
    permissions : [PERMISSION.PERSONAL_ACCESS],
    functionalities:[],
    component: {
        path: ADD_PATIENT_ROUTE,
        name: "Add Patient",
        component: AddPatient
    },
    children: null
}

const dashboardAnalyticsRoutes = {
    id: <Translate id="pages.hospital.analytics" />,
    path: HOSPITAL_ANALYTICS,
    icon: <TimelineIcon />,
    badge: "",
    permissions : [PERMISSION.BUSINESS_READ, PERMISSION.ANALYTICS_DEPARTMENT],
    functionalities:[],
    component: {
        path: ADD_PATIENT_ROUTE,
        name: "Analytics",
        component: Analytics
    },
    children: null
}

const dashboardUserMgmtRoutes = {
    id: <Translate id="pages.hospital.user_mgmt" />,
    path: HOSPITAL_USER_MGMT,
    icon: <GroupIcon />,
    badge: "",
    permissions : [PERMISSION.SHARE_RESEARCHERS],
    functionalities:[],
    component: {
        path: ADD_PATIENT_ROUTE,
        name: "User Mgmt",
        component: UserManagement
    },
    children: null
}

const dashboardAdminDepartmentRoutes = {
    id: <Translate id="pages.hospital.admin-departments" />,
    path: HOSPITAL_DEPARTMENTS_SETTINGS_ROUTE,
    icon: <PeopleOutlineIcon />,
    badge: "",
    permissions : [PERMISSION.SHARE_RESEARCHERS],
    functionalities:[],
    component: {
        path: HOSPITAL_DEPARTMENTS_SETTINGS_ROUTE,
        name: "Departments",
        component: () => <Departments admin={true} />
    },
    children: null
}

const dashboardInpatientsRoutes = {
    id: <Translate id="pages.hospital.inpatients.title" />,
    path: HOSPITAL_MY_DEPARTMENTS_ROUTE,
    icon: <HotelIcon />,
    badge: "",
    permissions : [PERMISSION.MEDICAL_READ],
    functionalities:[FUNCTIONALITY.HOSPITALIZATION],
    component: {
        path: HOSPITAL_MY_DEPARTMENTS_ROUTE,
        name: "My Departments",
        component: () => <InPatients />
    },
    children: null
}

const dashboardPharmacyCentralRoutes = {
    id: <Translate id="pages.hospital.pharmacy.title" />,
    path: HOSPITAL_PHARMACY_CENTRAL_ROUTE,
    icon: <LocalPharmacyIcon />,
    badge: "",
    permissions : [PERMISSION.UPDATE_PHARMACY_CENTRAL, PERMISSION.MAKE_PHARMACY_REQUESTS, PERMISSION.MANAGE_PHARMACY_CENTRAL],
    functionalities:[FUNCTIONALITY.PHARMACY_CENTRAL],
    component: {
        path: HOSPITAL_PHARMACY_CENTRAL_ROUTE,
        name: "Pharmacy Central",
        component: () => <PharmacyCentral />
    },
    children: null
}

const dashboardOutpatientsRoutes = {
    id: <Translate id="pages.hospital.outpatients.title" />,
    path: HOSPITAL_OUTPATIENTS_ROUTE,
    icon: <TodayIcon />,
    badge: "",
    permissions : [PERMISSION.CREATE_APPOINTMENTS, PERMISSION.VISUALIZE_APPOINTMENTS],
    functionalities:[FUNCTIONALITY.OUTPATIENTS],
    component: {
        path: HOSPITAL_OUTPATIENTS_ROUTE,
        name: "Outpatients",
        component: () => <Outpatients />
    },
    children: null
}

const dashboardBillingRoutes = {
    id: <Translate id="hospital.billing.title" />,
    path: HOSPITAL_BILLING,
    icon: <MonetizationOnIcon />,
    badge: "",
    permissions : [PERMISSION.MEDICAL_READ],
    functionalities:[FUNCTIONALITY.BILLING],
    component: {
        path: HOSPITAL_BILLING,
        name: "Billing",
        component: () => <Billing />
    },
    children: null
}

const dashboardHospitalRoutes = {
    id: "Hospital",
    path: HOSPITAL_HOME_ROUTE,
    icon: <Briefcase />,
    badge: "8",
    component: null,
    children: [
        {
            path: ROOT_ROUTE,
            name: "Home",
            component: HomeSchedule
        },
        {
            path: SEARCH_PATIENT_ROUTE,
            name: "Search Patient",
            component: SearchPatients
        },
        {
            path: ADD_PATIENT_ROUTE,
            name: "Add Patient",
            component: AddPatient
        }
    ],
}
const investigationsRoutes = {
    id: "Investigations",
    path: ALL_INVESTIGATIONS_ROUTE,
    icon: <Briefcase />,
    badge: "8",
    permissions : [],
    functionalities:[],
    component: Investigations,
    children: [
        {
            path: ALL_INVESTIGATIONS_ROUTE,
            name: "All",
            component: () => <Investigations filter="all" />,
        },
        {
            path: DRAFT_INVESTIGATIONS_ROUTE,
            name: "Draft",
            component: () => <Investigations filter="draft" />,
        },
        {
            path: LIVE_INVESTIGATIONS_ROUTE,
            name: "Live",
            component: () => <Investigations filter="live" /> ,
        },
        {
            path: PENDING_INVESTIGATIONS_ROUTE,
            name: "Pending",
            component: () => <Investigations filter="pending" /> ,
        }
    ],
  };

const dashboardsRoutes = {
  id: "Create Investigation",
  path: "/",
  header: "Pages",
  icon: <Sliders />,
  component:CreateInvestigation,
  permissions : [],
  functionalities : [],
  children: null,
};
const dashboardsNotSideBarRoutes = {
    id: "Dashboard",
    path: "/dashboard",
    header: "Pages",
    icon: <Sliders />,
    containsHome: true,
    children: [
        {
            path: PROFILE_ROUTE,
            name: "Profile",
            component: Profile,
        },
        {
            path: CREATE_INVESTIGATION_ROUTE,
            name: "CreateInvestigation",
            component: CreateInvestigation,
        },
        {
            path: EDIT_INVESTIGATION_ROUTE,
            name: "EditInvestigation",
            component: () => <Investigation status={0} /> ,
        },
        {
            path: SHOW_INVESTIGATION_ROUTE,
            name: "Live",
            component: () => <Investigation /> ,
        },
        {
            path: SHARE_INVESTIGATION_ROUTE,
            name: "Share",
            component: ShareInvestigationRouter ,
        },
    ]}

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: SIGN_IN_ROUTE,
      name: "Sign In",
      component: SignIn,
    },
    {
      path: SIGN_UP_ROUTE,
      name: "Sign Up",
      component: SignUp,
    },
    {
        path: SIGN_UP_ROUTE_INVESTIGATION,
        name: "Sign Up",
        component: () => <SignUp doesCreateInvestigation={true} />,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
        path: "/auth/401",
        name: "401 Page",
        component: Page401,
      },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};


// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  //pagesRoutes,
  investigationsRoutes,
  //projectsRoutes,
  dashboardsNotSideBarRoutes
//   orderRoutes,
//   invoiceRoutes,
//   tasksRoutes,
//   calendarRoutes,
//   componentsRoutes,
//   chartRoutes,
//   formsRoutes,
//   tablesRoutes,
//   iconsRoutes,
//   mapsRoutes,
//   documentationRoutes,
//   changelogRoutes,
];

export const hospitalLayoutRoutes = [
    
    //pagesRoutes,
    hospitalRoutes
  //   orderRoutes,
  //   invoiceRoutes,
  //   tasksRoutes,
  //   calendarRoutes,
  //   componentsRoutes,
  //   chartRoutes,
  //   formsRoutes,
  //   tablesRoutes,
  //   iconsRoutes,
  //   mapsRoutes,
  //   documentationRoutes,
  //   changelogRoutes,
  ];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes using the Presentation layout
//export const presentationLayoutRoutes = [landingRoutes];

// Routes that are protected
//export const protectedRoutes = [protectedPageRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  investigationsRoutes,
];

export const sidebarRoutesHospital = [
    dashboardHomeRoutes,
    dashboardSearchPatientRoutes,
    dashboardAddPatientRoutes,
    dashboardOutpatientsRoutes,
    dashboardInpatientsRoutes,
    dashboardLabRoutes,
    dashboardImagesRoutes,
    dashboardPharmacyCentralRoutes,
    dashboardShoesRoutes,
    dashboardUserMgmtRoutes,
    dashboardAdminDepartmentRoutes,
    dashboardBillingRoutes,
    dashboardAnalyticsRoutes,
  ];
