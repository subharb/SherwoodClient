import React from "react";
import { create } from "jss";
import jssPreset from '@mui/styles/jssPreset';
import Routes from "./routes/RoutesProvider";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  
  const queryClient = new QueryClient()

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Routes />
    </QueryClientProvider>
  );
}

export default App;
