import React, { Component } from 'react';
import { LocalizeProvider } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "./translations/global.json";
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default class ProviderSherwood extends Component {
    render() {
        return (
            <Provider store={store}>
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
            </Provider>
        )
    }
}
