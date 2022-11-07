import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import iconImages from "../../../img/icons/images_white.png";
import iconLab from "../../../img/icons/lab_white.png";
import { Box, Grid, Paper, Typography, Button, IconButton, Card } from '@material-ui/core';
import Form  from '../../../components/general/form';
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { HOSPITAL_LAB_FORM, HOSPITAL_LAB, HOSPITAL_PATIENT_SUBMISSION, HOSPITAL_LAB_RESULT, } from '../../../routes';
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
import RequestTable from './RequestTable';
import FillDataCollection from '../FillDataCollection';
import { fullNamePatient } from '../../../utils';
import PatientInfo from '../../../components/PatientInfo';
import { fetchProfileInfo } from '../../../redux/actions/profileActions';
import axios from '../../../utils/axios';
import ShowPatientRecords from '../../../components/investigation/show/single/show_patient_records';

export function TestsHome(props){
    let location = useLocation();
    const parameters = useParams();
    if(location.pathname.includes("/images")){
        return <TestsHomeComponent type={1} parameters={parameters} {...props} />
    }
    else if(location.pathname.includes("/lab")){
        return <TestsHomeComponent type={2} parameters={parameters} {...props}/>
    }
    else return null;
}

const IconHolder = styled.div`
    padding-right:1rem;
    padding-left:1rem;
`;

export function TestsHomeComponent(props) {
    const [ surveyRecords, setSurveyRecords] = useState([]);
    const [edit, setEdit] = useState(false);
    const [dataCollectionSelected, setDataCollectionSelected] = useState(false);
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const uuidDataCollection = props.parameters.uuidDataCollection;
    const uuidPatient = props.parameters.uuidPatient;
    const idRequest = props.parameters.idRequest;
    const idSubmission = parseInt(props.parameters.idSubmission);
    const [submissionData, setSubmissionData] = useState(null);
   
    const dispatch = useDispatch(); 
    const translations = ["patient", "medical-imaging", "laboratory"];


    useEffect(() => {
        if(props.investigations.currentInvestigation){
            setDataCollectionSelected(props.investigations.currentInvestigation.surveys.find((survey) => survey.uuid === uuidDataCollection));
        }
    }, [ props.investigations, uuidDataCollection]);

    useEffect(() => {
        async function fetchSubmission(){
            setLoading(true);
        
            const response = await axios(`${process.env.REACT_APP_API_URL}/researcher/investigation/${props.investigations.currentInvestigation.uuid}/submission/${idSubmission}`, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                    .catch(err => {console.log('Catch', err); return err;});
            if(response.status === 200){
                setSubmissionData(response.data);
            }
            setLoading(false);
        }
        if(props.investigations.currentInvestigation){
            setPatient(props.investigations.currentInvestigation.patientsPersonalData.find((patient) => patient.uuid === uuidPatient));
            if(!props.profile.info){
                dispatch(fetchProfileInfo(props.investigations.currentInvestigation.uuid));
            }
            if(idSubmission){
                fetchSubmission()
            }
        }
    }, [ props.investigations, uuidPatient, idSubmission]);
    
    function toogleEditLab(){
        setEdit(edit => !edit);
    }
    function accessRequest(requestService){
        let nextUrl = null;
        if(requestService.submissionPatient && requestService.request.status === RequestStatus.COMPLETED){
            nextUrl = HOSPITAL_LAB_RESULT.replace(":idSubmission", requestService.submissionPatient.id)
                                        .replace(":uuidPatient", requestService.patientInvestigation.uuid);
        }
        else if(requestService.request.status === RequestStatus.ACCEPTED){
            nextUrl = HOSPITAL_LAB_FORM.replace(":uuidDataCollection", requestService.serviceInvestigation.survey.uuid)
                                        .replace(":uuidPatient", requestService.patientInvestigation.uuid)
                                        .replace(":idRequest", requestService.id)
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
                <EditServices serviceType={ServiceType.LABORATORY} uuidInvestigation={props.investigations.currentInvestigation.uuid} 
                    surveys={props.investigations.currentInvestigation.surveys} />
            );
        }
        else if(submissionData && idSubmission){
            const survey = props.investigations.currentInvestigation.surveys.find((survey) => survey.uuid === submissionData.submission.uuidSurvey);
            return (
                <>
                    
                        <Card style={{padding:"1rem"}}>
                            <PatientInfo personalData={patient.personalData} />
                        </Card>
                    
                    <ShowPatientRecords permissions={props.investigations.currentInvestigation.permissions} survey={survey} 
                        mode="elements" callBackEditSubmission={() => console.log("Edit submission")} idSubmission={idSubmission}
                        submissions={[submissionData.submission]} surveys={props.investigations.currentInvestigation.surveys} />
                </>
            )
        }
        else if(dataCollectionSelected){
            return (
                <>
                    <div style={{padding:'0.75rem'}}>
                        <Card style={{padding:"1rem"}}>
                            <PatientInfo personalData={patient.personalData} />
                        </Card>
                    </div>
                    <FillDataCollection key={uuidDataCollection} dataCollection={dataCollectionSelected} 
                        hideCollectionName={true} requestServiceId={idRequest}
                        country={props.investigations.currentInvestigation.country} researcher={props.profile.info}
                        uuidPatient={uuidPatient} uuidInvestigation={props.investigations.currentInvestigation.uuid}
                        callBackDataCollection={goToHomeTest} />
                </>
            )
        }
        else{
            return <RequestTable serviceType={0} showActions={true} fillRequest={true} callBackRequestEdit={(uuidSurvey) => accessRequest(uuidSurvey)}
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
    
    if(!props.investigations.currentInvestigation || props.patientsSubmissions.loading || loading){
        return <Loader />
    }
    return (
        <React.Fragment>
            <Grid container spacing={6} >
                <Grid container alignItems="center" alignContent="center" item xs={12}>
                    <IconHolder>
                        <img src={props.type === 1 ? iconImages : iconLab } alt="images" width="20" />
                    </IconHolder>
                    <div>
                        <Typography variant="h3" gutterBottom display="inline" style={{marginBottom:"0px", color:"white"}}>
                            <Translate id={`pages.hospital.${translations[props.type]}.title`} />
                        </Typography>
                        <IconButton 
                            onClick={(e) => {
                                toogleEditLab();
                            }}>
                            <IconGenerator style={{  color: "white" }} type={!edit ? "settings" : "back"} />
                        </IconButton>
                    </div>
                </Grid>
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
        patientsSubmissions:state.patientsSubmissions,
        profile:state.profile,
    }
}

TestsHome.propTypes = {
    personalFields:PropTypes.array,
}

export default connect(mapStateToProps, null)(TestsHome)