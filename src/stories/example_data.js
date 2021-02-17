export const edc_data1 = () => {
    return {
        surveys : [
            {   
                "_id": "5fdc9fbccfec957a73cb34f5",
                "name" : "Demographic Questionaire",
                    "sections": [
                        {
                            "fields": [
                                {
                                    "required": true,
                                    "is_personal_data": false,
                                    "name": "sex",
                                    "label": "Sex at birth",
                                    "type": "text",
                                    "typeValueCypress": "Text"
                                },
                                {
                                    "required": true,
                                    "is_personal_data": false,
                                    "name": "etnic",
                                    "label": "Etnic Origin",
                                    "type": "text",
                                    "typeValueCypress": "Text"
                                }
                            ],
                            "_id": "5fdc9fbccfec957a73cb34f6",
                            "name": "Demographics",
                            "repeats": false
                        },
                        {
                            "fields": [
                                {
                                    "required": true,
                                    "is_personal_data": false,
                                    "name": "ilnesses",
                                    "label": "Previous Ilnesess",
                                    "type": "text",
                                    "typeValueCypress": "Text"
                                }
                            ],
                            "_id": "5fdc9fbccfec957a73cb34f7",
                            "name": "Past medical history",
                            "repeats": false
                        }
                    ],
                    records:[]
                },
            {
                "_id": "5fdc9fbccfec957a73cbf6",
                records:[],
                name:"Analitica",
                sections:[
                    {
                        name:"Blood Samples",
                        repeats : true, 
                        "_id": "5fccaedb8583362dd3d50246",
                        fields : [
                            {
                                required : true, 
                                encrypted:true, 
                                name : "red_cells", 
                                label : "Amount red cells?", 
                                type:"text",
                                typeValueCypress:"Text"
                            
                            },
                            {
                                required : true, 
                                encrypted:true, 
                                name : "leucocitos", 
                                label : "Amount white cells?", 
                                type:"text",
                                typeValueCypress:"Text"
                            
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
        records : [
            {
                "submission": [
                    {
                        "id_section": "5fdc9fbccfec957a73cb34f6",
                        "nameCypress" : "Demographics",
                        "answers": {
                            "sex": "Male",
                            "etnic": "Hispanic"
                        }
                    }
                ],
                "_id": "5fe20fb779160a2fc27c11d7",
                "nameCypress" : "Demographic Questionaire",
                "id_patient": "5fe218b524b4213823c82e8d",
                "created_At": "2020-12-06T10:15:20.311Z",
                "updated_At": "2020-12-06T10:15:20.311Z"
            },
            {
                "submission": [
                    {
                        "id_section": "5fccaedb8583362dd3d50246",
                        "nameCypress" : "Blood Samples",
                        "answers": {
                            "red_cells": "300",
                            "leucocitos" : "123"
                        }
                    }
                ],
                "_id": "5fe20fb779160a2fc27c11d7",
                "nameCypress" : "Analitica",
                "id_patient": "5fe218b524b4213823c82e8d",
                "created_At": "2020-12-06T17:03:19.093Z",
                "updated_At": "2020-12-06T17:03:19.093Z"
            }
        ]
    }
}

export const records_patient2 = () =>{
    return {
        records : [
            {
                "submission": [
                    {
                        "id_section": "5fdc9fbccfec957a73cb34f6",
                        "nameCypress" : "Demographics",
                        "answers": {
                            "sex": "Female",
                            "etnic": "Arab"
                        }
                    }
                ],
                "_id": "5fe20fb779160a2fc27c11d7",
                "nameCypress" : "Demographic Questionaire",
                "id_patient": "5fe218c024b4213823c82e8e",
                "created_At": "2020-12-06T10:15:20.311Z",
                "updated_At": "2020-12-06T10:15:20.311Z"
            },
            {
                "submission": [
                    {
                        "id_section": "5fe20fb779160a2fc27c11d9",
                        "nameCypress" : "Past medical history",
                        "answers": {
                            "ilnesses": "Prostate Cancer"
                        }
                    }
                ],
                "_id": "5fe20fb779160a2fc27c11d7",
                "nameCypress" : "Demographic Questionaire",
                "id_patient": "5fe218c024b4213823c82e8e",
                "created_At": "2020-12-06T17:03:19.093Z",
                "updated_At": "2020-12-06T17:03:19.093Z"
            }
        ]
    }
}
export const basic_info1 = {
        "name": {
            "value" : "COVID Nose By Tester",
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
    return ["email", "phone", "name", "surname"]
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
        "personal_data" : personal_data1(),
        "surveys" : edc_data1().surveys
    }   
}

export const patients_personal_data_decrypted = () => {
    return [
        {
            "email":"john@hopkins.com",
            "phone":"+1 727 1728 9191",
            "name":"John",
            "surname":"Hopkins"
        },
        {
            "email":"peter@gmail.com",
            "phone":"+49 127 1728 9191",
            "name":"Peter",
            "surname":"Petrelli"
        },
        {
            "email":"donnie@gmail.com",
            "phone":"+1 1997 1728 9191",
            "name":"Donald",
            "surname":"Trump"
        }
    ];
}

export const patients_personal_data_encripted = () => {
    return [
        {
            "id": "600ee2ae568a01203903fed0",
            "personalData": {
                "email": "U2FsdGVkX19zE7xj4DCi1bB45gS5FJnO2RBQsVqs+bwFirN9kHWFEzIsUw/MYVK2",
                "phone": "U2FsdGVkX19qKHvDsN1gAFnIw0VyldrJTUlWBi+5GidrnzzDpLr05pwU0g0drN4C",
                "name": "U2FsdGVkX19ocopLUsihONR1ibWmg1KLzIPZYBdTPK0=",
                "surname": "U2FsdGVkX18OqSgO0WqJfayknGhRHvGuMrATqxsuyj4="
            },
            "keyPatientResearcher": "U2FsdGVkX19bms94TYB8K3ED74teGSI9VKdSNllX+k1wXgj3282Whikz56NoiB/VzBUx6xRr83ak/3z3q3EofQ==",
            "encryptedKeyUsed": 1
        },
        {
            "id": "600ee2b3568a01203903fed1",
            "personalData": {
                "email": "U2FsdGVkX18oEcJlLeVnXCF2XmZ5S1QnVIrEtxLK0S8=",
                "phone": "U2FsdGVkX1/QO3Zy5XPYsv9Y9Abbhbyouj0iga+qXxR3qyLvI//on712v1DRC+/b",
                "name": "U2FsdGVkX19WMH5g0VXvEjV753phzJqBMU89xvD3vbg=",
                "surname": "U2FsdGVkX18EKaRdlLD/A5Ya3y07ks4z5fRRoOFs3tQ="
            },
            "keyPatientResearcher": "U2FsdGVkX1/hB9FtUtWs+fE0oOfIm+H0ESwDIqZXoQ3HUrXzVmh35Nk1b8V0Eluyxal/CGCG86+42FsGZARsDA==",
            "encryptedKeyUsed": 1
        },
        {
            "id": "600ee2b7568a01203903fed2",
            "personalData": {
                "email": "U2FsdGVkX19RwwxsO3K9xgktHiXSPiiBJv6FAc5j2NeVprvgAgpWUU5ZXxrqszEw",
                "phone": "U2FsdGVkX18ZpiKmUlK8eFbcxVEAgMW0B4/SSDv4F2Ow7IzvRn2BmrNQ5LeDcTZf",
                "name": "U2FsdGVkX1/aonpnW/tOS+EGGs+RPurCbVVgUvIogAQ=",
                "surname": "U2FsdGVkX1/jx9DHxoj7Vcrb7Tz8qE/AgtNjuSCGS+U="
            },
            "keyPatientResearcher": "U2FsdGVkX1+zrUoIPQnRIZ4J3yBNc4Wve+v4rzddE5VddZQJTFrnQVn+F4PoDLBi3J6PGDPxD1EO6Q9WAeSVxQ==",
            "encryptedKeyUsed": 1
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
    returnData.surveys = edc_data1().surveys;
    returnData.personalFields = personal_data1();
    returnData.patientsPersonalData = patients_personal_data_encripted();
    returnData.status = 1;
    returnData.keyResearcherInvestigation = "U2FsdGVkX19dc/oAgeGDtnFwJOQlN2+6QmHS2aY1Kf/gHjA7K9n+KPNM+3qOADTCM9Gy6LUimq8LsJf5IzX2lw==";
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
    returnData.keyResearcherInvestigation = "U2FsdGVkX19dc/oAgeGDtnFwJOQlN2+6QmHS2aY1Kf/gHjA7K9n+KPNM+3qOADTCM9Gy6LUimq8LsJf5IzX2lw==";
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
    returnData.keyResearcherInvestigation = "U2FsdGVkX19dc/oAgeGDtnFwJOQlN2+6QmHS2aY1Kf/gHjA7K9n+KPNM+3qOADTCM9Gy6LUimq8LsJf5IzX2lw==";
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
            "surname",
            "name",
            "phone",
            "email"
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
        number:"2",
        floor:"1º Planta",
        dateIn:null,
        dateOut:null
    },
    {
        id:1,
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