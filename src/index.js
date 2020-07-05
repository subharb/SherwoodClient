import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { LocalizeProvider } from "react-localize-redux";
import globalTranslations from "./translations/global.json";
import { renderToStaticMarkup } from "react-dom/server";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Home from './components/home';
import Login from './components/dashboard/login';
import Dashboard from './components/dashboard';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

const store = createStore(reducers, {}, applyMiddleware(thunk));
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
});

axios.defaults.headers['Authorization'] = localStorage.getItem('jwt');

ReactDom.render(
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
            <BrowserRouter>
                <Switch>
                <Route exact path="/login" children={(props) => <Login {...props} /> } />
                <Route exact path="/dashboard" children={(props) => <Dashboard {...props} /> } />
                <Route exact path="/investigation/:action/:uuid?" children={(props) => <Dashboard {...props} /> } />
                <Route exact path="/" children={(props) => <Home {...props} />} />
                </Switch>
            </BrowserRouter>
        </LocalizeProvider>
    </Provider>, document.getElementById('root')
);