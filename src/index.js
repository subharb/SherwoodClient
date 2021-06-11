import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ProviderSherwood from './providerSherwood';

if (process.env.NODE_ENV === 'production') {
    console.log = function () {};
}

ReactDOM.render(
    <ProviderSherwood>
        <App />
    </ProviderSherwood>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();