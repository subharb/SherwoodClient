import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import "./mocks";
import ProviderSherwood from './providerSherwood';

ReactDOM.render(
    <ProviderSherwood>
        <App />
    </ProviderSherwood>,
    document.getElementById("root")
);
