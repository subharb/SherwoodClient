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
import { HOSPITAL_PATIENT_DATACOLLECTION, HOSPITAL_PATIENT_SUBMISSION, } from '../../../routes';
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

export function TestsHome(props){
    let location = useLocation();
    if(location.pathname === "/images"){
        return <TestsHomeComponent type={1} {...props} />
    }
    else if(location.pathname === "/lab"){
        return <TestsHomeComponent type={2} {...props}/>
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
    function renderCore(){
        if(edit){
            return (
                <EditServices serviceType={ServiceType.LABORATORY} uuidInvestigation={props.investigations.currentInvestigation.uuid} 
                    surveys={props.investigations.currentInvestigation.surveys} />
            );

        }
        else{
            return <RequestTable serviceType={0} 
                        uuidInvestigation={props.investigations.currentInvestigation.uuid}  />

            if(surveyRecords.length === 0){
                return <Translate id={`pages.hospital.${translations[props.type]}.no-records`} />
            }
            else{
                const hasPersonalPermmissions = props.investigations.currentInvestigation.permissions.includes(PERMISSION.PERSONAL_ACCESS);
                const headerTable = hasPersonalPermmissions ?  [{ id: "researcher", alignment: "left", label: <Translate id="hospital.doctor" />}, { id: "patient", alignment: "left", label: <Translate id="investigation.create.personal_data.fields.name" />},
                { id: "date", alignment: "left", label: "Date"}] : [{ id: "researcher", alignment: "left", label: <Translate id="hospital.doctor" />}, { id: "idPatient", alignment: "left", label: <Translate id="investigation.create.personal_data.fields.name" />},
                { id: "date", alignment: "left", label: "Date"}]
                return (<EnhancedTable noHeader noSelectable selectRow={(index) => goToSubmission(index)} 
                    rows={surveyRecords.map((record, index) => {
                        const dateCreated = new Date(record.createdAt);
                        return hasPersonalPermmissions ? {id : index, researcher : record.researcher, patient : `${record.patient.personalData.name} ${record.patient.personalData.surnames}`, date : `${dateCreated.toLocaleDateString()} ${dateCreated.toLocaleTimeString()}`} : 
                        {id : index, researcher : record.researcher, idPatient : record.patient.id, date : `${dateCreated.toLocaleDateString()} ${dateCreated.toLocaleTimeString()}`}
                        
                    })} headCells={headerTable} />
                );
            } 
        }
        
    }
    // useEffect(() => {
    //     async function fetchRecordsPatient(){
    //         const survey = props.investigations.currentInvestigation.surveys.find(sur => sur.type === props.type);
    //         setLoading(true);
    //         await dispatch(fetchSubmissionsSurveyAction(props.investigations.currentInvestigation.uuid, survey.uuid));
    //         setSurveyTests(survey);
    //         setLoading(false);
    //     }
    //     if(props.investigations.currentInvestigation){
    //         fetchRecordsPatient()
    //     }
    // }, [props.investigations]);

    // useEffect(() => {
    //     if(submissionData.length > 0){
    //         let tempSubmissions = submissionData.reduce((acc, val)=> {
    //             let tempDict = {};
    //             const researcher = val.researcher;
    //             tempDict.researcher = researcher.name+" "+researcher.surnames;
    //             tempDict.id = val.id;
    //             const patient = patients.find(pat => pat.uuid === val.uuid_patient);
    //             tempDict.patient = patient;
    //             tempDict.createdAt = val.createdAt;

    //             return acc.concat(tempDict);
    //         }, []);
    //         tempSubmissions.sort((a, b) => {
    //             const aDate = new Date(a.createdAt);
    //             const bDate = new Date(b.createdAt);
    //             if(aDate.getTime() > bDate.getTime()){
    //                 return -1
    //             }
    //             else{
    //                 return 1;
    //             }
    //         });
    //         setSurveyRecords(tempSubmissions);
    //     }
        
    // }, [submissionData])
    
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