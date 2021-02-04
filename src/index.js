import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import makeServer from "./server";
import ProviderSherwood from './providerSherwood';

// if (
//     process.env.NODE_ENV === "development" &&
//     typeof makeServer === "function"
//   ) {
//     makeServer(); // For people following the tutorial
//   } 

ReactDOM.render(
    <ProviderSherwood>
        <App />
    </ProviderSherwood>,
    document.getElementById("root")
);
