import React from 'react';
import Form from '../../components/general/form';
import ICTSelectorGeneral from '../../components/general/SmartFields/ICT/index'
import ProviderSherwood from '../../providerSherwood';
import TreatmentCore from '../../components/general/SmartFields/SingleTreatmentSelector';

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
            "name": "drug-id",
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
    "file":{
        required : false,
        type:"file",
        label:"Image please",
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


const Template = (args) => <Form {...args}  />
const TemplateICT = (args) => <ICTSelectorGeneral {...args}  />
const TemplateAllergy = (args) => <Form {...args}  />
const TemplateBackground = (args) => <Form {...args}  />
const TemplateFamilyBackground = (args) => <Form {...args}  />
const TemplateImage = (args) => <Form {...args}  />
const TemplateTreatmentRaw = (args) => <TreatmentCore {...args}  />

export const TreatmentEmpty = Template.bind({});
TreatmentEmpty.args = {
    fields:FIELD_TREATMENT, 
    creating : true,
    callBackForm : (values) => console.log("Result",JSON.stringify(values))}

export const TreatmentRaw = TemplateTreatmentRaw.bind({});
TreatmentRaw.args = {
    variant:'outlined', 
    size : 'small',
    language:'fr',
    type:'treatment',
    typeMargin:'',
    slaves:FIELD_TREATMENT["drug"].slaves,
    elementSelected : (values) => console.log("Result",JSON.stringify(values))}
    
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
                        "treatment-dose": "1 pill", 
                        "treatment-start":"1111", "treatment-finish":"111"}
                    ]
                },
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};


export const ICT = TemplateICT.bind({});
ICT.args = {
    ...FIELD_ICT["ict"], 
    language : "en",
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

export const ICTWithData = TemplateICT.bind({});
ICTWithData.args = {
    fields : FIELD_ICT, 
    initialData : {ict : [{ict:"Paludism", "ict-code" : "2233"}]},
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

export const Background = TemplateBackground.bind({});
Background.args = {
    fields : FIELD_BACKGROUND, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

export const FamilyBackground = TemplateFamilyBackground.bind({});
FamilyBackground.args = {
    fields : FIELD_FAMILY_BACKGROUND, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

export const Allergy = TemplateAllergy.bind({});
Allergy.args = {
    fields : FIELD_ALLERGY, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

export const Image = TemplateImage.bind({});
Image.args = {
    fields : FIELD_IMAGE, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

export const ImageWithData = TemplateImage.bind({});
ImageWithData.args = {
    fields : FIELD_IMAGE, 
    initialData:{
        "image" : [{"image" : "blob:http://localhost:6006/21bb71fd-4a8e-4c12-b7e6-0ed4ab1830a3", status : 3}, 
                    {"image" : "blob:http://localhost:6006/d184ca51-3a1d-4a6a-ba03-b47288c48779", "status" : 0}]
    },
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};
