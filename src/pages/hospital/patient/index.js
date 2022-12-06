
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import * as types from "../../../constants";
import { Grid, Typography, Paper, Snackbar, Button, IconButton } from '@material-ui/core';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { postSubmissionPatientAction, updateSubmissionPatientAction } from '../../../redux/actions/submissionsPatientActions';
import { fetchSubmissionsPatientInvestigationAction, resetPatientsSubmissionsError } from '../../../redux/actions/submissionsPatientActions';
import Loader from '../../../components/Loader';
import { BoxBckgr, IconPatient, ButtonAdd, ButtonGreyBorderGrey, CheckCircleOutlineSvg, ButtonGrey, ButtonCancel, ButtonContinue } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import { useParams, useHistory } from 'react-router-dom';
import { yearsFromDate, daysFromDate, numberRecordsSection, postErrorSlack } from '../../../utils';
import FillDataCollection from '../FillDataCollection';
import { Translate } from 'react-localize-redux';
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { HOSPITAL_PATIENT, HOSPITAL_PATIENT_DATACOLLECTION, HOSPITAL_PATIENT_EDIT_PERSONAL_DATA,
        HOSPITAL_PATIENT_MAKE_TESTS,
        HOSPITAL_PATIENT_MEDICAL_NOTE, HOSPITAL_PATIENT_SECTION, HOSPITAL_PATIENT_SINGLE_SUBMISSION, HOSPITAL_PATIENT_SUBMISSION, HOSPITAL_PATIENT_TESTS, ROUTE_404 } from '../../../routes';

import ShowPatientRecords from '../../../components/investigation/show/single/show_patient_records';

import { useDepartments, useSnackBarState, useUpdateEffect } from '../../../hooks';
import { fetchProfileInfo } from '../../../redux/actions/profileActions';
import { MEDICAL_SURVEYS, TYPE_SOCIAL_SURVEY,  TYPE_IMAGE_SURVEY, TYPE_LAB_SURVEY, TYPE_MEDICAL_SURVEY, TYPE_MONITORING_VISIT_SURVEY } from '../../../constants';
import { PatientToolBar } from './toolbar';
import { dischargePatientAction, getPatientStaysAction } from '../../../redux/actions/hospitalActions';
import { PERMISSION } from '../../../constants/types';
import TabsSurveys from './TabsSurveys';
import RequestCombo from '../Service/RequestCombo';
import RequestTable from '../Service/RequestTable';
import RequestInfo, { RequestInfoWithFetch } from '../Service/RequestInfo';
import RequestForm from '../Service/RequestForm';



const TYPE_URL = {1 : "images", 2 : "lab", 6 : "social", 7:"shoe"};
const URL_TYPE = Object.keys(TYPE_URL).reduce((newDict, key) =>{
    newDict[TYPE_URL[key]] = parseInt(key);
    return newDict
}, {})

