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
        //Si no hay validación, la inferimos
        let validationSchema = field.validation;
        if(!validationSchema){
            validationSchema = field.type === "birthdate" ? "pastDate" : "notEmpty"
        }
        switch(validationSchema){
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
            case "pastDate":
                response.result = (Date.parse(field.value)-Date.parse(new Date())<0)
                response.messageCode =  pathErroTranslation+"error_past_date"
                break;
            case "arrayOrFalse":
                response.result = Array.isArray(field.value) || (field.value === false)
                response.messageCode =  pathErroTranslation+"error_notarrayorfalse"
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

export const FIELDS_FORM = {
    "encrypted":{
        required : false,
        type:"checkbox",
        label:"investigation.create.edc.personal_info",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "required":{
        required : false,
        type:"checkbox",
        label:"investigation.create.edc.required",
        shortLabel: "investigation.table.required",
        validation : "notEmpty"
    },
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.edc.name_field",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "type" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "investigation.create.edc.choose",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"label" : "investigation.create.edc.type_text", "value" : "text"},
                {"label": "investigation.create.edc.type_number", "value" : "number"},
                {"label": "investigation.create.edc.checkbox", "value" : "checkbox"}, 
                {"label": "investigation.create.edc.type_date", "value" : "date"},
                {"label": "investigation.create.edc.textarea", "value" : "textarea"},
                {"label": "investigation.create.edc.dropdown", "value" : "select"},
                {"label": "investigation.create.edc.multioption", "value" : "multioption"},
                {"label": "investigation.create.edc.diagnosis", "value" : "ict"},
                {"label": "investigation.create.edc.treatment", "value" : "treatment"},
                {"label": "investigation.create.edc.allergy", "value" : "allergy"},
                {"label": "investigation.create.edc.background", "value" : "background"}
        ],
        activationValues : ["dropdown", "multioption"],
        activatedFields:[
            {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            },
            {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            }]
                                        
    },
    "label" : {
        required : false,
        type:"text",
        label : "investigation.create.edc.question_field",
        shortLabel: "investigation.table.question",
        validation : "textMin6", 
        size : "s6"
    }
}

export const PERSONAL_DATA_FIELDS = {
    "name" : {
        required : true,
        name: "name",
        type:"text",
        label:"investigation.create.personal_data.fields.name",
        shortLabel:"investigation.create.personal_data.fields.name",
        validation : "textMin2"
    },
    "surnames" : {
        required : true,
        name: "surnames",
        type:"text",
        label:"investigation.create.personal_data.fields.surname",
        shortLabel:"investigation.create.personal_data.fields.surname",
        validation : "textMin2"
    },
    "birthdate" : {
        name: "birthdate",
        required : true,
        type:"date",
        label:"investigation.create.personal_data.fields.birthdate",
        shortLabel:"investigation.create.personal_data.fields.birthdate",
        validation : "pastDate"
    },
    "address" : {
        name: "address",
        required : true,
        type:"text",
        label:"investigation.create.personal_data.fields.address",
        shortLabel:"investigation.create.personal_data.fields.address",
        validation : "textMin2"
    },
    "health_id" : {
        name: "health_id",
        required : true,
        type:"text",
        label:"investigation.create.personal_data.fields.health_id",
        shortLabel:"investigation.create.personal_data.fields.health_id",
        validation : "textMin2"
    },
    "national_id" : {
        name: "national_id",
        required : true,
        type:"text",
        label:"investigation.create.personal_data.fields.national_id",
        shortLabel:"investigation.create.personal_data.fields.national_id",
        validation : "textMin2"
    },
    "email" : {
        name: "email",
        required : true,
        type:"text",
        label:"investigation.create.personal_data.fields.email",
        shortLabel:"investigation.create.personal_data.fields.email",
        validation : "textMin2"
    },
    "phone" : {
        name: "phone",
        required : true,
        type:"text",
        label:"investigation.create.personal_data.fields.phone",
        shortLabel:"investigation.create.personal_data.fields.phone",
        validation : "textMin2"
    },
    "sex" : {
        name: "sex",
        required : true,
        type:"select",
        label:"investigation.create.personal_data.fields.sex",
        shortLabel:"investigation.create.personal_data.fields.sex",
        validation : "notEmpty",
        options:[
            {"value" : "Male", "label" : "Male"},{"value" : "female", "label" : "Female"}
        ]
    }
}

