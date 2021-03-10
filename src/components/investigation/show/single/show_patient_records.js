import React, { useState, useEffect } from 'react';
import { Alert } from "@material-ui/lab";
import axios from 'axios';
import ShowRecordsSection from './show_records_section';
import { ButtonAdd, ButtonBack } from '../../../general/mini_components';
import { filterRecordsFromSubmissions, numberRecordsSection } from '../../../../utils';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { EnhancedTable } from '../../../general/EnhancedTable';
import { fetchRecordsPatientFromSurvey } from '../../../../services/sherwoodService';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

/**
 * Component in charge of showing records of a given patient in a survey
 */
export default function ShowPatientRecords(props) {
    const [sectionSelected, setSectionSelected] = useState(null);

    const [showError, setShowError] = useState(0);
    function addRegistry(indexSection){
        setSectionSelected(indexSection);
    }
    // async function fetchRecords(){
    //     const response = await axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.uuidInvestigation+"/record/"+props.patient.uuid+"/survey/"+props.survey.uuid, { headers: {"Authorization" : localStorage.getItem("jwt")} })
    //             .catch(err => {console.log('Catch', err); return err;}); 
    //     if(response.request.status === 200){
    //         //Busco el survey actual
    //         const currentSurvey = response.data.surveys.find(aSurvey => {
    //             return aSurvey.uuid === props.survey.uuid
    //         })
            
    //         setSubmissions(currentSurvey.submissions);
    //     }
    //     else{
    //         setShowError(1);
    //     }
    // }
    // useEffect(() => {
    //     (async () => {
    //         if(submissions.length === 0){
    //             console.log("CARGANDO");
    //             try{
    //                 const response = await fetchRecordsPatientFromSurvey(props.uuidInvestigation, props.patient.uuid, props.survey.uuid);
    //                 if(response.status === 200){                        
    //                     setSubmissions(response.surveys[0].submissions);
    //                 }
    //             }
    //             catch(error){
    //                 setShowError(1);
    //             }
                
    //         }
    // })()}, []);
    
    
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
        return Object.values(props.survey.sections).map(section => {
            
            const submissionsSection = filterRecordsFromSubmissions(props.submissions, section.uuid);

            return(
                <ShowRecordsSection submissions={submissionsSection} section={section} />
            )
        });
    }
    // async function sendRecord(values){
    //     const recordArray = Object.keys(values).map(keySection => {
    //         return {
    //             uuid_section:keySection,
    //             answers:{...values[keySection]}
    //         }
    //     })
    //     const postObj = {submission : recordArray}
    //     const response = await axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.uuidInvestigation+"/record/"+props.patient.uuid, postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
    //             .catch(err => {console.log('Catch', err); return err;}); 
    //     if(response.request.status === 200){
    //         fetchRecords();
    //     }
    //     setSectionSelected(null);
    // }
    
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
                            actions = {{"add" : (index) => addRegistry(index)}} />
                    )
                }
            }
            else{
                return renderSubmissionsSection();
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
    
    return (
        <Grid container direction="column" spacing={0}>
            {
                sectionSelected !== null && 
                <Grid item>
                    <ButtonBack onClick={() => setSectionSelected(null)} >Back</ButtonBack>
                </Grid>
            }
            {
                props.singlePatient &&
                <Grid item>
                    <Typography variant="subtitle1">
                        <Translate id="investigation.fill.survey.patient_name" />: {`${props.patientPersonalData.name} ${props.patientPersonalData.surname}`} - {props.patientPersonalData.uuid}
                    </Typography>
                </Grid>
            }
            
            <Grid item>
                {
                    renderCore()
                }
            </Grid>
        </Grid>
    )
}

ShowPatientRecords.propTypes = {

    /**
     Personal information of the Patient
    */
    patient: PropTypes.object,
    /**
     Mostrar datos en modo tabla o modo elementos
    */
    mode : PropTypes.string
};
