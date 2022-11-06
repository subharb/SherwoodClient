import { Typography } from '@material-ui/core';
import React from 'react';
import { Translate, withLocalize, LocalizeContextProps } from 'react-localize-redux';
import { dateToFullDateString } from '../utils';

interface PatientInfoProps extends LocalizeContextProps{
    personalData : {
        name: string,
        surnames: string,
        birthdate: string,
        sex: string
    }
}

const PatientInfo: React.FC<PatientInfoProps> = ({ personalData, activeLanguage }) => {
    return (
        <> 
            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.patient" /></span>: {personalData.name} {personalData.surnames}</Typography>
            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.birthdate" /></span>: {dateToFullDateString(personalData.birthdate, activeLanguage.code)}</Typography>
            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.sex" /></span>: {personalData.sex}</Typography>
        </>
    );
};

export default withLocalize(PatientInfo);
