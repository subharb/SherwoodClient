import React from 'react';
import Form from '../../components/general/form';
import ProviderSherwood from '../../providerSherwood';
import { MultipleTreatmentSelector } from '../../components/general/MultipleTreatmentSelector';
import { MultipleICTSelector } from '../../components/general/MultipleICTSelector';

const FIELD_TREATMENT = {
    "drug":{
        required : true,
        type:"treatment",
        label:"Drug Selector",
        shortLabel: "investigation.table.is_personal_data",
        validation : "arrayOrFalse",
        "slaves" : [{
            "required": true,
            "encrypted": false,
            "name": "treatment-code",
            "label": "Start Drug",
            "type": "text",
            "validation" : "notEmpty",
        },
        {
            "required": true,
            "encrypted": false,
            "name": "treatment-start",
            "label": "Start Drug",
            "type": "date",
            "validation" : "notEmpty",
        },
        {
            "required": true,
            "encrypted": false,
            "name": "treatment-finish",
            "label": "Finish Drug",
            "type": "date",
            "validation" : "notEmpty",
        },
        {
            "required": true,
            "encrypted": false,
            "name": "treatment-posology",
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
        validation : "notEmpty",
        slaves : [{
            "required": true,
            "encrypted": false,
            "name": "ict-code",
            "label": "Code Diagnosis",
            "type": "text",
            "validation" : "notEmpty",
        }]
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


const Template = (args) => <Form {...args}  />
const TemplateICT = (args) => <Form {...args}  />

export const TreatmentEmpty = Template.bind({});
TreatmentEmpty.args = {
    fields:FIELD_TREATMENT, 
    creating : true,
    callBackForm : (values) => console.log("Result",JSON.stringify(values))}
// TreatmentEmpty.args = {
//     label:"Treatment", 
//     variant:"outlined",
//     margin:"small",
//     helperText:"Error" , 
//     addTreatment: null,
//     errorState:false,
//     slaves:FIELD_TREATMENT["drug"]["slaves"],
//     resetDiagnose:() => {console.log("aaa")}, 
//     size:"small",
//     treatmentSelected : (values) => {console.log("Result",JSON.stringify(values))}
// };

export const TreatmentWithData = Template.bind({});
TreatmentWithData.args = {
    fields:FIELD_TREATMENT, 
    initialData:{drug:[{treatment:"paracetamol", 
                        "treatment-posology": "6h", 
                        startDate:"1111", endDate:"111"}
                    ]
                },
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};


export const ICT = TemplateICT.bind({});
ICT.args = {
    fields : FIELD_ICT, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

export const ICTWithData = TemplateICT.bind({});
ICTWithData.args = {
    fields : FIELD_ICT, 
    initialData : {ict : [{ict:"Paludism", "ict-code" : "2233"}]},
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

