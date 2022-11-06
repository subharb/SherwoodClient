import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import iconImages from "../../../img/icons/images_white.png";
import iconLab from "../../../img/icons/lab_white.png";
import { Box, Grid, Paper, Typography, Button, IconButton } from '@material-ui/core';
import Form  from '../../../components/general/form';
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { HOSPITAL_LAB_FORM, HOSPITAL_PATIENT_DATACOLLECTION, HOSPITAL_PATIENT_SUBMISSION, } from '../../../routes';
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
import { ServiceType } from './types';
import RequestTable from './RequestTable';
import FillDataCollection from '../FillDataCollection';

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
    const [surveyTests, setSurveyTests] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const uuidDataCollection = props.parameters.uuidDataCollection;
    const dataCollectionSelected = uuidDataCollection ? props.investigations.currentInvestigation.surveys.find((survey) => survey.uuid === uuidDataCollection) : null;

    const patients = props.patients.data && props.investigations.currentInvestigation ? props.patients.data[props.investigations.currentInvestigation.uuid] : [];
    const submissionData = props.submissions.data && surveyTests && props.investigations.currentInvestigation ? props.submissions.data[props.investigations.currentInvestigation.uuid][surveyTests.uuid].submissions : [];
    const dispatch = useDispatch(); 
    const translations = ["patient", "medical-imaging", "laboratory"];

    function goToSubmission(index){
        console.log(surveyRecords[index]);
        const patient = surveyRecords[index].patient
        const nextUrl = HOSPITAL_PATIENT_SUBMISSION.replace(":uuidPatient", patient.uuid).replace(":action", "show").replace(":idSubmission", surveyRecords[index].id);
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    function toogleEditLab(){
        setEdit(edit => !edit);
    }
    function goToSurvey(request){
        const nextUrl = HOSPITAL_LAB_FORM.replace(":uuidDataCollection", request.survey.uuid).replace(":uuidPatient", request.patientInvestigation.uuid)
        history.push(nextUrl);
    }
    function renderCore(){
        if(edit){
            return (
                <EditServices serviceType={ServiceType.LABORATORY} uuidInvestigation={props.investigations.currentInvestigation.uuid} 
                    surveys={props.investigations.currentInvestigation.surveys} />
            );
        }
        else if(uuidDataCollection){
            return <FillDataCollection key={uuidDataCollection} dataCollection={dataCollectionSelected} 
                        patientId={props.patientId} investigation={props.investigations.currentInvestigation} 
                        callBackDataCollection={(values) => console.log(values)}/>
        }
        else{
            return <RequestTable serviceType={0} showActions={true} callBackRequestEdit={(uuidSurvey) => goToSurvey(uuidSurvey)}
                        encryptionData={{
                            encryptedKeyUsed : props.investigations.currentInvestigation.encryptedKeyUsed,
                            keyResearcherInvestigation: props.investigations.currentInvestigation.keyResearcherInvestigation,
                            permissions: props.investigations.currentInvestigation.permissions,
                            personalFields: props.investigations.currentInvestigation.personalFields 
                        }}
                        uuidInvestigation={props.investigations.currentInvestigation.uuid}  />

        }
        
    }
    
    if(!props.investigations.currentInvestigation){
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
        patients:state.patients
    }
}

TestsHome.propTypes = {
    personalFields:PropTypes.array,
}

export default connect(mapStateToProps, null)(TestsHome)