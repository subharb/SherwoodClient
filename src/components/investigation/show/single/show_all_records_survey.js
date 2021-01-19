import React, { useEffect, useState } from 'react'
import PatientRecords from '../fill/show_patient_records';
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
        let dictPatients = {}
        props.records.forEach(record => {
            const patient = props.patients.find(patient => {
                return patient.id === record.id_patient
            })
            let tempPatient = {patient: patient, submission:record.submission}
            if(dictPatients.hasOwnProperty(record.id_patient)){
                dictPatients[record.id_patient].submission = dictPatients[record.id_patient].submission.concat(record.submission)
            }
            else{
                dictPatients[record.id_patient] = tempPatient;
            }
        });
        setDictPatients(dictPatients);
    }, []);
    if(Object.values(dictPatients).length === 0){
        return "No records"
    }
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
                <PatientRecords initialData={props.records} 
                    mode="elements" survey={props.survey} patient={Object.values(dictPatients)[currentPatient].patient} />
            </Grid>
        </Grid>
        
    )
}

ShowAllRecordsSurvey.propTypes = {
    records: PropTypes.array,
    survey: PropTypes.object
};
