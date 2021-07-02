import React from 'react';
import File from '../../components/general/File';
import ProviderSherwood from '../../providerSherwood';

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
                {"label" : "hospital.posology-options.4h", "value" : "4h"},
                {"label": "hospital.posology-options.6h", "value" : "6h"},
                {"label": "hospital.posology-options.8h", "value" : "8h"},
                {"label": "hospital.posology-options.12h", "value" : "12h"},
                {"label": "hospital.posology-options.24h", "value" : "24h"},
                {"label": "hospital.posology-options.48h", "value" : "48h"},
                {"label": "hospital.posology-options.week", "value" : "7d"}
            ],
            "validation" : "notEmpty",
        },
        {
            "required": true,
            "encrypted": false,
            "name": "treatment-dose",
            "label": "Dose",
            "type": "select",
            options:[
                {"label" : "hospital.dose-options.1", "value" : "1"},
                {"label": "hospital.dose-options.3/4", "value" : "3/4"},
                {"label": "hospital.dose-options.1/2", "value" : "1/2"},
                {"label": "hospital.dose-options.1/4", "value" : "1/4"},
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

const FIELD_ALLERGY = {
    "allergy":{
        required : false,
        type:"allergy",
        label:"Drug Allergy",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty",
        slaves : [{
            "required": true,
            "encrypted": false,
            "name": "drug-id",
            "label": "Code Diagnosis",
            "type": "drug-id",
            "validation" : "notEmpty",
        }]
    }
}

const FIELD_BACKGROUND = {
    "background":{
        required : false,
        type:"background",
        label:"Antecedentes",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty",
        slaves : [{
            "required": true,
            "encrypted": false,
            "name": "drug-id",
            "label": "Code Diagnosis",
            "type": "background-code",
            "validation" : "notEmpty",
        }]
    }
}

const FIELD_FAMILY_BACKGROUND = {
    "family-background":{
        required : false,
        type:"family-background",
        label:"Antecedentes",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty",
        slaves : [{
            "required": true,
            "encrypted": false,
            "name": "drug-id",
            "label": "Code Diagnosis",
            "type": "family-background-code",
            "validation" : "notEmpty",
        }]
    }
}

const FIELD_IMAGE = {
    "image":{
        required : false,
        type:"image",
        label:"Image",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    }
}

export default {
    title: 'Basic Elements/Fields/Ouput Fields',
    component: File,
    decorators: [story => 
        <ProviderSherwood>
                {story()}
        </ProviderSherwood>],
};

const Template = (args) => <File {...args} />;

export const FileOuput = Template.bind({});
FileOuput.args = {
    mode:"show", 
    label:"Radiografias",
    value : [{file:"hospitals_1625034128144-429071031", "type" : "application/json"},
            {file:"hospitals_1625034137017-300305320", "type" : "image/png"}
            ]
}

export const FileEdit = Template.bind({});
FileEdit.args = {
    mode:"form", 
    label:"Radiografias",
    value : [{file:"hospitals_1620728497713-256774649", "file-data" : "1111111"},
            {file:"hospitals_1620729868307-866470426", "file-data" : "1111111"}]
}
