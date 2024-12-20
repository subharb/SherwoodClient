import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Helmet from "react-helmet";

import { Button as MuiButton, Typography } from "@mui/material";
import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
  background: transparent;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function Page404() {
  return (
    <Wrapper>
      <Helmet title="Can't access resource" />
      <Typography component="h1" variant="h1" align="center" gutterBottom>
        401 
      </Typography>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        Can't access resource.
      </Typography>
      <Typography component="h2" variant="body1" align="center" gutterBottom>
        You don't have permission to access this resource. Please contact the admin of your hospital.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        color="secondary"
        mt={2}
      >
        Return to website
      </Button>
    </Wrapper>
  );
}

export default Page404;
