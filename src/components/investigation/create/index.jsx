import React, { useState, useEffect } from 'react';
import { Alert } from "@mui/lab";
import { SIGN_IN_ROUTE } from '../../../routes';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BasicInfo  from './basic_info2';
import PersonalData from './personal_data';
import Summary from './summary';
import axios from 'axios';
import Breadcrumb from '../../general/breadcrumb';
import EDC from './edc';
import { Link } from '@mui/material';
import { encryptData, generateKey } from '../../../utils/index.jsx';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Translate, withLocalize } from 'react-localize-redux';
import Helmet from "react-helmet";
import Loader from '../../../components/Loader';

const Container = styled.div`
    padding:1rem;
`;
export function NewInvestigation(props){
    const [step, setStep] = useState(props.initialState && props.initialState.step ? props.initialState.step : 0);
    const [investigation, setInvestigation] = useState(props.initialState && props.initialState.investigation ? props.initialState.investigation : {});
    const [resultSave, setResultSave] = useState(props.initialState && props.initialState.resultSave ? props.initialState.resultSave : 0);
    const [isLoading, setIsLoading] = useState(props.initialState && props.initialState.isLoading ? props.initialState.isLoading : false);
    const [errorEncryption, setErrorEncryption] = useState(props.initialState && props.initialState.error ? props.initialState.error : false);

    const steps = {
        basic_info : "investigation.create.steps.basic_info",
        personal_data:"investigation.create.steps.personal_data",
        edc : "investigation.create.steps.edc",
        // pis : "investigation.create.steps.patient_sheet",
        // consent : "investigation.create.steps.consents",
        summary : "investigation.create.steps.summary"
    }
    async function saveData(publish){
        setIsLoading(true);
        let investigationInfo = {...investigation};
        
        investigationInfo = {...investigationInfo, ...investigation.basic_info};
        delete investigationInfo.basic_info;
        
        investigationInfo.status = publish ? 1 : 0;

        const rawKeyResearcherInvestigation = await generateKey();
        investigationInfo.keyResearcherInvestigation = encryptData(rawKeyResearcherInvestigation, localStorage.getItem("rawKeyResearcher"));
    
        console.log("Enviamos: "+JSON.stringify(investigationInfo));
        let response;
        if(props.hasOwnProperty("uuid")){
            response = await axios.put(import.meta.env.VITE_APP_API_URL+'/researcher/investigation/'+props.uuid, investigationInfo,  { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;});
        }
        else{
            response = await axios.post(import.meta.env.VITE_APP_API_URL+'/researcher/investigation', investigationInfo,  { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
        }
        
        if(response.request.status === 200){
            console.log("Success!");
            setResultSave(1);
        }
        else if(response.request.status === 401){
            localStorage.removeItem("jwt");
            setResultSave(2);
        }
        else{
            setResultSave(3);
        }
        setIsLoading(false);
    }
    function addData(data){
        console.log("New Data!", JSON.stringify(data));
        
        let tempInvestigation = {...investigation};
        switch(step){
            case 0:
                tempInvestigation.basic_info = {...data};
                break;
            case 1:
                tempInvestigation.personalFields = data;
                break;
            case 2:
                tempInvestigation.surveys = data.surveys;
                break;
            case 3:
                console.log("Send Information!");
                break;
            default:
                return "Something went wrong";
        }
        setInvestigation(tempInvestigation);
        setStep(s => s + 1);
    }
    function stepBack(){
        if(step > 0){
            setStep(s => s - 1);
        }
    }
    function goToStep(aStep){
        
        if(aStep >= 0 && aStep < Object.values(investigation).length){
            setStep(aStep);
        }
    }
    useEffect(() => {
        if(!localStorage.getItem("password")){
            console.error("No password stored!");
            setErrorEncryption(true)
        }
    }, [])

    useEffect(() => {
        if(props.initialState && props.initialState.hasOwnProperty("isLoading")){
            setIsLoading(props.initialState.isLoading)
        }
        if(props.initialState && props.initialState.hasOwnProperty("investigation")){
            setInvestigation(props.initialState.investigation)
        }

    }, [props.initialState ])

    console.log("Initial data:", props.initialState);
    let component = null;
    if(isLoading || (typeof props.uuid !== "undefined" && !investigation)){
        return <Loader />
    }
    else if(resultSave === 2){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Alert mb={4} severity="error">
                        <Translate id="error.not_login" />
                    </Alert>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        <Link to={SIGN_IN_ROUTE}>Continue to sign in</Link>
                    </Typography>
                </Grid>
            </Grid>            
        )
    }
    else if(errorEncryption || resultSave === 3){
        return (<Alert mb={4} severity="error">
                <Translate id="investigation.share.error.description" />
            </Alert>)
    }
    switch(step){
        case 0:
            component = <BasicInfo initialData={ props.initialState ? props.initialState.investigation : investigation } 
                            callBackData={addData} />
            break;
        case 1: 
            component = <PersonalData initialData={props.initialState ? props.initialState.investigation.personalFields : investigation.personalFields } callBackStepBack = {stepBack}  callBackData={addData} />
            break;
        case 2: 
            component = <EDC initialData={props.initialState ? {surveys : props.initialState.investigation.surveys, departments:props.initialState.investigation.departments} : investigation.surveys ? {surveys : investigation.surveys } : {surveys : [] }} callBackStepBack = {stepBack}  callBackData={addData} />
            break;
        case 3:
            component = <Summary initialData={ investigation } callBackStepBack = {stepBack} 
                            callBackToStep = {goToStep} resultSave={ resultSave }
                            callBackSave={saveData} />
            break;
        default:
            component = "Something went wrong";
            break;
    }
    
    return(
        <React.Fragment>
            <Helmet title={props.translate("dashboard.create_investigation")} />
            <Grid container spacing={3}>
                <Grid item  xs={12}>
                    <Typography variant="h3" gutterBottom display="inline">
                        <Translate id="dashboard.create_investigation" />
                    </Typography>
                </Grid>
                <Grid item  xs={12}>
                    <Breadcrumb callBack={goToStep} selected={step} stages={Object.values(steps).map(step => props.translate(step))} /> 
                </Grid>
                <Grid item  xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" gutterBottom display="inline">
                                <Translate id={`investigation.create.${Object.keys(steps)[step]}.title`} />
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <Translate id={`investigation.create.${Object.keys(steps)[step]}.intro`} />
                            </Typography>
                        </CardContent>
                    </Card> 
                </Grid>
                <Grid item  xs={12}>
                    {component}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

NewInvestigation.propTypes = {
    uuid: PropTypes.string,
    initialState:PropTypes.object
}

export default withLocalize(NewInvestigation)