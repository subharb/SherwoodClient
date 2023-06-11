import React from "react";
import styled from "styled-components";

import CircularProgress from '@mui/joy/CircularProgress';


const Root = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

function Loader() {
  return (
    <Root>
      <CircularProgress m={2} color="blue" />
    </Root>
  );
}

export default Loader;
