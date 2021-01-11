import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import DateFnsUtils from "@date-io/date-fns";
import { LocalizeProvider } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "./translations/global.json";
import { ThemeProvider } from "styled-components/macro";
import { create } from "jss";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";

import createTheme from "./theme";
import Routes from "./routes/Routes";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {
  

  return (
    <Routes />
  );
}

export default App;
