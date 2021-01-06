import React from 'react'
import {Translate} from 'react-localize-redux';
import { PERSONAL_DATA_FIELDS, encriptData, decryptData, generateKey } from '../../../../utils';
import Form from '../../../general/form';
import jwt from 'jsonwebtoken';
export default function PersonalDataForm(props) {
    let form = {}
    for(let i = 0; i < props.fields.length; i++){
        const value = props.fields[i];
        
        form[value] = {...PERSONAL_DATA_FIELDS[value]}; 
    }

    async function encryptPersonalData(data){
        if(!localStorage.getItem("password")){
            console.error("No password stored!");
            return "error";
        }
        const password = localStorage.getItem("password");
        const payload = jwt.decode(localStorage.getItem("jwt"));
        const rawKeyResearcher = await decryptData(payload.keyResearcher, password);

        console.log("encryptPersonalData", data);
        let encryptedData = {};
        const rawPatientKeyResearcher = await generateKey();
        
        for (const key of Object.keys(data)) {
            
            encryptedData[key] = await encriptData(data[key], rawPatientKeyResearcher);
            
            
            
        }
        const patientKeyEncrResearcher = await encriptData(rawPatientKeyResearcher, rawKeyResearcher);
        encryptedData["keyPatRes"] = patientKeyEncrResearcher;
        props.callBackForm(encryptedData);
        // //TEST
        // for (const key of Object.keys(encryptedData)) {
        //     console.log("Decripted "+key+" "+await decryptData(encryptedData[key], rawKeyResearcher));
        // }
    }

    return (
        <div className="container">
            <div className="row">
                <h5><Translate id="investigation.fill.personal_data.title" /></h5>
            </div>
            <div className="row">
                <span><Translate id="investigation.fill.personal_data.description" /></span>
            </div>
            <Form fields={form} initialData={props.initialData} callBackForm={(data) => encryptPersonalData(data)}/>
        </div>
    )
}
