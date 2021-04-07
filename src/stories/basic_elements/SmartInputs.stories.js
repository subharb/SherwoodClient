import React from 'react';
import Form from '../../components/general/form';
import ProviderSherwood from '../../providerSherwood';
import { MultipleTreatmentSelector } from '../../components/general/TreatmentSelector';

const FIELD_TREATMENT = {
    "drug":{
        required : true,
        type:"drug",
        label:"Drug Selector",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty",
        "slaves" : [{
            "required": true,
            "encrypted": false,
            "name": "drug-code",
            "label": "Start Drug",
            "type": "text",
            "validation" : "notEmpty",
        },
        {
            "required": true,
            "encrypted": false,
            "name": "drug-start",
            "label": "Start Drug",
            "type": "date",
            "validation" : "notEmpty",
        },
        {
            "required": true,
            "encrypted": false,
            "name": "drug-finish",
            "label": "Finish Drug",
            "type": "date",
            "validation" : "notEmpty",
        },
        {
            "required": true,
            "encrypted": false,
            "name": "drug-posology",
            "label": "Posology",
            "type": "select",
            options:[
                {"label" : "hospital.posology-types.4h", "value" : "4h"},
                {"label": "hospital.posology-types.6h", "value" : "6h"},
                {"label": "hospital.posology-types.8h", "value" : "8h"},
                {"label": "hospital.posology-types.12h", "value" : "12h"},
                {"label": "hospital.posology-types.24h", "value" : "24h"},
                {"label": "hospital.posology-types.48h", "value" : "48h"},
                {"label": "hospital.posology-types.week", "value" : "7d"}
            ],
            "validation" : "notEmpty",
        }]
    }
    
}

const FIELD_ICT = {
    "ict":{
        required : false,
        type:"ict",
        label:"Autocomplete",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    }
}

export default {
    title: 'Basic Elements/Fields/Smart Fields',
    component: Form,
    decorators: [story => 
        <ProviderSherwood>
                {story()}
        </ProviderSherwood>],
};


const Template = (args) => <MultipleTreatmentSelector {...args}  />

export const TreatmentEmpty = Template.bind({});
TreatmentEmpty.args = {
    label:"Treatment", 
    variant:"outlined",
    margin:"small",
    helperText:"ERror" , 
    errorState:false,
    slaves:FIELD_TREATMENT["drug"]["slaves"],
    resetDiagnose:() => {console.log("aaa")}, 
    size:"small",
    drugSelected:(values) => {console.log("Result",JSON.stringify(values))}
};

export const TreatmentWithData = Template.bind({});
TreatmentWithData.args = {
    label:"Treatment", 
    variant:"outlined",
    margin:"small",
    helperText:"ERror" , 
    errorState:false,
    slaves:FIELD_TREATMENT["drug"]["slaves"],
    resetDiagnose:() => {console.log("aaa")}, 
    size:"small",
    initialState:{isAddingDrug:false, listTreatments:[{drug: {name:"paracetamol"}, 
        posology:{  label: "hospital.posology-types.6h",
                    value: "6h"}, 
        startDate:"1111", endDate:"111"}]},
    drugSelected:(values) => {console.log("Result",JSON.stringify(values))}
};

export const ICT = Template.bind({});
ICT.args = {
    fields:FIELD_ICT, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values))
};

