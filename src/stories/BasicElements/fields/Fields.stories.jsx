import React from 'react';
import Form from '../../../components/general/form';
import ProviderSherwood from '../../../providerSherwood';
import SmartFields from '../../../components/general/SmartFields';

const FIELDS_FORM = {
    "autocomplete":{
        id : "autocomplete",
        required : false,
        type:"autocomplete",
        name:"autocomplete",
        label:"Autocomplete",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "checkbox":{
        id : "checkbox",
        required : false,
        type:"checkbox",
        name:"checkbox",
        label:"Checkbox",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "text" : {
        id : "text",
        required : false,
        type:"text",
        name:"text",
        label:"Textfield",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "select" : {
        id : "select",
        required : false,
        type:"select",
        name:"select",
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
        id : "select-activate",
        required : false,
        type:"select",
        name:"select-activate",
        validation : "notEmpty",
        label : "Select With activation field Option 2, 3",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"label" : "Option 1", "value" : "text"},
                {"label": "Option 2", "value" : "number"},
                {"label": "Option 3", "value" : "checkbox"},
        ],
        activationValues : ["checkbox", "number"],
        activatedFields:{
            "checkbox" : {
                required : true,
                type:"text",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            },
            "number" : {
                required : true,
                type:"checkbox",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            }
        }                               
    },
    "multioption" : {
        id : "multioption",
        required : false,
        type:"multioption",
        name:"multioption",
        validation : "notEmpty",
        label : "Multioption",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"label" : "Option 1", "value" : "text"},
                {"label": "Option 2", "value" : "number"},
                {"label": "Option 3", "value" : "checkbox"},
                {"label": "Option 4", "value" : "checkbox1"},
                {"label": "Option 5", "value" : "checkbox2"},
                {"label": "Option 6", "value" : "checkbox3"},
                {"label": "Option 7", "value" : "checkbox4"},
                {"label": "Option 8", "value" : "checkbox5"},
                {"label": "Option 9", "value" : "checkbox6"},
        ]                             
    },
    "radio":{
        id : "radio",
        required : false,
        type:"radio",
        name:"radio",
        label:"Radio Buttons",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty",
        options:[{"label" : "Option 1", "value" : "text"},
                {"label": "Option 2", "value" : "number"},
                {"label": "Option 3", "value" : "checkbox"}]
    },
    "date" : {
        id : "date",
        required : false,
        type:"date",
        name:"date",
        label:"Date",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "time" : {
        id : "time",
        required : false,
        type:"time",
        name:"time",
        label:"Time",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "evaluation" : {
        id : "evaluation",
        required : false,
        type:"evaluation",
        name:"evaluation",
        label:"Evaluate opinion",
        shortLabel: "investigation.table.name",
        validation : "textMin2",
        options:[{value:3, label:3}, {value:7, label:7}]
    },
    "textarea" : {
        id : "textarea",
        required : false,
        type:"textarea",
        name:"textarea",
        label:"Long field for text area",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "medical_history_ai" : {
        id : "medical_history_ai",
        required : false,
        type:"medical_history_ai",
        name:"medical_history_ai",
        label:"Medical History AI",
        shortLabel: "investigation.table.name",
        validation : "textMin2",
        template : "template"
    },
    "medical_history_template" : {
        id : "medical_history_template",
        required : false,
        type:"medical_history_template",
        name:"template",
        label:"Template",
        shortLabel: "investigation.table.name",
        validation : "textMin2",
        template : "template"
    },
    "medical_history_template_fill" : {
        id : "medical_history_template_fill",
        required : false,
        type:"medical_history_template_fill",
        name:"template_fill",
        label:"Template with filled spaces",
        shortLabel: "investigation.table.name",
        validation : "textMin2", 
        template : "template"
    },
    "bmi" : {
        id : "bmi",
        required : false,
        type:"bmi",
        name:"bmi",
        label:"Long field for text area",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "edd" : {
        id : "edd",
        required : false,
        type:"edd",
        name:"edd",
        label:"Long field for text area",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "treatment" : {
        id : "treatment",
        required : false,
        type:"treatment",
        name:"treatment",
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

