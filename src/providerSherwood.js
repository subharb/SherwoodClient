import React, { Component } from 'react';
import { LocalizeProvider } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "./translations/global.json";
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createTheme from "./theme";
import Routes from "./routes/Routes";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "styled-components/macro";
import { create } from "jss";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";
import {
    useQuery,
    useMutation,
    useQueryClient,
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
    const theme = useSelector((state) => state.themeReducer);
    return (
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <StylesProvider jss={jss}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <MuiThemeProvider theme={createTheme("GREEN")}>
                    <ThemeProvider theme={createTheme("GREEN")}>
                        <LocalizeProvider initialize={{
                            languages: [
                            { name: "English", code: "en" },
                            { name: "Spanish", code: "es" }
                            ],
                            translation: globalTranslations,
                            options: {
                            defaultLanguage: "en",
                                renderToStaticMarkup: renderToStaticMarkup
                            }
                        }}>
                            { props.children }
                        </LocalizeProvider>
                    </ThemeProvider>
                </MuiThemeProvider>
                </MuiPickersUtilsProvider>
            </StylesProvider>
        </BrowserRouter>
        </QueryClientProvider>
    );
}


export default function ProviderSherwood(props){
    return (
        <Provider store={store}>
            <Helmet
                titleTemplate="%s | Sherwood"
                defaultTitle="Sherwood - Researcher platform"
            />
            <OtherProviders>
                { props.children }
            </OtherProviders>
        </Provider>
    )
    
}
