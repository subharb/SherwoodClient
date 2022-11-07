import React, { useState, useEffect } from 'react';
import { Alert } from "@material-ui/lab";
import axios from 'axios';
import ShowRecordsSection from './show_records_section';
import { ButtonAdd, ButtonBack, ButtonForward } from '../../../general/mini_components';
import { filterRecordsFromSection, filterRecordsFromSubmissions, numberRecordsSection } from '../../../../utils';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { EnhancedTable } from '../../../general/EnhancedTable';
import { fetchRecordsPatientFromSurvey } from '../../../../services';
import { Card, CardContent, Typography, Grid, Paper } from '@material-ui/core';
import { HOSPITAL_PATIENT_SECTION } from '../../../../routes';
import Loader from '../../../Loader';

/**
 * Component in charge of showing records of a given patient in a survey
 */
export default function ShowPatientRecords(props) {
    let [indexSubmission, setIndexSubmission ] = useState(-1);
    const [sectionSelected, setSectionSelected] = useState(null);

    const [showError, setShowError] = useState(0);
    function addRegistry(indexSection){
        setSectionSelected(indexSection);
    }

 
    function renderSection(section, nRecords){
        let registers = "No hay registros";
        let addButton = <ButtonAdd onClick={() => addRegistry(section.uuid)} />;
        if(nRecords !== 0){
            registers = "Hay "+nRecords+" registros";
            if(!section.repeats){
                addButton = "No boton";
            }
        }
        return(
            { name : section.name, register : registers}
        )
    }
    function renderSubmissionsSection(){    
        
        const currentSurvey = props.surveys.find(sur => sur.uuid === props.submissions[indexSubmission].uuidSurvey);
        return Object.values(currentSurvey.sections).sort((a,b) => a.order - b.order).map(section => {
        // const patientSubmissions = props.submissions.filter(sub=>sub.patient.uuid === props.patient.uuid);
            const recordsSection = filterRecordsFromSection(props.submissions[indexSubmission], section.uuid);

            return(
                <ShowRecordsSection permissions={props.permissions} indexSubmission={indexSubmission}
                    callBackEditSubmission={(uuidSubmission, uuidSection) =>props.callBackEditSubmission(uuidSubmission, uuidSection)} 
                    records={recordsSection} section={section} uuidResearcher = {props.submissions[indexSubmission].uuidResearcher}
                    idSubmission = {props.submissions[indexSubmission].id}
                    updatedAt={props.submissions[indexSubmission].updatedAt}/>
            )
        });
        
        
    }
    function renderNavigation(){
        const dateCurrentSubmission = new Date(props.submissions[indexSubmission].updatedAt)
        return (
            <Grid item xs={12}>
                <Paper style={{padding:"1rem", marginTop:'1rem'}}>
                    <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom><Translate id="hospital.data-collection" />: {props.submissions[indexSubmission].surveyName}</Typography>
                        <Typography variant="body2" gutterBottom><Translate id="hospital.doctor" />: {props.submissions[indexSubmission].researcher}</Typography>
                        <Typography variant="body2" gutterBottom><Translate id="general.date" />: {dateCurrentSubmission.toLocaleDateString()} {dateCurrentSubmission.toLocaleTimeString()}</Typography>                        
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" gutterBottom>
                        {
                            `${indexSubmission+1} / ${props.submissions.length}`
                        }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ButtonBack disabled={indexSubmission === 0} onClick={() => setIndexSubmission(indexSubmission-1)}></ButtonBack>
                        <ButtonForward disabled={indexSubmission === props.submissions.length -1} onClick={() => setIndexSubmission(indexSubmission+1)}></ButtonForward>
                    </Grid>
                </Paper>
            </Grid>)
    }
    function renderCore(){
        if(showError === 0){
            if(!props.mode || props.mode === "table"){
                if(!sectionSelected){
                    const headCells = [{ id: "name", alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.name`} /> }, 
                                         { id: "records", alignment: "right", label: <Translate id={`investigation.fill.records`} /> } 
                                        ];
                    const rows = props.survey.sections.map(section => {
                        const nRecords = numberRecordsSection(section, props.submissions);
                        return( 
                            renderSection(section, nRecords)
                        ) 
                    })
                    return(
                        <EnhancedTable titleTable="" rows={rows} headCells={headCells} 
                            actions={[{"type" : "add", "func" : (index) => addRegistry(index)}]}
                            />
                    )
                }
            }
            else{
                return(
                <div style={{paddingTop:"0.6rem"}}>
                    { renderSubmissionsSection() }
                </div> )
            }
        }
        else{
            return (
                <Alert mb={4} severity="error">
                    <Translate id="investigation.share.error.description" />
                </Alert>
            );
        }
    }
    useEffect(() => {
        const tempIndex = props.submissions.findIndex(sub => sub.id === props.idSubmission);
        setIndexSubmission(tempIndex);
    }, [props.idSubmission])
    
    if(indexSubmission === -1){
        return <Loader />
    }
    return (
        <Grid container direction="column" spacing={2}>
            {
                sectionSelected !== null && 
                <Grid item xs={12}>
                    <ButtonBack onClick={() => setSectionSelected(null)} >Back</ButtonBack>
                </Grid>
            }
            {
                props.singlePatient &&
                <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        <Translate id="investigation.fill.survey.patient_name" />: {`${props.patientPersonalData.name} ${props.patientPersonalData.surnames}`} - {props.patientPersonalData.uuid}
                    </Typography>
                </Grid>
            }
            {
                props.submissions.length > 1 && !props.singleSubmission &&
                renderNavigation()
            }
            <Grid item xs={12}>
                {
                    renderCore()
                }
            </Grid>
        </Grid>
    )
}

ShowPatientRecords.propTypes = {
    /**
     Survey where the data was stored
    */
    survey:PropTypes.object,
    /**
     All Submissions Patient
    */
     submissions: PropTypes.array,
    /**
     Mostrar datos en modo tabla o modo elementos
    */
    mode : PropTypes.string
};
