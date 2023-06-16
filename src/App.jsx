import React from "react";
import { create } from "jss";


import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from "@mui/material/styles";


import jssPreset from '@mui/styles/jssPreset';


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
