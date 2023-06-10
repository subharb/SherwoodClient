import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import pathLogo from '../../img/logo_sherwood_web.png';
import * as Yup from "yup";
import { Formik } from "formik";
import { signUp } from "../../redux/actions/authActions";
import Register from "../../components/register";

import {
  Button,
  Paper, Grid,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { Alert as MuiAlert } from "@mui/lab";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;


function SignUp(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
      <Wrapper>
        <Grid container spacing={1}>
            <Grid item xs={12} align = "center" justify = "center" alignItems = "center" >
              <img src={pathLogo} alt="Sherwood Science" height="55" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3" gutterBottom display="inline">
                    Sign up!
                </Typography>
            </Grid>
            <Grid item>
                <Helmet title="Sign Up" />
                <Register typeUser="researcher" {...props} />
            </Grid>
        </Grid>
      </Wrapper>        
  );
}

export default SignUp;
