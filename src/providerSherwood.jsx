import { LocalizeProvider } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "./translations/global.json";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createTheme from "./theme";
import Routes from "./routes/Routes";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "styled-components";
import { create } from "jss";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";
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

const themeApp = process.env.REACT_APP_PRODUCT === "HOSPITAL" ? createTheme("HOSPITAL") : createTheme("GREEN");
function OtherProviders(props){
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <StylesProvider jss={jss}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CustomThemeProvider theme={themeApp}>
                        
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
                        
                    </CustomThemeProvider>
                    </MuiPickersUtilsProvider>
                </StylesProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export function CustomThemeProvider(props){
    const investigations = useSelector((state) => state.investigations);
    const themeCustom = investigations.currentInvestigation ? investigations.currentInvestigation.aesthetics : null;
    if(themeCustom){
        console.log(themeCustom);
        themeApp.palette.background.default = themeCustom.params.primary.background;
        themeApp.palette.primary.main = themeCustom.params.primary.color;
        themeApp.palette.secondary.main = themeCustom.params.colorWhiteBackground ? themeCustom.params.colorWhiteBackground : themeCustom.params.primary.color;
        themeApp.header.background = themeCustom.params.header ? themeCustom.params.header.background : themeCustom.params.primary.background;
        themeApp.palette.primary.color = themeCustom.params.primary.color;
        themeApp.sidebar.background = themeCustom.params.sidebar.background;
        themeApp.sidebar.color = themeCustom.params.sidebar.color;
        themeApp.sidebar.header.color = themeCustom.params.sidebar.color;
        themeApp.sidebar.header.background = themeCustom.params.sidebar.background;
        themeApp.sidebar.footer.color = themeCustom.params.sidebar.color;
        themeApp.sidebar.footer.background = themeCustom.params.sidebar.background;
        themeApp.buttonContinue.primary.background = themeCustom.params.nextButton.background;
        themeApp.buttonContinue.primary.color = themeCustom.params.nextButton.color;        
    }
    return (
        <MuiThemeProvider theme={themeApp}>
            <ThemeProvider theme={themeApp}>
                {
                    props.children
                }
            </ThemeProvider>
        </MuiThemeProvider>
    )
}

export default function ProviderSherwood(props){
    const title = process.env.REACT_APP_PRODUCT === "HOSPITAL" ? "Hospital platform" : "Researcher platform"
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
