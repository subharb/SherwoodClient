import React, { useEffect, useState } from 'react'
import PatientRecords from './show_patient_records';
import PropTypes from 'prop-types';
import { Button, Typography, Grid } from '@material-ui/core';
import {
    ArrowBackIos as ArrowBackIosIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
  } from "@material-ui/icons";
import styled from 'styled-components';
/**
 * 
 * Component that shows all records of a given survey. 
 * It allows to navigate visualiazing each patient and its sections at a time.
 */

const NavButton = styled(Button)`
    background-color:black;
    color:white;
`;
const TypoLineHeight = styled(Typography)`
    line-height:2rem;
    padding-left:1rem;
`;
export default function ShowAllRecordsSurvey(props) {
    let [currentPatient, setCurrentPatient] = useState(0);
    let [dictPatients, setDictPatients] = useState({});
    useEffect(() => {
        //Agrupamos los records por paciente
        let dictPatientsSubmissions = {}
        props.submissions.forEach(submission => {
            if(!dictPatientsSubmissions.hasOwnProperty(submission.patient.uuid)){
                dictPatientsSubmissions[submission.patient.uuid] = [];
            }
            dictPatientsSubmissions[submission.patient.uuid].push(submission);

        });
        setDictPatients(dictPatientsSubmissions);
    }, []);
    if(Object.values(dictPatients).length === 0){
        return(
            <Typography variant="subtitle1" color="textPrimary">
                No records
            </Typography>
        ) 
    }
    const uuidPatient = Object.values(dictPatients)[currentPatient][0].patient.uuid;
    const patientCurrent = props.patients.find(pat => pat.uuid === uuidPatient) ;
    return (
        <Grid container direction="column" spacing={3}>
            <Grid item>
                <Grid container >
                    <Grid item>
                        <NavButton data-testid="prev" variant="contained" disabled={currentPatient === 0}
                            onClick={() => setCurrentPatient(currentPatient-1)}>
                            <ArrowBackIosIcon />
                        </NavButton>
                        <NavButton data-testid="next" variant="contained" disabled={currentPatient === Object.values(dictPatients).length -1} 
                            onClick={() =>setCurrentPatient(currentPatient+1)}>
                            <ArrowForwardIosIcon />
                        </NavButton>
                    </Grid>
                    <Grid item >
                        <TypoLineHeight variant="body2" gutterBottom component="div">
                            {currentPatient + 1} of {Object.values(dictPatients).length} Patients
                        </TypoLineHeight>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <PatientRecords submissions={dictPatients[uuidPatient]} singlePatient
                    mode="elements" survey={props.survey} patientPersonalData={patientCurrent.personalData} />
            </Grid>
        </Grid>
        
    )
}

ShowAllRecordsSurvey.propTypes = {
    submissions: PropTypes.array,
    survey: PropTypes.object
};
