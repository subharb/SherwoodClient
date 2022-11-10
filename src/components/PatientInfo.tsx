import { Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import React from 'react';
import { Translate, withLocalize, LocalizeContextProps } from 'react-localize-redux';
import { useHistory } from 'react-router-dom';
import { HOSPITAL_PATIENT } from '../routes';
import { dateToFullDateString } from '../utils';
import { ColourChip } from './general/mini_components-ts';



interface PatientInfoProps extends LocalizeContextProps{
    uuidPatient: string;
    personalData : {
        name: string,
        surnames: string,
        birthdate: string,
        sex: string
    }
}

const PatientInfo: React.FC<PatientInfoProps> = ({ personalData, activeLanguage, uuidPatient }) => {
    const history = useHistory();
    
    function goToPatient(){
        const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient);
        history.push(nextUrl);
    }
    return (
        <> 
            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.patient" /></span>: {personalData.name} {personalData.surnames} &nbsp; <ColourChip rgbcolor={green[500]} label="Ver Paciente" onClick={goToPatient}/></Typography>
            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.birthdate" /></span>: {dateToFullDateString(personalData.birthdate, activeLanguage.code)}</Typography>
            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.sex" /></span>: {personalData.sex}</Typography>
        </>
    );
};

export default withLocalize(PatientInfo);
