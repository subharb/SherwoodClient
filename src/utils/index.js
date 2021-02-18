import { func } from "prop-types";
import CryptoJS from 'crypto-js';

/**
 * Function that validates fields from anywhere in the app
 * 
 * @param {Object} field - Field to be validated
 * @param {string} field.value - The value of the input
 * @param {string} field.validation - The type of validations to be done
 * 
 * @returns {Object}  - This object contains the result and the message
 * @returns {boolean} result - This object contains the result and the message
 * @returns {string} messageCode - Code message to be encoded
 */
export function validateField(field, fieldCompare){
    const response = {};
    //Si el campo es obligatorio o si tiene un valor, validamos su contenido
    if(field.required || (field.value !== "" && typeof field.value === 'string') ){
        const pathErroTranslation = "investigation.errors.";
        let re;
        switch(field.validation){
            case "validEmail" : 
                re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                response.result = re.test(String(field.value).toLowerCase());
                response.messageCode = pathErroTranslation+"error_email";
                break;
            case "validPhone" : 
                re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
                response.result = re.test(String(field.value).toLowerCase());
                response.messageCode = pathErroTranslation+"error_phone";
                break;
            case "password":
                response.result = Boolean(field.value && field.value.length > 6);
                response.messageCode =  pathErroTranslation+"error_password"
                break;
            case "textMin2" : 
                response.result = Boolean(field.value && field.value.length > 2);
                response.messageCode =  pathErroTranslation+"error_length2"
                break;
            case "textMin6" : 
                response.result = Boolean(field.value && field.value.length > 6);
                response.messageCode =  pathErroTranslation+"error_length6"
                break;
            case "notEmpty" : 
                response.result = notEmpty(field.value);
                response.messageCode =  pathErroTranslation+"error_not_empty"
                break;
            case "equalTo":
                response.result = Boolean(field.value === fieldCompare);
                response.messageCode =  pathErroTranslation+"error_not_same"
                break;
            default:
                console.log("Validación no definida");
                response.result = false;
                response.messageCode =  pathErroTranslation+"error_not_defined"
                break;
        }
    }
    else{
        response.result = true;
        response.messageCode =  "";
    }
    return response;   
}

//Wrapper para que funcione en la validación por campo
export function fieldLevelNotEmpty(value){
    return notEmpty(value) ? undefined : "investigation.errors.error_not_empty"
}
export function notEmpty(value){
    return Boolean(value && value !== "");
}
//Wrapper para que funcione en la validación por campo
export function fieldLevelmarkedCheckbox(value){
    return markedCheckbox(value) ? undefined : "investigation.errors.error_not_empty"
}
export function markedCheckbox(value){
    console.log(value === true);
    return value === true;
}

export async function generateKey(){
    const genObj = await crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256
        },
        true,
        ["encrypt", "decrypt"]
      );
    //A partir del objeto cryptoObj obtenemos la clave
    const cryptoObj = await crypto.subtle.exportKey("jwk", genObj);
    const keyString = cryptoObj.k;

    return keyString;
}

export async function importKey(key){
    let keyObj = await crypto.subtle.importKey(
        "jwk",
        {
            alg: "A256GCM",
            ext: true,
            k: key,
            key_ops: ["encrypt", "decrypt"],
            kty: "oct"
        },
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );

    return keyObj;
}

export function encryptData(data, key){
    var KeyObj = CryptoJS.AES.encrypt(data, key);
    var ciphertext = KeyObj.toString();
    console.log(KeyObj);
    return ciphertext;
}

export function decryptData(ciphertext, key){

    var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    console.log(originalText);

    return originalText;
}

export const isUserLoggedIn = () => localStorage.getItem("jwt");


export const PERSONAL_DATA_FIELDS = {
    "name" : {
        required : false,
        type:"text",
        label:"investigation.create.personal_data.fields.name",
        shortLabel:"investigation.create.personal_data.fields.name",
        validation : "textMin2"
    },
    "surname" : {
        required : false,
        type:"text",
        label:"investigation.create.personal_data.fields.surname",
        shortLabel:"investigation.create.personal_data.fields.surname",
        validation : "textMin2"
    },
    "birthdate" : {
        required : false,
        type:"date",
        label:"investigation.create.personal_data.fields.birthdate",
        shortLabel:"investigation.create.personal_data.fields.birthdate",
        validation : "textMin2"
    },
    "address" : {
        required : false,
        type:"text",
        label:"investigation.create.personal_data.fields.address",
        shortLabel:"investigation.create.personal_data.fields.address",
        validation : "textMin2"
    },
    "health_id" : {
        required : false,
        type:"text",
        label:"investigation.create.personal_data.fields.health_id",
        shortLabel:"investigation.create.personal_data.fields.health_id",
        validation : "textMin2"
    },
    "national_id" : {
        required : false,
        type:"text",
        label:"investigation.create.personal_data.fields.national_id",
        shortLabel:"investigation.create.personal_data.fields.national_id",
        validation : "textMin2"
    },
    "email" : {
        required : false,
        type:"text",
        label:"investigation.create.personal_data.fields.email",
        shortLabel:"investigation.create.personal_data.fields.email",
        validation : "textMin2"
    },
    "phone" : {
        required : false,
        type:"text",
        label:"investigation.create.personal_data.fields.phone",
        shortLabel:"investigation.create.personal_data.fields.phone",
        validation : "textMin2"
    }
}

