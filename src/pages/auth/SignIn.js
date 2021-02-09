import React, { useState} from "react";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE, CREATE_INVESTIGATION_ROUTE } from '../../routes';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { signIn } from "../../services/authService";
import Loader from '../../components/Loader';

import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
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

const BigAvatar = styled(Avatar)`
    width: 92px;
    height: 92px;
    text-align: center;
    margin: 0 auto ${(props) => props.theme.spacing(5)}px;
`;

function SignIn() {

    const dispatch = useDispatch();
    const history = useHistory();

    const avatarUrl = localStorage.getItem("avatar");
    const researcherName = localStorage.getItem("researcherName");
    const researcherEmail = localStorage.getItem("researcherEmail");
    

    return (
        <Wrapper>
            <Helmet title="Sign In" />
            {
                avatarUrl &&
                <BigAvatar alt={researcherName} src={avatarUrl} />
            }
            {researcherName ? (
                <React.Fragment>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        Welcome back, {researcherName}!
                    </Typography>
                    <Typography component="h2" variant="body1" align="center">
                        Sign in to your account to continue 
                    </Typography>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        Welcome to Sherwood!
                    </Typography>
                    <Typography component="h2" variant="body1" align="center">
                        Sign in to your account to continue or 
                        <Button
                            component={Link}
                            to="/auth/sign-up"
                            fullWidth
                            color="primary"
                            >
                            sign up
                            </Button>
                    </Typography>
                </React.Fragment>    
            )}
            
        <Formik
            initialValues={{
            email: researcherEmail,
            submit: false,
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email("Must be a valid email")
                    .max(255)
                    .required("Email is required"),
                password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {               
                await signIn({ email: values.email, password: values.password}, "researcher");
                const previousRoute = history.location.state && history.location.state.from;
                if(typeof previousRoute === "undefined" || previousRoute === SIGN_UP_ROUTE || previousRoute == SIGN_IN_ROUTE){
                    history.push(CREATE_INVESTIGATION_ROUTE)
                }
                else{
                    history.goBack();
                }
                
            } catch (error) {
                const message = error.message || "Something went wrong";

                setStatus({ success: false });
                setErrors({ submit: message });
                setSubmitting(false);
               
            }
            }}
        >
            {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
            }) => (
            <form noValidate onSubmit={handleSubmit}>
                {errors.submit && (
                <Alert mt={2} mb={1} severity="warning">
                    {errors.submit}
                </Alert>
                )}
                <TextField
                type="email"
                name="email"
                label="Email Address"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
                />
                <TextField
                type="password"
                name="password"
                label="Password"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    data-testid="continue"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                >
                Sign in
                </Button>
                <Button
                    component={Link}
                    to="/auth/reset-password"
                    fullWidth
                    color="primary"
                    >
                    Forgot password
                </Button>
            </form>
            )}
        </Formik>
        </Wrapper>
  );
}

export default SignIn;
