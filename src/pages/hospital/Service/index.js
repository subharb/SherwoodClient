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
import RequestTable, { serviceToColor } from './RequestTable';
import FillDataCollection from '../FillDataCollection';
import { fullNamePatient, hasRequestGroupState } from '../../../utils';
import PatientInfo from '../../../components/PatientInfo';
import { fetchProfileInfo } from '../../../redux/actions/profileActions';
import axios from '../../../utils/axios';
import ShowPatientRecords from '../../../components/investigation/show/single/show_patient_records';
import { ColourChip } from '../../../components/general/mini_components-ts';
import RequestSingle from './RequestSingle';

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
    const [edit, setEdit] = useState(false);
    const history = useHistory();
    const idRequest = props.parameters.idRequest;
   
    const dispatch = useDispatch(); 
    const translations = ["patient", "medical-imaging", "laboratory"];


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
        
        nextUrl = HOSPITAL_LAB_FORM.replace(":idRequest", request.id)
        
        
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
        else if(idRequest){
            return (
                <RequestSingle idRequest={idRequest} permissions={props.investigations.currentInvestigation.permissions}
                    uuidInvestigation={props.investigations.currentInvestigation.uuid} researcher={props.researcher}
                    country={props.investigations.currentInvestigation.country} requestSentCallBack={goToHomeTest}
                    surveys={props.investigations.currentInvestigation.surveys}/>
            )
        }
        // else if(submissionData && idSubmission){
        //     const survey = props.investigations.currentInvestigation.surveys.find((survey) => survey.uuid === submissionData.submission.uuidSurvey);
        //     return (
        //         <>  
        //             <Grid container spacing={3}>
        //                 <Grid item xs={12}>
        //                     <Card style={{padding:"1rem"}}>
        //                         <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}>Request ID: </span>{submissionData.requestGroup.id}</Typography> </div>
        //                         <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}>Requested Items: </span>{submissionData.requestGroup.requests.map((request) => <ChipContainer><ColourChip size="small" rgbcolor={serviceToColor(submissionData.requestGroup.type)} label={request.requestServiceInvestigation.serviceInvestigation.service.name}/></ChipContainer>)}</Typography> </div>
        //                     </Card>  
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     <Card style={{padding:"1rem"}}>
        //                         <PatientInfo personalData={patient.personalData} uuidPatient={uuidPatient}/>
        //                     </Card>
        //                 </Grid>
        //             </Grid>
        //             <ShowPatientRecords permissions={props.investigations.currentInvestigation.permissions} survey={survey} 
        //                 mode="elements" callBackEditSubmission={() => console.log("Edit submission")} idSubmission={idSubmission}
        //                 submissions={[submissionData.submission]} surveys={props.investigations.currentInvestigation.surveys} />
        //         </>
        //     )
        // }
        // else if(dataCollectionSelected){
        //     return (
        //         <>
        //             <div style={{padding:'0.75rem'}}>
        //                 <Card style={{padding:"1rem"}}>
        //                     <PatientInfo personalData={patient.personalData} uuidPatient={uuidPatient} />
        //                 </Card>
        //             </div>
        //             <FillDataCollection key={uuidDataCollection} dataCollection={dataCollectionSelected} 
        //                 hideCollectionName={true} requestServiceId={idRequest}
        //                 country={props.investigations.currentInvestigation.country} researcher={props.profile.info}
        //                 uuidPatient={uuidPatient} uuidInvestigation={props.investigations.currentInvestigation.uuid}
        //                 callBackDataCollection={goToHomeTest} />
        //         </>
        //     )
        // }
        else{
            return <RequestTable serviceType={0} showActions={true} fillRequest={true} callBackRequestSelected={(uuidSurvey) => accessRequest(uuidSurvey)}
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
        profile:state.profile,
    }
}

TestsHome.propTypes = {
    personalFields:PropTypes.array,
}

export default connect(mapStateToProps, null)(TestsHome)