export const PERSONAL_DATA_TYPES = {

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
                {"label" : "investigation.create.edc.type_study.audit", "value" : "audit"},
                {"label" : "investigation.create.edc.type_study.clinical_research_study", "value" : "clin_res"},
                {"label" : "investigation.create.edc.type_study.medical_device", "value" : "med_dev"},
                {"label" : "investigation.create.edc.type_study.clinical_trial", "value" : "clin_trial"}
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
                {"label" : "investigation.create.edc.reference_number_state_type.not_applicable", "value" : 0},
                {"label" : "investigation.create.edc.reference_number_state_type.pending", "value" : 1},
                {"label" : "investigation.create.edc.reference_number_state_type.approved", "value" : 2},
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

export function numberRecordsSection(section, submissions){
    let nRegistros = 0
    for(let i = 0; i < submissions.length; i++){
        const submission = submissions[i];
        
            if(submission.surveyRecords[0].surveySection.uuid === section.uuid){
                nRegistros++;
            }
        
    }
    return nRegistros;
}

export function filterRecordsFromSubmissions(submissions, sectionUUID){
    let filteredSubmissions = [];
    for(let i = 0; i < submissions.length; i++){
        let filteredRecords = [];
        const submission = submissions[i];
        for(let j = 0; j < submission.surveyRecords.length; j++){
            const patientRecord = submission.surveyRecords[j];
            if(patientRecord.surveySection.uuid === sectionUUID){ 
                filteredRecords.push(patientRecord); 
            }
        } 
        if(filteredRecords.length > 0){
            filteredSubmissions.push({
                id:submission.id,
                createdAt:submission.createdAt,
                updatedAt:submission.updatedAt,
                surveyRecords:filteredRecords
            }
                
            ); 
        }
        
    }
    return filteredSubmissions;
}

export function yearsFromDate(fromDate){
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

export function decryptPatientsData(patientsData, investigation){
    let tempDecryptedData = [];
    if(patientsData.length !== 0){
        //const rawKeyResearcher = await decryptData("U2FsdGVkX1+vRAPd6EOpOTY53I8LLfs9iyX0mGh1Xesn6rwUS4UnTQvqTyWQvu0VeYLHUScUUtM22K8+4zJqZQ==", "Cabezadesherwood2")
        
        for(const patient of patientsData){
            patient.personalData = decryptSinglePatientData(patient.personalData, investigation);
            tempDecryptedData.push(patient);
        }
    }
    return tempDecryptedData;
}

export function decryptSinglePatientData(patientPersonalData, investigation){

    let encryptedFields = {};
    if(investigation.permissions !== 0){
        const rawKeyResearcher = investigation.encryptedKeyUsed === 0 ? process.env.REACT_APP_DEFAULT_RESEARCH_PASSWORD : localStorage.getItem("rawKeyResearcher");
        
        const keyInvestigation = decryptData(investigation.keyResearcherInvestigation, rawKeyResearcher);
        
        for(const personalField of investigation.personalFields){
            const encryptedField = patientPersonalData.find(pData =>{
                return pData.name === personalField.name;
            });
            let decryptedValue = ""
            if(encryptedField){
                decryptedValue = decryptData(encryptedField.value, keyInvestigation);
                if(encryptedField.type === "date"){
                    decryptedValue = new Date(parseInt(decryptedValue));
                }
                
            }
            
            encryptedFields[personalField.name] = decryptedValue; 
        }
    }
    
    return encryptedFields;
}