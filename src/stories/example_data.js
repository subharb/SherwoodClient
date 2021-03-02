export const edc_data1 = () => {
    return {
        "surveys": [
            {
                "id": 11,
                "uuid": "67a5b78f-226b-45ef-8a43-72772127ba73",
                "name": "Demographic Questionaire",
                "isActive": true,
                "sections": [
                    {
                        "id": 15,
                        "uuid": "ef30d3f6-1436-47cd-ad5a-22321de4d3a7",
                        "name": "Demographics",
                        "repeats": false,
                        "isActive": true,
                        "fields": [
                            {
                                "id": 28,
                                "type": "text",
                                "name": "sex",
                                "encrypted": false,
                                "required": true,
                                "label": "Sex at birth",
                                "isActive": true,
                                "typeValueCypress" : "Text"
                            },
                            {
                                "id": 29,
                                "type": "text",
                                "name": "etnic",
                                "encrypted": false,
                                "required": true,
                                "label": "Etnic Origin",
                                "isActive": true,
                                "typeValueCypress" : "Text"
                            }
                        ]
                    },
                    {
                        "id": 16,
                        "uuid": "5777fe63-73d0-42f4-9a8e-3559130e5187",
                        "name": "Past medical history",
                        "repeats": false,
                        "isActive": true,
                        "fields": [
                            {
                                "id": 30,
                                "type": "text",
                                "name": "ilnesses",
                                "encrypted": false,
                                "required": true,
                                "label": "Previous Ilnesess",
                                "isActive": true,
                                "typeValueCypress" : "Text"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 12,
                "uuid": "7c16a1a9-56a9-40a3-848c-67b5a7923d26",
                "name": "Analitica",
                "isActive": true,
                "sections": [
                    {
                        "id": 17,
                        "uuid": "21cc0d3a-0149-442d-bd24-c8eaa050223f",
                        "name": "Blood Samples",
                        "repeats": true,
                        "isActive": true,
                        "fields": [
                            {
                                "id": 31,
                                "type": "text",
                                "name": "red_cells",
                                "encrypted": false,
                                "required": true,
                                "label": "Amount red cells?",
                                "isActive": true,
                                "typeValueCypress" : "Text"
                            },
                            {
                                "id": 32,
                                "type": "text",
                                "name": "leucocitos",
                                "encrypted": false,
                                "required": true,
                                "label": "Amount white cells?",
                                "isActive": true,
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
        "type":{"value" : "audit", "type" : "select", "textValue" : "Clinical Trial"},
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

export const personal_data1 = () => {
    return  [
        {
            "name": "email",
            "type": "text",
            "required": true,
            "label": "investigation.create.personal_data.fields.email",
            "encrypted": true
        },
        {
            "name": "phone",
            "type": "text",
            "required": true,
            "label": "investigation.create.personal_data.fields.phone",
            "encrypted": true
        },
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
            "name": "birthdate",
            "type": "date",
            "required": true,
            "label": "investigation.create.personal_data.fields.birthdate",
            "encrypted": true
        }
    ]
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
        "surname": "Hopkins",
        "email": "patient@sherwood.science",
        "phone": "+34 545454"
    }
}

export const summary_info1 = () => {
    return {
        "basic_info":  basic_info1_raw(),
        "status" : 1,
        "personal_data" : personal_data1(),
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

export const patients_personal_data_decrypted = () => {
    return [
        {
            "email":"john@hopkins.com",
            "phone":"+1 727 1728 9191",
            "name":"John",
            "surnames":"Hopkins",
            "birthdate" : "xx"
        },
        {
            "email":"peter@gmail.com",
            "phone":"+49 127 1728 9191",
            "name":"Peter",
            "surnames":"Petrelli",
            "birthdate" : "xx"
        },
        {
            "email":"donnie@gmail.com",
            "phone":"+1 1997 1728 9191",
            "name":"Donald",
            "surnames":"Trump",
            "birthdate" : "xx"
        }
    ];
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
    password: "Cabezadesherwood2",
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
    returnData.personalFields = personal_data1();
    returnData.patientsPersonalData = patients_personal_data_encripted();
    returnData.status = 1;
    returnData.keyResearcherInvestigation = "U2FsdGVkX19vZ9QYZqVXUKngvq3aqfwxApSwtLB5hKMbmDXJQUwwfdt7mQMR9Wu8TxfOjwo0X3A4H7S2/WYfpw==";
    returnData.shareStatus = 2; 
    returnData.sharedResearchers = sharedResearchers;
    return returnData;
}

export const investigation_server_no_patitents = () => {
    let returnData = {...basic_info1_raw()};
    returnData.surveys = edc_data1().surveys;
    returnData.personalFields = personal_data1();
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
    returnData.personalFields = personal_data1();
    returnData.patientsPersonalData = [];
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
        
        patient:{
            name:"Peter",
            surnames:"Petrelli",
            dateOfBirth:"1976/07/31",
            gender:"male",
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
            dateOfBirth:"31/07/1944",
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
            dateOfBirth:"11/02/1946",
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
            dateOfBirth:"31/07/1976",
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
            dateOfBirth:"31/07/1976",
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
            dateOfBirth:"31/07/1976",
            gender:"male",
        }
    }

]