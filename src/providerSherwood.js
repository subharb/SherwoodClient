import React, { Component } from 'react';
import { LocalizeProvider } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "./translations/global.json";
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { ThemeProvider }  from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducers, {}, applyMiddleware(thunk));

const theme = {
    buttonContinue : {
        background : "#48bb78",
        color : "#FFF"
    },
    buttonCancel: {
        background : "#e53e3e",
        color : "#FFF"
    },
    error : {
        color : "#e53e3e",
    },
    edit : {
        color : "#81e6d9",
    }

}

export default class ProviderSherwood extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
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
                            {this.props.children}
                        </LocalizeProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        )
    }
}
