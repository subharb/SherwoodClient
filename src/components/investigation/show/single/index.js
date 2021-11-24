import React, { useState, useEffect } from 'react';
import PersonalDataForm from './personal_data';
import { Alert } from "@material-ui/lab";
import ShowAllRecordsSurvey from './show_all_records_survey';
import { ButtonAdd, ButtonBack, Divider } from '../../../general/mini_components';
import ShowSurveysPatient from './show_surveys_patient';
import { saveSubmissionAction, fetchSubmissionsInvestigationAction } from '../../../../redux/actions/submissionsActions';
import { savePatientAction } from '../../../../redux/actions/patientsActions';
import { useDispatch } from "react-redux";
import Loader from '../../../Loader';
import { useHistory } from "react-router-dom";
import { Button, Grid, IconButton, Snackbar, Typography } from "@material-ui/core";
import { EnhancedTable } from '../../../general/EnhancedTable';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { CloseIcon } from '@material-ui/data-grid';
import { connect } from 'react-redux';

import PatientsTable from '../../../general/PatientsTable';
/**
 * 
 * Component to add data to an investigation. First you add patients and then you add info of each patient.
 * Partimos de que tenemos todos los records de todos los surveys
 */
export function ShowInvestigation(props) {
    const [showForm, setShowForm] = useState(0);
    const [level, setLevel] = useState(0);
    const [patientIndex, setPatientIndex] = useState(null);
    const [surveyIndex, setSurveyIndex] = useState(null);
    const [currentInvestigation, setCurrentInvestigation] = useState(null);
    
    const [showSnackbar, setShowSnackBar] = useState(false);
    const dispatch = useDispatch();
    const history  = useHistory();    

    let surveySelected = surveyIndex !== null ? currentInvestigation.surveys[surveyIndex] : null;
    let currentSurveySubmissions = props.submissions.data && props.submissions.data.hasOwnProperty(props.uuid) && surveySelected ? props.submissions.data[props.uuid].find(sub=>sub.uuid === surveySelected.uuid).submissions : []

    useEffect(() => {
        if(props.investigations.data){
            setCurrentInvestigation(props.investigations.data.find(inv => inv.uuid === props.uuid))
        }
    }, [props.investigations])

    function renderPatientsTable(){
        if(props.patients.length === 0){
            return (<Typography variant="subtitle1" color="textPrimary">
                        You dont have any patients enrolled yet
                    </Typography>)
        }
        else{      
            
            return <PatientsTable patients={props.patients} 
                        personalFields={currentInvestigation.personalFields} 
                        addInfoPatientCallBack={(index) => selectPatient(index)}
                        showPatientCallBack={index => showPatient(index)} 
                        />
        }
    }
    function renderSurveysTable(){
        const headCells = [{ id: "name", alignment: "right", label: <Translate id="investigation.create.personal_data.fields.name" /> }]
        return(
            <EnhancedTable titleTable={<Translate id="investigation.fill.survey.title" />} 
                rows={currentInvestigation.surveys.map(survey => {
                    return {name : survey.name}})} 
                headCells={headCells} 
                actions={[{"type" : "view", "func" :(index) => showSurvey(index)}]}
                />
        )
    }
    function showSurvey(index){
        if(currentInvestigation.surveys[index].hasRecords){
            setShowForm(4);
            setLevel(0);
            setSurveyIndex(index);
            fetchSubmissionsInvestigation();
        }
        else{
            setShowSnackBar(true);
        }
        
    }
    function initialState(){
        setShowForm(0); 
        setLevel(0);
        setPatientIndex(null);
        setSurveyIndex(null);
    }
    async function fetchSubmissionsInvestigation(){
        if(!props.submissions.hasOwnProperty(props.uuid)){
            await dispatch(fetchSubmissionsInvestigationAction(props.uuid));    
        }
    }
    function showPatient(index){
        setPatientIndex(index);
        setShowForm(3);
        fetchSubmissionsInvestigation();
    }
    function selectPatient(index){
        setPatientIndex(index);
        setShowForm(2);
        fetchSubmissionsInvestigation();
    }
    async function savePatient(patientData){
        console.log(patientData);    
        initialState();
        await dispatch(savePatientAction(currentInvestigation, patientData));
    }
    async function saveRecord(values, surveyUUID){
        console.log(values);
        initialState();
        const recordArray = Object.keys(values).map(keySection => {
            return {
                uuid_section:keySection,
                answers:[...values[keySection]]
            }
        })
        const postObj = {submission : recordArray}
        await dispatch(saveSubmissionAction(postObj, currentInvestigation.uuid, props.patients[patientIndex].uuid, surveyUUID));

    }
    function renderAddPatients(){
        if(currentInvestigation.shareStatus === 2 && showForm === 0){
            return(
                <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Add new patient<ButtonAdd data-testid="add-patient" onClick={() => setShowForm(1)} />
                    </Typography>
                </Grid> 
            )
        }
        else if(currentInvestigation.shareStatus !== 2 ){
            return null;
        }
    }
    function renderForm(){
        switch(showForm){
            case 0:
                return [
                    renderPatientsTable(),
                    <Divider my={6} />,
                    renderSurveysTable()
                ]
            case 1:
                return <PersonalDataForm fields={ currentInvestigation.personalFields} keyResearcherInvestigation={currentInvestigation.keyResearcherInvestigation}
                            initialData={props.patientInfo} callBackForm={(personalData) => savePatient(personalData)}/>
            case 2: 
            //Add Data
                return <ShowSurveysPatient key={props.patients[patientIndex].uuid} level={level} updateLevel={(level) => setLevel(level)} mode="add" 
                            patient={props.patients[patientIndex]} saveRecord={saveRecord}  submissions={props.submissions.data[currentInvestigation.uuid] }
                            surveys={currentInvestigation.surveys} uuidInvestigation={currentInvestigation.uuid}/>
            case 3: 
            //View Data
                return <ShowSurveysPatient key={props.patients[patientIndex].uuid} level={level} updateLevel={(level) => setLevel(level)} mode="view" 
                            patient={props.patients[patientIndex]} submissions={props.submissions.data[currentInvestigation.uuid] }
                            surveys={currentInvestigation.surveys} uuidInvestigation={currentInvestigation.uuid}/>

            case 4:
                return <ShowAllRecordsSurvey level={level} updateLevel={(level) => setLevel(level)} survey={currentInvestigation.surveys[surveyIndex]} 
                            patients={props.patients} submissions={currentSurveySubmissions}/>
            default:
                return null;
        }
    }
    function goBack(){
        if(level === 0){
            setShowForm(0);
        }
        else{
            setLevel(c => c -1);
        }
    }
    if(props.investigations.loading || !currentInvestigation || props.submissions.loading || props.patientsLoading){
        return <Loader />
    }
    return (
        <Grid container spacing={1} >
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSnackbar}
                autoHideDuration={2000}
                onClose={() => setShowSnackBar(false)}
                message={<Translate id="investigation.fill.survey.no_records" />}
                action={
                <React.Fragment>
                    <Button color="secondary" size="small" onClick={() => setShowSnackBar(false)}>
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setShowSnackBar(false)}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom display="inline">
                    {currentInvestigation.name}
                </Typography>
            </Grid>
            {
                showForm !== 0 && 
                <Grid item xs={12}>
                    <ButtonBack data-testid="back" onClick={goBack} >Back</ButtonBack>
                </Grid>
            }
            {
                renderAddPatients()
            }
            <Grid item xs={12}>
            {
                renderForm()
            }
            </Grid>
        </Grid>
    )
}

function mapStateToProps(state, ownProps){
    return{
        submissions:state.submissions,
        investigations:state.investigations,
        patientsLoading:state.patients.loading,
        patients:state.patients.data && state.patients.data.hasOwnProperty(ownProps.uuid) ? state.patients.data[ownProps.uuid] : []
    }
}

export default (connect(mapStateToProps, null )(ShowInvestigation))

ShowInvestigation.propTypes = {
    /* Datos para testear el componente*/
    initialData : PropTypes.object,
    /* UUId de la investigacion */
    uuid : PropTypes.string,
    /* Datos personales del paciente */
    patientInfo : PropTypes.object
}
