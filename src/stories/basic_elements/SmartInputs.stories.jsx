import React from 'react';
import Form from '../../components/general/form';
import ICTSelectorGeneral from '../../components/general/SmartFields/ICT/index'
import ProviderSherwood from '../../providerSherwood';
import TreatmentCore from '../../components/general/SmartFields/SingleTreatmentSelector';
import TreatmentHospital from '../../components/general/SmartFields/TreatmentHospital';
import RequestField from '../../components/general/SmartFields/RequestField';
import { requestsServiceInvestigation, servicesInvestigation } from '../hospital/Services/data';

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
            "name": "drug-code",
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
            "name": "treatment-frecuency",
            "label": "frecuency",
            "type": "select",
            options:[
                {"label" : "hospital.frecuency-options.4h", "value" : "4h"},
                {"label": "hospital.frecuency-options.6h", "value" : "6h"},
                {"label": "hospital.frecuency-options.8h", "value" : "8h"},
                {"label": "hospital.frecuency-options.12h", "value" : "12h"},
                {"label": "hospital.frecuency-options.24h", "value" : "24h"},
                {"label": "hospital.frecuency-options.48h", "value" : "48h"},
                {"label": "hospital.frecuency-options.week", "value" : "7d"}
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

const FIELD_TREATMENT_REGULAR = {
    "drug":{
        required : true,
        type:"treatment_regular",
        label:"Drug Selector",
        shortLabel: "investigation.table.is_personal_data",
        validation : "arrayOrFalse",
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
            "name": "treatment_regular-frecuency",
            "label": "frecuency",
            "type": "select",
            options:[
                {"label" : "hospital.frecuency-options.4h", "value" : "4h"},
                {"label": "hospital.frecuency-options.6h", "value" : "6h"},
                {"label": "hospital.frecuency-options.8h", "value" : "8h"},
                {"label": "hospital.frecuency-options.12h", "value" : "12h"},
                {"label": "hospital.frecuency-options.24h", "value" : "24h"},
                {"label": "hospital.frecuency-options.48h", "value" : "48h"},
                {"label": "hospital.frecuency-options.week", "value" : "7d"}
            ],
            "validation" : "notEmpty",
        },
        {
            "required": true,
            "encrypted": false,
            "name": "treatment_regular-dose",
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
            "name": "compo-code",
            "label": "Code Diagnosis",
            "type": "compo-code",
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
            "name": "drug-code",
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
            "name": "drug-code",
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

const FIELD_BMI = {
    "bmi":{
        required : false,
        type:"bmi",
        label:"BMI Field",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    }
}

const FIELD_EDD = {
    "edd":{
        required : false,
        type:"edd",
        label:"Expected Delivery Date",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    }
}

const FIELD_HT = {
    "edd":{
        required : false,
        type:"hospital_treatment",
        label:"Hospital Treatment",
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


const Template = (args) => <Form {...args} country="ml" />
const TemplateICT = (args) => <ICTSelectorGeneral {...args}  />
const TemplateAllergy = (args) => <Form {...args}  />
const TemplateBackground = (args) => <Form {...args}  />
const TemplateFamilyBackground = (args) => <Form {...args}  />
const TemplateImage = (args) => <Form {...args}  />
const TemplateTreatmentRaw = (args) => <TreatmentCore {...args}  />
const TemplateHospitalizedRaw = (args) => <TreatmentHospital {...args}  country="ml"  />
const TemplateRequestRaw = (args) => <RequestField {...args} />
const TemplateBMI = (args) => <Form {...args}  />

export const TreatmentEmpty = Template.bind({});
TreatmentEmpty.args = {
    fields:FIELD_TREATMENT, 
    creating : true,
    callBackForm : (values) => console.log("Result",JSON.stringify(values))}

export const TreatmentRegular = Template.bind({});
TreatmentRegular.args = {
        fields:FIELD_TREATMENT_REGULAR, 
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
                        "treatment-frecuency": "6h", 
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
    initialData:{file: [{file:"hospitals_1620728497713-256774649", "type" : "image/png"},
    {file:"hospitals_1620729868307-866470426", "type" : "image/png"}]},
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};


export const BMIField = TemplateBMI.bind({});
BMIField.args = {
    fields : FIELD_BMI, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

export const EDDField = TemplateBMI.bind({});
EDDField.args = {
    fields : FIELD_EDD, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

export const HospitalTreatmentField = TemplateHospitalizedRaw.bind({});
HospitalTreatmentField.args = {
    fields : FIELD_HT, 
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

export const RequestLabField = TemplateRequestRaw.bind({});
RequestLabField.args = {
    serviceType:0,
    initServicesInvestigation:servicesInvestigation,
    initRequestsServiceInvestigation:requestsServiceInvestigation,
    callBackForm : (values) => console.log("Result",JSON.stringify(values)) 
};

