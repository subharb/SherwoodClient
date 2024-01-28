import React, { useState, useEffect, useRef, useMemo } from 'react'
import { connect } from 'react-redux';
import * as types from "../../../constants";
import { Grid, Typography, Snackbar } from '@mui/material';
import { fetchSubmissionsPatientInvestigationAction, resetPatientsSubmissionsError } from '../../../redux/actions/submissionsPatientActions';
import Loader from '../../../components/Loader';
import { BoxBckgr, CheckCircleOutlineSvg, ButtonGrey, ButtonCancel, ButtonContinue, TypographyStyled } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import { useParams, useHistory } from 'react-router-dom';
import { yearsFromDate, postErrorSlack, getUnitsResearcher } from '../../../utils/index.jsx';
import FillDataCollection from '../FillDataCollection';
import { Translate, withLocalize } from 'react-localize-redux';
import { Alert } from "@mui/lab";
import { useDispatch } from "react-redux";
import { HOSPITAL_PATIENT, HOSPITAL_PATIENT_DATACOLLECTION, HOSPITAL_PATIENT_EDIT_PERSONAL_DATA,
        HOSPITAL_PATIENT_MAKE_TESTS,
        HOSPITAL_PATIENT_SECTION, HOSPITAL_PATIENT_SINGLE_SUBMISSION, HOSPITAL_PATIENT_SUBMISSION, HOSPITAL_PATIENT_TESTS } from '../../../routes/urls';
import ShowPatientRecords from '../../../components/investigation/show/single/show_patient_records';
import { useDepartments, useSnackBarState, useUpdateEffect } from '../../../hooks';
import { fetchProfileInfoAction } from '../../../redux/actions/profileActions';
import { MEDICAL_SURVEYS, TYPE_SOCIAL_SURVEY,  TYPE_IMAGE_SURVEY, TYPE_LAB_SURVEY, TYPE_MEDICAL_SURVEY } from '../../../constants';
import { PatientToolBar } from './toolbar';
import { dischargePatientAction, getPatientStaysAction } from '../../../redux/actions/hospitalActions';
import { FUNCTIONALITY } from '../../../constants/types';
import TabsSurveys from './TabsSurveys';
import RequestTable from '../Service/RequestTable';
import RequestForm from '../Service/RequestForm';
import { PERMISSION } from '../../../components/investigation/share/user_roles';
import SubmissionsTable from './SubmissionsTable';



function urlToSection(urlType, dataCollectionSelected){
    try{
        if(typeof urlType === "undefined"){
            if(dataCollectionSelected === null){
                return types.PATIENT_TOOLBAR_SECTION_MEDICAL;
            }
            switch(dataCollectionSelected.type){
                case types.TYPE_FILL_IMG_SURVEY:
                    return types.PATIENT_TOOLBAR_SECTION_IMAGE;
                case types.TYPE_FILL_LAB_SURVEY:
                    return types.PATIENT_TOOLBAR_SECTION_LAB;
            }
            switch(dataCollectionSelected.category){
                case types.CATEGORY_DEPARTMENT_MEDICAL:
                    return types.PATIENT_TOOLBAR_SECTION_MEDICAL;
                case types.CATEGORY_DEPARTMENT_SOCIAL:
                    return types.PATIENT_TOOLBAR_SECTION_SOCIAL;
                case types.CATEGORY_DEPARTMENT_NURSE:
                    return types.PATIENT_TOOLBAR_SECTION_NURSE;
                case types.CATEGORY_SURVEY_SHOE:
                    return types.PATIENT_TOOLBAR_SECTION_SHOE;
                case types.CATEGORY_DEPARTMENT_PRESCRIPTIONS:
                    return types.PATIENT_TOOLBAR_SECTION_PRESCRIPTIONS;
            }
            
        }
        switch(urlType){
            case "images":
                return types.PATIENT_TOOLBAR_SECTION_IMAGE;
            case "lab":
                return types.PATIENT_TOOLBAR_SECTION_LAB;
            case "social":
                return types.PATIENT_TOOLBAR_SECTION_SOCIAL;
            case "shoe":
                return types.PATIENT_TOOLBAR_SECTION_SHOE;
            case "nurse":
                return types.PATIENT_TOOLBAR_SECTION_NURSE;
            case "prescriptions":
                return types.PATIENT_TOOLBAR_SECTION_PRESCRIPTIONS;
            default:
                return types.PATIENT_TOOLBAR_SECTION_MEDICAL;
        }
    }
    catch(error){
        console.log("Error en urlToSection", error);
        return types.PATIENT_TOOLBAR_SECTION_MEDICAL; 
    }
    
}