export const FIELDS_BASIC_INFO = {
    "name":{
        required : true,
        type:"text",
        label:"investigation.create.edc.name",
        validation : "textMin2",
        value: ""
    },
    "acronym":{
        required : true,
        type:"text",
        label:"investigation.create.edc.acronym",
        validation : "notEmpty",
        value: ""
    },
    "type":{
        required : true,
        type:"select",
        label:"investigation.create.edc.type",
        validation : "notEmpty",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options : [
                {"text" : "investigation.create.edc.type_study.audit", "value" : "audit"},
                {"text" : "investigation.create.edc.type_study.clinical_research_study", "value" : "clin_res"},
                {"text" : "investigation.create.edc.type_study.medical_device", "value" : "med_dev"},
                {"text" : "investigation.create.edc.type_study.clinical_trial", "value" : "clin_trial"}
            ],
        value: ""
    },
    "description":{
        required : true,
        type:"textarea",
        label:"investigation.create.edc.description",
        validation : "textMin2",
        value: ""
    },
    "principal_researcher":{
        required : true,
        type:"text",
        label:"investigation.create.edc.principal_researcher",
        validation : "textMin2",
        value: ""
    },
    "other_researcher":{
        required : true,
        type:"options",
        element:"text",//El tipo de cada una de las opciones
        label:"investigation.create.edc.other_researchers",
        validation : "textMin2",
        value: ""
    },
    "institution":{
        required : true,
        type:"text",
        label:"investigation.create.edc.institution",
        validation : "textMin2",
        value: ""
    },
    "contact":{
        required : true,
        type:"text",
        label:"investigation.create.edc.contact",
        validation : "textMin2",
        value: ""
    },
    "ethics_body":{
        required : true,
        type:"text",
        label:"investigation.create.edc.ethics_body",
        validation : "textMin2",
        value: ""
    },
    "reference_number_state":{
        required : true,
        type:"select",
        label:"investigation.create.edc.reference_number_state",
        validation : "notEmpty",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options : [
                {"text" : "investigation.create.edc.reference_number_state_type.not_applicable", "value" : 0},
                {"text" : "investigation.create.edc.reference_number_state_type.pending", "value" : 1},
                {"text" : "investigation.create.edc.reference_number_state_type.approved", "value" : 2},
            ],
        value: "",
        activationValues : ["2"],
        activatedFields:[
            {
                required : true,
                name : "reference_number",
                type:"text",
                label:"investigation.create.edc.reference_number",
                validation : "textMin2",
                value: ""
            }
        ]
    },
    
}

export const templateField = {
    required : true,
    type:"text",
    label:"investigation.create.consent.reason",
    shortLabel: "investigation.create.consent.reason",
    validation : "notEmpty",
    is_personal_data:true
}

export function numberRecordsSection(section, records){
    let nRegistros = 0
    for(let i = 0; i < records.length; i++){
        const patientRecord = records[i];
        for(let j = 0; j < patientRecord.submission.length;j++){
            const submission = patientRecord.submission[j];
            if(submission.id_section === section._id){
                nRegistros++;
            }
        }
    }
    return nRegistros;
}

export function findSubmissionsFromSection(records, sectionID){
    let submissionsSection = [];
    for(let i = 0; i < records.length; i++){
        const patientRecord = records[i];
        for(let j = 0; j < patientRecord.submission.length;j++){
            const submission = patientRecord.submission[j];
            if(submission.id_section === sectionID){
                submissionsSection.push(submission);
                
            }
        }
    }
    return submissionsSection;
}

export function yearsFromDate(fromDateString){
    let fromDate = new Date(fromDateString); 
    return new Date().getFullYear() - fromDate.getFullYear();
}
export function daysFromDate(fromDateString){
    let fromDate = new Date(fromDateString); 
    let temp = Math.abs(new Date() - fromDate);
    return Math.floor((temp)/(1000 * 60 * 60 * 24));
}

export function saveData(key, value){
    localStorage.setItem(key, value); 
}


export function getData(key){
    return localStorage.getItem(key); 
}