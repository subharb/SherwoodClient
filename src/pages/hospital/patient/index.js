
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { Grid, Typography, Paper, Snackbar, Button, IconButton } from '@material-ui/core';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { postSubmissionPatientAction, updateSubmissionPatientAction } from '../../../redux/actions/submissionsPatientActions';
import { fetchSubmissionsPatientInvestigationAction, resetPatientsSubmissionsError } from '../../../redux/actions/submissionsPatientActions';
import Loader from '../../../components/Loader';
import { BoxBckgr, IconPatient, ButtonAdd, ButtonGreyBorderGrey, CheckCircleOutlineSvg } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import { useParams, useHistory } from 'react-router-dom';
import { yearsFromDate, daysFromDate, numberRecordsSection } from '../../../utils';
import FillDataCollection from '../FillDataCollection';
import { Translate } from 'react-localize-redux';
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { HOSPITAL_PATIENT, HOSPITAL_PATIENT_DATACOLLECTION, HOSPITAL_PATIENT_EDIT_PERSONAL_DATA,
        HOSPITAL_PATIENT_MEDICAL_NOTE, HOSPITAL_PATIENT_SECTION, HOSPITAL_PATIENT_SUBMISSION, HOSPITAL_PATIENT_TESTS, ROUTE_404 } from '../../../routes';

import ShowPatientRecords from '../../../components/investigation/show/single/show_patient_records';

import { useSnackBarState, useUpdateEffect } from '../../../hooks';
import { fetchProfileInfo } from '../../../redux/actions/profileActions';
import { MEDICAL_ACCESS, MEDICAL_READ, MEDICAL_SURVEYS, PERSONAL_ACCESS, PERSONAL_WRITE, TYPE_FIRST_VISIT_SURVEY, TYPE_IMAGE_SURVEY, TYPE_LAB_SURVEY, TYPE_MEDICAL_SURVEY, TYPE_MONITORING_VISIT_SURVEY } from '../../../constants';
import { PatientToolBar } from './toolbar';
import { getPatientStaysAction } from '../../../redux/actions/hospitalActions';



const WhiteTypography = styled(Typography)`
    color:white;
    font-size: 1rem;
`;

