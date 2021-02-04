import React from 'react'
import {Translate} from 'react-localize-redux';
import { PERSONAL_DATA_FIELDS, encryptData, decryptData, generateKey } from '../../../../utils';
import Form from '../../../general/form';
import jwt from 'jsonwebtoken';
import { Grid, Typography } from '@material-ui/core';

export default function PersonalDataForm(props) {
    let form = {}
    for(let i = 0; i < props.fields.length; i++){
        const value = props.fields[i];
        
        form[value] = {...PERSONAL_DATA_FIELDS[value]}; 
    }
    //Se generan las claves del paciente, tanto para el researcher como para el posterior acceso del paciente
    async function encryptPersonalData(data){
        if(!localStorage.getItem("password")){
            console.error("No password stored!");
            return "error";
        }
    
        const rawKeyResearcher = localStorage.getItem("rawKeyResearcher"); //await decryptData(payload.keyResearcher, password);

        let encryptedData = {};
        //Generación de claves de paciente para researcher y paciente
        const rawPatientKeyResearcher = await generateKey();
        const rawPatientKeyInvestigation = await generateKey();
        for (const key of Object.keys(data)) {
            encryptedData[key] =  encryptData(data[key], rawPatientKeyResearcher);
        }
        //Encriptamos la clave con la clave del researcher y una por defecto para el paciente
        const patientKeyEncrResearcher =  encryptData(rawPatientKeyResearcher, rawKeyResearcher);
        console.log(process.env.REACT_APP_DEFAULT_PATIENT_PASSWORD);
        const patientKeyEncrInvestigation =  encryptData(rawPatientKeyInvestigation, process.env.REACT_APP_DEFAULT_PATIENT_PASSWORD);
        const defaultResearcher = encryptData(rawPatientKeyInvestigation, process.env.REACT_APP_DEFAULT_RESEARCH_PASSWORD);

        props.callBackForm({
            "keyPatInv" : patientKeyEncrInvestigation,
            "keyPatientResearcher" : patientKeyEncrResearcher,
            "keyDefaultResearcher" : defaultResearcher,
            "personalData" : encryptedData
        });
        // //TEST
        // for (const key of Object.keys(encryptedData)) {
        //     const decriptedValue =  decryptData(encryptedData[key], rawPatientKeyResearcher);
        //     console.log("Decripted "+key+" "+decriptedValue);
        // }
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="subtitle1" color="textPrimary">
                    <Translate id="investigation.fill.personal_data.title" />
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2" color="textPrimary">
                    <Translate id="investigation.fill.personal_data.description" />
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Form fields={form} initialData={props.initialData} callBackForm={(data) => encryptPersonalData(data)}/>
            </Grid>
        </Grid>
    )
}
