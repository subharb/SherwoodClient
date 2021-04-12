import React from 'react';
import Form from '../../../components/general/form';
import ProviderSherwood from '../../../providerSherwood';

const FIELDS_FORM = {
    "autocomplete":{
        required : false,
        type:"autocomplete",
        label:"Autocomplete",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "test":{
        required : false,
        type:"test",
        label:"Autocomplete",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "treatment":{
        required : true,
        type:"treatment",
        label:"Treatment Selector",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty",
        "slaves" : [{
            "id" : 10,
            "required": true,
            "encrypted": false,
            "name": "drug-code",
            "label": "Start Drug",
            "type": "text",
            "validation" : "notEmpty",
        },
        {
            "id" : 11,
            "required": true,
            "encrypted": false,
            "name": "drug-start",
            "label": "Start Drug",
            "type": "date",
            "validation" : "notEmpty",
        },
        {
            "id" : 12,
            "required": true,
            "encrypted": false,
            "name": "drug-finish",
            "label": "Finish Drug",
            "type": "date",
            "validation" : "notEmpty",
        },
        {
            "id" : 13,
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
    },
    "ict":{
        required : false,
        type:"ict",
        label:"ICT Selector",
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



export default {
    title: 'Basic Elements/Fields/Fields',
    component: Form,
    decorators: [story => 
        <ProviderSherwood>
                {story()}
        </ProviderSherwood>],
};

const Template = (args) => <Form {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    fields:FIELDS_FORM, 
    creating : true,
    callBackForm : (values) => console.log("Result",JSON.stringify(values))
};

export const Answering = Template.bind({});
Answering.args = {
    fields:FIELDS_FORM, 
    answeringMode: true,
    creating : true,
    callBackForm : (values) => console.log("Result",JSON.stringify(values))
};

