import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { IPatient } from '../../../constants/types';
import { dateToFullDateString } from '../../../utils';

interface PatientInfoProps {
    patient: IPatient,
    languageCode: string,
    rightSide: React.ReactNode
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient, rightSide, languageCode }) => {
    return (
        <Grid container paddingBottom={'1rem'}>
            <Grid item xs={6}  >
            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.health_id" /></span>: {patient.personalData.health_id ? patient.personalData.health_id : patient.id}</Typography>
                <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.patient" /></span>: {patient.personalData.name} {patient.personalData.surnames}</Typography>
                <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.birthdate" /></span>: {dateToFullDateString(patient.personalData.birthdate, languageCode)}</Typography>
                <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.sex" /></span>: {patient.personalData.sex}</Typography>
            </Grid>
            {
                rightSide
            }
        </Grid>

    )
};

export default PatientInfo;
