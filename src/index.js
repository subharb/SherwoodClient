import React from 'react';
import ReactDom from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ProviderSherwood from './providerSherwood';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Home from './components/home';
import Login from './components/dashboard/login';
import RegisterUser from './components/register';
import Dashboard from './components/dashboard';
import { ThemeProvider }  from 'styled-components';
import M from 'materialize-css';



const store = createStore(reducers, {}, applyMiddleware(thunk));
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
});

axios.defaults.headers['Authorization'] = localStorage.getItem('jwt');
Sentry.init({
    dsn: "https://1e889cc84edc4a2fa8fffba2173af28b@o491166.ingest.sentry.io/5556260",
    autoSessionTracking: true,
    integrations: [
      new Integrations.BrowserTracing(),
    ],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

ReactDom.render(
    <ProviderSherwood>
            <Switch>
                <Route exact path="/:type(patient|researcher)/login" children={(props) => <Login {...props} /> } />
                <Route exact path="/:type(patient|researcher)/register/:uuidPatient?" children={(props) => <RegisterUser typeUser={props.match.params.type} /> } />
                <Route exact path="/dashboard" children={(props) => <Dashboard /> } />
                <Route exact path="/investigation/:action/:uuid?" children={(props) => <Dashboard action={props.match.params.action} uuid={props.match.params.uuid} /> } />
                <Route exact path="/" children={(props) => <Home {...props} />} />
            </Switch>
    </ProviderSherwood>, document.getElementById('root')
);