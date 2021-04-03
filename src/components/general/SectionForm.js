import { isEmpty } from 'lodash';
import React from 'react'
import Form from './form';

export default function SectionForm(props) {
    const dictFields = {};
    const preString = "field_";
    let initialData = {}; //props.initData ? props.initData : null;
    props.fields.forEach(field => {
        let copyField = Object.assign({}, field);
        copyField["name"] = preString+field.id.toString();
        dictFields[preString+field.id.toString()] = copyField;
        if(props.initData){
            const record = props.initData.surveyRecords.find(record => record.surveyField.name === field.name);
            if(record){
                initialData[preString+field.id.toString()] = record.value;
            }            
        }
    });

    function callBackForm(values){
        let copyValues = Object.assign({}, values)
        const dataFields = [];
        Object.keys(values).forEach(key =>{
            let tempObj = {};
            tempObj["id_field"] = parseInt(key.replace(preString, ""));
            tempObj["value"] = values[key];
            dataFields.push(tempObj);
        })
        props.callBackSectionForm(dataFields);
    }

const FIELDS_FORM = {
    "autocomplete":{
        required : false,
        type:"autocomplete",
        label:"Autocomplete",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "ict":{
        required : false,
        type:"ict",
        label:"Autocomplete",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "checkbox":{
        required : false,
        type:"checkbox",
        label:"Checkbox",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "text" : {
        required : false,
        type:"text",
        label:"Textfield",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "select" : {
        required : false,
        type:"select",
        validation : "notEmpty",
        label : "Simple Select",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"label" : "Option 1", "value" : "text"},
                {"label": "Option 2", "value" : "number"},
                {"label": "Option 3", "value" : "checkbox"},
        ]                             
    },
    "select-activate" : {
        required : false,
        type:"select",
        validation : "notEmpty",
        label : "Select With activation field Option 2, 3",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"label" : "Option 1", "value" : "text"},
                {"label": "Option 2", "value" : "number"},
                {"label": "Option 3", "value" : "checkbox"},
        ],
        activationValues : ["checkbox", "number"],
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
    "multioption" : {
        required : false,
        type:"multioption",
        validation : "notEmpty",
        label : "Multioption",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"label" : "Option 1", "value" : "text"},
                {"label": "Option 2", "value" : "number"},
                {"label": "Option 3", "value" : "checkbox"},
        ]                             
    },
    "date" : {
        required : false,
        type:"date",
        label:"Date",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "time" : {
        required : false,
        type:"time",
        label:"Time",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "evaluate" : {
        required : false,
        type:"evaluate",
        label:"Evaluate opinion",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "textarea" : {
        required : false,
        type:"textarea",
        label:"Long field for text area",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    
}

    return <Form fields={FIELDS_FORM} 
                callBackForm = {(values) => callBackForm(values)}/>
}
