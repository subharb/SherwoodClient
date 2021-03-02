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
} from "react-feather";

import Profile from "../pages/pages/Profile";
import  SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";



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
import ListPatients from "../pages/hospital/ListPatients";
import Patient from "../pages/hospital/Patient";
import SearchPatients from "../pages/hospital/SearchPatients";
// // Forms components
// const Pickers = async(() => import("../pages/forms/Pickers"));
// const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
// const Selects = async(() => import("../pages/forms/Selects"));
// const TextFields = async(() => import("../pages/forms/TextFields"));
// const Dropzone = async(() => import("../pages/forms/Dropzone"));
// const Editors = async(() => import("../pages/forms/Editors"));
// const Formik = async(() => import("../pages/forms/Formik"));

// // Icons components
// const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
// const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// // Pages components
//const Blank = async(() => import("../pages/pages/Blank"));
// const InvoiceDetails = async(() => import("../pages/pages/InvoiceDetails"));
// const InvoiceList = async(() => import("../pages/pages/InvoiceList"));
// const Orders = async(() => import("../pages/pages/Orders"));
//const Pricing = async(() => import("../pages/pages/Pricing"));
//const Profile = async(() => import("../pages/pages/Profile"));

//const Settings = async(() => import("../pages/pages/Settings"));
// const Tasks = async(() => import("../pages/pages/Tasks"));
// const Projects = async(() => import("../pages/pages/Projects"));
// const Investigations = async(() => import("../components/investigation/show/all"));
// const Investigation = async(() => import("../components/investigation"));
// const ShareInvestigation = async(() => import("../components/investigation/share"));

// const DraftInvestigations = async(() => import("../components/investigation/show/all"));
// const LiveInvestigations = async(() => import("../components/investigation/show/all"));

// const Calendar = async(() => import("../pages/pages/Calendar"));
//const Chat = async(() => import("../pages/pages/Chat"));

// // Tables components
// const SimpleTable = async(() => import("../pages/tables/SimpleTable"));
// const AdvancedTable = async(() => import("../pages/tables/AdvancedTable"));
// const DataGrid = async(() => import("../pages/tables/DataGrid"));

// // Chart components
// const Chartjs = async(() => import("../pages/charts/Chartjs"));

// // Maps components
// const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
// const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// // Documentation
// const Welcome = async(() => import("../pages/docs/Welcome"));
// const GettingStarted = async(() => import("../pages/docs/GettingStarted"));
// const EnvironmentVariables = async(() =>
//   import("../pages/docs/EnvironmentVariables")
// );
// const Deployment = async(() => import("../pages/docs/Deployment"));
// const Theming = async(() => import("../pages/docs/Theming"));
// const StateManagement = async(() => import("../pages/docs/StateManagement"));
// const APICalls = async(() => import("../pages/docs/APICalls"));
// const ESLintAndPrettier = async(() =>
//   import("../pages/docs/ESLintAndPrettier")
// );
// const Support = async(() => import("../pages/docs/Support"));
// const Changelog = async(() => import("../pages/docs/Changelog"));

// // Landing
// const Landing = async(() => import("../pages/presentation/Landing"));

// // Protected routes
// const ProtectedPage = async(() => import("../pages/protected/ProtectedPage"));

// const Investigations = async(() => import("../components/investigation/show/all"));
// const Investigation = async(() => import("../components/investigation"));
// const ShareInvestigation = async(() => import("../components/investigation/share"));

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
export const HOSPITAL_WARD_ROUTE = "/hospital-ward";
export const OUTPATIENTS_ROUTE = "/outpatients";
export const HOSPITAL_PATIENT = "/patient/:idPatient";



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
            path: HOSPITAL_WARD_ROUTE,
            name: "Hospital Ward",
            component: ListPatients
        },
        {
            path: OUTPATIENTS_ROUTE,
            name: "Outpatients",
            component:ListPatients
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
        // {
        //     path: DRAFT_INVESTIGATIONS_ROUTE,
        //     name: "Draft",
        //     component: () => <Investigations filter="draft" />,
        // },
        // {
        //     path: LIVE_INVESTIGATIONS_ROUTE,
        //     name: "Live",
        //     component: () => <Investigations filter="live" /> ,
        // },
        // {
        //     path: PENDING_INVESTIGATIONS_ROUTE,
        //     name: "Pending",
        //     component: () => <Investigations filter="pending" /> ,
        // }
    ],
  };

