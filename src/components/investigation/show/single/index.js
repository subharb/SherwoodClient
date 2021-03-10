import React, { useState, useEffect } from 'react';
import PersonalDataForm from './personal_data';
import { Alert } from "@material-ui/lab";
import ShowAllRecordsSurvey from './show_all_records_survey';
import { ButtonAdd, ButtonBack, Divider } from '../../../general/mini_components';
import ShowSurveysPatient from './show_surveys_patient';
import { saveSubmissionAction, fetchSubmissionsSurveyAction } from '../../../../redux/actions/submissionsActions';
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
    let currentSubmissions = props.submissions.data && props.submissions.data.hasOwnProperty(surveySelected.uuid) && surveySelected ? props.submissions.data[surveySelected.uuid] : []

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
            const rows = props.patients.map(patientData => {
                let tempRow = {};
                for(const pField of currentInvestigation.personalFields){
                    let value = patientData[pField.name];
                    if(pField.type === "date"){
                        value = new Date(parseInt(patientData[pField.name])).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                            }).replace(/\./g, '/');
                    }
                    tempRow[pField.name] = value;
                }
                return(
                    tempRow
                )
            });
            const headCells = currentInvestigation.personalFields.map(pField => {
                return { id: pField.name, alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.${pField.name}`} /> }
            }) 
            return (
                <EnhancedTable titleTable={<Translate id="investigation.create.summary.patients" />} rows={rows} headCells={headCells} 
                    actions={{"view":(index => showPatient(index)), "add" : (index) => selectPatient(index)}}
                    />
            )
        }
    }
    function renderSurveysTable(){
        const headCells = [{ id: "name", alignment: "right", label: <Translate id="investigation.create.personal_data.fields.name" /> }]
        return(
            <EnhancedTable titleTable={<Translate id="investigation.fill.survey.title" />} 
                rows={currentInvestigation.surveys.map(survey => {
                    return {name : survey.name}})} 
                headCells={headCells} actions={{"view":(index) => showSurvey(index)}}
                />
        )
    }
    async function showSurvey(index){
        if(currentInvestigation.surveys[index].hasRecords){
            setShowForm(4);
            setLevel(0);
            setSurveyIndex(index);
            if(!props.submissions.hasOwnProperty(currentInvestigation.surveys[index].uuid)){
                  await dispatch(fetchSubmissionsSurveyAction(props.uuid, currentInvestigation.surveys[index].uuid));
            }
        }
        else{
            setShowSnackBar(true);
        }
        
    }
    function showPatient(index){
        setPatientIndex(index);
        setShowForm(3);
    }
    function selectPatient(index){
        setPatientIndex(index);
        setShowForm(2);
    }
    async function savePatient(patientData){
        console.log(patientData);    
        await savePatientAction(currentInvestigation.uuid, patientData);

        setShowForm(0);
    }
    async function saveRecord(values, surveyUUID){
        console.log(values);
        const recordArray = Object.keys(values).map(keySection => {
            return {
                uuid_section:keySection,
                answers:[...values[keySection]]
            }
        })
        const postObj = {submission : recordArray}
        await saveSubmissionAction(postObj, currentInvestigation.uuid, props.patients[patientIndex].uuid, surveyUUID)

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
                return <ShowSurveysPatient level={level} updateLevel={(level) => setLevel(level)} mode="add" 
                            patient={props.patients[patientIndex]} saveRecord={saveRecord}
                            surveys={currentInvestigation.surveys} uuidInvestigation={currentInvestigation.uuid}/>
            case 3: 
            //View Data
                return <ShowSurveysPatient level={level} updateLevel={(level) => setLevel(level)} mode="view" 
                            patient={props.patients[patientIndex]} 
                            surveys={currentInvestigation.surveys} uuidInvestigation={currentInvestigation.uuid}/>

            case 4:
                return <ShowAllRecordsSurvey level={level} updateLevel={(level) => setLevel(level)} survey={currentInvestigation.surveys[surveyIndex]} 
                            patients={props.patients} submissions={currentSubmissions}/>
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
    if(props.investigations.loading || !currentInvestigation || props.submissions.loading){
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
        patients:state.patients.hasOwnProperty(ownProps.uuid) ? state.patients[ownProps.uuid] : []
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
