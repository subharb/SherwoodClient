import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';

import { Box, Grid, Paper, Typography, Button, IconButton, Card } from '@material-ui/core';
import Form  from '../../../components/general/form';
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { HOSPITAL_LAB_REQUEST, HOSPITAL_LAB, HOSPITAL_PATIENT_SUBMISSION, HOSPITAL_LAB_RESULT, HOSPITAL_IMAGING_REQUEST, } from '../../../routes';
import Loader from '../../../components/Loader';

import {
    useLocation
  } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchSubmissionsSurveyAction } from '../../../redux/actions/submissionsActions';
import { PERMISSION } from '../../../constants/types';
import styled from 'styled-components';
import { IconGenerator } from '../../../components/general/mini_components';
import EditServices from './Edit';
import { RequestStatus, ServiceType } from './types';
import RequestTable, { serviceToColor } from './RequestTable';
import FillDataCollection from '../FillDataCollection';
import { fullNamePatient, hasRequestGroupState } from '../../../utils';
import PatientInfo from '../../../components/PatientInfo';
import { fetchProfileInfo } from '../../../redux/actions/profileActions';
import axios from '../../../utils/axios';
import ShowPatientRecords from '../../../components/investigation/show/single/show_patient_records';
import { ColourChip } from '../../../components/general/mini_components-ts';
import RequestSingle from './RequestSingle';
import { TYPE_REQUEST_LAB } from '../../../constants';
import SectionHeader from '../../components/SectionHeader';



export function TestsHome(props){
    let location = useLocation();
    const parameters = useParams();
    if(location.pathname.includes("/images")){
        return <TestsHomeComponent type={ServiceType.IMAGING} parameters={parameters} {...props} />
    }
    else if(location.pathname.includes("/lab")){
        return <TestsHomeComponent type={ServiceType.LABORATORY} parameters={parameters} {...props}/>
    }
    else return null;
}

export function TestsHomeComponent(props) {
    const [edit, setEdit] = useState(false);
    const history = useHistory();
    const idRequest = props.parameters.idRequest;
   
    const dispatch = useDispatch(); 
    const translations = [ "laboratory", "medical-imaging"];


    useEffect(() => {
        
        if(props.investigations.currentInvestigation){
            if(!props.profile.info){
                dispatch(fetchProfileInfo(props.investigations.currentInvestigation.uuid));
            }
        }
    }, [ props.investigations]);
    
    function toogleEditLab(){
        setEdit(edit => !edit);
    }
    function accessRequest(request){
        let nextUrl = null;
        
        if(props.type === TYPE_REQUEST_LAB){
            nextUrl = HOSPITAL_LAB_REQUEST.replace(":idRequest", request.id)    
        }
        else{
            nextUrl = HOSPITAL_IMAGING_REQUEST.replace(":idRequest", request.id)
        }
        
        
        
        if(nextUrl){
            history.push(nextUrl);
        }
        
    }
    function goToHomeTest(){
        history.push(HOSPITAL_LAB);
    }
    function renderCore(){
        if(edit){
            return (
                <EditServices serviceType={props.type} uuidInvestigation={props.investigations.currentInvestigation.uuid} 
                    surveys={props.investigations.currentInvestigation.surveys} />
            );
        }
        else if(idRequest){
            return (
                <RequestSingle idRequest={idRequest} permissions={props.investigations.currentInvestigation.permissions}
                    uuidInvestigation={props.investigations.currentInvestigation.uuid} researcher={props.researcher}
                    country={props.investigations.currentInvestigation.country} requestSentCallBack={goToHomeTest}
                    surveys={props.investigations.currentInvestigation.surveys}/>
            )
        }
        else{
            return <RequestTable serviceType={props.type} showActions={true} fillRequest={true} callBackRequestSelected={(uuidSurvey) => accessRequest(uuidSurvey)}
                        encryptionData={{
                            encryptedKeyUsed : props.investigations.currentInvestigation.encryptedKeyUsed,
                            keyResearcherInvestigation: props.investigations.currentInvestigation.keyResearcherInvestigation,
                            permissions: props.investigations.currentInvestigation.permissions,
                            personalFields: props.investigations.currentInvestigation.personalFields 
                        }}
                        surveys={props.investigations.currentInvestigation.surveys}
                        uuidInvestigation={props.investigations.currentInvestigation.uuid}  />

        }
        
    }
    
    if(!props.investigations.currentInvestigation){
        return <Loader />
    }
    return (
        <React.Fragment>
            <Grid container spacing={6} >
                <SectionHeader section={translations[props.type]} edit={edit} editCallback={toogleEditLab} />
                <Grid item xs={12}>
                    {
                        renderCore()
                    }     
                </Grid>         
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
    return {
        investigations:state.investigations,
        submissions:state.submissions,
        patients:state.patients,
        profile:state.profile,
    }
}

TestsHome.propTypes = {
    personalFields:PropTypes.array,
}

export default connect(mapStateToProps, null)(TestsHome)