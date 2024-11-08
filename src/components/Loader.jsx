import React from "react";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";


const Root = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

function Loader(props) {
  return (
    <Root>
        <div>
      <CircularProgress m={2} color="secondary" />
      </div>
      <div>
      { props.infoString ? <p>{props.infoString}</p> : null }
      </div>
    </Root>
  );
}

export default Loader;
