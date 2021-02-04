import React, { useState } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import BasicInfo  from './basic_info2';
import PersonalData from './personal_data';
import Summary from './summary';
import axios from 'axios';
import Breadcrumb from '../../general/breadcrumb';
import EDC from './edc';

import { Card, CardContent, Typography, Grid } from '@material-ui/core';
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
        investigationInfo.publish = publish ? 1 : 0;
    
        console.log("Enviamos: "+JSON.stringify(investigationInfo));
        let response;
        if(props.hasOwnProperty("uuidInvestigation")){
            response = await axios.put(process.env.REACT_APP_API_URL+'/researcher/investigation/'+props.uuidInvestigation, investigationInfo,  { headers: {"Authorization" : localStorage.getItem("jwt")} })
            .catch(err => {console.log('Catch', err); return err;});
        }
        else{
            response = await axios.post(process.env.REACT_APP_API_URL+'/researcher/investigation', investigationInfo,  { headers: {"Authorization" : localStorage.getItem("jwt")} })
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
        setIsLoading(false);
    }
    function addData(data){
        console.log("New Data!", JSON.stringify(data));
        
        let tempInvestigation = {...investigation};
        switch(step){
            case 0:
                tempInvestigation.basic_info = {...data};
                setInvestigation()
                break;
            case 1:
                tempInvestigation.personal_data = data;
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
    
    console.log("Initial data:", props.initialState);
    let component = null;
    if(typeof props.uuid !== "undefined" && !props.investigation){
        return "CARGANDO";
    }
    switch(step){
        case 0:
            component = <BasicInfo initialData={ props.initialState ? props.initialState.investigation.basic_info : investigation.basic_info } 
                            callBackData={addData} />
            break;
        // case 1:
        //     component = <PISGenerator callBackData={addData} 
        //                     stepBack = {stepBack}/>
        //     break;
        // case 2:
        //     component = <AddConsents consents={ investigation.consents }  personalFields={investigation.basic_info.personalData} callBackData={addData} 
        //                     stepBack = {stepBack}/>
        //     break;
        case 1: 
            component = <PersonalData initialData={props.initialState ? props.initialState.investigation.personal_data : investigation.personal_data } callBackStepBack = {stepBack}  callBackData={addData} />
            break;
        case 2: 
            component = <EDC initialData={props.initialState ? {surveys : props.initialState.investigation.surveys} : investigation.surveys ? {surveys : investigation.surveys } : {surveys : [] }} callBackStepBack = {stepBack}  callBackData={addData} />
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
    if(isLoading){
        return <Loader />
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