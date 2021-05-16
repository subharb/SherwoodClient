
import React, { useState, useEffect, useRef } from 'react'

import { connect } from 'react-redux';
import { Grid, Typography, Paper, Snackbar, Button, IconButton } from '@material-ui/core';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { postSubmissionPatientAction, updateSubmissionPatientAction } from '../../redux/actions/submissionsPatientActions';
import { fetchSubmissionsPatientInvestigationAction } from '../../redux/actions/submissionsPatientActions';
import Loader from '../../components/Loader';
import { BoxBckgr, IconPatient, ButtonAdd, ButtonGreyBorderGrey, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import Modal from '../../components/general/modal';
import { useParams, useHistory } from 'react-router-dom';
import { yearsFromDate, daysFromDate, numberRecordsSection } from '../../utils';
import FillDataCollection from './FillDataCollection';
import { Translate } from 'react-localize-redux';
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { HOSPITAL_PATIENT, HOSPITAL_PATIENT_DATACOLLECTION, HOSPITAL_PATIENT_EDIT_PERSONAL_DATA,
        HOSPITAL_PATIENT_MEDICAL_NOTE, HOSPITAL_PATIENT_SECTION, HOSPITAL_PATIENT_TESTS } from '../../routes';
import { CloseIcon } from '@material-ui/data-grid';
import ShowPatientRecords from '../../components/investigation/show/single/show_patient_records';
import iconNotes from "../../img/icons/history.png";
import iconImages from "../../img/icons/images.png";
import iconLab from "../../img/icons/lab.png";
import iconNotesGreen from "../../img/icons/history_green.png";
import iconImagesGreen from "../../img/icons/images_green.png";
import iconLabGreen from "../../img/icons/lab_green.png";
import { useUpdateEffect } from '../../hooks';


const WhiteTypography = styled(Typography)`
    color:white;
    font-size: 1rem;
`;

function Patient(props) {
    const [loading, setLoading] = useState(props.initialState ? props.initialState.loading : false)
    const [error, setError] = useState(props.initialState ? props.initialState.error : false)
    const [saved, setSaved] = useState(props.initialState ? props.initialState.saved : false);
    
    const [showSnackbar, setShowSnackbar] = useState({show : false, message:""});
    const [surveyRecords, setSurveyRecords] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [indexMedicalNote, setIndexMedicalNote] = useState(null);
    const [indexDataCollection, setIndexDataCollection] = useState(-1);
    const [savedDataCollection, setSavedDataCollection] = useState(false);
    const [indexSection, setIndexSection] = useState(-1);

    
    const dispatch = useDispatch();
    let { uuidPatient } = useParams();
    let { uuidSection } = useParams();
    let { uuidDataCollection } = useParams();
    let { action } = useParams();
    
    const parameters = useParams();
    const idSubmission = parameters["idSubmission"] ? parseInt(parameters["idSubmission"]) : parameters["idSubmission"];
    
    const history = useHistory();

    const isInitialMount = useRef(true);

    //const surveyRecords = props.patientsSubmissions.data && props.patientsSubmissions.data[uuidPatient] ? props.patientsSubmissions.data[uuidPatient] : [];
    const patient = props.investigations.data && props.patients.data ? props.patients.data[props.investigations.currentInvestigation.uuid].find(pat => pat.uuid === uuidPatient) : null
    const dataCollectionSelected = props.investigations.data && typeof uuidDataCollection !== "undefined" ? props.investigations.currentInvestigation.surveys.find(sur => sur.uuid === uuidDataCollection) : indexDataCollection !== -1 ? props.investigations.currentInvestigation.surveys[indexDataCollection] : null;
    const sectionSelected = dataCollectionSelected && typeof uuidSection !== "undefined" ? dataCollectionSelected.sections.find(sec => sec.uuid === uuidSection) : null;
    
    const filterValue = !parameters.hasOwnProperty("typeTest") ? 0 : parameters["typeTest"] === "images" ? 1 : 2;
    const filteredRecords = surveyRecords ? surveyRecords.filter(rec => rec.typeSurvey === filterValue) : [];

    function addRecord(){
        if(!parameters.hasOwnProperty("typeTest")){
            setShowOptions(!showOptions);
        }
        else{
            const filterType = parameters.typeTest === "images" ? 1 : 2;
            const dataCollection = props.investigations.currentInvestigation.surveys.find(sur => sur.type === filterType);

            const nextUrl = HOSPITAL_PATIENT_SECTION.replace(":uuidDataCollection", dataCollection.uuid)
                .replace(":uuidPatient", uuidPatient).replace(":action", "fill").replace(":uuidSection", dataCollection.sections[0].uuid)
                .replace(":idSubmission", "");
            history.push(nextUrl);
        }
    }
    function goToTest(value){
        const nextUrl = HOSPITAL_PATIENT_TESTS.replace(":uuidPatient", uuidPatient).replace(":typeTest", value === 1 ? "images" : "lab")
        history.push(nextUrl);
    }

    function fillDataCollection(indexCollection){
        setIndexDataCollection(indexCollection);
    }
    function callBackEditSubmission(idSubmission, uuidSection){
        const nextUrl = HOSPITAL_PATIENT_SECTION.replace(":uuidDataCollection", dataCollectionSelected.uuid)
                .replace(":uuidPatient", uuidPatient).replace(":action", "update").replace(":uuidSection", uuidSection)
                .replace(":idSubmission", idSubmission);
        setShowOptions(false);
        //setIndexDataCollection(-1);
        setIndexSection(-1);
        history.push(nextUrl);
    }
    function sectionSelect(indexSection){
        setSavedDataCollection(false);
        const sectionSelected = dataCollectionSelected.sections[indexSection];

        let isDisabled = false;
        if(!sectionSelected.repeats){
            const patientSubmissions = props.patientsSubmissions.data[uuidPatient].hasOwnProperty(dataCollectionSelected.uuid) ? props.patientsSubmissions.data[uuidPatient][dataCollectionSelected.uuid].submissions : [];
            isDisabled =  numberRecordsSection(sectionSelected, patientSubmissions) > 0;
        }
        
        if(isDisabled){
            setShowSnackbar({show:true, severity: "warning", message : "investigation.fill.survey.section-filled"});
        }
        else{
            const nextUrl = HOSPITAL_PATIENT_SECTION.replace(":uuidDataCollection", dataCollectionSelected.uuid)
                .replace(":uuidPatient", uuidPatient).replace(":action", "fill").replace(":uuidSection", sectionSelected.uuid)
                .replace(":idSubmission", "");
            console.log("Next url", nextUrl);

            setShowOptions(false);
            //setIndexDataCollection(-1);
            setIndexSection(-1);

            history.push(nextUrl);
        }
        
    }
    function backToRoot(){
        const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient);
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    function selectDataCollection(index){
        console.log("Row seleccionado ", filteredRecords[index]);
        
        goToSurveyUrl(filteredRecords[index].uuidSurvey);
    }
    function goToSurveyUrl(uuidSurvey){
        const nextUrl = HOSPITAL_PATIENT_DATACOLLECTION.replace(":uuidPatient", uuidPatient).replace(":action", "show").replace(":uuidDataCollection", uuidSurvey);
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    function selectRecord(index){
        console.log("Row seleccionado ", surveyRecords[index]);
        
        const nextUrl = HOSPITAL_PATIENT_MEDICAL_NOTE.replace(":uuidPatient", uuidPatient).replace(":idMedicalNote", surveyRecords[index].id);
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    async function saveRecord(data){
        //No iteramos por secciones porque en modo hospital se supone que solo habrá una sección

        const postObj = {submission : [
            {
                uuid_section:sectionSelected.uuid,
                answers:data
            }
            ]
        }
        if(action === "update"){
            await dispatch(updateSubmissionPatientAction(postObj, props.investigations.currentInvestigation.uuid, uuidPatient, dataCollectionSelected.uuid, dataCollectionSelected.name, idSubmission));
        }
        else{
            setIndexSection(-1);
            setShowOptions(true);
            setIndexMedicalNote(null);
            setSavedDataCollection(true);
            console.log(data);
            await dispatch(postSubmissionPatientAction(postObj, props.investigations.currentInvestigation.uuid, uuidPatient, dataCollectionSelected.uuid, dataCollectionSelected.name, dataCollectionSelected.type));
        }
    }
    function renderOptions(){
        if(!dataCollectionSelected){
            return [
                <Grid item xs={6} style={{textAlign:"left"}}>
                    <WhiteTypography variant="body2" gutterBottom>
                        <Translate id="hospital.data-collections" />:
                    </WhiteTypography>
                </Grid>,
                props.investigations.currentInvestigation.surveys.sort((a,b) => a.order - b.order).filter(sur => sur.type === 0).map((dataCollection, index) => {
                    return(
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <ButtonGreyBorderGrey data-testid={dataCollection.name} onClick={() => fillDataCollection(index)}>{dataCollection.name}</ButtonGreyBorderGrey>
                        </Grid>
                    )
                })
            ]
        }
        else if(indexSection === -1){
            
            return [
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <WhiteTypography variant="body2" gutterBottom>
                        { dataCollectionSelected.name }:
                    </WhiteTypography>
                </Grid>, 
                dataCollectionSelected.sections.sort((a,b) => a.order - b.order).map((section, index) => {
                    
                    
                    return(
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <ButtonGreyBorderGrey data-testid={section.name} onClick={() => sectionSelect(index)}>{section.name}</ButtonGreyBorderGrey>
                        </Grid>
                    )
                })
            ]
        }
    }
    function renderCore(){
        
            
        if(dataCollectionSelected !== null && sectionSelected !== null && (action === "fill" || action === "update")){
            const submission = action === "update" && idSubmission ? props.patientsSubmissions.data[uuidPatient][dataCollectionSelected.uuid].submissions.filter(sub => sub.id === idSubmission)[0] : null
            if(savedDataCollection){
                return(
                    <Alert severity={showSnackbar.severity}>
                        <Translate id="hospital.patient.new-record" />
                    </Alert>
                )
            }
            else{
                return(
                    <FillDataCollection initData = {submission} key={dataCollectionSelected.uuid} dataCollection={dataCollectionSelected} sectionSelected = {sectionSelected}
                    patientId={props.patientId} investigation={props.investigation} callBackDataCollection={(values) => saveRecord(values)}/>
                )
            }
            
        }
        else if(dataCollectionSelected !== null && action === "show"){
            return <ShowPatientRecords permissions={props.investigations.currentInvestigation.permissions} survey={dataCollectionSelected} mode="elements" callBackEditSubmission={callBackEditSubmission}
                        submissions={props.patientsSubmissions.data[uuidPatient][dataCollectionSelected.uuid].submissions}  />
        }
        else if(filteredRecords.length === 0){
            return <Translate id="hospital.patient.no-records" />
        }
        else{
            return(
                <EnhancedTable noHeader noSelectable selectRow={(index) => selectDataCollection(index)} 
                rows={filteredRecords.map((record, index) => {
                    const dateCreated = new Date(record.createdAt);
                    return({id : index, researcher : record.researcher, surveyName : record.surveyName, date : dateCreated.toISOString().slice(0, 16).replace('T', ' ')})
                })} headCells={[{ id: "researcher", alignment: "left", label: <Translate id="hospital.doctor" />}, { id: "surveyName", alignment: "left", label: <Translate id="hospital.data-collection" />},
                                { id: "date", alignment: "left", label: "Date"}]} />
            )
        }
    }
    function editPersonalData(){
        console.log("Edit personal data");
        const nextUrl = HOSPITAL_PATIENT_EDIT_PERSONAL_DATA.replace(":uuidPatient", uuidPatient);
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    function closeModal(){
        setShowOptions(false);
        setIndexSection(-1);
    }
    useEffect(() => {
        setShowOptions(false);
    }, [uuidDataCollection, uuidSection])
    useEffect(() => {
        async function fetchRecordsPatient(){
            await dispatch(fetchSubmissionsPatientInvestigationAction(props.investigations.currentInvestigation.uuid, uuidPatient));
        }
        if(props.investigations.data && (!props.patientsSubmissions.data || !props.patientsSubmissions.data.hasOwnProperty(uuidPatient))){
            fetchRecordsPatient()
        }
    }, [props.investigations])
    useUpdateEffect(() => {
        
        if(action === "update"){
            setShowSnackbar({show:true, severity:"success", message : "hospital.patient.updated-record"});
        }
        if(action === "fill"){
            setShowSnackbar({show:true, severity:"success", message : "hospital.patient.new-record"});
        }
        
    }, [props.patientsSubmissions.nUpdatedRegisters]);
    
    useEffect(() => {
        if(props.patientsSubmissions.data){
            let tempSubmissions = []
            if(props.patientsSubmissions.data.hasOwnProperty(uuidPatient)){
                tempSubmissions = Object.values(props.patientsSubmissions.data[uuidPatient]).reduce((acc, val)=> {
                    let tempDict = {};
                    tempDict.surveyName = val.surveyName; 
                    tempDict.uuidSurvey = val.uuid; 
                    tempDict.typeSurvey = val.type; 
                    const researcher = val.submissions[val.submissions.length -1].researcher
                    tempDict.researcher = researcher.name+" "+researcher.surnames;
                    tempDict.createdAt = val.submissions[val.submissions.length -1].createdAt;
    
                    return acc.concat(tempDict)
                }, []);
                tempSubmissions.sort((a, b) => {
                    const aDate = new Date(a.createdAt);
                    const bDate = new Date(b.createdAt);
                    if(aDate.getTime() > bDate.getTime()){
                        return -1
                    }
                    else{
                        return 1;
                    }
                });
            }
            
            setSurveyRecords(tempSubmissions);
        }
        
    }, [props.patientsSubmissions])

    useEffect(() => {
        
            if(props.patientsSubmissions.error){
                if(action === "update"){
                    setShowSnackbar({show:true, severity:"error", message : "hospital.patient.no-update"});
                }
                if(action === "fill"){
                    setShowSnackbar({show:true, severity:"error", message : "register.researcher.error"});
                }
            }
    }, [props.patientsSubmissions.loading]);    

    if(error){
        return(
            <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
                <Alert mb={4} severity="error">
                    <Translate id="investigation.share.error.description" />
                </Alert>
            </BoxBckgr>
        )
    }
    else if(props.investigations.loading || props.patientsSubmissions.loading || surveyRecords === null){
        return <Loader />
    }
    else{
        let years = yearsFromDate(patient.personalData.birthdate);
        let stay = daysFromDate(props.dateIn);

        return (
            
            <React.Fragment>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    open={showSnackbar.show}
                    autoHideDuration={2000}
                    onClose={() => setShowSnackbar({show:false})}>
                        {
                            showSnackbar.message && 
                            <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                                <Translate id={showSnackbar.message} />
                            </Alert>
                        }
                        
                </Snackbar>
                <Modal isTransparent={true} open={showOptions || loading || saved} closeModal={closeModal}>
                    {
                        saved &&
                        <CheckCircleOutlineSvg style={{ color: "green",fontSize: 80 }}/>
                    }
                    { showOptions && 
                        <Grid container spacing={3} >
                        {
                            renderOptions()
                        }
                        </Grid>
                    }
                </Modal>
                <Grid container spacing={3}>
                    <Grid item container style={{backgroundColor:"white"}}  xs={12}>
                        <Grid item container xs={3} >
                            {/* <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                    {props.number}
                                </Typography>
                            </Grid> */}
                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems:'middle'}}
                                onClick={props.investigations.currentInvestigation.permissions >= 3 ? editPersonalData : null} >
                                <IconPatient gender={patient.personalData.sex} />
                            </Grid>
                        </Grid>
                        <Grid item container xs={4}>
                            <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                    {patient.personalData.name} {patient.personalData.surnames}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                    ID: {patient.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                    {years} years
                                </Typography>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                    {stay} days
                                </Typography>
                            </Grid> */}
                        </Grid>
                        <Grid item container xs={5}  justify="center" alignItems="center">
                            <Grid item xs={4}>
                                <Button data-testid="medical-notes" onClick={() => backToRoot()} >
                                    <img src={filterValue === 0 ? iconNotesGreen : iconNotes} alt="Medical Notes" height="60" />
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button data-testid="images" onClick={() => goToTest(1)} >
                                    <img src={filterValue === 1 ? iconImagesGreen : iconImages} alt="Images" height="60" />
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button data-testid="lab" onClick={() => goToTest(2)} >
                                    <img src={filterValue === 2 ? iconLabGreen : iconLab} alt="Lab" height="60" />
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <ButtonAdd data-testid="add-record" onClick={addRecord} />
                            </Grid>
                        </Grid>
                    
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
    
}

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations,
        patientsSubmissions:state.patientsSubmissions,
        patients:state.patients
    }
}
export default connect(mapStateToProps, null)(Patient)