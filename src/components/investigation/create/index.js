import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BasicInfo  from './basic_info2';
import PersonalData from './personal_data';
import Summary from './summary';
import { fetchInvestigation } from '../../../actions';
import axios from 'axios';
import Breadcrumb from '../../general/breadcrumb';
import EDC from './edc';
import { toggleLoading } from '../../../actions';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { Translate } from 'react-localize-redux';
import Helmet from "react-helmet";

const Container = styled.div`
    padding:1rem;
`;
class NewInvestigation extends Component {
    constructor(props){
        super(props);
        
        this.addData = this.addData.bind(this);
        this.stepBack = this.stepBack.bind(this);
        this.goToStep = this.goToStep.bind(this);
        this.saveData = this.saveData.bind(this);

        this.steps = {
            basic_info : "investigation.create.steps.basic_info",
            personal_data:"investigation.create.steps.personal_data",
            edc : "investigation.create.steps.edc",
            // pis : "investigation.create.steps.patient_sheet",
            // consent : "investigation.create.steps.consents",
            summary : "investigation.create.steps.summary"
        }

        const initialState = {step : 0, investigation:{}, resultSave:0}

        this.state = {...this.props.initialState, ...initialState};
    }
    async saveData(publish){
        this.props.toggleLoading();
        let investigationInfo = {...this.state.investigation};
        investigationInfo.publish = publish ? 1 : 0;
    
        console.log("Enviamos: "+JSON.stringify(investigationInfo));
        let response;
        if(this.props.hasOwnProperty("uuidInvestigation")){
            response = await axios.put(process.env.REACT_APP_API_URL+'/researcher/investigation/'+this.props.uuidInvestigation, investigationInfo,  { headers: {"Authorization" : localStorage.getItem("jwt")} })
            .catch(err => {console.log('Catch', err); return err;});
        }
        else{
            response = await axios.post(process.env.REACT_APP_API_URL+'/researcher/investigation', investigationInfo,  { headers: {"Authorization" : localStorage.getItem("jwt")} })
            .catch(err => {console.log('Catch', err); return err;}); 
        }
        
        
        let tempState = {...this.state};
        if(response.request.status === 200){
            console.log("Success!");
            tempState.resultSave = 1;
        }
        else if(response.request.status === 401){
            localStorage.removeItem("jwt");
            tempState.resultSave = 2;
            this.setState(tempState);
        }
        this.setState(tempState);
        this.props.toggleLoading();
        
        
    }
    addData(data){
        console.log("New Data!", JSON.stringify(data));
        let tempState = {...this.state};
        switch(this.state.step){
            case 0:
                tempState.investigation.basic_info = {...data};
                break;
            case 1:
                tempState.investigation.personal_data = data;
                break;
            case 2:
                tempState.investigation.surveys = data.surveys;
                break;
            case 3:
                console.log("Send Information!");
                break;
            default:
                return "Something went wrong";
        }
        tempState.step++;

        this.setState(tempState);
    }
    stepBack(){
        
        let tempState = this.state;
        if(tempState.step > 0){
            tempState.step--;
        }
    
        this.setState(tempState);
    }
    goToStep(step){
        let tempState = this.state;
        if(step >= 0 && step < Object.values(tempState.investigation).length){
            tempState.step = step;
        }
    
        this.setState(tempState);
    }
    render() {
        console.log("Initial data:", this.props.initialState);
        let component = null;
        if(typeof this.props.uuid !== "undefined" && !this.props.investigation){
            return "CARGANDO";
        }
        switch(this.state.step){
            case 0:
                component = <BasicInfo initialData={ this.props.initialState ? this.props.initialState.investigation.basic_info : this.state.investigation.basic_info } 
                                callBackData={this.addData} />
                break;
            // case 1:
            //     component = <PISGenerator callBackData={this.addData} 
            //                     stepBack = {this.stepBack}/>
            //     break;
            // case 2:
            //     component = <AddConsents consents={ this.state.investigation.consents }  personalFields={this.state.investigation.basic_info.personalData} callBackData={this.addData} 
            //                     stepBack = {this.stepBack}/>
            //     break;
            case 1: 
                component = <PersonalData initialData={this.props.initialState ? this.props.initialState.investigation.personal_data : this.state.investigation.personal_data } callBackStepBack = {this.stepBack}  callBackData={this.addData} />
                break;
            case 2: 
                component = <EDC initialData={this.props.initialState ? {surveys : this.props.initialState.investigation.surveys} : this.state.investigation.surveys ? {surveys : this.state.investigation.surveys } : {surveys : [] }} callBackStepBack = {this.stepBack}  callBackData={this.addData} />
                break;
            case 3:
                component = <Summary initialData={ this.state.investigation } callBackStepBack = {this.stepBack} 
                                callBackToStep = {this.goToStep} resultSave={ this.state.resultSave }
                                callBackSave={this.saveData} />
                break;
            default:
                component = "Something went wrong";
                break;
        }
        return(
            <React.Fragment>
                <Helmet title={<Translate id="dashboard.create_investigation" />} />
                <Grid container spacing={3}>
                    <Grid item  xs={12}>
                        <Typography variant="h3" gutterBottom display="inline">
                            <Translate id="dashboard.create_investigation" />
                        </Typography>
                    </Grid>
                    <Grid item  xs={12}>
                        <Breadcrumb callBack={this.goToStep} selected={this.state.step} stages={Object.values(this.steps)} /> 
                    </Grid>
                    <Grid item  xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" gutterBottom display="inline">
                                    <Translate id={`investigation.create.${Object.keys(this.steps)[this.state.step]}.title`} />
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <Translate id={`investigation.create.${Object.keys(this.steps)[this.state.step]}.intro`} />
                                </Typography>
                                {component}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                
            </React.Fragment>
        );
    }
}

NewInvestigation.propTypes = {
    uuid: PropTypes.string,
    initialState:PropTypes.object
}

export default connect(null, { toggleLoading, fetchInvestigation})(NewInvestigation)