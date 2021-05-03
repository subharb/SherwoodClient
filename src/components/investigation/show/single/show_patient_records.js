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
import { HOSPITAL_PATIENT_SECTION } from '../../../../routes';

/**
 * Component in charge of showing records of a given patient in a survey
 */
export default function ShowPatientRecords(props) {
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
        return Object.values(props.survey.sections).sort((a,b) => a.order - b.order).map(section => {
           // const patientSubmissions = props.submissions.filter(sub=>sub.patient.uuid === props.patient.uuid);
            const submissionsSection = filterRecordsFromSubmissions(props.submissions, section.uuid);

            return(
                <ShowRecordsSection permissions={props.permissions} callBackEditSubmission={(uuidSubmission, uuidSection) =>props.callBackEditSubmission(uuidSubmission, uuidSection)} 
                    submissions={submissionsSection} section={section} />
            )
        });
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
                        <Translate id="investigation.fill.survey.patient_name" />: {`${props.patientPersonalData.name} ${props.patientPersonalData.surnames}`} - {props.patientPersonalData.uuid}
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