const investigationsRoutes = {
    id: "Investigations",
    path: ALL_INVESTIGATIONS_ROUTE,
    icon: <Briefcase />,
    badge: "8",
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
// const pagesRoutes = {
//   id: "Pages",
//   path: "/pages",
//   icon: <Layout />,
//   children: [
//     {
//       path: "/pages/profile",
//       name: "Profile",
//       component: Profile,
//     },
//     {
//       path: "/pages/settings",
//       name: "Settings",
//       component: Settings,
//     },
//     {
//       path: "/pages/pricing",
//       name: "Pricing",
//       component: Pricing,
//     },
//     {
//       path: "/pages/chat",
//       name: "Chat",
//       component: Chat,
//     },
//     {
//       path: "/pages/blank",
//       name: "Blank Page",
//       component: Blank,
//     },
//   ],
//   component: null,
// };


// const projectsRoutes = {
//   id: "Projects",
//   path: "/projects",
//   icon: <Briefcase />,
//   badge: "8",
//   component: Projects,
//   children: null,
// };

// const invoiceRoutes = {
//   id: "Invoices",
//   path: "/invoices",
//   icon: <CreditCard />,
//   children: [
//     {
//       path: "/invoices",
//       name: "List",
//       component: InvoiceList,
//     },
//     {
//       path: "/invoices/detail",
//       name: "Details",
//       component: InvoiceDetails,
//     },
//   ],
//   component: null,
// };

// const orderRoutes = {
//   id: "Orders",
//   path: "/orders",
//   icon: <ShoppingCart />,
//   component: Orders,
//   children: null,
// };

// const tasksRoutes = {
//   id: "Tasks",
//   path: "/tasks",
//   icon: <CheckSquare />,
//   badge: "17",
//   component: Tasks,
//   children: null,
// };

// const calendarRoutes = {
//   id: "Calendar",
//   path: "/calendar",
//   icon: <CalendarIcon />,
//   component: Calendar,
//   children: null,
// };

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
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

// const componentsRoutes = {
//   id: "Components",
//   path: "/components",
//   header: "Elements",
//   icon: <Grid />,
//   children: [
//     {
//       path: "/components/alerts",
//       name: "Alerts",
//       component: Alerts,
//     },
//     {
//       path: "/components/avatars",
//       name: "Avatars",
//       component: Avatars,
//     },
//     {
//       path: "/components/badges",
//       name: "Badges",
//       component: Badges,
//     },
//     {
//       path: "/components/buttons",
//       name: "Buttons",
//       component: Buttons,
//     },
//     {
//       path: "/components/cards",
//       name: "Cards",
//       component: Cards,
//     },
//     {
//       path: "/components/chips",
//       name: "Chips",
//       component: Chips,
//     },
//     {
//       path: "/components/dialogs",
//       name: "Dialogs",
//       component: Dialogs,
//     },
//     {
//       path: "/components/expansion-panels",
//       name: "Expansion Panels",
//       component: ExpPanels,
//     },
//     {
//       path: "/components/lists",
//       name: "Lists",
//       component: Lists,
//     },
//     {
//       path: "/components/menus",
//       name: "Menus",
//       component: Menus,
//     },
//     {
//       path: "/components/pagination",
//       name: "Pagination",
//       component: Pagination,
//     },
//     {
//       path: "/components/progress",
//       name: "Progress",
//       component: Progress,
//     },
//     {
//       path: "/components/snackbars",
//       name: "Snackbars",
//       component: Snackbars,
//     },
//     {
//       path: "/components/tooltips",
//       name: "Tooltips",
//       component: Tooltips,
//     },
//   ],
//   component: null,
// };

// const formsRoutes = {
//   id: "Forms",
//   path: "/forms",
//   icon: <CheckSquare />,
//   children: [
//     {
//       path: "/forms/pickers",
//       name: "Pickers",
//       component: Pickers,
//     },
//     {
//       path: "/forms/selection-controls",
//       name: "Selection Controls",
//       component: SelectionCtrls,
//     },
//     {
//       path: "/forms/selects",
//       name: "Selects",
//       component: Selects,
//     },
//     {
//       path: "/forms/text-fields",
//       name: "Text Fields",
//       component: TextFields,
//     },
//     {
//       path: "/forms/dropzone",
//       name: "Dropzone",
//       component: Dropzone,
//     },
//     {
//       path: "/forms/editors",
//       name: "Editors",
//       component: Editors,
//     },
//     {
//       path: "/forms/formik",
//       name: "Formik",
//       component: Formik,
//     },
//   ],
//   component: null,
// };

// const tablesRoutes = {
//   id: "Tables",
//   path: "/tables",
//   icon: <List />,
//   children: [
//     {
//       path: "/tables/simple-table",
//       name: "Simple Table",
//       component: SimpleTable,
//     },
//     {
//       path: "/tables/advanced-table",
//       name: "Advanced Table",
//       component: AdvancedTable,
//     },
//     {
//       path: "/tables/data-grid",
//       name: "Data Grid",
//       component: DataGrid,
//     },
//   ],
//   component: null,
// };

// const iconsRoutes = {
//   id: "Icons",
//   path: "/icons",
//   icon: <Heart />,
//   children: [
//     {
//       path: "/icons/material-icons",
//       name: "Material Icons",
//       component: MaterialIcons,
//     },
//     {
//       path: "/icons/feather-icons",
//       name: "Feather Icons",
//       component: FeatherIcons,
//     },
//   ],
//   component: null,
// };

// const chartRoutes = {
//   id: "Charts",
//   path: "/charts",
//   icon: <PieChart />,
//   component: Chartjs,
//   children: null,
// };

// const mapsRoutes = {
//   id: "Maps",
//   path: "/maps",
//   icon: <Map />,
//   children: [
//     {
//       path: "/maps/google-maps",
//       name: "Google Maps",
//       component: GoogleMaps,
//     },
//     {
//       path: "/maps/vector-maps",
//       name: "Vector Maps",
//       component: VectorMaps,
//     },
//   ],
//   component: null,
// };

// const landingRoutes = {
//   id: "Landing Page",
//   path: "/",
//   header: "Docs",
//   icon: <Monitor />,
//   component: Landing,
//   children: null,
// };

// const documentationRoutes = {
//   id: "Documentation",
//   path: "/documentation",
//   header: "Material App",
//   icon: <BookOpen />,
//   children: [
//     {
//       path: "/documentation/welcome",
//       name: "Welcome",
//       component: Welcome,
//     },
//     {
//       path: "/documentation/getting-started",
//       name: "Getting Started",
//       component: GettingStarted,
//     },
//     {
//       path: "/documentation/environment-variables",
//       name: "Environment Variables",
//       component: EnvironmentVariables,
//     },
//     {
//       path: "/documentation/deployment",
//       name: "Deployment",
//       component: Deployment,
//     },
//     {
//       path: "/documentation/theming",
//       name: "Theming",
//       component: Theming,
//     },
//     {
//       path: "/documentation/state-management",
//       name: "State Management",
//       component: StateManagement,
//     },
//     {
//       path: "/documentation/api-calls",
//       name: "API Calls",
//       component: APICalls,
//     },
//     {
//       path: "/documentation/eslint-and-prettier",
//       name: "ESLint & Prettier",
//       component: ESLintAndPrettier,
//     },
//     {
//       path: "/documentation/support",
//       name: "Support",
//       component: Support,
//     },
//   ],
//   component: null,
// };

// const changelogRoutes = {
//   id: "Changelog",
//   path: "/changelog",
//   badge: "v2.0.0",
//   icon: <List />,
//   component: Changelog,
//   children: null,
// };

// This route is only visible while signed in
// const protectedPageRoutes = {
//   id: "Private",
//   path: "/private",
//   component: ProtectedPage,
//   children: null,
//   guard: AuthGuard,
// };

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
  //pagesRoutes,
  investigationsRoutes,
  //projectsRoutes,
//   orderRoutes,
//   invoiceRoutes,
//   tasksRoutes,
//   calendarRoutes,
//   authRoutes,
//   componentsRoutes,
//   chartRoutes,
//   formsRoutes,
//   tablesRoutes,
//   iconsRoutes,
//   mapsRoutes,
//   documentationRoutes,
//   changelogRoutes,
];
