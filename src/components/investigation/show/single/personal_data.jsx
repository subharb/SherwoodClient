import React from 'react'
import {Translate} from 'react-localize-redux';
import { PERSONAL_DATA_FIELDS, encryptData, decryptData, generateKey, postErrorSlack } from '../../../../utils/index.jsx';
import Form from '../../../general/form';
import { Grid, Typography } from '@mui/material';

export default function PersonalDataForm(props) {
    const orderedFields = React.useMemo(() => {
        return props.fields.sort((a,b) => a.order - b.order);
    }, [props.fields]);
    const form = React.useMemo(() => {
        let formObj = {};
        for (let i = 0; i < orderedFields.length; i++) {
            const value = orderedFields[i];
            formObj[value.name] = orderedFields[i];
        }
        return formObj;
    }, [orderedFields]);

    //Se generan las claves del paciente, tanto para el researcher como para el posterior acceso del paciente
    async function encryptPersonalData(data){
        if(!localStorage.getItem("password")){
            console.error("No password stored!");
            return "error";
        }
        
        const rawKeyResearcher = localStorage.getItem("rawKeyResearcher"); //await decryptData(payload.keyResearcher, password);
        const rawKeyInvestigation = decryptData(props.keyResearcherInvestigation, rawKeyResearcher);

        let encryptedData = [];
       
        
        for (const key of Object.keys(data)) {
            let value = data[key];
            const fieldForm = props.fields.find(field => field.name === key);
            if(fieldForm){
                if(fieldForm.encrypted !== false){
                    if(typeof value.getMonth === 'function'){
                        value = value.getTime().toString();
                    }
                    value = encryptData(value.toString(), rawKeyInvestigation);
                }
                const field = form[key];
                field.value = value;
                encryptedData.push(field) 
            }
            else{
                postErrorSlack("", "fieldForm no found:"+key , "");
            } 
        }
        
        //Generación de claves de paciente de Sherwood
        const rawKeyPatient = import.meta.env.VITE_APP_DEFAULT_PATIENT_PASSWORD;// o la clave que se imprime
        const patientKeyEncrInvestigation = encryptData(rawKeyInvestigation, rawKeyPatient);

        props.callBackForm({
            "keyPatInv" : patientKeyEncrInvestigation,
            "personalData" : encryptedData
        }, data);
        // //TEST
        // for (const key of Object.keys(encryptedData)) {
        //     const decriptedValue =  decryptData(encryptedData[key], rawPatientKeyResearcher);
        //     console.log("Decripted "+key+" "+decriptedValue);
        // }
    }
    function renderHeader(){
        if(props.hospital){
            return(
                <Typography variant="body2" color="textPrimary">
                    <Translate id="hospital.patient.fill-in" />
                </Typography>
            )
        }
        else{
            return(
                <React.Fragment>
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
                </React.Fragment>
            )
        }
    }
    const personalFields = {};
    
    if(JSON.stringify(form) === '{}'){
        return "LOading"
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                {renderHeader()}
            </Grid>
            <Grid item xs={12}>
                <Form fields={form} initialData={props.initialData} submitText={props.submitText}
                    callBackForm={(data) => encryptPersonalData(data)}/>
            </Grid>
        </Grid>
    )    
}
