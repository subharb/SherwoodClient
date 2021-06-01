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
    "radio":{
        required : false,
        type:"radio",
        label:"Radio Buttons",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty",
        options:[{"label" : "Option 1", "value" : "text"},
                {"label": "Option 2", "value" : "number"},
                {"label": "Option 3", "value" : "checkbox"}]
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
    "evaluation" : {
        required : false,
        type:"evaluation",
        label:"Evaluate opinion",
        shortLabel: "investigation.table.name",
        validation : "textMin2",
        options:[3,7]
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

