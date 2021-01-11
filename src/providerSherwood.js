import React, { Component } from 'react';
import { LocalizeProvider } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "./translations/global.json";
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
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
import App from './App';
import store from "./redux/store/index";

const jss = create({
    ...jssPreset(),
    insertionPoint: document.getElementById("jss-insertion-point"),
});

function OtherProviders(props){
    const theme = useSelector((state) => state.themeReducer);
    return (
        <StylesProvider jss={jss}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiThemeProvider theme={createTheme(theme.currentTheme)}>
                <ThemeProvider theme={createTheme(theme.currentTheme)}>
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
    );
}


export default function ProviderSherwood(props){
    return (
        <Provider store={store}>
            <Helmet
                titleTemplate="%s | Material App"
                defaultTitle="Material App - React Admin & Dashboard Template"
            />
            <OtherProviders>
                { props.children }
            </OtherProviders>
        </Provider>
    )
    
}
