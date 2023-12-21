import { Grid, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

import React, { useEffect, useState } from 'react';
import { Translate, withLocalize, LocalizeContextProps } from 'react-localize-redux';
import { connect, connectAdvanced } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IPatient, IPersonalData } from '../constants/types';
import { HOSPITAL_PATIENT } from '../routes/urls';
import { dateToFullDateString } from '../utils/index.jsx';
import { ColourChip } from './general/mini_components-ts';



interface PatientInfoProps extends LocalizeContextProps{
    uuidPatient: string;
    patientsPersonalData?: IPatient[];
    auxiliarInfo?:{
        title: string;
        value:number | string;
    }[];
}

const PatientInfo: React.FC<PatientInfoProps> = ({ activeLanguage, uuidPatient, patientsPersonalData, auxiliarInfo }) => {
    const [patient, setPatient] = useState<IPatient | null>(null);
   
    const history = useHistory();
    
    function goToPatient(){
        const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient);
        history.push(nextUrl);
    }
    function renderAuxiliarInfo(){
        if(auxiliarInfo){
            return (
                <Grid item xs={6}>
                    {
                        auxiliarInfo.map((info, index) => {
                            return (
                                <Typography key={index} variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id={info.title} /></span>: {info.value}</Typography>
                            )
                        })
                    }
                </Grid>
            )
        }
        else{
            return null;
        }
    }
    useEffect(() => {
        if(patientsPersonalData){
            const patient = patientsPersonalData.find((patient) => patient.uuid === uuidPatient);
            if(patient){
                setPatient(patient);
            }
            
        }
    }, [uuidPatient])

    if(patient && !patient.personalData.name){
        return <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.id" /></span>: {patient.id}</Typography>
    }
    else if(patient && patient.personalData){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    { 
                        patient.personalData.health_id &&
                        <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.health_id" /></span>: {patient.personalData.health_id}</Typography>
                    }
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.patient" /></span>: {patient.personalData.name} {patient.personalData.surnames} &nbsp; <ColourChip rgbcolor={green[500]} onClick={goToPatient} label={<Translate id="pages.hospital.go-to-patient" />}/></Typography>
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.birthdate" /></span>: {dateToFullDateString(patient.personalData.birthdate, activeLanguage.code)}</Typography>
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.sex" /></span>: {patient.personalData.sex}</Typography>
                </Grid>
                {
                    renderAuxiliarInfo()
                }
                <Grid item xs={6}>
                </Grid>
            </Grid>
        );
    }
    else{
        return <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>Patient not found</span></Typography>
    }
};

const mapStateToProps = (state:any) =>{
    return {
        patientsPersonalData:state.investigations.currentInvestigation ? state.patients.data[state.investigations.currentInvestigation.uuid] : null
    }
}

export default withLocalize(connect(mapStateToProps, null)(PatientInfo));
