import React from 'react';
import Form from '../../../components/general/form';
import ProviderSherwood from '../../../providerSherwood';

const FIELDS_FORM = {
    "checkbox":{
        required : false,
        type:"checkbox",
        label:"Checkbox",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "text" : {
        required : true,
        type:"text",
        label:"Textfield",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "select" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "Simple Select",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"text" : "Option 1", "value" : "text"},
                {"text": "Option 2", "value" : "number"},
                {"text": "Option 3", "value" : "checkbox"},
        ]                             
    },
    "select-activate" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "Select With activation field Option 2, 3",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"text" : "Option 1", "value" : "text"},
                {"text": "Option 2", "value" : "number"},
                {"text": "Option 3", "value" : "checkbox"},
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
        required : true,
        type:"multioption",
        validation : "notEmpty",
        label : "Multioption",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"text" : "Option 1", "value" : "text"},
                {"text": "Option 2", "value" : "number"},
                {"text": "Option 3", "value" : "checkbox"},
        ]                             
    },
    "date" : {
        required : true,
        type:"date",
        label:"Date",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "time" : {
        required : true,
        type:"time",
        label:"Time",
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
    creating : true
};

export const Answering = Template.bind({});
Answering.args = {
    fields:FIELDS_FORM, 
    answeringMode: true,
    creating : true
};

