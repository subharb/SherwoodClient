import $ from 'jquery';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import mixpanel from 'mixpanel-browser';
import { Translate } from 'react-localize-redux';
import { ServiceType } from '../pages/hospital/Service/types';
import { PERMISSION } from '../components/investigation/share/user_roles';
import { difference, isEmpty, isEqual, isObject, xorWith } from 'lodash';
/**
 * Function that validates fields from anywhere in the app
 * 
 * @param {Object} field - Field to be validated
 * @param {string} field.value - The value of the input
 * @param {string} field.validation - The type of validations to be done
 * @param {boolean} field.required - The type of validations to be done
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
                response.result = Boolean(field.value && field.value.length >= 2);
                response.messageCode =  pathErroTranslation+"error_length2"
                break;
            case "textMin6" : 
                response.result = Boolean(field.value && field.value.length >= 6);
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
            case "number":
                response.result = !isNaN(field.value);
                response.messageCode =  pathErroTranslation+"error_notnumber"
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


export function formatDateByLocale(locale){
    switch(locale){
        case "fr":
        case "es":
            return "DD/MM/YYYY"
        case "en":
        default:
            return "YYYY/MM/DD";
    }
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
hello
    return keyObj;
}

export function encryptData(data, key){
    var KeyObj = CryptoJS.AES.encrypt(data, key);
    var ciphertext = KeyObj.toString();
    console.log("encryptData", data);
    console.log(KeyObj);
    console.log(ciphertext);
    return ciphertext;
}

export function decryptData(ciphertext, key){
    try{
        var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        return originalText;
    }
    catch(e){
        return "";
    }
    
}

export const isUserLoggedIn = () => localStorage.getItem("jwt");


export const PERSONAL_FIELDS_FORM = {

    "required":{
        name:"required",
        required : false,
        type:"checkbox",
        label:"investigation.create.edc.required",
        shortLabel: "investigation.table.required",
        validation : "notEmpty"
    },
    "name" : {
        name:"name",
        required : true,
        type:"text",
        label:"investigation.create.edc.name_field",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "type" : {
        name:"type",
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
                {"label": "investigation.create.edc.radio", "value" : "radio"},
                {"label": "investigation.create.edc.evaluation", "value" : "evaluation"}
        ],
        activationValues : ["select", "multioption", "radio", "evaluation"],
        activatedFields:{
            "select" : {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            },
            "multioption" : {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            },
            "radio" : {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            },
            "evaluation" : {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            }
        }                                        
    },
    "label" : {
        name:"label",
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
        encrypted : true,
        type:"text",
        label:"investigation.create.personal_data.fields.name",
        shortLabel:"investigation.create.personal_data.fields.name",
        validation : "textMin2"
    },
    "surnames" : {
        required : true,
        name: "surnames",
        type:"text",
        encrypted : true,
        label:"investigation.create.personal_data.fields.surname",
        shortLabel:"investigation.create.personal_data.fields.surname",
        validation : "textMin2"
    },
    "birthdate" : {
        name: "birthdate",
        required : true,
        type:"date",
        encrypted : true,
        label:"investigation.create.personal_data.fields.birthdate",
        shortLabel:"investigation.create.personal_data.fields.birthdate",
        validation : "pastDate"
    },
    "address" : {
        name: "address",
        required : true,
        type:"text",
        encrypted : true,
        label:"investigation.create.personal_data.fields.address",
        shortLabel:"investigation.create.personal_data.fields.address",
        validation : "textMin2"
    },
    "health_id" : {
        name: "health_id",
        required : true,
        type:"text",
        encrypted : true,
        label:"investigation.create.personal_data.fields.health_id",
        shortLabel:"investigation.create.personal_data.fields.health_id",
        validation : "textMin2"
    },
    "automated_health_id" : {
        name: "automated_health_id",
        required : true,
        type:"text",
        encrypted : false,
        label:"investigation.create.personal_data.fields.automated_health_id",
        shortLabel:"investigation.create.personal_data.fields.automated_health_id",
        validation : "textMin2"
    },
    "national_id" : {
        name: "national_id",
        required : true,
        type:"text",
        encrypted : true,
        label:"investigation.create.personal_data.fields.national_id",
        shortLabel:"investigation.create.personal_data.fields.national_id",
        validation : "textMin2"
    },
    "email" : {
        name: "email",
        required : true,
        type:"text",
        encrypted : true,
        label:"investigation.create.personal_data.fields.email",
        shortLabel:"investigation.create.personal_data.fields.email",
        validation : "validEmail"
    },
    "phone" : {
        name: "phone",
        required : true,
        type:"text",
        encrypted : true,
        label:"investigation.create.personal_data.fields.phone",
        shortLabel:"investigation.create.personal_data.fields.phone",
        validation : "validPhone"
    },
    "sex" : {
        name: "sex",
        required : true,
        type:"select",
        encrypted : true,
        label:"investigation.create.personal_data.fields.sex",
        shortLabel:"investigation.create.personal_data.fields.sex",
        validation : "notEmpty",
        options:[
            {value : "Male", label: "general.male"},
            {value : "Female", label:"general.female"}
        ]
    }
}

export const PERSONAL_DATA_TYPES = {

}

export const FIELDS_BASIC_INFO = {
    "name":{
        name : "name",
        required : true,
        type:"text",
        label:"investigation.create.edc.name",
        validation : "textMin2",
        value: ""
    },
    "acronym":{
        name : "acronym",
        required : true,
        type:"text",
        label:"investigation.create.edc.acronym",
        validation : "notEmpty",
        value: ""
    },
    "type":{
        name : "type",
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
        name : "description",
        required : true,
        type:"textarea",
        label:"investigation.create.edc.description",
        validation : "textMin2",
        value: ""
    },
    "principal_researcher":{
        name : "principal_researcher",
        required : true,
        type:"text",
        label:"investigation.create.edc.principal_researcher",
        validation : "textMin2",
        value: ""
    },
    "other_researcher":{
        name : "other_researcher",
        required : true,
        type:"options",
        element:"text",//El tipo de cada una de las opciones
        label:"investigation.create.edc.other_researchers",
        validation : "textMin2",
        value: ""
    },
    "institution":{
        name : "institution",
        required : true,
        type:"text",
        label:"investigation.create.edc.institution",
        validation : "textMin2",
        value: ""
    },
    "contact":{
        name : "contact",
        required : true,
        type:"text",
        label:"investigation.create.edc.contact",
        validation : "textMin2",
        value: ""
    },
    "ethics_body":{
        name : "ethics_body",
        required : true,
        type:"text",
        label:"investigation.create.edc.ethics_body",
        validation : "textMin2",
        value: ""
    },
    "reference_number_state":{
        name : "reference_number_state",
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
        value: ""
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
        
            if(submission.uuid_section === section.uuid){
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
        if(submission.uuid_section === sectionUUID){ 
            filteredRecords = submission.surveyRecords; 
        }
      
        if(filteredRecords.length > 0){
            filteredSubmissions.push({
                id:submission.id,
                createdAt:submission.createdAt,
                updatedAt:submission.updatedAt,
                surveyRecords:filteredRecords
            }); 
        }
    }
    return filteredSubmissions;
}

export function filterRecordsFromSection(submission, sectionUUID){
    let filteredRecords = [];
    for(let j = 0; j < submission.surveyRecords.length; j++){
        const record = submission.surveyRecords[j];
        if(record.surveySection.uuid === sectionUUID){ 
            filteredRecords.push(record); 
        }
    }  
    return filteredRecords;
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

export function getInvestigationRawKey(uuid, encryptedKeyUsed, keyResearcherInvestigation){
    const nameKey = "rawKeyInvestigation_"+uuid;
    let keyInvestigation = localStorage.getItem(nameKey);
    if(keyInvestigation !== null){
        return keyInvestigation;
    }
    const rawKeyResearcher = encryptedKeyUsed === 0 ? import.meta.env.VITE_APP_DEFAULT_RESEARCH_PASSWORD : localStorage.getItem("rawKeyResearcher");    
    keyInvestigation = decryptData(keyResearcherInvestigation, rawKeyResearcher);
    localStorage.setItem(nameKey, keyInvestigation);
    return keyInvestigation;
}

export function decryptSinglePatientData(patientPersonalData, investigation){

    let encryptedFields = {};
    if(investigation.permissions !== 0){
        
        const keyInvestigation = getInvestigationRawKey(investigation.uuid, investigation.encryptedKeyUsed, investigation.keyResearcherInvestigation);
        
        for(const personalField of investigation.personalFields){
            const encryptedField = patientPersonalData.find(pData =>{
                return pData.name === personalField.name;
            });
            //console.log(personalField.name);
            
            let decryptedValue = ""
            if(encryptedField){
                if(encryptedField.encrypted === true){
                    decryptedValue = decryptData(encryptedField.value, keyInvestigation);
                
                    if(encryptedField.type === "date"){
                        if(decryptedValue === "" || decryptedValue === null){
                            console.log("Fecha vacía");
                        }
                        decryptedValue = new Date(parseInt(decryptedValue));
                    }
                }
                else{
                    decryptedValue = encryptedField.value;
                }
            }
            
            encryptedFields[personalField.name] = decryptedValue; 
        }
    }
    
    return encryptedFields;
}

export function dateOrStringToDateString(date, locale){
    if(date instanceof Date){
        return dateToFullDateString(date, locale)
    }
    else{
        return fullDateFromPostgresString(locale, date);
    }
}

export function dateToFullDateString(date, localeCode){
    return date.toLocaleString(localeCode,{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        })
}

export const areArraysEqual = (x, y) => isEmpty(xorWith(x, y, isEqual));

export function hasRequestGroupState(request, status){
    return request.requestsServiceInvestigation.findIndex((req) => req.status === status) !== -1
}

export function hasDiscountsActive(params, permissions){
    if(params.discounts && !params.permissionDiscount){
        return true;
    }
    else if(params.discounts && params.permissionDiscount && permissions.includes(PERMISSION.MAKE_DISCOUNTS)){
        return true;
    }
    else{
        return false;
    }
}

export function dateAndTimeFromPostgresString(localeCode, dateString){
    const dateObject =  stringDatePostgresToDate(dateString);
    return dateObject.toLocaleString(localeCode,{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            })
}

export function timeFromPostgresString(localeCode, dateString){
    const dateObject =  stringDatePostgresToDate(dateString);
    return dateObject.toLocaleString(localeCode,{
            hour: '2-digit',
            minute: '2-digit',
            })
}

export function fullDateFromPostgresString(localeCode, dateString){
    const dateObject =  stringDatePostgresToDate(dateString);
    return dateObject.toLocaleString(localeCode,{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            })
}
export function stringDatePostgresToDate(date){
    return new Date(date.replace(' ', 'T').replace(' ', 'Z'));
}

export function researcherFullName(researcher){
    return researcher.name + " " + researcher.surnames;
}

export function patientFullName(patient){
    return `${patient.name} ${patient.surnames}`
}

export function getPatientID(patient){
    return patient.personalData.automated_health_id ? patient.personalData.automated_health_id : patient.personalData.health_id ? patient.personalData.health_id : patient.id;
}

export function formatPatients(patients, personalFields, code = 'es-ES', insurances = []){
    const arrayPatients = patients.map(patient => {
        let tempRow = {};
        for(const pField of personalFields){
            if(patient.personalData){
                let value = patient.personalData[pField.name];
                if(pField.type === "date"){
                    value = new Date(patient.personalData[pField.name]).toLocaleDateString(code, { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '/');
                }
                if(pField.name === 'sex'){
                    value = <Translate id={`hospital.analytics.graphs.sex.${patient.personalData[pField.name].toLowerCase()}`} />
                }
                if(pField.name === 'insurance'){
                    const insurance = insurances.find(insurance => insurance.id === parseInt(patient.personalData[pField.name]));
                    if(insurance){
                        value = insurance.name;
                    }
                    else{
                        value = "";
                    }
                    
                }
                tempRow[pField.name] = value;
            }
            
        }
        const dateObject =  patient.dateCreated;
        tempRow["dateCreated"] = dateObject.toLocaleString(code,{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            })
        tempRow["id"] = patient.id;
        return(
            tempRow
        )
    });

    return arrayPatients;
}

export function isSmartField(type){
    return ["ict", "allergy", "background", "family-background", "treatment", "treatment_prescription", "treatment_regular", "bmi", "edd", "request_lab", "request_img"].includes(type);
}

export function getIndexedDB(){
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    return indexedDB;
}

export function isImageType(typeImage){
    return (typeImage === "image/png" || typeImage === "image/jpeg" || typeImage === "image/jpg");
}
export function openStore(storeName){
    return new Promise(
        function(resolve, reject) {
            const db = getIndexedDB();
            if (!db) {
                return null;
            }
            let request = db.open(storeName, 3);

            request.onerror = function(event) {
                // Hacer algo con request.errorCode!
                reject(Error("Error text"));
            };
            request.onsuccess = function(event) {
                // Hacer algo con request.result!
            };
      
            request.onupgradeneeded = function(event) {
              // Objectstore does not exist. Nothing to load
              event.target.transaction.abort();
              reject(Error('Not found'));
            };
      
            request.onsuccess = function(event) {
                resolve(event.target.result);
            //   var database      = event.target.result;
            //   var transaction   = database.transaction([storeName]);
            //   var objectStore   = transaction.objectStore(storeName);
            //   var objectRequest = objectStore.get(id);
      
            //   objectRequest.onerror = function(event) {
            //     reject(Error('Error text'));
            //   };
      
            //   objectRequest.onsuccess = function(event) {
            //     if (objectRequest.result) resolve(objectRequest.result);
            //     else reject(Error('object not found'));
            //   };
            };
          }
    );
}

export function getValueField(field, value){
    if(isObject(value)){
        if(field.type === "multioption"){
            return value.reduce((acc, curr) => acc + " " + curr.multioption, "");
        }
    }
    else{
        return value
    }
    
}

export function postErrorSlack(url, error, info, investigation){
    console.log("Enviamos el error a ", import.meta.env.VITE_APP_SLACK_HOOK);
    let location = "URL:"+window.location.href;
    
    let basicText = " URL: "+location+" Error: "+error+ " Message:"+JSON.stringify(info);
    let text = basicText;
    if(investigation){
        text = "Investigation: "+investigation.name+" uuid :"+investigation.uuid+basicText;
    }
    

    $.ajax({
        data: 'payload=' + JSON.stringify({
            "text": text
        }),
        dataType: 'json',
        processData: false,
        type: 'POST',
        url: import.meta.env.VITE_APP_SLACK_HOOK
    });
    mixpanel.track("Error", {
        "error" : error.stack ? error.stack : JSON.stringify(info)
    });
}

export function areSameDates(date1, date2){
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
}


export function formatData(dataBytes){
    if(dataBytes > 1000000){
      return (dataBytes/1000000).toFixed(2)+"MB";  
    }
    else if(dataBytes > 1000){
          return (dataBytes/1000).toFixed(2)+"KB";
    }
    else{
        return dataBytes+"B";
    }
      
}

export function getCurrentResearcherUuid(){
    const payload = jwt.decode(localStorage.getItem("jwt"));
    return payload.uuid; 
}

export  function datalogger(wrapped){
    return async function() {
        const result = await wrapped.apply(this, arguments);
        const encoder = new TextEncoder();
        const byteArr = encoder.encode(JSON.stringify(result));
        const bytesDownloaded = byteArr.length;
        let total = 0;

        const dateStored = new Date(localStorage.getItem("data_download_date"));
        if(localStorage.getItem("data_download_date") && new Date(localStorage.getItem("data_download_date")).toDateString() === new Date().toDateString()){
            total = parseInt(localStorage.getItem("data_download"));
        }
        else{
            localStorage.setItem("data_download_date", new Date());
        }
        total += bytesDownloaded;
        localStorage.setItem("data_download", total);
        return result;
      }
}

export function sexNumberToString(sex){
    return sex === 0 ? "male" : sex === 1 ? "female" : "any"
}

export function sexStringToColor(sex){
    const sexLowercase = sex.toLowerCase();
    return sexLowercase === "male" ? "#4da7ab" : sexLowercase === "female" ? "#f3948a" : "#aba74d";
}

export const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

export function hasDefaultValues(dict, defaultValues){
for(let key in defaultValues){
    if(dict[key] === defaultValues[key]){
        return true;
    }
}
return false;
}

  export function getDepartmentFromUnit(uuidUnit, departments){
    
    if(departments){
        const department = departments.find((department) =>{
            return department.units.find((unit) => unit.uuid === uuidUnit);
        });
        if(department){
            return department;
        }
    }
    return "";
}

export function getUnitsResearcher(uuidResearcher, researchers){
    const researcher = researchers.find((researcher) => researcher.uuid === uuidResearcher);
    if(researcher){
        return researcher.units;
    }
    return [];
}

export function serviceTypeToTranslation(serviceType){
    const typesService = {
        "0" : "laboratory", 
        "1" : "medical-imaging" , 
        "3" : "shoe_shop"
    }
    return typesService[serviceType.toString()];
}

export function turnsToSchedule(turn){
    const date = new Date();
    date.setHours(turn[0][0], turn[0][1], 0, 0);
    let stringDate = date.toLocaleTimeString(undefined, {timeStyle:'short'});
    date.setHours(turn[1][0], turn[1][1], 0, 0);
    stringDate += " - "+date.toLocaleTimeString(undefined, {timeStyle:'short'});
    return stringDate;
}

export function countSexPatients(listPatients){
    let tempCountSex = {male : 0, female : 0};
    listPatients.forEach(patient => {
            
        if (patient.personalData.sex.toLowerCase() === "male") {
            tempCountSex.male++;
        }
        else {
            tempCountSex.female++;
        }
        
    })
    return tempCountSex;
}

export function translateOrderOptions(options, orderValue, translate){
    const translatedOptions = options.map((option) => {
        return {value:option.value, label:translate(option.label).toString()}
    }).sort((optionA, optionB) => optionA.label > optionB.label ? 1 : -1);
    //Move the item with value "OTH" to the end of the list
    const otherOption = translatedOptions.find((option) => option.value === orderValue);
    if(otherOption){
        translatedOptions.splice(translatedOptions.indexOf(otherOption), 1);
        translatedOptions.push(otherOption);
    }
    return translatedOptions;
}

export function differenceDatesToString(dateStart, dateEnd){
    const difference = dateEnd.getTime() - dateStart.getTime();

    const nDays = difference / 86400000;
    const nWeeks = nDays / 7;
    const nMonths = nDays / 30;

    if(nMonths > 0 &&  Number.isInteger(nMonths)){
        return {
            "months" : nMonths
        }
    }
    else if(nWeeks > 1 && Number.isInteger(nWeeks)){
        return {
            "weeks" : nWeeks
        }
    }
    else{
        return {
            "days" : nDays
        }
    }
}

export function twoDigits(number){
    return number < 10 ? "0"+number : number;
}
