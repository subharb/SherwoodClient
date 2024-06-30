import React from "react";
import { create } from "jss";
import jssPreset from '@mui/styles/jssPreset';
import Routes from "./routes/RoutesProvider";


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
