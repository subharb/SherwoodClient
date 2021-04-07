import React from 'react';
import Form from '../../components/general/form';
import ProviderSherwood from '../../providerSherwood';

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
                {"label" : "hospital.posology.4h", "value" : "4h"},
                {"label": "hospital.posology.6h", "value" : "6h"},
                {"label": "hospital.posology.8h", "value" : "8h"},
                {"label": "hospital.posology.12h", "value" : "12h"},
                {"label": "hospital.posology.24h", "value" : "24h"},
                {"label": "hospital.posology.48h", "value" : "48h"},
                {"label": "hospital.posology.week", "value" : "7d"}
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

const Template = (args) => <Form {...args} />;

export const Treatment = Template.bind({});
Treatment.args = {
    fields:FIELD_TREATMENT, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values))
};

export const ICT = Template.bind({});
ICT.args = {
    fields:FIELD_ICT, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values))
};