const PRINTABLE_TYPE_SURVEYS = [types.TYPE_PRESCRIPTIONS]
const TYPE_URL = {1 : "images", 2 : "lab", 6 : "social", 7:"shoe", 12:"nurse", 13:"prescriptions"};
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
    
    const {departments, researchers, loadingDepartments } = useDepartments();
    
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
    const billingInfo = props.investigations.currentInvestigation ? props.investigations.currentInvestigation.billingInfo : null;
    
    const currentSurveys = props.investigations.currentInvestigation ? props.investigations.currentInvestigation.surveys.filter((survey) => {
        // if(parameters.typeTest === "shoe" && survey.category === types.CATEGORY_SURVEY_SHOE){
        //     return true;
        // }
        if(parameters.typeTest === "social" && survey.category === types.CATEGORY_DEPARTMENT_SOCIAL){
            return true;
        }
        if(parameters.typeTest === "nurse" && survey.category === types.CATEGORY_DEPARTMENT_NURSE){
            return true;
        }
        if(parameters.typeTest === "prescriptions" && survey.category === types.CATEGORY_DEPARTMENT_PRESCRIPTIONS){
            return true;
        }
        if((!parameters.typeTest || parameters.typeTest === "medical") && MEDICAL_SURVEYS.includes(survey.type) && survey.category === types.CATEGORY_DEPARTMENT_MEDICAL){
            return true;
        }
        if(parameters.typeTest === "images" && [types.TYPE_FILL_IMG_SURVEY, types.TYPE_IMAGE_SURVEY].includes(survey.type)){
            return true;
        }
        if(parameters.typeTest === "lab" && [types.TYPE_FILL_LAB_SURVEY, types.TYPE_LAB_SURVEY].includes(survey.type)){
            return true;
        }
    }) : [];
    const dataCollectionSelected = props.investigations.data ? (submission ? props.investigations.currentInvestigation.surveys.find(sur => sur.uuid === submission.uuidSurvey) : uuidDataCollection ? props.investigations.currentInvestigation.surveys.find(sur => sur.uuid === uuidDataCollection) : indexDataCollection !== -1 ? currentSurveys[indexDataCollection] : null) : null;
    const typesCurrentSurvey = dataCollectionSelected ? (MEDICAL_SURVEYS.includes(dataCollectionSelected.type) ? MEDICAL_SURVEYS : [dataCollectionSelected.type]) : (parameters.hasOwnProperty("typeTest") ? (URL_TYPE[parameters["typeTest"]] ? [URL_TYPE[parameters["typeTest"]]] : MEDICAL_SURVEYS) : MEDICAL_SURVEYS);
    
    //const surveyRecords = props.patientsSubmissions.data && props.patientsSubmissions.data[uuidPatient] ? props.patientsSubmissions.data[uuidPatient] : [];
    const patient = props.investigations.data && props.patients.data ? props.patients.data[props.investigations.currentInvestigation.uuid].find(pat => pat.uuid === uuidPatient) : null
    const staysPatient = props.hospital.data.stays && props.hospital.data.stays[uuidPatient] ? props.hospital.data.stays[uuidPatient] : [];
    const typeSurveySelected = typesCurrentSurvey.length === 1 ? typesCurrentSurvey[0] : dataCollectionSelected ? dataCollectionSelected.type : TYPE_MEDICAL_SURVEY;
    const categorySurveySelected = dataCollectionSelected ? dataCollectionSelected.category : null;
    const sectionSelected = dataCollectionSelected && typeof uuidSection !== "undefined" ? dataCollectionSelected.sections.find(sec => sec.uuid === uuidSection) : null;
    const typesSurvey = props.investigations.data ? props.investigations.currentInvestigation.surveys.map((survey) => {
            return survey.type;
    }) : [];
    const categorySurveys = props.investigations.data ? props.investigations.currentInvestigation.surveys.map((survey) => {
        return survey.category;
    }) : [];

    let filteredRecords = useMemo(() => {
        if(idSubmission && surveyRecords){
            const currentSub = surveyRecords.find((rec) => rec.id === idSubmission);
            if(currentSub && currentSurveys.length > 0){
                return surveyRecords.filter(rec => {
                    return currentSurveys.some((sur) => sur.uuid === rec.uuidSurvey);
                });
                // return surveyRecords.filter(rec => {
                //     return props.investigations.currentInvestigation.surveys.find((sur) => sur.uuid === currentSub.uuidSurvey) !== undefined;
                // })
            }
        }
        return surveyRecords ? surveyRecords.filter(rec => {
            return currentSurveys.find((sur) => sur.uuid === rec.uuidSurvey) !== undefined;
            // const survey = props.investigations.currentInvestigation.surveys.find(sur => currentSurveys sur.uuid === rec.uuidSurvey);
            // return typesCurrentSurvey.includes(survey.type)
        }) : [];
    }, [currentSurveys, surveyRecords, idSubmission]);

    if(typeSurveySelected === TYPE_MEDICAL_SURVEY){
        staysPatient.forEach((stay) => {
            filteredRecords.push({
                researcher : stay.checkInResearcher.researcher.name +" "+stay.checkInResearcher.researcher.surnames,
                surveyName : props.translate("hospital.patient.hospitalized-in-ward").toString().replace("%X", stay.bed.ward.name),
                createdAt : stay.dateIn,
                type:"stay"
            })
            if(stay.dateOut){
                filteredRecords.push({
                    researcher : stay.checkoutResearcher.researcher.name +" "+stay.checkoutResearcher.researcher.surnames,
                    surveyName : props.translate("hospital.patient.discharged-from-ward").toString().replace("%X", stay.bed.ward.name),
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
                .replace(":idSubmission", idSubmission)
                .replace(":typeTest", parameters.typeTest);
        history.push(nextUrl);
    }

    function addRecord(){
        if(currentSurveys.length > 1 ){
            setShowOptions(true);
            setShowModal(true);
        }
        else{
            let nextUrl;
            
            
            if((["images", "lab"].includes(parameters.typeTest) && props.investigations.currentInvestigation.functionalities.includes(FUNCTIONALITY.REQUESTS)) ||
                (parameters.typeTest === 'shoe' && props.investigations.currentInvestigation.functionalities.includes(FUNCTIONALITY.SHOE_SHOP))){
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
        if(value === TYPE_MEDICAL_SURVEY){
            backToRoot();
            return;
        }
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
    function cancelRequest(){
        let nextUrl = HOSPITAL_PATIENT_TESTS.replace(":uuidPatient", uuidPatient).replace(":typeTest", parameters.typeTest);
        history.push(nextUrl);
    }

    function goToSurveyUrl(uuidSurvey){
        const nextUrl = HOSPITAL_PATIENT_SUBMISSION.replace(":uuidPatient", uuidPatient)
                            .replace(":action", "show")
                            .replace(":idSubmission", uuidSurvey)
                            .replace(":typeTest", parameters.typeTest ? parameters.typeTest : "medical");
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    function resetModal(){
        setShowOptions(false);
        setShowModal(false);
        setDischargeConfirm(false);
    }

    async function saveRecord(data){
        // Save record solo gestiona el callback de social y medical, el resto son componentes y se gestionan de otra forma.
        let nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient);
        if(dataCollectionSelected && Object.keys(TYPE_URL).includes(dataCollectionSelected.type.toString())){
            const url = TYPE_URL[dataCollectionSelected.type];
            nextUrl = HOSPITAL_PATIENT_TESTS.replace(":uuidPatient", uuidPatient).replace(":typeTest", url )
            
        }
        setShowOptions(true);
        setShowModal(true);
        setIndexMedicalNote(null);
        setSavedDataCollection(true);

        setTimeout(function(){
            history.push(nextUrl);

       }, 1000);
    
    }
    function renderSurveys(){
        if(!dataCollectionSelected){
            return [
                <TabsSurveys surveys={currentSurveys} units={props.profile.info.units} 
                    departments={departments} surveySelectedCallback={(uuid) => fillDataCollection(uuid)} />
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
                const units = getUnitsResearcher(props.profile.info.uuid, researchers);
                const unitSurvey = dataCollectionSelected.unit ? units.find((unit) => unit.uuid === dataCollectionSelected.unit.uuid) : null;
                const surveyDepartment = unitSurvey ? units.find((unit) => unit.uuid === dataCollectionSelected.unit.uuid).department : null;
                return(
                    <FillDataCollection initData = {submission} key={dataCollectionSelected.uuid} dataCollection={dataCollectionSelected} 
                        sectionSelected = {sectionSelected} uuidPatient={uuidPatient} researcher={props.profile.info} idSubmission={idSubmission}
                        country={props.investigations.currentInvestigation.country} numberButtonsSubmit={2}
                        uuidInvestigation={props.investigations.currentInvestigation.uuid} department={surveyDepartment}
                        callBackDataCollection={(values) => saveRecord(values)}/>
                )
            }
            
        }
        else if(idSubmission !== null && action === "show"){
            const belongsToRequest = idSubmission && types.TYPE_FILL_SURVEY.includes(typeSurveySelected);
            const forceEdit =  dataCollectionSelected.type === types.TYPE_EDITABLE_SURVEY
            return (
                <>  
                    {/* {
                        belongsToRequest &&
                        <RequestInfoWithFetch idSubmission={idSubmission} uuidInvestigation={props.investigations.currentInvestigation.uuid} />
                    } */}
                    <ShowPatientRecords permissions={props.investigations.currentInvestigation.permissions} 
                        forceEdit={forceEdit} survey={dataCollectionSelected} 
                        mode="elements" callBackEditSubmission={callBackEditSubmission} idSubmission={idSubmission} 
                        singleSubmission={single === 'true'} uuidInvestigation={props.investigations.currentInvestigation.uuid}
                        submissions={filteredRecords.filter((record) => record.type !== "stay")} 
                        surveys={props.investigations.currentInvestigation.surveys} />
                </>)
        }
        else if ((types.TYPE_REQUEST_FUNC.includes(typeSurveySelected) &&  props.investigations.currentInvestigation.functionalities.includes(FUNCTIONALITY.REQUESTS))
            || (typeSurveySelected === types.TYPE_SHOE_SURVEY && props.investigations.currentInvestigation.functionalities.includes(FUNCTIONALITY.SHOE_SHOP))){
            const serviceType = typeSurveySelected === types.TYPE_LAB_SURVEY ? 0 : typeSurveySelected === types.TYPE_IMAGE_SURVEY ? 1 : 3;
            if(HOSPITAL_PATIENT_MAKE_TESTS === props.match.path){
                const units = getUnitsResearcher(props.profile.info.uuid, researchers);
            
                const departmentsResearcher = {};
                units.forEach((unit) => {
                    const department = unit.department;
                    departmentsResearcher[department.uuid] = department;
                })
                return <RequestForm serviceType={serviceType} uuidPatient={uuidPatient}  
                            uuidInvestigation={props.investigations.currentInvestigation.uuid} 
                            units = {units}
                            cancel = {() => cancelRequest()}
                            callBackRequestFinished={() => cancelRequest()}/>
            }
            return (
                <RequestTable serviceType={serviceType} uuidPatient={uuidPatient} 
                    searchFor="general.patient" noSearchBox
                    showForm={showRequestType === 0} surveys={props.investigations.currentInvestigation.surveys}
                    uuidInvestigation={props.investigations.currentInvestigation.uuid} callBackRequestSelected={(req) => {
                        goToSubmissionUrl(req.requestsServiceInvestigation[0].patientInvestigation.uuid, req.submissionPatient.id)}
                    } />
            )
        }
        else if(filteredRecords.length === 0){
            return <TypographyStyled>
                        <Translate id={`pages.hospital.${translations}.no-records`} />
                    </TypographyStyled>
        }
        else{
            
            return (
                <SubmissionsTable typeSurveySelected={typeSurveySelected}
                    surveys={currentSurveys} billingInfo={billingInfo} patient={patient}
                    category={currentSurveys[0].category} records={filteredRecords}
                    onSelectSubmission={(index) => selectSubmission(index)} />
            )
            return (
                <SubmissionsTable fieldsSurvey={fieldsSurvey} typeSurveySelected={typeSurveySelected}
                    surveys={currentSurveys} billingInfo={billingInfo} patient={patient}
                    category={currentSurveys[0].category} records={filteredRecords}
                    onSelectSubmission={(index) => selectSubmission(index)} />
            );
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

        const submissionsNotOnlyAdditionalInfo = props.patientsSubmissions.data && props.patientsSubmissions.data.hasOwnProperty(uuidPatient) ? Object.values(props.patientsSubmissions.data[uuidPatient]).filter((surveySubs) => {  
            return surveySubs.type !== types.TYPE_ADDITIONAL_INFO_SURVEY
        }).length !== Object.values(props.patientsSubmissions.data[uuidPatient]).length : false;
        if(props.investigations.data && (!props.patientsSubmissions.data || !submissionsNotOnlyAdditionalInfo)){
            fetchRecordsPatient();
            fetchPatientsStay()
        }
    }, [props.investigations])
    
    useEffect(() => {
        if(!props.profile.info && props.investigations.currentInvestigation){
            dispatch(fetchProfileInfoAction(props.investigations.currentInvestigation.uuid));
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
                            departmentString = department && unit ? department.name +": "+unit.name : "Department deleted";
                        }
                        tempSub.researcher = tempSub.researcher.name+" "+tempSub.researcher.surnames +" - " +departmentString;

                        return tempSub;
                    })
                    tempSubmissions = tempSubmissions.concat(tempSubs); 
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
    else if(props.investigations.loading || props.patientsSubmissions.loading || props.profile.loading  || surveyRecords === null || loadingDepartments){
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
                                <ButtonContinue onClick={() => discharge()} data-testid="continue-modal" color="green">
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
                        typeSurveySelected={ dataCollectionSelected ? dataCollectionSelected.type : parameters.typeTest ? parameters.typeTest : "medical" }
                        buttonSelected = { urlToSection(parameters.typeTest, dataCollectionSelected)}
                        writeMedicalPermission={props.investigations.currentInvestigation.permissions.includes(PERMISSION.MEDICAL_WRITE)} 
                        editCallBack={props.investigations.currentInvestigation.permissions.includes(PERMISSION.PERSONAL_ACCESS) ? editPersonalData : null}
                        action={parameters} enableAddButton={dataCollectionSelected !== null || parameters === "fill"} patientID={patient.id} 
                        personalData={patient.personalData} years={years}
                        
                        typeSurveysAvailable = { typesSurvey }
                        categorySurveys = {categorySurveys}
                        unitsResearcher={props.profile.info.units}
                        medicalNotesCallBack={() => backToRoot()} 
                        buttonClickedCallBack = { (buttonClicked) => goToTest(buttonClicked)}
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
export default withLocalize(connect(mapStateToProps, null)(Patient))