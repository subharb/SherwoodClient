import { LocalizeProvider } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "./translations/global.json";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createTheme from "./theme";
import { CustomThemeProvider } from "./themeProvider";
import { Helmet } from "react-helmet";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "styled-components";
import { create } from "jss";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import StylesProvider from '@mui/styles/StylesProvider';
import jssPreset from '@mui/styles/jssPreset';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import store from "./redux/store/index";
import axios from 'axios';

const jss = create({
    ...jssPreset(),
    insertionPoint: document.getElementById("jss-insertion-point"),
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

// Create a client
const queryClient = new QueryClient()


function OtherProviders(props){
    
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <StylesProvider jss={jss}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CustomThemeProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <LocalizeProvider initialize={{
                                languages: [
                                { name: "English", code: "en" },
                                { name: "Spanish", code: "es" },
                                { name: "Français", code: "fr" }
                                ],
                                translation: globalTranslations,
                                options: {
                                defaultLanguage: localStorage.getItem("language") ? localStorage.getItem("language") :  "en",
                                    renderToStaticMarkup: renderToStaticMarkup
                                }
                            }}>
                                { props.children }
                            </LocalizeProvider>
                        </LocalizationProvider>
                    </CustomThemeProvider>
                    </MuiPickersUtilsProvider>
                </StylesProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}


export default function ProviderSherwood(props){
    const title = import.meta.env.VITE_APP_PRODUCT === "HOSPITAL" ? "Hospital platform" : "Researcher platform"
    if (props.initStore) {
        props.initStore.map((initObject) => {
            store.dispatch({ type: initObject.type, payload: initObject.payload })
        })
    }
    return (
        <Provider store={store}>
            <Helmet
                titleTemplate="%s | Sherwood"
                defaultTitle={title}
            />
            <OtherProviders>
                { props.children }
            </OtherProviders>
        </Provider>
    )
    
}
