import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ProviderSherwood from './providerSherwood';
import ErrorBoundary from "./components/general/ErrorBoundary";
import mixpanel from 'mixpanel-browser';
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";


if (process.env.NODE_ENV === 'production') {
    console.log = function () {};
}


mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN);
// or with require() syntax:
// const mixpanel = require('mixpanel-browser');

ReactDOM.render(
    <ProviderSherwood>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </ProviderSherwood>,
    document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

//serviceWorkerRegistration.register();
serviceWorkerRegistration.register({
  onSuccess: () => console.log("[Service Worker] Installation Success"),
  onUpdate: reg => {
    const registrationWaiting = reg.waiting;
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
      registrationWaiting.addEventListener('statechange', e => {
        if (e.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
    console.log("[Service Worker] Update Success")
  },
});