
import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux';
import { Grid, Typography, Paper, Snackbar, Button, IconButton } from '@material-ui/core';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { postSubmissionPatientAction } from '../../redux/actions/submissionsPatientActions';
import { fetchSubmissionsPatientInvestigationAction } from '../../redux/actions/submissionsPatientActions';
import Loader from '../../components/Loader';
import { BoxBckgr, IconPatient, ButtonAdd, ButtonGreyBorderGrey, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import Modal from '../../components/general/modal';
import { useParams, useHistory } from 'react-router-dom';
import { yearsFromDate, daysFromDate, numberRecordsSection } from '../../utils';
import FillDataCollection from './FillDataCollection';
import ShowRecordsSection from '../../components/investigation/show/single/show_records_section'
import { Translate } from 'react-localize-redux';
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { HOSPITAL_PATIENT_DATACOLLECTION, HOSPITAL_PATIENT_MEDICAL_NOTE, HOSPITAL_PATIENT_SECTION } from '../../routes';
import { CloseIcon } from '@material-ui/data-grid';
import ShowPatientRecords from '../../components/investigation/show/single/show_patient_records';

const WhiteTypography = styled(Typography)`
    color:white;
    font-size: 1rem;
`

function Patient(props) {
    const [loading, setLoading] = useState(props.initialState ? props.initialState.loading : false)
    const [error, setError] = useState(props.initialState ? props.initialState.error : false)
    const [saved, setSaved] = useState(props.initialState ? props.initialState.saved : false);
    
    const [showSnackbar, setShowSnackbar] = useState({show : false, message:""});
    const [surveyRecords, setSurveyRecords] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [indexMedicalNote, setIndexMedicalNote] = useState(null);
    const [indexDataCollection, setIndexDataCollection] = useState(-1);
    const [indexSection, setIndexSection] = useState(-1);
    const dispatch = useDispatch();
    let { uuidPatient } = useParams();
    let { uuidSection } = useParams();
    let { uuidDataCollection } = useParams();
    let { action } = useParams();
    const parameters = useParams();
    let idMedicalNote  = parseInt(parameters["idMedicalNote"]);

    const history = useHistory();

    //const surveyRecords = props.patientsSubmissions.data && props.patientsSubmissions.data[uuidPatient] ? props.patientsSubmissions.data[uuidPatient] : [];
    const patient = props.investigations.data && props.patients.data ? props.patients.data[props.investigations.data[0].uuid].find(pat => pat.uuid === uuidPatient) : null
    const dataCollectionSelected = props.investigations.data && typeof uuidDataCollection !== "undefined" ? props.investigations.data[0].surveys.find(sur => sur.uuid === uuidDataCollection) : indexDataCollection !== -1 ? props.investigations.data[0].surveys[indexDataCollection] : null;
    const sectionSelected = dataCollectionSelected && typeof uuidSection !== "undefined" ? dataCollectionSelected.sections.find(sec => sec.uuid === uuidSection) : null;
    
    function fillDataCollection(indexCollection){
        setIndexDataCollection(indexCollection);
    }
    function sectionSelect(indexSection){
        const sectionSelected = dataCollectionSelected.sections[indexSection];

        let isDisabled = false;
        if(!sectionSelected.repeats){
            const patientSubmissions = props.patientsSubmissions.data[uuidPatient].hasOwnProperty(dataCollectionSelected.uuid) ? props.patientsSubmissions.data[uuidPatient][dataCollectionSelected.uuid].submissions : [];
            isDisabled =  numberRecordsSection(sectionSelected, patientSubmissions) > 0;
        }
        
        if(isDisabled){
            setShowSnackbar({show:true, message : "investigation.fill.survey.section-filled"});
        }
        else{
            const nextUrl = HOSPITAL_PATIENT_SECTION.replace(":uuidDataCollection", dataCollectionSelected.uuid)
                .replace(":uuidPatient", uuidPatient).replace(":action", "fill").replace(":uuidSection", sectionSelected.uuid);
            console.log("Next url", nextUrl);

            setShowOptions(false);
            //setIndexDataCollection(-1);
            setIndexSection(-1);

            history.push(nextUrl);
        }
        
    }
    function selectDataCollection(index){
        console.log("Row seleccionado ", surveyRecords[index]);
        
        const nextUrl = HOSPITAL_PATIENT_DATACOLLECTION.replace(":uuidPatient", uuidPatient).replace(":action", "show").replace(":uuidDataCollection", surveyRecords[index].uuidSurvey);
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
        setShowSnackbar({show:true, message : "investigation.fill.new_record"});
        setIndexSection(-1);
        setShowOptions(true);
        setIndexMedicalNote(null);
        console.log(data);

        // const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient);
        // console.log("Next url", nextUrl);
        // history.push(nextUrl);

        const postObj = {submission : [
            {
                uuid_section:sectionSelected.uuid,
                answers:data
            }
            ]
        }
        await dispatch(postSubmissionPatientAction(postObj, props.investigations.data[0].uuid, uuidPatient, dataCollectionSelected.uuid, dataCollectionSelected.name));
        
        
    }
    function renderOptions(){
        if(!dataCollectionSelected){
            return [
                <Grid item xs={6} style={{textAlign:"left"}}>
                    <WhiteTypography variant="body2" gutterBottom>
                        <Translate id="hospital.data-collections" />:
                    </WhiteTypography>
                </Grid>,
                props.investigations.data[0].surveys.sort((a,b) => a.order - b.order).map((dataCollection, index) => {
                    return(
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <ButtonGreyBorderGrey onClick={() => fillDataCollection(index)}>{dataCollection.name}</ButtonGreyBorderGrey>
                        </Grid>
                    )
                })
            ]
        }
        else if(indexSection === -1){
            
            return [
                <Grid item xs={6} style={{textAlign:"center"}}>
                    <WhiteTypography variant="body2" gutterBottom>
                        <Translate id="hospital.sections" />:
                    </WhiteTypography>
                </Grid>, 
                dataCollectionSelected.sections.sort((a,b) => a.order - b.order).map((section, index) => {
                    
                    
                    return(
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <ButtonGreyBorderGrey onClick={() => sectionSelect(index)}>{section.name}</ButtonGreyBorderGrey>
                        </Grid>
                    )
                })
            ]
        }
    }
    function renderCore(){
        if(dataCollectionSelected !== null && sectionSelected !== null){
            return(
                <FillDataCollection key={dataCollectionSelected.uuid} dataCollection={dataCollectionSelected} sectionSelected = {sectionSelected}
                patientId={props.patientId} investigation={props.investigation} callBackDataCollection={(values) => saveRecord(values)}/>
            )
        }
        else if(dataCollectionSelected !== null && action === "show"){
            return <ShowPatientRecords survey={dataCollectionSelected} mode="elements"
                        submissions={props.patientsSubmissions.data[uuidPatient][dataCollectionSelected.uuid].submissions}  />
        }
        // else if(!isNaN(idMedicalNote)){
        //     const medicalNoteSelected = surveyRecords.find(surRe => surRe.id === idMedicalNote);
        //     if(!medicalNoteSelected){
        //         throw new Error('Medical Note Missing!')
        //     }
        //     const dataCollection = props.investigations.data[0].surveys.find(dataCol => {
        //         if(dataCol.uuid === medicalNoteSelected.surveyUUID){
        //             return dataCol;
        //         }
        //     })
            
        //     const dateCreated = new Date(medicalNoteSelected.createdAt)
        //     const sectionSubmission = dataCollection.sections.find(section => {
        //         return section.uuid === medicalNoteSelected.surveyRecords[0].surveySection.uuid
        //     })
        //     return (
        //         <Grid container>
        //             <Grid item xs={6}>
        //                 <Typography variant="body2" gutterBottom>
        //                     {medicalNoteSelected.researcher}
        //                 </Typography>
        //             </Grid>
        //             <Grid xs={6}>
        //                 <Typography variant="body2" gutterBottom>
        //                     { dateCreated.toISOString().split('T')[0] }
        //                 </Typography>
        //             </Grid>
        //             <Grid item xs={12}>
        //                 <ShowRecordsSection noTitle submissions={[medicalNoteSelected]} section={sectionSubmission} />
        //             </Grid>
        //         </Grid>)
        // }
        else if(surveyRecords.length === 0){
            return <Translate id="hospital.patient.no-records" />
        }
        else{
            return(
                <EnhancedTable noHeader noSelectable selectRow={(index) => selectDataCollection(index)} 
                rows={surveyRecords.map((record, index) => {
                    const dateCreated = new Date(record.createdAt);
                    return({id : index, researcher : record.researcher, surveyName : record.surveyName, date : dateCreated.toISOString().slice(0, 16).replace('T', ' ')})
                })} headCells={[{ id: "researcher", alignment: "right", label: "Researcher"}, { id: "surveyName", alignment: "right", label: "DataCollection"},
                                { id: "date", alignment: "right", label: "Date"}]} />
            )
        }
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
            await dispatch(fetchSubmissionsPatientInvestigationAction(props.investigations.data[0].uuid, uuidPatient));
        }
        if(props.investigations.data && (!props.patientsSubmissions.data || !props.patientsSubmissions.data.hasOwnProperty(uuidPatient))){
            fetchRecordsPatient()
        }
    }, [props.investigations])
    useEffect(() => {
        if(props.patientsSubmissions.data){
            let tempSubmissions = []
            if(props.patientsSubmissions.data.hasOwnProperty(uuidPatient)){
                tempSubmissions = Object.values(props.patientsSubmissions.data[uuidPatient]).reduce((acc, val)=> {
                    let tempDict = {};
                    tempDict.surveyName = val.surveyName; 
                    tempDict.uuidSurvey = val.uuid; 
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
        let years = yearsFromDate(parseInt(patient.personalData.birthdate));
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
                    onClose={() => setShowSnackbar({show:false})}
                    message={<Translate id={showSnackbar.message} />}
                    action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={() => setShowSnackbar({show:false})}>
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setShowSnackbar({show:false})}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
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
                <Grid container style={{backgroundColor:"white"}} spacing={3}>
                    <Grid item container xs={12}>
                        <Grid item container xs={3} >
                            <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                    {props.number}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
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
                                <ButtonAdd onClick={() => setShowOptions(!showOptions)} />
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