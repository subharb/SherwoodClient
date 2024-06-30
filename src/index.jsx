import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ProviderSherwood from './providerSherwood';
import ErrorBoundary from "./components/general/ErrorBoundary";
import mixpanel from 'mixpanel-browser';
import * as Sentry from "@sentry/react";


let dsn = "";//"https://4e273ea1b6e04f6cb8f483979eb3233a@o491166.ingest.sentry.io/5992676";
if (import.meta.env.PROD) {
    console.log = function () {};
    dsn = "https://1e889cc84edc4a2fa8fffba2173af28b@o491166.ingest.sentry.io/5556260";
    //LogRocket.init('apd2q8/sherwood');
}

Sentry.init({
    dsn: dsn,
  
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 1.0,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
  
    integrations: [new Sentry.Replay()],
});

mixpanel.init(import.meta.env.VITE_APP_MIXPANEL_TOKEN);
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

serviceWorkerRegistration.unregister();
// serviceWorkerRegistration.register({
//   onSuccess: () => console.log("[Service Worker] Installation Success"),
//   onUpdate: reg => {
//     const registrationWaiting = reg.waiting;
//     if (registrationWaiting) {
//       registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
//       registrationWaiting.addEventListener('statechange', e => {
//         if (e.target.state === 'activated') {
//           window.location.reload();
//         }
//       });
//     }
//     console.log("[Service Worker] Update Success")
//   },
// });