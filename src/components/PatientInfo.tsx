import { Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import React, { useEffect, useState } from 'react';
import { Translate, withLocalize, LocalizeContextProps } from 'react-localize-redux';
import { connect, connectAdvanced } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IPatient, IPersonalData } from '../constants/types';
import { HOSPITAL_PATIENT } from '../routes';
import { dateToFullDateString } from '../utils';
import { ColourChip } from './general/mini_components-ts';



interface PatientInfoProps extends LocalizeContextProps{
    uuidPatient: string;
    patientsPersonalData?: IPatient[];
}


const PatientInfo: React.FC<PatientInfoProps> = ({ activeLanguage, uuidPatient, patientsPersonalData }) => {
    const [personalData, setPersonalData] = useState<IPersonalData | null>(null);
   
    const history = useHistory();
    
    function goToPatient(){
        const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient);
        history.push(nextUrl);
    }

    useEffect(() => {
        if(patientsPersonalData){
            const patient = patientsPersonalData.find((patient) => patient.uuid === uuidPatient);
            if(patient){
                setPersonalData(patient.personalData);
            }
            
        }
    }, [uuidPatient])

    if(!personalData){
        return <Typography variant="h4">Patient not found</Typography>
    }
    return (
        <> 
            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.patient" /></span>: {personalData.name} {personalData.surnames} &nbsp; <ColourChip rgbcolor={green[500]} label="Ver Paciente" onClick={goToPatient}/></Typography>
            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.birthdate" /></span>: {dateToFullDateString(personalData.birthdate, activeLanguage.code)}</Typography>
            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.sex" /></span>: {personalData.sex}</Typography>
        </>
    );
};

const mapStateToProps = (state:any) =>{
    return {
        patientsPersonalData:state.investigations.currentInvestigation ? state.investigations.currentInvestigation.patientsPersonalData : null
    }
}

export default withLocalize(connect(mapStateToProps, null)(PatientInfo));
