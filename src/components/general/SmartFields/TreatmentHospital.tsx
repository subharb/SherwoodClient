import React from 'react';
import props from '../../../theme/props';
import Form from '../form';

interface TreatmentHospitalProps {
    country : string
}

const FORM_CONTINUE = {
    "drug_selector":{
        required : true,
        type:"drug_selector",
        label:"Drug Selector",
        params : {
            chemicalComponent : true
        },
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "volume":{
        required : true,
        type:"text",
        label:"Volume(ml)",
        shortLabel: "investigation.table.is_personal_data",
        validation : "number"
    },
    "additive":{
        required : false,
        type:"drug_selector",
        label:"Drug Selector",
        params : {
            chemicalComponent : true
        },
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "frecuency":{
        "required": true,
        "encrypted": false,
        "name": "treatment-frecuency",
        "label": "frecuency",
        "type": "select",
        options:[
            {"label" : "hospital.frecuency-options.4h", "value" : "4h"},
            {"label": "hospital.frecuency-options.6h", "value" : "6h"},
            {"label": "hospital.frecuency-options.8h", "value" : "8h"},
            {"label": "hospital.frecuency-options.12h", "value" : "12h"},
            {"label": "hospital.frecuency-options.24h", "value" : "24h"},
            {"label": "hospital.frecuency-options.48h", "value" : "48h"}
        ],
        "validation" : "notEmpty",
    },
    "composition-liquid":{
        required : true,
        type:"text",
        label:"mL/heure",
        shortLabel: "investigation.table.is_personal_data",
        validation : "number"
    },
    "composition-solid":{
        required : true,
        type:"text",
        label:"mg/heure",
        shortLabel: "investigation.table.is_personal_data",
        validation : "number"
    },
    "number-time":{
        required : true,
        type:"select",
        label:"hospital.number-elements",
        shortLabel: "investigation.table.is_personal_data",
        options:[{
            label : "1",
            value : "1"
        },
        {
            label : "2",
            value : "2"
        },
        {
            label : "3",
            value : "3"
        },{
            label : "4",
            value : "4"
        },
        {
            label : "5",
            value : "5"
        },{
            label : "6",
            value : "6"
        },
        {
            label : "7",
            value : "7"
        },
        {
            label : "8",
            value : "8"
        },
        {
            label : "9",
            value : "9"
        },
        {
            label : "10",
            value : "10"
        }],
        validation : "number"
    },
    "time-elements" : {
        required : true,
        type:"select",
        label:"hospital.time-unit",
        options:[{
            label : "days",
            value : "days"
        },
        {
            label : "weeks",
            value : "weeks"
        }],
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    }
}

const TreatmentHospital: React.FC<TreatmentHospitalProps> = ({ country }) => {
    return (
        <>
            <Form fields={FORM_CONTINUE} country={country}/>
        </>
    );
};

export default TreatmentHospital;
