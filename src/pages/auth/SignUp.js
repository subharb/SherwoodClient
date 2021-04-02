import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";

import * as Yup from "yup";
import { Formik } from "formik";
import { signUp } from "../../redux/actions/authActions";
import Register from "../../components/register";

import {
  Button,
  Paper, Grid,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
        <Grid container spacing={1}>
            <Grid item>
                <Typography variant="h3" gutterBottom display="inline">
                    Sign up!
                </Typography>
            </Grid>
            <Grid item>
                <Helmet title="Sign Up" />
                <Register typeUser="researcher" />
            </Grid>
        </Grid>
            
        
  );
}

export default SignUp;