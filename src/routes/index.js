import React from "react";

import async from "../components/Async";

import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  Monitor,
  ShoppingCart,
  PieChart,
  Sliders,
  Users,
  User,
} from "react-feather";
import TimelineIcon from '@material-ui/icons/Timeline';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import GroupIcon from '@material-ui/icons/Group';
import { Home as HomeIcon, Search as SearchPatientIcon, Hotel as HotelIcon,
    PersonAddSharp as AddPatientIcon, Image as ImageIcon,
    PeopleOutline as PeopleOutlineIcon,
    MonetizationOn as MonetizationOnIcon} from "@material-ui/icons";

import Profile from "../pages/pages/Profile";
import  SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page401 from "../pages/auth/Page401";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";
import {Translate} from 'react-localize-redux';


// // Guards
// const AuthGuard = async(() => import("../components/AuthGuard"));

// Auth components
// const SignIn = async(() => import("../pages/auth/SignIn"));
// const SignUp = async(() => import("../pages/auth/SignUp"));
// const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
// const Page404 = async(() => import("../pages/auth/Page404"));
// const Page500 = async(() => import("../pages/auth/Page500"));

// // Components components
// const Alerts = async(() => import("../pages/components/Alerts"));
// const Avatars = async(() => import("../pages/components/Avatars"));
// const Badges = async(() => import("../pages/components/Badges"));
// const Buttons = async(() => import("../pages/components/Buttons"));
// const Cards = async(() => import("../pages/components/Cards"));
// const Chips = async(() => import("../pages/components/Chips"));
// const Dialogs = async(() => import("../pages/components/Dialogs"));
// const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
// const Lists = async(() => import("../pages/components/Lists"));
// const Menus = async(() => import("../pages/components/Menus"));
// const Pagination = async(() => import("../pages/components/Pagination"));
// const Progress = async(() => import("../pages/components/Progress"));
// const Snackbars = async(() => import("../pages/components/Snackbars"));
// const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
// import Default from "../pages/dashboards/Default";
// import  Analytics from "../pages/dashboards/Analytics";
// import SaaS from "../pages/dashboards/SaaS";
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
import Billing from  "../pages/hospital/Billing";
import { WardLocalized, WardModes } from  "../pages/hospital/departments/Ward";
import { FUNCTIONALITY, PERMISSION } from "../constants/types";

export const ROOT_ROUTE = "/";
export const SIGN_IN_ROUTE = "/auth/sign-in";
export const SIGN_UP_ROUTE = "/auth/sign-up";
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
export const HOSPITAL_IMAGES = "/images";
export const HOSPITAL_ANALYTICS = "/analytics";
export const HOSPITAL_USER_MGMT = "/users";
export const HOSPITAL_LAB = "/lab";
export const HOSPITAL_LAB_REQUEST = "/lab/request/:idRequest";
export const HOSPITAL_IMAGING_REQUEST = "/images/request/:idRequest";
export const HOSPITAL_LAB_RESULT = "/lab/result/:idSubmission/patient/:uuidPatient";
export const ROUTE_401 = "/auth/401";
export const HOSPITAL_BILLING = "/billing";
export const HOSPITAL_DEPARTMENTS_SETTINGS_ROUTE = "/departments/settings";
export const HOSPITAL_MY_DEPARTMENTS_ROUTE = "/departments";


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
    permissions : [PERMISSION.BUSINESS_READ],
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

const dashboardMyDepartmentRoutes = {
    id: <Translate id="pages.hospital.inpatients" />,
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
    dashboardImagesRoutes,
    dashboardLabRoutes,
    dashboardAnalyticsRoutes,
    dashboardUserMgmtRoutes,
    dashboardAdminDepartmentRoutes,
    dashboardMyDepartmentRoutes,
    dashboardBillingRoutes
  ];