function Patient(props) {
    const [loading, setLoading] = useState(props.initialState ? props.initialState.loading : false)
    const [error, setError] = useState(props.initialState ? props.initialState.error : false)
    const [saved, setSaved] = useState(props.initialState ? props.initialState.saved : false);
    
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [surveyRecords, setSurveyRecords] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [indexMedicalNote, setIndexMedicalNote] = useState(null);
    const [indexDataCollection, setIndexDataCollection] = useState(-1);
    const [savedDataCollection, setSavedDataCollection] = useState(false);
    // const [indexSection, setIndexSection] = useState(-1);

    
    const dispatch = useDispatch();
    let { uuidPatient } = useParams();
    let { uuidSection } = useParams();
    let { uuidDataCollection } = useParams();
    
    let { action } = useParams();
    
    const parameters = useParams();
    const idSubmission = parameters["idSubmission"] ? parseInt(parameters["idSubmission"]) : parameters["idSubmission"];
    const submission = idSubmission && surveyRecords ? surveyRecords.find(rec => rec.id === idSubmission) : null;
    const history = useHistory();

    const isInitialMount = useRef(true);
    
    const dataCollectionSelected = props.investigations.data ? (submission ? props.investigations.currentInvestigation.surveys.find(sur => sur.uuid === submission.uuidSurvey) : uuidDataCollection ? props.investigations.currentInvestigation.surveys.find(sur => sur.uuid === uuidDataCollection) : indexDataCollection !== -1 ? currentSurveys[indexDataCollection] : null) : null;
    const typeSurveys = dataCollectionSelected ? (MEDICAL_SURVEYS.includes(dataCollectionSelected.type) ? MEDICAL_SURVEYS : (dataCollectionSelected.type === TYPE_IMAGE_SURVEY ? [TYPE_IMAGE_SURVEY] : [TYPE_LAB_SURVEY])) : (parameters.hasOwnProperty("typeTest") ? (parameters["typeTest"] === "images" ? [TYPE_IMAGE_SURVEY] : [TYPE_LAB_SURVEY]) : MEDICAL_SURVEYS);
    const currentSurveys = props.investigations.currentInvestigation ? props.investigations.currentInvestigation.surveys.filter(sur => typeSurveys.includes(sur.type)) : [];
    //const surveyRecords = props.patientsSubmissions.data && props.patientsSubmissions.data[uuidPatient] ? props.patientsSubmissions.data[uuidPatient] : [];
    const patient = props.investigations.data && props.patients.data ? props.patients.data[props.investigations.currentInvestigation.uuid].find(pat => pat.uuid === uuidPatient) : null
    const staysPatient = props.hospital.data && props.hospital.data.stays && props.hospital.data.stays[uuidPatient] ? props.hospital.data.stays[uuidPatient] : [];
    const typSurveySelected = typeSurveys.length === 1 ? typeSurveys[0] : dataCollectionSelected ? dataCollectionSelected.type : TYPE_MEDICAL_SURVEY;
    const sectionSelected = dataCollectionSelected && typeof uuidSection !== "undefined" ? dataCollectionSelected.sections.find(sec => sec.uuid === uuidSection) : null;
    
    const filteredRecords = surveyRecords ? surveyRecords.filter(rec => {
        return typeSurveys.includes(rec.typeSurvey)
    }) : [];
    const translations = typeSurveys.includes(TYPE_MEDICAL_SURVEY) ? "patient" : typeSurveys.includes(TYPE_IMAGE_SURVEY) ? "medical-imaging" : "laboratory"; 

    function addRecord(){
        if(!parameters.hasOwnProperty("typeTest")){
            setShowOptions(!showOptions);
        }
        else{
            const filterType = parameters.typeTest === "images" ? TYPE_IMAGE_SURVEY : TYPE_LAB_SURVEY;
            const dataCollection = dataCollectionSelected ? dataCollectionSelected : currentSurveys.find(sur => sur.type === filterType);

            const nextUrl = HOSPITAL_PATIENT_DATACOLLECTION.replace(":uuidDataCollection", dataCollection.uuid)
                .replace(":uuidPatient", uuidPatient).replace(":action", "fill")
                .replace(":idSubmission", "");
            history.push(nextUrl);
        }
    }
    function goToTest(value){
        const nextUrl = HOSPITAL_PATIENT_TESTS.replace(":uuidPatient", uuidPatient).replace(":typeTest", value === 1 ? "images" : "lab")
        history.push(nextUrl);
    }

    function fillDataCollection(indexCollection){
        

        setSavedDataCollection(false);
        const dataCollectionSelected = currentSurveys[indexCollection];

        let isDisabled = false;
        // if(!dataCollectionSelected.repeats){
        //     const patientSubmissions = props.patientsSubmissions.data[uuidPatient].hasOwnProperty(dataCollectionSelected.uuid) ? props.patientsSubmissions.data[uuidPatient][dataCollectionSelected.uuid].submissions : [];
        //     isDisabled =  numberRecordsSection(sectionSelected, patientSubmissions) > 0;
        // }
        
        if(isDisabled){
            setShowSnackbar({show:true, severity: "warning", message : "investigation.fill.survey.section-filled"});
        }
        else{
            const nextUrl = HOSPITAL_PATIENT_DATACOLLECTION.replace(":uuidDataCollection", dataCollectionSelected.uuid)
                .replace(":uuidPatient", uuidPatient).replace(":action", "fill")
                .replace(":idSubmission", "");
            console.log("Next url", nextUrl);

            setShowOptions(false);
            //setIndexDataCollection(-1);
            //setIndexSection(-1);

            history.push(nextUrl);
        }
    }
    function callBackEditSubmission(idSubmission, uuidSection){
        const submission = surveyRecords.find(sub => sub.id === idSubmission);
        const nextUrl = HOSPITAL_PATIENT_SECTION.replace(":uuidDataCollection", submission.uuidSurvey)
                .replace(":uuidPatient", uuidPatient).replace(":action", "update").replace(":uuidSection", uuidSection)
                .replace(":idSubmission", idSubmission);
        setShowOptions(false);
        //setIndexDataCollection(-1);
        //setIndexSection(-1);
        history.push(nextUrl);
    }
    function sectionSelect(indexSection){
        
        
    }
    function backToRoot(){
        const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient);
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    function selectSubmission(index){
        console.log("Row seleccionado ", filteredRecords[index]);
        if(filteredRecords[index].offline){
            setShowSnackbar({show:true, severity: "warning", message : "investigation.fill.survey.record-offline"});
        }
        else{
            goToSurveyUrl(filteredRecords[index].id);
        }
        
    }
    function goToSurveyUrl(uuidSurvey){
        const nextUrl = HOSPITAL_PATIENT_SUBMISSION.replace(":uuidPatient", uuidPatient).replace(":action", "show").replace(":idSubmission", uuidSurvey);
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
        const postObj = {
            uuid_survey:dataCollectionSelected.uuid, 
            uuid_patient:uuidPatient,
            id:idSubmission,
            researcher: props.profile.info,
            surveyRecords:[]
        }
        data.forEach(fieldData => {
            //const sectionField = dataCollectionSelected.sections.find(section => section.fields.find(aField => aField.id === fieldData.surveyField.id));
            postObj.surveyRecords.push(fieldData);
            
        });
       
        
        if(action === "update"){
            await dispatch(updateSubmissionPatientAction(postObj, props.investigations.currentInvestigation.uuid, uuidPatient, dataCollectionSelected.uuid, dataCollectionSelected.name, idSubmission));
        }
        else{
            //setIndexSection(-1);
            setShowOptions(true);
            setIndexMedicalNote(null);
            setSavedDataCollection(true);
            console.log(data);
            await dispatch(postSubmissionPatientAction(postObj, props.investigations.currentInvestigation.uuid, uuidPatient, dataCollectionSelected.uuid, dataCollectionSelected.name, dataCollectionSelected.type));

            
        }

        setTimeout(function(){
            const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient)
            history.push(nextUrl);
       }, 1000);
    
    }
    function renderOptions(){
        if(!dataCollectionSelected){
            return [
                <Grid item xs={6} style={{textAlign:"left"}}>
                    <WhiteTypography variant="body2" gutterBottom>
                        <Translate id="hospital.data-collections" />:
                    </WhiteTypography>
                </Grid>,
                currentSurveys.sort((a,b) => a.order - b.order).map((dataCollection, index) => {
                    return(
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <ButtonGreyBorderGrey data-testid={dataCollection.name} onClick={() => fillDataCollection(index)}>{dataCollection.name}</ButtonGreyBorderGrey>
                        </Grid>
                    )
                })
            ]
        }
        // else if(indexSection === -1){
            
        //     return [
        //         <Grid item xs={12} style={{textAlign:"center"}}>
        //             <WhiteTypography variant="body2" gutterBottom>
        //                 { dataCollectionSelected.name }:
        //             </WhiteTypography>
        //         </Grid>, 
        //         dataCollectionSelected.sections.sort((a,b) => a.order - b.order).map((section, index) => {
        //             return(
        //                 <Grid item xs={12} style={{textAlign:"center"}}>
        //                     <ButtonGreyBorderGrey data-testid={section.name} onClick={() => sectionSelect(index)}>{section.name}</ButtonGreyBorderGrey>
        //                 </Grid>
        //             )
        //         })
        //     ]
        // }
    }
    function renderCore(){
        
            
        if(dataCollectionSelected !== null && (action === "fill" || action === "update")){
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
                    <FillDataCollection initData = {submission} key={dataCollectionSelected.uuid} dataCollection={dataCollectionSelected} 
                        sectionSelected = {sectionSelected}
                        patientId={props.patientId} investigation={props.investigations.currentInvestigation} callBackDataCollection={(values) => saveRecord(values)}/>
                )
            }
            
        }
        else if(filteredRecords.length === 0){
            return <Translate id={`pages.hospital.${translations}.no-records`} />
        }
        else if(idSubmission !== null && action === "show"){
            return <ShowPatientRecords permissions={props.investigations.currentInvestigation.permissions} survey={dataCollectionSelected} 
                        mode="elements" callBackEditSubmission={callBackEditSubmission} idSubmission={idSubmission}
                        submissions={filteredRecords} surveys={props.investigations.currentInvestigation.surveys} />
        }
        else{
            return(
                <EnhancedTable noHeader noSelectable selectRow={(index) => selectSubmission(index)} 
                rows={filteredRecords.map((record, index) => {
                    const dateCreatedString = record.createdAt ? new Date(record.createdAt).toISOString().slice(0, 16).replace('T', ' ') : "Unsincronized";
                    return({id : index, researcher : record.researcher, surveyName : record.surveyName, date : dateCreatedString})
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
        //setIndexSection(-1);
        setIndexDataCollection(-1);
    }
    async function resetSnackBar(){
        setShowSnackbar({show:false});
        if(props.patientsSubmissions.error){
            await dispatch(resetPatientsSubmissionsError())
        }
        
    }
    function showHospitalizeAction(){
        console.log("Mostrar menu para dar alta o cambiar de cama");
    }

    useEffect(() => {
        setShowOptions(false);
    }, [uuidSection])
    useEffect(() => {
        async function fetchRecordsPatient(){
            await dispatch(fetchSubmissionsPatientInvestigationAction(props.investigations.currentInvestigation.uuid, uuidPatient));
        }
        async function fetchPatientsStay(){
            await dispatch(getPatientStaysAction(props.investigations.currentInvestigation.uuid, uuidPatient));
        }
        if(props.investigations.data && (!props.patientsSubmissions.data || !props.patientsSubmissions.data.hasOwnProperty(uuidPatient))){
            fetchRecordsPatient();
            fetchPatientsStay()
        }
    }, [props.investigations])
    
    useEffect(() => {
        if(!props.profile.info && props.investigations.currentInvestigation){
            dispatch(fetchProfileInfo(props.investigations.currentInvestigation.uuid));
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
                Object.values(props.patientsSubmissions.data[uuidPatient]).forEach((val)=> {
                    const tempSubs = val.submissions.map(sub => {
                        const tempSub = {...sub};
                        tempSub.surveyName = val.surveyName;
                        tempSub.uuidSurvey = val.uuid; 
                        tempSub.typeSurvey = val.type; 
                        const departmentName = tempSub.researcher.departments.length === 0 ? "" : " - "+tempSub.researcher.departments[0].name;
                        tempSub.researcher = tempSub.researcher.name+" "+tempSub.researcher.surnames + departmentName
                        return tempSub;
                    })
                    tempSubmissions = tempSubmissions.concat(tempSubs); 
                    // tempSubmissions.concat(val.submissions);
                    // let tempDict = {};
                    // tempDict.surveyName = val.surveyName; 
                    // tempDict.uuidSurvey = val.uuid; 
                    // tempDict.typeSurvey = val.type; 
                    // const researcher = val.submissions[val.submissions.length -1].researcher;
                    // //Si es en modo offline no hay researcher.
                    // tempDict.researcher = researcher.name ? researcher.name+" "+researcher.surnames : researcher;
                    // tempDict.offline = researcher.name ? false : true;
                    // tempDict.createdAt = val.submissions[val.submissions.length -1].surveyRecords[0].createdAt;
    
                    // return acc.concat(tempDict)
                });
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
            let severity = "error";
            let message = "";
            if(action === "update"){
                message = "hospital.patient.error";
            }
            if(action === "fill"){
                message = "hospital.patient.error";
            }
            if(props.patientsSubmissions.error === 2){
                severity = "warning";
                if(action === "update"){
                    message = "hospital.patient.updated-record-offline";
                }
                if(action === "fill"){
                    message = "hospital.patient.new-record-offline";
                }
            }
            else{
                setError(true);
            }
            setShowSnackbar({show:true, severity:severity, message : message});
            
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
    else if(!patient){
        return(
            <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
                <Alert mb={4} severity="error">
                    <Translate id="hospital.patient.error-nopatient" />
                </Alert>
            </BoxBckgr>
        ) 
    }
    else{
        let years = patient.personalData ? yearsFromDate(patient.personalData.birthdate) : "Not Available";
        //let stay = daysFromDate(props.dateIn);
        let isPatientHospitalized = staysPatient.length === 0 ? false : staysPatient[staysPatient.length -1].dateOut !== null;
        return (
            
            <React.Fragment>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    open={showSnackbar.show}
                    autoHideDuration={2000}
                    onClose={resetSnackBar}>
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
                    <PatientToolBar showMedical={props.investigations.currentInvestigation.permissions.includes(MEDICAL_READ) }
                        editPersonalData={props.investigations.currentInvestigation.permissions.includes(PERSONAL_ACCESS) ? editPersonalData : null}
                        action={parameters} patientID={patient.id} personalData={patient.personalData} years={years}
                        medicalNotesCallBack={() => backToRoot()} testCallBack={() => goToTest(1)} labCallBack={() => goToTest(2)}
                        addRecordCallBack={addRecord}
                        hospitalize={ isPatientHospitalized ? showHospitalizeAction : null }
                    />
                        
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
        patients:state.patients,
        profile:state.profile,
        hospital:state.hospital
    }
}
export default connect(mapStateToProps, null)(Patient)