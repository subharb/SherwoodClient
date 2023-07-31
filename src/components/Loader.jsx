import React from "react";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";


const Root = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

function Loader() {
  return (
    <Root>
      <CircularProgress m={2} color="primary" />
    </Root>
  );
}

export default Loader;
