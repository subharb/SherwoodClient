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
                    "sex" : "male"
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
                "amount": 100000,
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
                "paid" : null,
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
            }
        ],
        
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
            },
            {
                "id": 3625,
                "concept": "AMOS",
                "quantity": 1,
                "type": 3,
                "amount": 90000,
            },
            {
                "id": 3626,
                "concept": "Anesthésie générale",
                "quantity": 1,
                "type": 3,
                "amount": 75000,
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
            },
            {
                "id": 3625,
                "concept": "AMOS",
                "quantity": 1,
                "type": 3,
                "amount": 90000,
            },
            {
                "id": 3626,
                "concept": "Anesthésie générale",
                "quantity": 1,
                "type": 3,
                "amount": 75000,
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
    currency : "CFA",
    
}