function Patient(props) {
    const [loading, setLoading] = useState(props.initialState ? props.initialState.loading : false)
    const [error, setError] = useState(props.initialState ? props.initialState.error : false)
    const [saved, setSaved] = useState(props.initialState ? props.initialState.saved : false);
    const [showMenuHospitalize, setShowMenuHospitalize] = useState(false);
    const [dischargeConfirm, setDischargeConfirm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [surveyRecords, setSurveyRecords] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [indexMedicalNote, setIndexMedicalNote] = useState(null);
    const [indexDataCollection, setIndexDataCollection] = useState(-1);
    const [savedDataCollection, setSavedDataCollection] = useState(false);
    const [showRequestType, setShowRequestType] = useState(-1);
    // const [indexSection, setIndexSection] = useState(-1);
    const {departments, researchers} = useDepartments();
    
    const dispatch = useDispatch();
    let { uuidPatient } = useParams();
    let { uuidSection } = useParams();
    let { uuidDataCollection } = useParams();
    
    let { action } = useParams();
    let { single } = useParams();
    
    const parameters = useParams();
    const idSubmission = parameters["idSubmission"] ? parseInt(parameters["idSubmission"]) : parameters["idSubmission"];
    const submission = idSubmission && surveyRecords ? surveyRecords.find(rec => rec.id === idSubmission) : null;
    const history = useHistory();

    const isInitialMount = useRef(true);
    
    const dataCollectionSelected = props.investigations.data ? (submission ? props.investigations.currentInvestigation.surveys.find(sur => sur.uuid === submission.uuidSurvey) : uuidDataCollection ? props.investigations.currentInvestigation.surveys.find(sur => sur.uuid === uuidDataCollection) : indexDataCollection !== -1 ? currentSurveys[indexDataCollection] : null) : null;
    const typesCurrentSurvey = dataCollectionSelected ? (MEDICAL_SURVEYS.includes(dataCollectionSelected.type) ? MEDICAL_SURVEYS : [dataCollectionSelected.type]) : (parameters.hasOwnProperty("typeTest") ? (URL_TYPE[parameters["typeTest"]] ? [URL_TYPE[parameters["typeTest"]]] : MEDICAL_SURVEYS) : MEDICAL_SURVEYS);
    const currentSurveys = props.investigations.currentInvestigation ? props.investigations.currentInvestigation.surveys.filter(sur => typesCurrentSurvey.includes(sur.type)) : [];
    //const surveyRecords = props.patientsSubmissions.data && props.patientsSubmissions.data[uuidPatient] ? props.patientsSubmissions.data[uuidPatient] : [];
    const patient = props.investigations.data && props.patients.data ? props.patients.data[props.investigations.currentInvestigation.uuid].find(pat => pat.uuid === uuidPatient) : null
    const staysPatient = props.hospital.data.stays && props.hospital.data.stays[uuidPatient] ? props.hospital.data.stays[uuidPatient] : [];
    const typeSurveySelected = typesCurrentSurvey.length === 1 ? typesCurrentSurvey[0] : dataCollectionSelected ? dataCollectionSelected.type : TYPE_MEDICAL_SURVEY;
    const sectionSelected = dataCollectionSelected && typeof uuidSection !== "undefined" ? dataCollectionSelected.sections.find(sec => sec.uuid === uuidSection) : null;
    const typesSurvey = props.investigations.data ? props.investigations.currentInvestigation.surveys.map((survey) => {
            return survey.type;
    }) : [];

    let filteredRecords = surveyRecords ? surveyRecords.filter(rec => {
        return typesCurrentSurvey.includes(rec.typeSurvey)
    }) : [];

    if(typeSurveySelected === TYPE_MEDICAL_SURVEY){
        staysPatient.forEach((stay) => {
            filteredRecords.push({
                researcher : stay.checkInResearcher.researcher.name +" "+stay.checkInResearcher.researcher.surnames,
                surveyName : "Hospitalized in "+stay.bed.ward.name,
                createdAt : stay.dateIn,
                type:"stay"
            })
            if(stay.dateOut){
                filteredRecords.push({
                    researcher : stay.checkoutResearcher.researcher.name +" "+stay.checkoutResearcher.researcher.surnames,
                    surveyName : "Discharged from "+stay.bed.ward.name,
                    createdAt : stay.dateOut,
                    type:"stay"
                })  
            }
        })
    }
    
    filteredRecords.sort((a, b) => {
        return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
    })
    
    const translations = typesCurrentSurvey.includes(TYPE_MEDICAL_SURVEY) ? "patient" : typesCurrentSurvey.includes(TYPE_IMAGE_SURVEY) ? "medical-imaging" : typesCurrentSurvey.includes(TYPE_LAB_SURVEY) ?  "laboratory" : "other"; 

    function goToSubmissionUrl(uuidPatient, idSubmission){
        const nextUrl = HOSPITAL_PATIENT_SINGLE_SUBMISSION.replace(":uuidPatient", uuidPatient)
                .replace(":action", "show")
                .replace(":single", "true")
                .replace(":idSubmission", idSubmission);
        history.push(nextUrl);
    }

    function addRecord(){
        if(currentSurveys.length > 1 ){
            setShowOptions(true);
            setShowModal(true);
        }
        else{
            let nextUrl;
            
            if(["images", "lab"].includes(parameters.typeTest)){
                nextUrl = HOSPITAL_PATIENT_MAKE_TESTS.replace(":uuidPatient", uuidPatient).replace(":typeTest", parameters.typeTest);
            }
            else{
                const filterType = URL_TYPE[parameters.typeTest];    
                const dataCollection = dataCollectionSelected ? dataCollectionSelected : currentSurveys.find(sur => sur.type === filterType);

                nextUrl = HOSPITAL_PATIENT_DATACOLLECTION.replace(":uuidDataCollection", dataCollection.uuid)
                    .replace(":uuidPatient", uuidPatient).replace(":action", "fill")
                    .replace(":idSubmission", "");
            }
            history.push(nextUrl);
        }
    }
    async function discharge(){
        const dischargeSurvey = props.investigations.currentInvestigation.surveys.find((sur) => sur.type === types.TYPE_DISCHARGE_SURVEY);
        if(dischargeSurvey){
            const nextUrl = HOSPITAL_PATIENT_DATACOLLECTION.replace(":uuidDataCollection", dischargeSurvey.uuid)
                .replace(":uuidPatient", uuidPatient).replace(":action", "fill")
                .replace(":idSubmission", "");
            console.log("Next url", nextUrl);

            resetModal();

            history.push(nextUrl);
        }
        else{
            setShowSnackbar({show:true, severity: "warning", message : "hospital.patient.error.missing-discharge-survey"});
        }
        //
    }
    function goToTest(value){
        const nextUrl = HOSPITAL_PATIENT_TESTS.replace(":uuidPatient", uuidPatient).replace(":typeTest", TYPE_URL[value])
        history.push(nextUrl);
    }

    function fillDataCollection(uuidDataCollection){
        

        setSavedDataCollection(false);
        const dataCollectionSelected = currentSurveys.find((survey) => survey.uuid === uuidDataCollection);

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

            resetModal();

            history.push(nextUrl);
        }
    }
    function callBackEditSubmission(idSubmission, uuidSection){
        const submission = surveyRecords.find(sub => sub.id === idSubmission);
        const nextUrl = HOSPITAL_PATIENT_SECTION.replace(":uuidDataCollection", submission.uuidSurvey)
                .replace(":uuidPatient", uuidPatient).replace(":action", "update").replace(":uuidSection", uuidSection)
                .replace(":idSubmission", idSubmission);
        resetModal();
        //setIndexDataCollection(-1);
        //setIndexSection(-1);
        history.push(nextUrl);
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
        else if(filteredRecords[index].id){
            goToSurveyUrl(filteredRecords[index].id);
        }
        
    }
    function goToSurveyUrl(uuidSurvey){
        const nextUrl = HOSPITAL_PATIENT_SUBMISSION.replace(":uuidPatient", uuidPatient).replace(":action", "show").replace(":idSubmission", uuidSurvey);
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    function resetModal(){
        setShowOptions(false);
        setShowModal(false);
        setDischargeConfirm(false);
    }

    async function saveRecord(data){
        //No iteramos por secciones porque en modo hospital se supone que solo habrá una sección
        setShowOptions(true);
            setShowModal(true);
            setIndexMedicalNote(null);
            setSavedDataCollection(true);

        setTimeout(function(){
            const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient)
            history.push(nextUrl);

       }, 1000);
    
    }
    function renderSurveys(){
        if(!dataCollectionSelected){
            return [
                <TabsSurveys surveys={currentSurveys} units={props.profile.info.units} surveySelectedCallback={(uuid) => fillDataCollection(uuid)} />
            ]
        }
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
                        sectionSelected = {sectionSelected} uuidPatient={uuidPatient} researcher={props.profile.info} idSubmission={idSubmission}
                        country={props.investigations.currentInvestigation.country} numberButtonsSubmit={2}
                        uuidInvestigation={props.investigations.currentInvestigation.uuid}
                        callBackDataCollection={(values) => saveRecord(values)}/>
                )
            }
            
        }
        else if(idSubmission !== null && action === "show"){
            const belongsToRequest = idSubmission && types.TYPE_FILL_SURVEY.includes(typeSurveySelected);

            return (
                <>  
                    {
                        belongsToRequest &&
                        <RequestInfoWithFetch idSubmission={idSubmission} uuidInvestigation={props.investigations.currentInvestigation.uuid} />
                    }
                    <ShowPatientRecords permissions={props.investigations.currentInvestigation.permissions} survey={dataCollectionSelected} 
                        mode="elements" callBackEditSubmission={callBackEditSubmission} idSubmission={idSubmission} singleSubmission={single === 'true'}
                        submissions={filteredRecords.filter((record) => record.type !== "stay")} surveys={props.investigations.currentInvestigation.surveys} />
                </>)
        }
        else if (types.TYPE_SERVICE_SURVEY.includes(typeSurveySelected)){
            const serviceType = typeSurveySelected === types.TYPE_LAB_SURVEY ? 0 : 1;
            if(HOSPITAL_PATIENT_MAKE_TESTS === props.match.path){
                return <RequestForm />
            }
            return (
                <RequestTable serviceType={serviceType} uuidPatient={uuidPatient} 
                    showForm={showRequestType === 0} surveys={props.investigations.currentInvestigation.surveys}
                    uuidInvestigation={props.investigations.currentInvestigation.uuid} callBackRequestSelected={(req) => {
                        console.log("REqeust", req);
                        goToSubmissionUrl(req.requestsServiceInvestigation[0].patientInvestigation.uuid, req.submissionPatient.id)}
                    } />
            )
        }
        else if(filteredRecords.length === 0){
            return <Translate id={`pages.hospital.${translations}.no-records`} />
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
        setShowModal(false);
        //setIndexSection(-1);
        setIndexDataCollection(-1);
    }
    async function resetSnackBar(){
        setShowSnackbar({show:false});
        if(props.patientsSubmissions.error){
            await dispatch(resetPatientsSubmissionsError())
        }
        if(props.hospital.error){
            async function resetError(){
                await dispatch({
                    type:types.HOSPITAL_RESET_ERROR
                })
            }
        }
        
    }
    async function makeDischarge(){
        (await dispatch(dischargePatientAction(props.investigations.currentInvestigation.uuid, uuidPatient)))
    }
    function showConfirm(){
        setDischargeConfirm(true);
        setShowModal(true);
    }
    useEffect(() => {
        if(props.hospital.error){
            let message = "";
            switch(props.hospital.error){
                case 10: 
                    message = "hospital.patient.error.patient-alredy-discharged";
                    break;
                default:
                    message = "general.error";
            }

            setShowSnackbar({show:true, severity:"error", message : message});
        }
    }, [props.hospital.error])
    useEffect(() => {
        setShowOptions(false);
        setShowModal(false);
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
        if(dataCollectionSelected && dataCollectionSelected.type === types.TYPE_DISCHARGE_SURVEY){
            makeDischarge()
        }
        //Curso el alta del paciente si el ultimo registro es de un formulario de alta
    }, [props.patientsSubmissions.nUpdatedRegisters]);
    
    useEffect(() => {
        if(props.patientsSubmissions.data && departments){
            let tempSubmissions = []
            if(props.patientsSubmissions.data.hasOwnProperty(uuidPatient)){
                Object.values(props.patientsSubmissions.data[uuidPatient]).forEach((val)=> {
                    const tempSubs = val.submissions.map(sub => {
                        const tempSub = {...sub};
                        tempSub.surveyName = val.surveyName;
                        tempSub.uuidSurvey = val.uuid; 
                        tempSub.uuidResearcher = tempSub.researcher.uuid;
                        tempSub.typeSurvey = val.type; 
                        let departmentString = "";
                        if(tempSub.uuidUnit){
                            let department = null;
                            let unit = null;
                            departments.forEach((departmentSur) => {
                                departmentSur.units.forEach((unitDe) => {
                                    if(unitDe.uuid === tempSub.uuidUnit){
                                        unit = unitDe;
                                        department = departmentSur
                                    }
                                })
                            })
                            departmentString = department.name +": "+unit.name;
                        }
                        tempSub.researcher = tempSub.researcher.name+" "+tempSub.researcher.surnames +" - " +departmentString;

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
        
    }, [props.patientsSubmissions, departments])

    useEffect(() => {
        if(props.patientsSubmissions.error){
            let severity = "error";
            let message = "";
            if(action === "update"){
                message = "hospital.patient.error.general";
            }
            if(action === "fill"){
                message = "hospital.patient.error.general";
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
    else if(props.investigations.loading || props.patientsSubmissions.loading || surveyRecords === null || !departments){
        return <Loader />
    }
    else if(!patient){
        return(
            <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
                <Alert mb={4} severity="error">
                    <Translate id="hospital.patient.error.no-patient" />
                </Alert>
            </BoxBckgr>
        ) 
    }
    else{
        if(!patient.personalData.birthdate){
            //Para recibir más info si peta aqui
            postErrorSlack("patient", {}, patient.personalData, props.investigations.currentInvestigation);
        }
        let years = patient.personalData && patient.personalData.birthdate ? yearsFromDate(patient.personalData.birthdate) : "Not Available";
        //let stay = daysFromDate(props.dateIn);
        let isPatientHospitalized = staysPatient.length === 0 ? false : staysPatient[staysPatient.length -1].dateOut === null;
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
                <Modal isTransparent={showOptions} open={showModal || loading || saved } closeModal={closeModal}>
                    {
                        saved &&
                        <CheckCircleOutlineSvg style={{ color: "green",fontSize: 80 }}/>
                    }
                    { showOptions && 
                        <div >
                        {
                            renderSurveys()
                        }
                        </div>
                    }
                    {
                        dischargeConfirm && 
                        
                        <Grid container>
                             <Grid item xs={12}>
                                <Typography variant="h6" component="div" gutterBottom>
                                    <Typography variant="body2">Are you sure you want to discharge this patient?</Typography>
                                </Typography>
                                <Typography variant="body2" style={{fontWeight:'bold'}} component="div" gutterBottom>
                                {
                                    patient.personalData.health_id &&
                                    [
                                        <Translate id="investigation.create.personal_data.fields.health_id" />, ",", patient.personalData.health_id
                                    ]
                                }
                                <Typography variant="body2">
                                    <Translate id="investigation.create.personal_data.fields.name" />: {patient.personalData.name}
                                </Typography>
                                <Typography variant="body2">
                                    <Translate id="investigation.create.personal_data.fields.surnames" />: {patient.personalData.surnames}    
                                </Typography>
                                <Typography variant="body2">
                                    <Translate id="investigation.create.personal_data.fields.sex" />: {patient.personalData.sex === "Male" ? <Translate id="general.male" /> : <Translate id="general.female" />}    
                                </Typography>
                                </Typography>
                                
                             </Grid>
                             <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                    <Translate id="general.cancel" />
                                </ButtonCancel>
                                <ButtonContinue onClick={() => discharge()} data-testid="continue-modal" color="primary">
                                    <Translate id="general.continue" />
                                </ButtonContinue>
                            </Grid>
                        </Grid>
                    }
                    {
                        (showMenuHospitalize && !dischargeConfirm) &&
                        <ButtonGrey onClick={()=> {
                            setDischargeConfirm(true);
                        }} data-testid="select-hospital" >Alta Hospitalaria</ButtonGrey>
                    }
                </Modal>
                <Grid container spacing={3}>
                    <PatientToolBar readMedicalPermission={props.investigations.currentInvestigation.permissions.includes(PERMISSION.MEDICAL_READ) }
                        typeSurveySelected={typeSurveySelected}
                        writeMedicalPermission={props.investigations.currentInvestigation.permissions.includes(PERMISSION.MEDICAL_WRITE)} 
                        editCallBack={props.investigations.currentInvestigation.permissions.includes(PERMISSION.PERSONAL_ACCESS) ? editPersonalData : null}
                        action={parameters} disabled={dataCollectionSelected !== null || parameters === "fill"} patientID={patient.id} personalData={patient.personalData} years={years}
                        medicalNotesCallBack={() => backToRoot()} 
                        typeSurveysAvailable = { typesSurvey }
                        testCallBack={() => goToTest(TYPE_IMAGE_SURVEY)} 
                        labCallBack={() => goToTest(TYPE_LAB_SURVEY)}
                        socialCallBack={() => goToTest(TYPE_SOCIAL_SURVEY)}
                        shoeCallBack={() => goToTest(types.TYPE_SHOE_SURVEY)}
                        addRecordCallBack={addRecord}
                        hospitalize={ isPatientHospitalized ?  showConfirm : null }
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