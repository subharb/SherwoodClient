import { TYPE_BILL_ITEM } from "../constants/types"
import { DocumentStatus, DocumentType } from "../pages/hospital/Billing/types"

export const edc_data1 = () => {
    return {
        "surveys": [
            {
                "id": 2,
                "uuid": "ac8b4a15-75d7-4f3f-9365-429395a4fc02",
                "name": "Analitica",
                "isActive": true,
                "hasRecords": false,
                "sections": [
                    {
                        "id": 3,
                        "uuid": "50083f66-6610-4126-90c6-ffb6ee414f40",
                        "name": "Blood Samples",
                        "repeats": false,
                        "isActive": true,
                        "fields": [
                            {   id:7,
                                required : true,
                                type:"treatment",
                                name : "treatment",
                                label:"Drug Selector",
                                shortLabel: "investigation.table.is_personal_data",
                                "typeValueCypress" : "Treatment",
                                validation : "notEmpty",
                                "slaves" : [{
                                    "id" : 10,
                                    "required": true,
                                    "encrypted": false,
                                    "name": "drug-id",
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
                            {
                                "id": 15,
                                "type": "text_blob",
                                "name": "red_cells",
                                "encrypted": false,
                                "required": true,
                                "label": "Esto es un texto explicativo de lo que se tiene que hacer en los sigientes inputs",
                                "isActive": true,
                                "options": [],
                                "typeValueCypress" : "Text"
                            },
                            {
                                "id": 9,
                                "type": "separator",
                                "name": "red_cells",
                                "encrypted": false,
                                "required": true,
                                "label": "",
                                "isActive": true,
                                "options": [],
                                "typeValueCypress" : "Text"
                            },
                            {
                                "id": 5,
                                "type": "text",
                                "name": "red_cells",
                                "encrypted": false,
                                "required": true,
                                "label": "Amount red cells?",
                                "isActive": true,
                                "options": [],
                                "typeValueCypress" : "Text"
                            },
                            {
                                "id": 6,
                                "type": "text",
                                "name": "leucocitos",
                                "encrypted": false,
                                "required": true,
                                "label": "Amount white cells?",
                                "isActive": true,
                                "options": [],
                                "typeValueCypress" : "Text"
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "uuid": "50083f66-6610-4126-90c6-ffb6ee414f40",
                        "name": "Diagnosis",
                        "repeats": false,
                        "isActive": true,
                        "fields": [
                            {   id:10,
                                required : true,
                                type:"ict",
                                name : "ict",
                                label:"Current Diagnosis",
                                shortLabel: "investigation.table.is_personal_data",
                                "typeValueCypress" : "Diagnosis",
                                validation : "notEmpty",
                                "slaves" : [{
                                    "id" : 10,
                                    "required": true,
                                    "encrypted": false,
                                    "name": "ict-code",
                                    "label": "-",
                                    "type": "text",
                                    "validation" : "notEmpty",
                                }]
                            }
                        ]
                    },
                ]
            },
            {
                "id": 1,
                "uuid": "3f8883b2-ce4a-47bf-ba66-e8273670fe82",
                "name": "Demographic Questionaire",
                "isActive": true,
                "hasRecords": true,
                "sections": [
                    {
                        "id": 1,
                        "uuid": "eb803340-a957-4310-a223-97f85d4c2285",
                        "name": "Demographics",
                        "repeats": false,
                        "isActive": true,
                        "fields": [
                            {
                                "id": 1,
                                "type": "text",
                                "name": "sex",
                                "encrypted": false,
                                "required": true,
                                "label": "Sex at birth",
                                "isActive": true,
                                "options": [],
                                "typeValueCypress" : "Text"
                            },
                            {
                                "id": 2,
                                "type": "text",
                                "name": "history",
                                "encrypted": false,
                                "required": true,
                                "label": "History",
                                "isActive": true,
                                "options": [],
                                "typeValueCypress" : "Text"
                            },
                            {
                                "id": 3,
                                "type": "text",
                                "name": "etnic",
                                "encrypted": false,
                                "required": true,
                                "label": "Etnic Origin",
                                "isActive": true,
                                "options": [],
                                "typeValueCypress" : "Text"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "uuid": "46bed8b0-28b2-440b-914f-c7e78a1d8b9f",
                        "name": "Past medical history",
                        "repeats": false,
                        "isActive": true,
                        "fields": [
                            {
                                "id": 4,
                                "type": "text",
                                "name": "ilnesses",
                                "encrypted": false,
                                "required": true,
                                "label": "Previous Ilnesess",
                                "isActive": true,
                                "options": [],
                                "typeValueCypress" : "Text"
                            }
                        ]
                    }
                ]
            }
        ]
        , addingSection:false, editingIndexSection:false}
}

export const records_patient1 = () =>{
    return {
        submissions : [
            {
                "surveyRecords": [
                    {
                        "id": 28,
                        "value": "male",
                        "surveySection": {
                            "id": 15,
                            "uuid": "ef30d3f6-1436-47cd-ad5a-22321de4d3a7",
                            "name": "Demographics",
                            "repeats": false,
                            "isActive": true
                        },
                        "surveyField": {
                            "id": 28,
                            "type": "text",
                            "name": "sex",
                            "encrypted": false,
                            "required": true,
                            "label": "Sex at birth",
                            "isActive": true
                        }
                    },
                    {
                        "id": 29,
                        "value": "arabix",
                        "surveySection": {
                            "id": 15,
                            "uuid": "ef30d3f6-1436-47cd-ad5a-22321de4d3a7",
                            "name": "Demographics",
                            "repeats": false,
                            "isActive": true
                        },
                        "surveyField": {
                            "id": 29,
                            "type": "text",
                            "name": "etnic",
                            "encrypted": false,
                            "required": true,
                            "label": "Etnic Origin",
                            "isActive": true
                        }
                    },
                    {
                        "id": 30,
                        "value": "Texto largo para una hsitoria clinica",
                        "surveySection": {
                            "id": 16,
                            "uuid": "ef30d3f6-1436-47cd-ad5a-22321de4d3a7",
                            "name": "Blood Samples",
                            "repeats": true,
                            "isActive": true
                        },
                        "surveyField": {
                            "id": 30,
                            "type": "text",
                            "name": "red_cells",
                            "encrypted": false,
                            "required": true,
                            "label": "Amount red cells?",
                            "isActive": true
                    }
                    },
                    {
                        "id": 6,
                        "value": 122,
                        "surveySection": {
                            "id": 16,
                            "uuid": "21cc0d3a-0149-442d-bd24-c8eaa050223f",
                            "name": "Blood Samples",
                            "repeats": true,
                            "isActive": true
                        },
                        "surveyField": {
                            "id": 32,
                            "type": "text",
                            "name": "leucocitos",
                            "encrypted": false,
                            "required": true,
                            "label": "Amount white cells?",
                            "isActive": true
                        }
                    }
                ],
                "id": 4,
                "createdAt": "2021-03-01T08:43:06.663Z",
                "updatedAt": "2021-03-01T08:43:06.663Z",
                "nameCypress" : "Demographic Questionaire"
            },
            {   
                "surveyRecords" : [
                    {
                        "id": 6,
                        "value": 111,
                        "surveySection": {
                            "id": 16,
                            "uuid": "21cc0d3a-0149-442d-bd24-c8eaa050223f",
                            "name": "Blood Samples",
                            "repeats": true,
                            "isActive": true
                        },
                        "surveyField": {
                            "id": 31,
                            "type": "text",
                            "name": "red_cells",
                            "encrypted": false,
                            "required": true,
                            "label": "Amount red cells?",
                            "isActive": true
                        }
                    },
                    {
                        "id": 6,
                        "value": 99,
                        "surveySection": {
                            "id": 16,
                            "uuid": "21cc0d3a-0149-442d-bd24-c8eaa050223f",
                            "name": "Blood Samples",
                            "repeats": true,
                            "isActive": true
                        },
                        "surveyField": {
                            "id": 32,
                            "type": "text",
                            "name": "leucocitos",
                            "encrypted": false,
                            "required": true,
                            "label": "Amount white cells?",
                            "isActive": true
                        }
                    }
                ],
                "id": 5,
                "createdAt": "2021-03-01T08:43:06.663Z",
                "updatedAt": "2021-03-01T08:43:06.663Z",
            }
        ]
    }
}

export const records_patient2 = () =>{
    return {
        submissions : [
            {
                "surveyRecords": [
                    {
                        "id": 4,
                        "value": "male",
                        "surveySection": {
                            "id": 15,
                            "uuid": "ef30d3f6-1436-47cd-ad5a-22321de4d3a7",
                            "name": "Demographics",
                            "repeats": false,
                            "isActive": true
                        },
                        "surveyField": {
                            "id": 28,
                            "type": "text",
                            "name": "sex",
                            "encrypted": false,
                            "required": true,
                            "label": "Sex at birth",
                            "isActive": true
                        }
                    },
                    {
                        "id": 5,
                        "value": "arabix",
                        "surveySection": {
                            "id": 15,
                            "uuid": "ef30d3f6-1436-47cd-ad5a-22321de4d3a7",
                            "name": "Demographics",
                            "repeats": false,
                            "isActive": true
                        },
                        "surveyField": {
                            "id": 29,
                            "type": "text",
                            "name": "etnic",
                            "encrypted": false,
                            "required": true,
                            "label": "Etnic Origin",
                            "isActive": true
                        }
                    },
                ],
                "id": 4,
                "createdAt": "2021-03-01T08:43:06.663Z",
                "updatedAt": "2021-03-01T08:43:06.663Z",
                "nameCypress" : "Demographic Questionaire"
            },
            {   
                "surveyRecords" : [
                    {
                        "id": 6,
                        "value": "Lung cancer",
                        "surveySection": {
                            "id": 16,
                            "uuid": "21cc0d3a-0149-442d-bd24-c8eaa050223f",
                            "name": "Past medical history",
                            "repeats": true,
                            "isActive": true
                        },
                        "surveyField": {
                            "id": 31,
                            "type": "text",
                            "name": "red_cells",
                            "encrypted": false,
                            "required": true,
                            "label": "Amount red cells?",
                            "isActive": true
                        }
                    }
                ],
                "id": 5,
                "createdAt": "2021-03-01T08:43:06.663Z",
                "updatedAt": "2021-03-01T08:43:06.663Z",
            }
        ]
    }
}

export const data_collection_patient1 = () =>{
    return{
        "surveys": [
            {
                "id": "602fb9dee56f218b58f847af",
                "records": records_patient1().records
    }
    ]}
}

export const basic_info1 = {
        "name": {
            "value" : "COVID Nose",
            "type" : "text"
        }, 
        "acronym":{
            "value" : "CN", 
            "type" : "text"
        },
        "type":{"value" : "audit", "type" : "select", "textValue" : "Clinical trial"},
        "principal_researcher":{"value" : "Pedro Rodriguez", "type" : "text"},
        "institution":{"value" : "Oxford University", "type" : "text"},
        "contact":{"value" : "test@email.com", "type" : "text"},
        "ethics_body":{ "value" : "12345", "type" : "text"},
        "reference_number_state":{ "value" : "1","type" : "select", "textValue" : "Approved"},
        "description":{ "value" : "Estudio sobre el impacto en la anosmia en pacientes de COVID19", "type" : "textarea"}
}

export const basic_info1_raw = () => {
    let tempBasicInfo = {}
    Object.keys(basic_info1).map(key => {
        tempBasicInfo[key] = basic_info1[key].value
    });
    return tempBasicInfo;
}
export const selected_personal_data = [{name : "name", type:"text", encrypted:true, required:true, order:0}, {name:"surnames", type:"text", required:true, order:1}, {name:"birthdate", type:"date", required:true, order:2}, {name:"health_id", type:"text", required:false, order:1}];

export const personal_data_investigation1 = () => {
    return  [
        
        {
            "name": "name",
            "type": "text",
            "required": true,
            "label": "investigation.create.personal_data.fields.name",
            "encrypted": true
        },
        {
            "name": "surnames",
            "type": "text",
            "required": true,
            "label": "investigation.create.personal_data.fields.surname",
            "encrypted": true
        },
        {
            "name": "sex",
            "type": "select",
            "required": true,
            "label": "investigation.create.personal_data.fields.sex",
            "options": [{
                value:"Female",
                label:"Female"
            },
            {
                value:"Male",
                label:"Male"
            }],
            "encrypted": true
        },
        {
            "name": "email",
            "type": "text",
            "required": false,
            "label": "investigation.create.personal_data.fields.email",
            "encrypted": true
        },
        {
            "name": "phone",
            "type": "text",
            "required": false,
            "label": "investigation.create.personal_data.fields.phone",
            "encrypted": true
        },
        {
            "name": "health_id",
            "type": "text",
            "required": false,
            "label": "investigation.create.personal_data.fields.health_id",
            "encrypted": true
        }
    ]
}

export const personal_data_with_insurances = () => {
    const personalFields = personal_data_investigation1();
    personalFields.push({
        "name": "insurance",
        "type": "select",
        "required": true,
        "label": "hospital.patient.insurances.select",
        "validation": "",
        "encrypted": false,
        "options": [
            {
                "value": 1,
                "label": "Insurance Test 1 B"
            },
            {
                "value": 2,
                "label": "Insurance Test 2"
            },
            {
                "value": 3,
                "label": "Insurance Test 3 B"
            }
        ]
    })
    return personalFields;
}

export const patient_data1 = () => {
    return {"name" : "U2FsdGVkX1/549BkU0hFEEe6ybHCAQQIvDp3hBvXtzThHXRa3Q001yNHplsrPNc9", 
            "surname" : "U2FsdGVkX19gyeNwfNSi23TYseiCWwqe0C0A4mwfEVc=", 
            "phone" : "U2FsdGVkX1/ru9t1lEG5Iho/EUWfsRYQ1JTNOmoyzjU=", 
            "email" : "U2FsdGVkX19PGWrZ4ggVKCG0tLybQRp7dmfkgQlD864zXxLcDNcBvE3B2DKjE/Ot"}
}
export const patient_data_decrypted1 = () => {
    return {
        "id": "5fccaee78583362dd3d50248",
        "name": "John",
        "surnames": "Hopkins",
        "email": "patient@sherwood.science",
        "phone": "+34 545454",
        "health_id" : "2211312F"
    }
}

export const summary_info1 = () => {
    return {
        ...basic_info1_raw(),
        "status" : 1,
        "personalFields" : personal_data_investigation1(),
        "surveys" : edc_data1().surveys
    }   
}

export const list_investigations = () => {
    const inv1 = {...basic_info1_raw()}
    const inv2 = {...basic_info1_raw()}
    inv2.status = 0;
    const inv3 = {...basic_info1_raw()}
    inv3.shareStatus = 0;
    inv3.hostResearcher = {name: "Peter", surnames:"Petrelli"}
    return [inv1, inv2, inv3]
}
export const patients_no_access_data = [
    {uuid : "uuuiii1"},
    {uuid : "uuuiii2"},
    {uuid : "uuuiii3"},
    {uuid : "uuuiii4"},
]

export const personal_fields_no_access = [
    {
        "name": "uuid",
        "type": "text",
        "required": true,
        "label": "investigation.create.personal_data.fields.uuid",
        "encrypted": true
    }
]


export const submissions_survey = {
    "submissions": [
        {
            "id": 1,
            "createdAt": "2021-03-09T20:21:15.630Z",
            "updatedAt": "2021-03-09T20:21:15.630Z",
            "researcher": {
                "id": 1,
                "name": "David",
                "surnames": "Shaikh Urbina",
                "email": "dshaikhurbina@gmail.com",
                "phone": "+34647727132",
                "keyEncrypted": "U2FsdGVkX18kn/wx2Gy4OsT7HXsX+jJ/7sxnS/2u1NQk9n+Scz3wUoxHdOhE3xnSLjBUgncIXzARXhYnzGToug==",
                "createdAt": "2021-03-09T00:00:00.000Z",
                "updatedAt": "2021-03-09T00:00:00.000Z",
                "password": "bQLJWzDI7Fl8ip/Zhmp/EcEHHmf74U8IetRBcW0E7I8=",
                "uuid": "65aa1e2a-9443-41d4-8373-e2c57a24574c"
            },
            "surveyRecords": [
                {
                    "id": 1,
                    "value": "male",
                    "surveySection": {
                        "id": 1,
                        "uuid": "eb803340-a957-4310-a223-97f85d4c2285",
                        "name": "Demographics",
                        "repeats": false,
                        "isActive": true
                    },
                    "surveyField": {
                        "id": 1,
                        "type": "text",
                        "name": "sex",
                        "encrypted": false,
                        "required": true,
                        "label": "Sex at birth",
                        "isActive": true
                    }
                },
                {
                    "id": 2,
                    "value": "arabix",
                    "surveySection": {
                        "id": 1,
                        "uuid": "eb803340-a957-4310-a223-97f85d4c2285",
                        "name": "Demographics",
                        "repeats": false,
                        "isActive": true
                    },
                    "surveyField": {
                        "id": 2,
                        "type": "text",
                        "name": "history",
                        "encrypted": false,
                        "required": true,
                        "label": "History",
                        "isActive": true
                    }
                }
            ],
            "patient": {
                "id": 3,
                "uuid": "801952ca-66da-4410-8583-3faa6f460e03",
                "status": 0,
                "investigationId": 1,
                "patientId": 3,
                "encryptedKeyUsed": 0,
                "keyPatientInvestigation": "U2FsdGVkX18Uu/e0Iu4MD4qbn8cenIaSx/5cEo3wJI+vTZSl8olWAIJyICDU7D8DhRrW7NxpZkfit0/mAB8/+g=="
            }
        },
        {
            "id": 2,
            "createdAt": "2021-03-09T20:21:21.565Z",
            "updatedAt": "2021-03-09T20:21:21.565Z",
            "researcher": {
                "id": 1,
                "name": "David",
                "surnames": "Shaikh Urbina",
                "email": "dshaikhurbina@gmail.com",
                "phone": "+34647727132",
                "keyEncrypted": "U2FsdGVkX18kn/wx2Gy4OsT7HXsX+jJ/7sxnS/2u1NQk9n+Scz3wUoxHdOhE3xnSLjBUgncIXzARXhYnzGToug==",
                "createdAt": "2021-03-09T00:00:00.000Z",
                "updatedAt": "2021-03-09T00:00:00.000Z",
                "password": "bQLJWzDI7Fl8ip/Zhmp/EcEHHmf74U8IetRBcW0E7I8=",
                "uuid": "65aa1e2a-9443-41d4-8373-e2c57a24574c"
            },
            "surveyRecords": [
                {
                    "id": 3,
                    "value": "Lung cancer",
                    "surveySection": {
                        "id": 2,
                        "uuid": "46bed8b0-28b2-440b-914f-c7e78a1d8b9f",
                        "name": "Past medical history",
                        "repeats": false,
                        "isActive": true
                    },
                    "surveyField": {
                        "id": 4,
                        "type": "text",
                        "name": "ilnesses",
                        "encrypted": false,
                        "required": true,
                        "label": "Previous Ilnesess",
                        "isActive": true
                    }
                }
            ],
            "patient": {
                "id": 3,
                "uuid": "801952ca-66da-4410-8583-3faa6f460e03",
                "status": 0,
                "investigationId": 1,
                "patientId": 3,
                "encryptedKeyUsed": 0,
                "keyPatientInvestigation": "U2FsdGVkX18Uu/e0Iu4MD4qbn8cenIaSx/5cEo3wJI+vTZSl8olWAIJyICDU7D8DhRrW7NxpZkfit0/mAB8/+g=="
            }
        },
        {
            "id": 5,
            "createdAt": "2021-03-09T20:24:03.635Z",
            "updatedAt": "2021-03-09T20:24:03.635Z",
            "researcher": {
                "id": 1,
                "name": "David",
                "surnames": "Shaikh Urbina",
                "email": "dshaikhurbina@gmail.com",
                "phone": "+34647727132",
                "keyEncrypted": "U2FsdGVkX18kn/wx2Gy4OsT7HXsX+jJ/7sxnS/2u1NQk9n+Scz3wUoxHdOhE3xnSLjBUgncIXzARXhYnzGToug==",
                "createdAt": "2021-03-09T00:00:00.000Z",
                "updatedAt": "2021-03-09T00:00:00.000Z",
                "password": "bQLJWzDI7Fl8ip/Zhmp/EcEHHmf74U8IetRBcW0E7I8=",
                "uuid": "65aa1e2a-9443-41d4-8373-e2c57a24574c"
            },
            "surveyRecords": [
                {
                    "id": 7,
                    "value": "ictus",
                    "surveySection": {
                        "id": 2,
                        "uuid": "46bed8b0-28b2-440b-914f-c7e78a1d8b9f",
                        "name": "Past medical history",
                        "repeats": false,
                        "isActive": true
                    },
                    "surveyField": {
                        "id": 4,
                        "type": "text",
                        "name": "ilnesses",
                        "encrypted": false,
                        "required": true,
                        "label": "Previous Ilnesess",
                        "isActive": true
                    }
                }
            ],
            "patient": {
                "id": 2,
                "uuid": "e3ed69b5-d423-4dcf-9cfb-96c24f7a8df6",
                "status": 0,
                "investigationId": 1,
                "patientId": 2,
                "encryptedKeyUsed": 0,
                "keyPatientInvestigation": "U2FsdGVkX19Z5JevEs09vDRsI/HE8cDRIJVHMEPiJY/ySjlblZq5Vg24o5l9nuMsQZfccUnPbqhrf9toaGPR8Q=="
            }
        },
        {
            "id": 6,
            "createdAt": "2021-03-09T20:24:40.257Z",
            "updatedAt": "2021-03-09T20:24:40.257Z",
            "researcher": {
                "id": 1,
                "name": "David",
                "surnames": "Shaikh Urbina",
                "email": "dshaikhurbina@gmail.com",
                "phone": "+34647727132",
                "keyEncrypted": "U2FsdGVkX18kn/wx2Gy4OsT7HXsX+jJ/7sxnS/2u1NQk9n+Scz3wUoxHdOhE3xnSLjBUgncIXzARXhYnzGToug==",
                "createdAt": "2021-03-09T00:00:00.000Z",
                "updatedAt": "2021-03-09T00:00:00.000Z",
                "password": "bQLJWzDI7Fl8ip/Zhmp/EcEHHmf74U8IetRBcW0E7I8=",
                "uuid": "65aa1e2a-9443-41d4-8373-e2c57a24574c"
            },
            "surveyRecords": [
                {
                    "id": 8,
                    "value": "female",
                    "surveySection": {
                        "id": 1,
                        "uuid": "eb803340-a957-4310-a223-97f85d4c2285",
                        "name": "Demographics",
                        "repeats": false,
                        "isActive": true
                    },
                    "surveyField": {
                        "id": 1,
                        "type": "text",
                        "name": "sex",
                        "encrypted": false,
                        "required": true,
                        "label": "Sex at birth",
                        "isActive": true
                    }
                },
                {
                    "id": 9,
                    "value": "Something a bit large",
                    "surveySection": {
                        "id": 1,
                        "uuid": "eb803340-a957-4310-a223-97f85d4c2285",
                        "name": "Demographics",
                        "repeats": false,
                        "isActive": true
                    },
                    "surveyField": {
                        "id": 2,
                        "type": "text",
                        "name": "history",
                        "encrypted": false,
                        "required": true,
                        "label": "History",
                        "isActive": true
                    }
                },
                {
                    "id": 10,
                    "value": "hispanic",
                    "surveySection": {
                        "id": 1,
                        "uuid": "eb803340-a957-4310-a223-97f85d4c2285",
                        "name": "Demographics",
                        "repeats": false,
                        "isActive": true
                    },
                    "surveyField": {
                        "id": 3,
                        "type": "text",
                        "name": "etnic",
                        "encrypted": false,
                        "required": true,
                        "label": "Etnic Origin",
                        "isActive": true
                    }
                }
            ],
            "patient": {
                "id": 2,
                "uuid": "e3ed69b5-d423-4dcf-9cfb-96c24f7a8df6",
                "status": 0,
                "investigationId": 1,
                "patientId": 2,
                "encryptedKeyUsed": 0,
                "keyPatientInvestigation": "U2FsdGVkX19Z5JevEs09vDRsI/HE8cDRIJVHMEPiJY/ySjlblZq5Vg24o5l9nuMsQZfccUnPbqhrf9toaGPR8Q=="
            }
        }
    ]
}

export const getInvestigation = {
    "status": 200,
    "investigation": {
        "name": "COVID Nose",
        "uuid": "c08a7e49-56a5-4881-87df-86404f0203c8",
        "acronym": "CN",
        "type": "clin_trial",
        "institution": "Oxford University",
        "principal_researcher": "Pedro Rodriguez",
        "contact": "test@email.com",
        "reference_number_state": "2",
        "ethics_body": "12345",
        "description": "<p>Estudio sobre el impacto en la anosmia en pacientes de COVID19</p>",
        "surveys": [
            {
                "id": 2,
                "uuid": "ac8b4a15-75d7-4f3f-9365-429395a4fc02",
                "name": "Analitica",
                "isActive": true,
                "hasRecords": false,
                "sections": [
                    {
                        "id": 3,
                        "uuid": "50083f66-6610-4126-90c6-ffb6ee414f40",
                        "name": "Blood Samples",
                        "repeats": false,
                        "isActive": true,
                        "fields": [
                            {
                                "id": 5,
                                "type": "text",
                                "name": "red_cells",
                                "encrypted": false,
                                "required": true,
                                "label": "Amount red cells?",
                                "isActive": true,
                                "options": []
                            },
                            {
                                "id": 6,
                                "type": "text",
                                "name": "leucocitos",
                                "encrypted": false,
                                "required": true,
                                "label": "Amount white cells?",
                                "isActive": true,
                                "options": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1,
                "uuid": "3f8883b2-ce4a-47bf-ba66-e8273670fe82",
                "name": "Demographic Questionaire",
                "isActive": true,
                "hasRecords": true,
                "sections": [
                    {
                        "id": 1,
                        "uuid": "eb803340-a957-4310-a223-97f85d4c2285",
                        "name": "Demographics",
                        "repeats": false,
                        "isActive": true,
                        "fields": [
                            {
                                "id": 1,
                                "type": "text",
                                "name": "sex",
                                "encrypted": false,
                                "required": true,
                                "label": "Sex at birth",
                                "isActive": true,
                                "options": []
                            },
                            {
                                "id": 2,
                                "type": "text",
                                "name": "history",
                                "encrypted": false,
                                "required": true,
                                "label": "History",
                                "isActive": true,
                                "options": []
                            },
                            {
                                "id": 3,
                                "type": "text",
                                "name": "etnic",
                                "encrypted": false,
                                "required": true,
                                "label": "Etnic Origin",
                                "isActive": true,
                                "options": []
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "uuid": "46bed8b0-28b2-440b-914f-c7e78a1d8b9f",
                        "name": "Past medical history",
                        "repeats": false,
                        "isActive": true,
                        "fields": [
                            {
                                "id": 4,
                                "type": "text",
                                "name": "ilnesses",
                                "encrypted": false,
                                "required": true,
                                "label": "Previous Ilnesess",
                                "isActive": true,
                                "options": []
                            }
                        ]
                    }
                ]
            }
        ],
        "keyResearcherInvestigation": "U2FsdGVkX19pLuazsChe0LPixYoxYI5lAaA2IzjPhzmxQzxLNEEoLpZRysvi8NYYcxx1zPyR8aqHNpcizFJx6w==",
        "encryptedKeyUsed": 1,
        "hostResearcher": {
            "name": "David",
            "surnames": "Shaikh Urbina"
        },
        "shareStatus": 2,
        "personalFields": [
            {
                "name": "email",
                "required": true,
                "type": "text",
                "label": "investigation.create.personal_data.fields.email",
                "encrypted": true
            },
            {
                "name": "phone",
                "required": true,
                "type": "text",
                "label": "investigation.create.personal_data.fields.phone",
                "encrypted": true
            },
            {
                "name": "name",
                "required": true,
                "type": "text",
                "label": "investigation.create.personal_data.fields.name",
                "encrypted": true
            },
            {
                "name": "surnames",
                "required": true,
                "type": "text",
                "label": "investigation.create.personal_data.fields.surname",
                "encrypted": true
            },
            {
                "name": "health_id",
                "required": true,
                "type": "text",
                "label": "investigation.create.personal_data.fields.health_id",
                "encrypted": true
            }
        ],
        "permissions": 3,
        "patientsPersonalData": [
            {
                "uuid": "c4d1302d-1583-4f03-bd05-9b1bc0c0b5ec",
                "personalData": [
                    {
                        "name": "email",
                        "required": true,
                        "value": "U2FsdGVkX19mfFDTBFBa5paQ0Aojcv8iXPQu5raTNalzMwAfCHB+xeS9xwuMfUy+",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.email",
                        "encrypted": true
                    },
                    {
                        "name": "phone",
                        "required": true,
                        "value": "U2FsdGVkX19C2iY/QLNeEKLnWDG2fGCJD24NQqoMyECbrxr5GK6tmqwnIYr2Zbgo",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.phone",
                        "encrypted": true
                    },
                    {
                        "name": "name",
                        "required": true,
                        "value": "U2FsdGVkX1+ZWBc6JQ/TsqUm5IiYCsUQUwte8vPEr1U=",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.name",
                        "encrypted": true
                    },
                    {
                        "name": "surnames",
                        "required": true,
                        "value": "U2FsdGVkX1/DBX7O0tHmIDIdhHAJtGIoIvJQOTkOSo4=",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.surname",
                        "encrypted": true
                    },
                    {
                        "name": "health_id",
                        "required": true,
                        "value": "U2FsdGVkX1+cvIapBYfhqOTbqjI+g8v955tinp3PuWU=",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.health_id",
                        "encrypted": true
                    }
                ]
            },
            {
                "uuid": "7492d82c-1c88-40a2-8b2b-a92bbdbf5177",
                "personalData": [
                    {
                        "name": "email",
                        "required": true,
                        "value": "U2FsdGVkX181gEbdL3BN/2GIK+JmSCWB9HH0KZ+Zpgg=",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.email",
                        "encrypted": true
                    },
                    {
                        "name": "phone",
                        "required": true,
                        "value": "U2FsdGVkX1/pi+IkFioOXLaLoDOoLbfhyiwRYSuFgugjQ7BDBMypWqWsgQX9x483",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.phone",
                        "encrypted": true
                    },
                    {
                        "name": "name",
                        "required": true,
                        "value": "U2FsdGVkX1+BuBsIK47T79nDvZUkpz8SKpB3Hjyw1Hg=",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.name",
                        "encrypted": true
                    },
                    {
                        "name": "surnames",
                        "required": true,
                        "value": "U2FsdGVkX1/fGfKhwnnvBnDbjah/mPlNIUv6hz01iUM=",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.surname",
                        "encrypted": true
                    },
                    {
                        "name": "health_id",
                        "required": true,
                        "value": "U2FsdGVkX1+0LY/HJCD/C34y2ZGCmM9piJXzBbiF7Rw=",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.health_id",
                        "encrypted": true
                    }
                ]
            },
            {
                "uuid": "cf7ee1fb-c0da-4929-84ee-60d082f0a0a8",
                "personalData": [
                    {
                        "name": "email",
                        "required": true,
                        "value": "U2FsdGVkX18xrKMLoXEGJt9iiI6of8iAGkUch0j/2vJ4987CqgDvu3Tpm5w4WM7T",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.email",
                        "encrypted": true
                    },
                    {
                        "name": "phone",
                        "required": true,
                        "value": "U2FsdGVkX1+XYDzHIoQydadboGBjORcgbmxaTAOYLMhMxvJftPTR+fR1gsZ+/3UM",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.phone",
                        "encrypted": true
                    },
                    {
                        "name": "name",
                        "required": true,
                        "value": "U2FsdGVkX1+Lm9+1pmeZjK+tpkitrvnPHZ6hCZ5OL8s=",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.name",
                        "encrypted": true
                    },
                    {
                        "name": "surnames",
                        "required": true,
                        "value": "U2FsdGVkX1/PGGkhZ/v8tDrGJce55FIXezMEF5FUrII=",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.surname",
                        "encrypted": true
                    },
                    {
                        "name": "health_id",
                        "required": true,
                        "value": "U2FsdGVkX1+F0GLtDFm0T8r4RxyCJWdFsWw4AuZQ6U0=",
                        "type": "text",
                        "label": "investigation.create.personal_data.fields.health_id",
                        "encrypted": true
                    }
                ]
            }
        ],
        "status": 1,
        "createdAt": "2021-03-09T20:20:37.000Z",
        "updatedAt": "2021-03-09T20:20:37.000Z",
        "sharedResearchers": [
            {
                "email": "rodriguezcruzpm@gmail.com",
                "permission": 2,
                "name": "Pedro",
                "surnames": "Rodriguez",
                "status": 2
            },
            {
                "email": "guillermo.suarez.tangil@gmail.com",
                "permission": 0,
                "name": "Guillermo",
                "surnames": "Suarez-Tangil",
                "status": 2
            },
            {
                "email": "david@sherwood.science",
                "permission": 1,
                "name": "David",
                "surnames": "sherwood",
                "status": 1
            }
        ]
    }
}

export const fake_submissions_reducer = {
    "3f8883b2-ce4a-47bf-ba66-e8273670fe82" : //UUID Survey
        submissions_survey.submissions
    
}

export const patients_personal_data_decryptedCypress = () => {
    return [
        {
            "email":"john@hopkins.com",
            "phone":"+1 727 1728 9191",
            "name":"John",
            "surnames":"Hopkins",
            "health_id" : "11222"
        },
        {
            "email":"peter@gmail.com",
            "phone":"+49 127 1728 9191",
            "name":"Peter",
            "surnames":"Petrelli",
            "health_id" : "3333"
        },
        {
            "email":"donnie@gmail.com",
            "phone":"+1 1997 1728 9191",
            "name":"Donald",
            "surnames":"Trump",
            "health_id" : "66666"
        }
    ];
}

export const patient_hospital_personal_data_decryptedCypress = () => {
    return [
        {
            "birthdate":"01/01/1974",
            "phone":"+1 727 1728 9191",
            "name":"John",
            "surnames":"Hopkins",
            "national_id" : "11222",
            "sex" : "male"
        },
        {
            "birthdate":"01/01/1974",
            "phone":"+1 727 1728 9191",
            "name":"Peter",
            "surnames":"Petrelli",
            "national_id" : "010101",
            "sex" : "male"
        },
        {
            "birthdate":"01/01/1974",
            "phone":"+1 727 1728 9191",
            "name":"Donald",
            "surnames":"Trump",
            "national_id" : "3333",
            "sex" : "female"
        },
    ];
}

export const patients_personal_data_decrypted = () => {
    return [
        {
            "uuid": "801952ca-66da-4410-8583-3faa6f460e03",
            "id" : 65,
            "personalData": 
                {
                    "email" : "peter@petrelli.com",
                    "phone" : "+34 7471771721",
                    "name" : "Peter",
                    "surnames" : "Petrelli Jimenez",
                    "birthdate" : "1987/08/21",
                    "sex" : "male",
                    "insurance" : 1
                },
            "dateCreated" : "2022-09-28T10:29:17.276Z",
            
        },{
            "id" : 68,
            "uuid":"dc4515d1-0555-4734-a6a4-5e4fbc27c6a4",
            "personalData": 
                {
                    "email" : "donnie@gmail.com",
                    "phone" : "+1 61791 91892983",
                    "name" : "Donald",
                    "surnames" : "Trump Cruz",
                    "birthdate" : "1947/01/11",
                    "sex" : "female"
                },
            "dateCreated" : "2022-09-28T10:29:17.276Z",
        },
        {
            "id" : 67,
            "uuid" : "e3ed69b5-d423-4dcf-9cfb-96c24f7a8df6",
            "personalData": 
            {
                "email" : "jessie@hotmail.com",
                "phone" : "+32 91 9192 9192",
                "name" : "Jessie",
                "surnames" : "Jones",
                "birthdate" : "1976/03/09"
            },
            "dateCreated" : "2022-09-28T10:29:17.276Z",
        }
    ]
}

export const patients_personal_data_encripted = () => {
    return [
        {
            "uuid": "801952ca-66da-4410-8583-3faa6f460e03",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX1+pbHGjn1me1m8V1iBnqVK3bNCF3ZoC/XzgyvXjbfDCSSF198uuXgpe",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX18QybmdTZvGg6AzFX7SC02CUPYKiXgZX0i+sVm2VrEEVenL2pd4wuX6",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX1/tscdtFMXNod0rqx4kCKAvh3T+QBDyT84=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX18mAqlNzNtX9NRIHxM8K9r9iSYtUuWs7aM=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX1+F04TBpnsApjmsZ6PKe+/gOGy0VAvHh2w=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "e3ed69b5-d423-4dcf-9cfb-96c24f7a8df6",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX19gFetk0iAi/FWRfsBOMN+wg3gvYID+g6I=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX18gGlatoLGqCB59hzTEovZ0EQ+JcyFXEs+GKfZlZLm2N4Q8LnzCh/b8",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX1/wLZ1KO9GhRJ7PpcjTSF5d1DsGlbJKWeo=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX1+0S0i9OzaXdSTSSCWcS4B5KutqziIGv0g=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX19vnDPrg+LofrYmcekijXpDthbagJKmg8c=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "4e58bc59-2566-482c-9cfa-c3ae915c9d8f",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX1/UvlFnihZgkrvCUGeXUm5PYfbuZVWZ0Qo=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX1/I7w1i3hzu9BPYKvfThisC3PRtacxMWD/8jk/RZNWdSCJZ1a2+rPNM",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX184q+mR9ybfJ6uqprjJU3ug80OeG0dw+GM=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX1+h55QvtI4w7du8Aas1u9ItwVDC6haD7us=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX19AWhvCJfJyhhLkfUXP5KZx7lxaTtqFex8=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "eca2c07e-71d5-4bb6-9c24-48ee4ce4fb36",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX1+sIniXqNmX9xYcx+mYbXCjgslB4nVm+1M=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX1/VIys5XDGkq87xZeu4po6WY3ma18DeNDG5i7sv4GrFNHK5wa7BGiRT",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX1+zzOFMXyqxXp9dCsUDo851t5Ei8A5hQ4M=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX18PQuA3fgYoR8tLJMBp1VqJuchi4krPwqA=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX18huY5yy+a1NrymDiigyRsjhMWwD5pWwis=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "0ac15620-6087-4abc-8bd3-70ffafb1d1f1",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX19Wft2RuWiDVmoEqrydMLWKSxon8z0jOfJcZAJAawF1tF7eN5cfakx3",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX1/wWCcg4+EhjFpZgfboTOdtFL5P44Tv8OAuTGq34pVwtQMOGlQ//Mmq",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX19iE5NP6fIBdI6sBjiIoFT1KL17Dl6pKF4=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX198Yncw4Aqi/V74tzxA+Lo+n93EHaSnK58=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX18te4a+ZcHX7r5eoaeBFbrWcaGb2HE62LY=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "25fb657b-e1ad-4381-b77e-8ce9a273bc6a",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX1/fBR4f82fn51HApU7r2tkrUrY4RaiU2IsnmFm5MOF+HuWbMwKpOy0w",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX19vRhBU/AcjIh16Cmv65gLos8uUn3I4mR8=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX195JeY1Eg2EMbkBA361KFcicdaDE+Z95pqGKoKz2e7OJ1Z1g/NXhWPu",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX19BkYTY7JgJ2a5WGsARIqvkmfRwdn5m7O4=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX18YuWVf0vGGmY+D7N4PgJ0/hQtdtGyaXSU=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "7554bfa2-629c-4666-9eac-fe7122840082",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX1/jA4acFjlPg/eHR8IUDU7z2PwJf1Lxc90R0VUijo2YkNaLocyBwQwY",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX18g3X8FDlGqry6U+uzCO1WK95tMVu66rts=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX1/tITUb/7RBF6NqlyKgEi/pGslmUWZZXA4=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX1+Zl+MItefTOuItSJGBTQk0UPT3B0OswyU=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX1/bePwXQgzo0CCI+P4JcF2dHqyhUQhCU80=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "a079d1bc-bcec-438d-86be-581f2c6d957b",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX19w31hRr6ujGxw6oMaZ5o+nhrYgTtr/YGX2pSY4anrEJOZDL7HWgflS",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX19QF61qEgbR77v2naN1aAWf49WHhflWcQ8=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX18quUyYHmsZ1DatWFO/8iRpINaBKjGbofQ=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX18s6elerOX7QtjYriAYaqLljHjFNDrLhKA=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX18Gx/gJsiKop0T0hB7FcFElBE9soZ3mGWg=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "4c4e1eee-77f1-4cbe-89e7-3a90429a8f71",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX1/AXiRRdVajkLAMEJi/fQEsONJiNh/cgnPpvPKDpdw8WKDDx0EUlTu1",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX18rPNfuzHv8SJ4nePYYboectmBYC7BJqQo=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX18BJOZFFLvE6rfwuPadxyTh/CsHgn/rFGo=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX1/kuCwuBhWZwJkuqzPwSuoD/c0DHfJFpu0=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX189a9e3M/5mi2qS2QrrddCTijYiMfjPisA=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "f922c1f5-0906-4609-9792-7d97030a1da8",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX1+1c/UGKPOCMFUFGGRbwRK8WzWJY/DzP9RAT4Vakng/d2uJNhGolckj",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX19TX2aAeYVqTJtDHmiB+lnR7g7Y099OG50=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX1/6aRTn57ZrQIjnbkUa1USH9+/JrGXKxqc=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX19ml5vQU+5lXpKXAw9ySwZNgMM8u7zazMo=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX1/x5f2XBOrIMTlnYAco5NW3AMkgcENt7Js=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "47756992-00bf-4b83-a076-2f247433607f",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX1+aXYiaL0pfLBpl5tF9/ZbM8IWwfJwaELMmsgdngfcq7bAb6L76nbO1",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX18pfdgx5OjLYcN5PDlxpMXww1LjGn5sDCw=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX1/ymbbn19PPsWrVAMrNJS5uDTpt/aPXfek=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX19af8dXHB/6ZxTGgniig8kGre5DQBOWDXk=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX1/qYypjuFQe1dhLTsaj4FBO7J5uUEvlQCI=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "521ecc09-ee86-4777-b0a6-2c9451cd3a5e",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX1++fMu38m4S/jVI3Q+6T7RXLPTeM/XX+jU4J6L6gI/TbpsxR1qoaP5S",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX185TWW078ZY5JmoSDRABdlJwCLi31fzJJE=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX18p0jyZ9X/CnEf8IaAwYT8yQudMG7o3csc=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX18kG66Edm0qTnd5MYd7fwJkcY2rvozcKok=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX19eETs4qsaZIdRRtXZPJEq8KHn74Fz2E3g=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        },
        {
            "uuid": "a83a8d32-412d-48fe-8bfb-92b53780e510",
            "personalData": [
                {
                    "name": "email",
                    "required": true,
                    "value": "U2FsdGVkX18gJ5XQQARbazM/RQnrmMMsbWfWLqwPAkxQJOeiAxvX35rp6lnKSoQg",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.email",
                    "encrypted": true
                },
                {
                    "name": "phone",
                    "required": true,
                    "value": "U2FsdGVkX1+SxUOLm7yrLFsXrU/rMOOg1OgvwE352Kg=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.phone",
                    "encrypted": true
                },
                {
                    "name": "name",
                    "required": true,
                    "value": "U2FsdGVkX1+103yS1cnMx/sTyXGZYq+TWuiBRtI07y4=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.name",
                    "encrypted": true
                },
                {
                    "name": "surnames",
                    "required": true,
                    "value": "U2FsdGVkX1/4QeYE7ZzLW/UwYIkq6lyR84cIrMRYRBA=",
                    "type": "text",
                    "label": "investigation.create.personal_data.fields.surname",
                    "encrypted": true
                },
                {
                    "name": "birthdate",
                    "required": true,
                    "value": "U2FsdGVkX19WqHyvz6M7Htex7On7Vm/3tO3JRtw8k2U=",
                    "type": "date",
                    "label": "investigation.create.personal_data.fields.birthdate",
                    "encrypted": true
                }
            ]
        }
    ]
}

export const patient_personal_data_default_key = 
    [
        {
            "id": "5fe218b524b4213823c82e8d",
            "keyPatInv":"U2FsdGVkX1+07NL4AUPG3yImEoRbslQP55u2EpKFZHtF1Ork/gArz2UWFdD2qzLVt6jWFQN0QRaFh/U5Z8rJhg==",
            "keyPatientResearcher": "U2FsdGVkX1+iETooKf8Oa0U/hRQAIUf/l0Z/gPkMzs1RczPxkcQFCUuvMGf//1C2sNzbInfg75ZYsJUvFNHTqA==",
            "personalData":{
                "email":"U2FsdGVkX18JWuhek4AgMTMCkrWZWOQbSJRqyeC0RB2DkX1FFephUBvEib0/ZjwG",
                "phone":"U2FsdGVkX18JmEbvvSQtJFIAnuvuYp2b3pvD5XShscY=",
                "name":"U2FsdGVkX1/RETEMpFHDNWzLo6WgJ9JRBzmR3PMZtnt0qWe0rR1KBSJIrvDHUKmj",
                "surname":"U2FsdGVkX18PJ+XuhkWZGfUXtRO99CBmmlYkYD/+t+k="
            },
            "encryptedKeyUsed" : 0
        },
        {
            
            "id": "5fe218c024b4213823c82e8e",
            "keyPatInv": "U2FsdGVkX19eZ1fehZD6sJn0C/rtKVMx2zTSt3WV8cZLVIoKzelAU1h5SCRCGTQTZXJMxGyV1tzd2HATakUVsA==",
            "keyPatientResearcher": "U2FsdGVkX1/ydqShpZnd52XLpB+sTX2HT5FDUuvQORxIg1kizBGMQNDRz/r2FCuet1yjldghH2ndNXPjdBJLqg==",
            "personalData": {
                "email": "U2FsdGVkX1/6h/bqcYAH+5gYGIOG5D12rT0WhlAxkn5sK0mDLi5A2+WhJeTTeryA",
                "phone": "U2FsdGVkX1+2RzhJr/EqHHpUAY59pdVd04tFhDUjITM=",
                "name": "U2FsdGVkX19AG8ZaX1DrxDK6Qt9kHxg3JLgKgWh8bPI=",
                "surname": "U2FsdGVkX1+ZjiX9v8rg3R3S98fPUaSgTtcpW7Ul1Fg="
            },
            "encryptedKeyUsed" : 0
        },
        {
            "id": "5fccaee78583362dd3d50248",
            "keyPatInv": "U2FsdGVkX1/mPlvgZCwnYhxCWYW0j0UfCEGOmvh3mxU3OyFZtnZNudXiqNWijIydHNKrvtaZ2hTc5lwaw6NN3w==",
            "keyPatientResearcher": "U2FsdGVkX1/Xs+2ASB8w79fZ6+QGwcCU+uodPKppWHRN+C1bgBiYx/49YISFKCAL5X0nit1CtPJnTIw4ljCK1Q==",
            "personalData": {
                "email": "U2FsdGVkX1/M175udN7Bp5uI6hI/HCNrglC4RrvQoQpBQgLw7QFZrjnKv0UO66Ce",
                "phone": "U2FsdGVkX1/Ob4rrFmVAxynGaJFxvwADsAvyBjADnWk=",
                "name": "U2FsdGVkX1+mWpHIcy7u9KXHLND/1NDziIwoCqI72b0=",
                "surname": "U2FsdGVkX1/Zz6rs03SB3UkHfweYxQlAXxAjzh/oiKE="
            },
            "encryptedKeyUsed" : 0
        }
    ]

export const researchers_to_share = [
    {
        "email" : "rodriguezcruzpm@gmail.com",
        "permission" : "2",
        "permissionTextValue" : "Add Medical and personal data"
    },
    {
        "email" : "guillermo.suarez.tangil@gmail.com",
        "permission" : "0",
        "permissionTextValue" : "Read Only Medical data"
    },
    {
        "email" : "david@sherwood.science",
        "permission" : "1",
        "permissionTextValue" : "Read Medical and personal data"
    }
]

export const researcherA_data = {
    name : "David",
    surnames: "Shaikh Urbina",
    email : "dshaikhurbina@gmail.com",
    password: "Ciencia2!",
    phone: "+34647727132",
    country:"es"
}

export const researcherB_data = {
    name : "Pedro",
    surnames: "Rodriguez",
    email : "rodriguezcruzpm@gmail.com",
    password: "Cabezadesherwood2",
    phone: "+44 772 08689060",
    country:"es"
}

export const researcherC_data = {
    name : "Guillermo",
    surnames: "Suarez-Tangil",
    email : "guillermo.suarez.tangil@gmail.com",
    password: "Ciencia2!",
    phone: "+24 772 08689060",
    country:"es"
}

export const researcherD_data = {
    name : "David",
    surnames: "sherwood",
    email : "david@sherwood.science",
    password: "Ciencia2!",
    phone: "+24 772 08689060",
    country:"es"
}

export const researcherPedro_data = {
    name : "Pedro",
    surnames: "Rodriguez",
    email : "pedro.cruz@ucl.ac.uk",
    password: "Roquetas2001?",
    phone: "+24 772 08689060",
    country:"es"
}

export const loginResearcherA = {
    email : researcherA_data.email,
    password: researcherA_data.password
}

export const loginResearcherB = {
    email : researcherB_data.email,
    password: researcherB_data.password
}

export const loginResearcherC = {
    email : researcherC_data.email,
    password: researcherC_data.password
}

export const loginResearcherD = {
    email : researcherD_data.email,
    password: researcherD_data.password
}

export const loginResearcherPedro = {
    email : researcherPedro_data.email,
    password: researcherPedro_data.password
}


const sharedResearchers =  [
    {
        "email": "pedro@sherwood.science",
        "permission": 1,
        "name": null,
        "surnames": null,
        "status" : 0
    },
    {
        "email": "guille@sherwood.science",
        "permission": 2,
        "name": "Guillermo",
        "surnames": "Suarez-Tangil",
        "status" : 1
    },
    {
        "email": "sheryl@facebook.com",
        "permission": 0,
        "name": null,
        "surnames": null,
        "status" : 2
    }
]

//La forma en la que se envían los datos desde el servidor
export const investigation_server = () => {
    let returnData = {...basic_info1_raw()};
    returnData.uuid = "933d2b2a-634e-471e-af14-9ab1e6f40eda";
    returnData.surveys = edc_data1().surveys;
    returnData.personalFields = personal_data_investigation1();
    returnData.patientsPersonalData = patients_personal_data_encripted();
    returnData.status = 1;
    returnData.keyResearcherInvestigation = "U2FsdGVkX19vZ9QYZqVXUKngvq3aqfwxApSwtLB5hKMbmDXJQUwwfdt7mQMR9Wu8TxfOjwo0X3A4H7S2/WYfpw==";
    returnData.shareStatus = 2; 
    returnData.sharedResearchers = sharedResearchers;
    returnData.functionalities = ["HOSPITALIZATION"]
    return returnData;
}

export const investigation_server_no_patitents = () => {
    let returnData = {...basic_info1_raw()};
    returnData.surveys = edc_data1().surveys;
    returnData.personalFields = personal_data_investigation1();
    returnData.patientsPersonalData = [];
    returnData.status = 1;
    returnData.keyResearcherInvestigation = "U2FsdGVkX1/fHwGVOHWYFIiQwwRIOnwIWkyrQrY0qL2XvbjkD7x9lob32xaj3njsHVDUBI7HByG9Usj0i6KUFA==";
    returnData.encryptedKeyUsed =1;
    returnData.shareStatus = 2; 
    returnData.sharedResearchers = sharedResearchers;
    return returnData;
}
export const investigation_server_read_access = () => {
    let returnData = {...basic_info1_raw()};
    returnData.surveys = edc_data1().surveys;
    returnData.personalFields = personal_fields_no_access;
    returnData.patientsPersonalData = patients_personal_data_decrypted();
    returnData.shareStatus = 0;
    returnData.encryptedKeyUsed =1;
    returnData.keyResearcherInvestigation = "U2FsdGVkX1/fHwGVOHWYFIiQwwRIOnwIWkyrQrY0qL2XvbjkD7x9lob32xaj3njsHVDUBI7HByG9Usj0i6KUFA==";
    returnData.status = 1; 
    returnData.sharedResearchers = sharedResearchers;
    return returnData;
}


export const pendingInvestigations =[
    {
        "name": "COVID Nose By Tester",
        "uuid": "2f16a47c-ce00-4953-b58f-6f89eae2b257",
        "acronym": "CN",
        "type": "clin_trial",
        "institution": "Oxford University",
        "principal_researcher": "Pedro Rodriguez",
        "contact": "test@email.com",
        "reference_number_state": "2",
        "ethics_body": "12345",
        "description": "<p>Estudio sobre el impacto en la anosmia en pacientes de COVID19</p>",
        "encryptedKeyUsed" : 0,
        "keyResearcherInvestigation": "U2FsdGVkX1+5tj4/o7sGg3FaEgkgvjWBeI452pNU8Js+U8+i9xw3PmEyGZ2FpqQ0QvOYhBNwZytom+iyhUK5Og==",
        "shareStatus": 2,
        "hostResearcher" : {
            "name" : "Pedro",
            "surnames" : "Rodríguez"
        },
        "status": 1,
        "personalFields": [
            "surname",
            "name",
            "phone",
            "email"
        ],
        "createdAt": "2021-01-20T12:14:06.000Z",
        "updatedAt": "2021-01-20T12:14:06.000Z"
    },
    {
        "name": "Ictus on smoking partners",
        "uuid": "00287041-3df4-438f-b60a-e1d85dbe25b9",
        "acronym": "CN",
        "type": "clin_trial",
        "institution": "Oxford University",
        "principal_researcher": "Pedro Rodriguez",
        "contact": "test@email.com",
        "reference_number_state": "2",
        "ethics_body": "12345",
        "description": "<p>Estudio sobre el impacto en la anosmia en pacientes de COVID19</p>",
        "shareStatus": 0,
        "status": 1,
        "hostResearcher" : {
            "name" : "Pedro",
            "surnames" : "Rodríguez"
        },
        "personalFields": [
            "surnames",
            "name",
            "phone",
            "email",
            "birthdate"
        ],
        "createdAt": "2021-01-20T12:14:06.000Z",
        "updatedAt": "2021-01-20T12:14:06.000Z"
    }
]

export const investigationsShowAll =[
        {
            "name": "COVID Nose By Tester",
            "uuid": "00287041-3df4-438f-b60a-e1d85dbe25b9",
            "acronym": "CN",
            "type": "clin_trial",
            "institution": "Oxford University",
            "principal_researcher": "Pedro Rodriguez",
            "contact": "test@email.com",
            "reference_number_state": "2",
            "ethics_body": "12345",
            "description": "<p>Estudio sobre el impacto en la anosmia en pacientes de COVID19</p>",
            "keyResearcherInvestigation": "U2FsdGVkX19dc/oAgeGDtnFwJOQlN2+6QmHS2aY1Kf/gHjA7K9n+KPNM+3qOADTCM9Gy6LUimq8LsJf5IzX2lw==",
            "shareStatus": 2,
            "hostResearcher" : {
                "name" : "Pedro",
                "surnames" : "Rodríguez"
            },
            "status": 1,
            "personalFields": [
                "surname",
                "name",
                "phone",
                "email"
            ],
            "createdAt": "2021-01-20T12:14:06.000Z",
            "updatedAt": "2021-01-20T12:14:06.000Z"
        },
        {
            "name": "Ictus on smoking partners",
            "uuid": "00287041-3df4-438f-b60a-e1d85dbe25b9",
            "acronym": "CN",
            "type": "clin_trial",
            "institution": "Oxford University",
            "principal_researcher": "Pedro Rodriguez",
            "contact": "test@email.com",
            "reference_number_state": "2",
            "ethics_body": "12345",
            "description": "<p>Estudio sobre el impacto en la anosmia en pacientes de COVID19</p>",
            "shareStatus": 0,
            "status": 1,
            "hostResearcher" : {
                "name" : "Pedro",
                "surnames" : "Rodríguez"
            },
            "personalFields": [
                "surname",
                "name",
                "phone",
                "email"
            ],
            "createdAt": "2021-01-20T12:14:06.000Z",
            "updatedAt": "2021-01-20T12:14:06.000Z"
        }
    ]
export const listPatientsHospitalWard = [
    {
        id:"602fe2cbb5eb350f91235331",
        number:"1",
        floor:"1º Planta",
        dateIn:"2021/02/01",
        dateOut:null,
        
        personalData:{
            name:"Peter",
            surnames:"Petrelli",
            birthdate:"1976/07/31",
            sex:"male",
        }
    },
    {
        id:null,
        number:"2",
        floor:"1º Planta",
        dateIn:null,
        dateOut:null
    },
    {
        id:"60239b05562f88134f30a26c",
        number:"3",
        floor:"1º Planta",
        dateIn:"21/02/2021",
        dateOut:null,
        
        patient:{
            name:"John",
            surnames:"Travolta",
            birthdate:"31/07/1944",
            gender:"male",
        }
    },
    {
        id:1,
        number:"3a",
        floor:"1º Planta",
        dateIn:"11/02/2021",
        dateOut:null,
        
        patient:{
            name:"Margaret",
            surnames:"Thatcher",
            birthdate:"11/02/1946",
            gender:"female",
        }
    },
    {
        id:1,
        number:"1",
        floor:"1º Planta",
        dateIn:"21/02/2021",
        dateOut:null,
        
        patient:{
            name:"Peter",
            surnames:"Petrelli",
            birthdate:"31/07/1976",
            gender:"male",
        }
    },
    {
        id:1,
        number:"1",
        floor:"1º Planta",
        dateIn:"21/02/2021",
        dateOut:null,
        patient:{
            name:"Peter",
            surnames:"Petrelli",
            birthdate:"31/07/1976",
            gender:"male",
        }
    },
    {
        id:1,
        number:"1",
        floor:"1º Planta",
        dateIn:"21/02/2021",
        dateOut:null,
        patient:{
            name:"Peter",
            surnames:"Petrelli",
            birthdate:"31/07/1976",
            gender:"male",
        }
    }

]


export const wardInfo = {
        "id": 4,
        "uuid": "fa16edda-cb58-4a42-a0fe-4e55975b2d9b",
        "name": "Neuro Ward",
        "beds": [{
            "id": 45,
            "name": "1",
            "active": false,
            "stays": [],
            "gender": 0,
            "order": 0
        }, {
            "id": 46,
            "name": "2",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 1
        }, {
            "id": 47,
            "name": "3",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 2
        }, {
            "id": 66,
            "name": "24",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 23
        }, {
            "id": 57,
            "name": "15",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 14
        }, {
            "id": 64,
            "name": "22",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 21
        }, {
            "id": 56,
            "name": "14",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 13
        }, {
            "id": 65,
            "name": "23",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 22
        }, {
            "id": 52,
            "name": "8",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 7
        }, {
            "id": 55,
            "name": "13",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 12
        }, {
            "id": 48,
            "name": "4",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 3
        }, {
            "id": 62,
            "name": "20",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 19
        }, {
            "id": 50,
            "name": "6",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 5
        }, {
            "id": 51,
            "name": "7",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 6
        }, {
            "id": 59,
            "name": "17",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 16
        }, {
            "id": 54,
            "name": "10",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 9
        }, {
            "id": 53,
            "name": "9",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 8
        }, {
            "id": 44,
            "name": "12",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 11
        }, {
            "id": 58,
            "name": "16",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 15
        }, {
            "id": 49,
            "name": "5",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 4
        }, {
            "id": 60,
            "name": "18",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 17
        }, {
            "id": 43,
            "name": "11",
            "active": true,
            "stays": [],
            "gender": 0,
            "order": 10
        }, {
            "id": 61,
            "name": "19",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 18
        }, {
            "id": 63,
            "name": "21",
            "active": true,
            "stays": [],
            "gender": 1,
            "order": 20
        }]
}


export const departmentsInfo = [
        {
            "name" : "Neurologia",
            "wards" : [wardInfo], 
        },
        {
            "name" : "Cardiología",
            "wards" : [wardInfo]
        }
    ]

export const hospital = {
    "departments":departmentsInfo,
    "researchers": [
        {
            "name": "David",
            "uuid": "ca78d9df-625f-4c1a-9aae-551f06268f41",
            "surnames": "Shaikh",
            "status": 2,
            "email": "dshaikhurbina@gmail.com",
            "permissions": [],
            "departments": []
        },
        {
            "name": "Pedro ",
            "uuid": "9c6dd74a-2362-4a30-b826-10330f250c07",
            "surnames": "Rodriguez Cruz",
            "status": 2,
            "email": "pedro.cruz@ucl.ac.uk",
            "permissions": [
                "SHARE_RESEARCHERS",
                "EDIT_INVESTIGATION",
                "EDIT_SUBMISSIONS",
                "BUSINESS_READ",
                "PERSONAL_ACCESS",
                "MEDICAL_WRITE",
                "MEDICAL_READ"
            ],
            "departments": []
        },
        {
            "name": "Cristina",
            "uuid": "7557d857-7836-413f-bcf6-06bce5977d5f",
            "surnames": "Fernández Hoyos",
            "status": 2,
            "email": "cristinafernandezhoyos@gmail.com",
            "permissions": [
                "SHARE_RESEARCHERS",
                "BUSINESS_READ",
                "PERSONAL_ACCESS",
                "MEDICAL_READ",
                "MEDICAL_WRITE"
            ],
            "departments": []
        },
        {
            "name": "Dénis",
            "uuid": "954d1c74-8ea3-4c6e-8ce8-c1e8f885bc7d",
            "surnames": "Sagara",
            "status": 2,
            "email": "akonisagara@gmail.com",
            "permissions": [
                "PERSONAL_ACCESS",
                "MEDICAL_READ",
                "MEDICAL_WRITE"
            ],
            "departments": []
        },
        {
            "name": "María del Mae",
            "uuid": "6cae761b-e46c-449b-a9bd-e4d10c3e6567",
            "surnames": "Rodriguez Carrasco",
            "status": 2,
            "email": "arimar_vera@hotmail.com",
            "permissions": [
                "SHARE_RESEARCHERS",
                "BUSINESS_READ",
                "PERSONAL_ACCESS",
                "MEDICAL_READ",
                "MEDICAL_WRITE"
            ],
            "departments": []
        }
    ]
}

export const listDecryptedPatients = [
    {
        "uuid": "8af62a69-4532-4293-b470-f23424e180e8",
        "id": 930,
        "dateCreated" : "2020/10/13",
        personalData: {
            "name" : "Peter",
            "surnames" : "Petrelli",
            "birthdate" : "2022/05/03",
            "sex" : "male"
        }
    },
    {
        "id": 969,
        "uuid": "4f371709-7976-44bd-b1ae-484576a57a1c",
        "dateCreated" : "2021/11/09",
        personalData: {
            "name" : "Conan",
            "surnames" : "O'brian",
            "birthdate" : "1958/05/03",
            "sex" : "male"
        }
    }
]

export const billsExample = [{
        "id": 57,
        "uuid": "02545aee-c08f-434c-a124-b19609edd031",
        "type": DocumentType.INVOICE,
        "status": DocumentStatus.DRAFT,
        "billItems": [
            {
                "id": 3627,
                "concept": "test reduction",
                "quantity": 1,
                "type": 1,
                "amount": 10000,
                "updatedAt" : "2023-09-22T09:30:51.899Z",
                "paid" : null,
                "used" : null
            },
            {
                "id": 3628,
                "concept": "test reduction %",
                "quantity": 1,
                "type": 2,
                "amount": 10,
                "updatedAt" : "2023-09-22T09:30:51.899Z",
                "paid" : null,
                "used" : null
            },
            {
                "id": 3625,
                "concept": "AMOS",
                "quantity": 1,
                "type": 3,
                "amount": 90000,
                "paid" : "2023-09-22T09:30:51.899Z",
                "used" : null,
                "updatedAt" : "2023-09-22T09:30:51.899Z"
            },
            {
                "id": 3626,
                "concept": "Anesthésie générale",
                "quantity": 1,
                "type": 3,
                "amount": 75000,
                "updatedAt" : "2023-09-22T09:30:51.899Z",
                "paid" : null,
                "used" : null
            },
            {
                "id": 3627,
                "concept": "Insurance letter",
                "quantity": 1,
                "type": TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO,
                "amount": 75000,
                "updatedAt" : "2023-09-22T09:30:51.899Z",
                "paid" : null,
                "used" : null
            }
        ],
        "uuidPrescribingDoctor" : "1e7111be-27bc-402a-9281-2c05a2ce17d4",
        "uuidDepartment" : "1c655e29-100e-4fce-ad9f-5eb63d495338",
        "total": 65000,
        "totalPaid": 165000,
        "uuidPatient": "801952ca-66da-4410-8583-3faa6f460e03",
        "createdAt": "2023-09-22T16:13:07.311Z",
    },
    {
        "id": 56,
        "uuid": "08eabdd3-8da9-428d-8a5e-5136fae4dc77",
        "type": 2,
        "status": 1,
        "billItems": [
            {
                "id": 3624,
                "concept": "Endobutton + vis d'interférence",
                "quantity": 1,
                "type": 3,
                "amount": 325000,
                "paid": "2023-09-22T10:30:51.855Z",
                "used": null,
                "createdAt": "2023-09-11T14:37:18.842Z",
                "updatedAt": "2023-09-22T09:30:51.858Z",
                "deletedAt": null,
                "additionalInfo": null
            },
            {
                "id": 3619,
                "concept": "Kit",
                "quantity": 1,
                "type": 3,
                "amount": 50000,
                "paid": "2023-09-22T10:30:51.883Z",
                "used": null,
                "createdAt": "2023-09-11T14:37:18.801Z",
                "updatedAt": "2023-09-22T09:30:51.886Z",
                "deletedAt": null,
                "additionalInfo": null
            },
            {
                "id": 3620,
                "concept": "Bloc opératoire",
                "quantity": 1,
                "type": 3,
                "amount": 50000,
                "paid": "2023-09-22T10:30:51.890Z",
                "used": null,
                "createdAt": "2023-09-11T14:37:18.807Z",
                "updatedAt": "2023-09-22T09:30:51.892Z",
                "deletedAt": null,
                "additionalInfo": null
            },
            {
                "id": 3622,
                "concept": "Forfait soins locaux",
                "quantity": 1,
                "type": 3,
                "amount": 28000,
                "paid": "2023-09-22T10:30:51.870Z",
                "used": null,
                "createdAt": "2023-09-11T14:37:18.830Z",
                "updatedAt": "2023-09-22T09:30:51.872Z",
                "deletedAt": null,
                "additionalInfo": null
            },
            {
                "id": 3618,
                "concept": "VPA",
                "quantity": 1,
                "type": 3,
                "amount": 10000,
                "paid": "2023-09-22T10:30:51.897Z",
                "used": "2023-09-19T17:09:48.708Z",
                "createdAt": "2023-09-11T14:37:18.796Z",
                "updatedAt": "2023-09-22T09:30:51.899Z",
                "deletedAt": null,
                "additionalInfo": null
            },
            {
                "id": 3617,
                "concept": "Anesthésie générale",
                "quantity": 1,
                "type": 3,
                "amount": 75000,
                "paid": "2023-09-22T10:30:51.833Z",
                "used": null,
                "createdAt": "2023-09-11T14:37:18.772Z",
                "updatedAt": "2023-09-22T09:30:51.837Z",
                "deletedAt": null,
                "additionalInfo": null
            },
            {
                "id": 3623,
                "concept": "DIDT / Ligamentoplastie",
                "quantity": 1,
                "type": 3,
                "amount": 150000,
                "paid": "2023-09-22T10:30:51.863Z",
                "used": null,
                "createdAt": "2023-09-11T14:37:18.836Z",
                "updatedAt": "2023-09-22T09:30:51.865Z",
                "deletedAt": null,
                "additionalInfo": null
            },
            {
                "id": 3621,
                "concept": "Forfait bilan",
                "quantity": 1,
                "type": 3,
                "amount": 30000,
                "paid": "2023-09-22T10:30:51.877Z",
                "used": null,
                "createdAt": "2023-09-11T14:37:18.813Z",
                "updatedAt": "2023-09-22T09:30:51.879Z",
                "deletedAt": null,
                "additionalInfo": null
            }
        ],
        "total": 718000,
        "totalPaid": 718000,
        "createdAt": "2023-09-11T14:37:18.864Z",
        "updatedAt": "2023-09-22T09:30:51.912Z",
        "uuidPatient": "dc4515d1-0555-4734-a6a4-5e4fbc27c6a4"
    },
    {
        "id" : 58,
        "uuid": "02545aee-c08f-434c-a124-b19609edd031",
        "type": DocumentType.BUDGET,
        "status": DocumentStatus.DRAFT,
        "billItems": [
            {
                "id": 3627,
                "concept": "test reduction",
                "quantity": 1,
                "type": 1,
                "amount": 100000,
                "updatedAt": "2023-09-22T09:30:51.879Z",
            },
            {
                "id": 3628,
                "concept": "test reduction &",
                "quantity": 1,
                "type": 2,
                "amount": 100000,
                "updatedAt": "2023-09-22T09:30:51.879Z",
            },
            {
                "id": 3625,
                "concept": "AMOS",
                "quantity": 1,
                "type": 3,
                "amount": 90000,
                "updatedAt": "2023-09-22T09:30:51.879Z",
            },
            {
                "id": 3626,
                "concept": "Anesthésie générale",
                "quantity": 1,
                "type": 3,
                "amount": 75000,
                "updatedAt": "2023-09-22T09:30:51.879Z",
            }
        ],
        "total": 95000,
        "totalPaid": 165000,
        "uuidPatient": "e3ed69b5-d423-4dcf-9cfb-96c24f7a8df6",
        "createdAt": "2023-09-22T16:13:07.311Z",
    },{
        "id" : 59,
        "uuid": "02545aee-c08f-434c-a124-b19609edd031",
        "type": DocumentType.SUMMARY,
        "status": DocumentStatus.CLOSED,
        "billItems": [
            {
                "id": 3627,
                "concept": "test reduction",
                "quantity": 1,
                "type": 1,
                "amount": 100000,
                "updatedAt": "2023-09-22T09:30:51.879Z",
            },
            {
                "id": 3625,
                "concept": "AMOS",
                "quantity": 1,
                "type": 3,
                "amount": 90000,
                "updatedAt": "2023-09-22T09:30:51.879Z",
            },
            {
                "id": 3626,
                "concept": "Anesthésie générale",
                "quantity": 1,
                "type": 3,
                "amount": 75000,
                "updatedAt": "2023-09-22T09:30:51.879Z",
            }
        ],
        "total": 65000,
        "totalPaid": 165000,
        "uuidPatient": "801952ca-66da-4410-8583-3faa6f460e03",
        "createdAt": "2023-09-22T16:13:07.311Z",
    }
]

export const billables = [
    {
        "id": 1,
        "concept": "Primera consulta Dr. Rodriguez",
        "type" : 0,
        "amount": 100,
    },
    {
        "id": 2,
        "concept": "Primera consulta Dr. Jimenez",   
        "type" : 0,
        "amount": 90
    },
    {
        "id": 3,
        "concept": "Consulta seguimiento Dr. Rodriguez",
        "type" : 0,
        "amount": 70
    },
    {
        "id": 4,
        "concept": "Consulta seguimiento Dr. Jimenez",
        "type" : 0,
        "amount": 80
    },
    {
        "id": 5,
        "concept": "Cirugía maxiolofacial",
        "type" : 0,
        "amount": 100,
        "relatedBillables" : [6]
    },
    {
        "id": 6,
        "concept": "Anestesia",
        "type" : 0,
        "amount": 10,
        "relatedBillables" : []
    },
]

export const BillingInfo = {
    id:1,
    uuid:"02545aee-c08f-434c-a124-b19609edd031",
    address : "Calle de la Ciencia 2",
    hospitalName:"Hospital de la Ciencia",
    phone:"123456789",
    email: "example@test.com",
    currency : "CFA",
    logoBlob: "data:image/png;base64,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1Rwnjd2ZdLQ0dv/RehIgARIgARIgARIgARIgARIgARIggRARoKMlRJ1BU0iABEiABEiABEiABEiABEiABEiABBqbAB0tjd1/tJ4ESIAESIAESIAESIAESIAESIAESCBEBOhoCVFn0BQSIAESIAESIAESIAESIAESIAESIIHGJkBHS2P3H60nARIgARIgARIgARIgARIgARIgARIIEQE6WkLUGTSFBEiABEiABEiABEiABEiABEiABEigsQnQ0dLY/UfrSYAESIAESIAESIAESIAESIAESIAEQkSAjpYQdQZNIQESIAESIAESIAESIAESIAESIAESaGwCdLQ0dv/RehIgARIgARIgARIgARIgARIgARIggRARoKMlRJ1BU0iABEiABEiABEiABEiABEiABEiABBqbAB0tjd1/tJ4ESIAESIAESIAESIAESIAESIAESCBEBOhoCVFn0BQSIAESIAESIAESIAESIAESIAESIIHGJkBHS2P3H60nARIgARIgARIgARIgARIgARIgARIIEQE6WkLUGTSFBEiABEiABEiABEiABEiABEiABEigsQnQ0dLY/UfrSYAESIAESIAESIAESIAESIAESIAEQkSAjpYQdQZNIQESIAESIAESIAESIAESIAESIAESaGwCdLQ0dv/RehIgARIgARIgARIgARIgARIgARIggRARoKMlRJ1BU0iABEiABEiABEiABEiABEiABEiABBqbAB0tjd1/tJ4ESIAESIAESIAESIAESIAESIAESCBEBOhoCVFn0BQSIAESIAESIAESIAESIAESIAESIIHGJkBHS2P3H60nARIgARIgARIgARIgARIgARIgARIIEQE6WkLUGTSFBEiABEiABEiABEiABEiABEiABEigsQnQ0dLY/UfrSYAESIAESIAESIAESIAESIAESIAEQkSAjpYQdQZNIQESIAESIAESIAESIAESIAESIAESaGwCdLQ0dv/RehIgARIgARIgARIgARIgARIgARIggRARoKMlRJ1BU0iABEiABEiABEiABEiABEiABEiABBqbAB0tjd1/tJ4ESIAESIAESIAESIAESIAESIAESCBEBOhoCVFn0BQSIAESIAESIAESIAESIAESIAESIIHGJkBHS2P3H60nARIgARIgARIgARIgARIgARIgARIIEQE6WkLUGTSFBEiABEiABEiABEiABEiABEiABEigsQnQ0dLY/UfrSYAESIAESIAESIAESIAESIAESIAEQkSAjpYQdQZNIQESIAESIAESIAESIAESIAESIAESaGwCdLQ0dv/RehIgARIgARIgARIgARIgARIgARIggRARoKMlRJ1BU0iABEiABEiABEiABEiABEiABEiABBqbAB0tjd1/tJ4ESIAESIAESIAESIAESIAESIAESCBEBOhoCVFn0BQSIAESIAESIAESIAESIAESIAESIIHGJkBHS2P3H60nARIgARIgARIgARIgARIgARIgARIIEQE6WkLUGTSFBEiABEiABEiABEiABEiABEiABEigsQnQ0dLY/UfrSYAESIAESIAESIAESIAESIAESIAEQkSAjpYQdQZNIQESIAESIAESIAESIAESIAESIAESaGwCdLQ0dv/RehIgARIgARIgARIgARIgARIgARIggRARoKMlRJ1BU0iABEiABEiABEiABEiABEiABEiABBqbAB0tjd1/tJ4ESIAESIAESIAESIAESIAESIAESCBEBOhoCVFn0BQSIAESIAESIAESIAESIAESIAESIIHGJkBHS2P3H60nARIgARIgARIgARIgARIgARIgARIIEQE6WkLUGTSFBEiABEiABEiABEiABEiABEiABEigsQnQ0dLY/UfrSYAESIAESIAESIAESIAESIAESIAEQkSAjpYQdQZNIQESIAESIAESIAESIAESIAESIAESaGwCdLQ0dv/RehIgARIgARIgARIgARIgARIgARIggRARoKMlRJ1BU0iABEiABEiABEiABEiABEiABEiABBqbAB0tjd1/tJ4ESIAESIAESIAESIAESIAESIAESCBEBOhoCVFn0BQSIAESIAESIAESIAESIAESIAESIIHGJkBHS2P3H60nARIgARIgARIgARIgARIgARIgARIIEQE6WkLUGTSFBEiABEiABEiABEiABEiABEiABEigsQnQ0dLY/UfrSYAESIAESIAESIAESIAESIAESIAEQkSAjpYQdQZNIQESIAESIAESIAESIAESIAESIAESaGwCdLQ0dv/RehIgARIgARIgARIgARIgARIgARIggRARoKMlRJ1BU0iABEiABEiABEiABEiABEiABEiABBqbAB0tjd1/tJ4ESIAESIAESIAESIAESIAESIAESCBEBOhoCVFn0BQSIAESIAESIAESIAESIAESIAESIIHGJkBHS2P3H60nARIgARIgARIgARIgARIgARIgARIIEQE6WkLUGTSFBEiABEiABEiABEiABEiABEiABEigsQnQ0dLY/UfrSYAESIAESIAESIAESIAESIAESIAEQkSAjpYQdQZNIQESIAESIAESIAESIAESIAESIAESaGwCdLQ0dv/RehIgARIgARIgARIgARIgARIgARIggRARoKMlRJ1BU0iABEiABEiABEiABEiABEiABEiABBqbAB0tjd1/tJ4ESIAESIAESIAESIAESIAESIAESCBEBOhoCVFn0BQSIAESIAESIAESIAESIAESIAESIIHGJkBHS2P3H60nARIgARIgARIgARIgARIgARIgARIIEQE6WkLUGTSFBEiABEiABEiABEiABEiABEiABEigsQnQ0dLY/UfrSYAESIAESIAESIAESIAESIAESIAEQkSAjpYQdQZNIQESIAESIAESIAESIAESIAESIAESaGwCdLQ0dv/RehIgARIgARIgARIgARIgARIgARIggRARoKMlRJ1BU0iABEiABEiABEiABEiABEiABEiABBqbAB0tjd1/tJ4ESIAESIAESIAESIAESIAESIAESCBEBOhoCVFn0BQSIAESIAESIAESIAESIAESIAESIIHGJkBHS2P3H60nARIgARIgARIgARIgARIgARIgARIIEQE6WkLUGTSFBEiABEiABEiABEiABEiABEiABEigsQnQ0dLY/UfrSYAESIAESIAESIAESIAESIAESIAEQkSAjpYQdQZNIQESIAESIAESIAESGB0E1OhoJlvZHwGPna/L5TXqMju3kU2A/Twy+peOlpHRj2wFCZAACZAACZAACZBA+AnoqCh3csSWY6O2RJUqTpzd8NtNC2skYCbNLhwl6Gpptyw5NRaTZjytqjrXteJRJeNiShK2wkWlyzgRr4pewxXq7ld0c9IWOQL/xJU28/XqxkvDtXhkGxwZ2c1j60iABEiABEiABEiABEhg+AkopTS2bbDk7UtSiZNOScTGP3WgK7K2My2b8o7kMMvC3IrbCCLgYHqMXpdJli1nJ6Jy87hWZ4ptZeBg+w2a+SH23CDNNf63ja227Pn301oTqzamY899nJMPPsNYcXVx5m0m5mbjLLzEoZH/NX3p4J9UVOSktogs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AiRAAiRAAiTgmQAdLZ5RsSAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJpCZAR0tqPjxKAiRAAiRAAiRAAiRAAiRAAiRAAiRAAp4J0NHiGRULkgAJkAAJkAAJkAAJkAAJkAAJkAAJkEBqAnS0pObDoyRAAiRAAiRAAiRAAiRAAiRAAiRAAiTgmQAdLZ5RsSAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJpCZAR0tqPjxKAiRAAiRAAiRAAiRAAiRAAiRAAiRAAp4J0NHiGRULkgAJkAAJkAAJkAAJkAAJkAAJkAAJkEBqAnS0pObDoyRAAiRAAiRAAiRAAiRAAiRAAiRAAiTgmQAdLZ5RsSAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJpCZAR0tqPjxKAiRAAiRAAiRAAiRAAiRAAiRAAiRAAp4J0NHiGRULkgAJkAAJkAAJkAAJkAAJkAAJkAAJkEBqAnS0pObDoyRAAiRAAiRAAiRAAiRAAiRAAiRAAiTgmQAdLZ5RsSAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJpCZAR0tqPjxKAiRAAiRAAiRAAiRAAiRAAiRAAiRAAp4J0NHiGRULkgAJkAAJkAAJkAAJkAAJkAAJkAAJkEBqAnS0pObDoyRAAiRAAiRAAiRAAiRAAiRAAiRAAiTgmQAdLZ5RsSAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJpCZAR0tqPjxKAiRAAiRAAiRAAiRAAiRAAiRAAiRAAp4J0NHiGRULkgAJkAAJkAAJkAAJkAAJkAAJkAAJkEBqAnS0pObDoyRAAiRAAiRAAiRAAiRAAiRAAiRAAiTgmQAdLZ5RsSAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJpCZAR0tqPjxKAiRAAiRAAiRAAiRAAiRAAiRAAiRAAp4J0NHiGRULkgAJkAAJkAAJkAAJkAAJkAAJkAAJkEBqAnS0pObDoyRAAiRAAiRAAiRAAiRAAiRAAiRAAiTgmQAdLZ5RsSAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJpCZAR0tqPjxKAiRAAiRAAiRAAiRAAiRAAiRAAiRAAp4J0NHiGRULkgAJkAAJkAAJkAAJkAAJkAAJkAAJkEBqAnS0pObDoyRAAiRAAiRAAiRAAiRAAiRAAiRAAiTgmQAdLZ5RsSAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJ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"
    
}