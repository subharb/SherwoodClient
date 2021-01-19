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
                "_id": "5fdc9fbccfec957a73cb34f6",
                records:[],
                name:"Quality of life Questionaire",
                sections:[
                    {
                        name:"Evaluation",
                        repeats : false, 
                        fields : [
                            {
                                required : true, 
                                encrypted:true, 
                                name : "evaluation", 
                                label : "How you you grade your current quality of life?", 
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
                        "id_section": "5fdc9fbccfec957a73cb34f7",
                        "nameCypress" : "Past medical history",
                        "answers": {
                            "ilnesses": "Cancer"
                        }
                    }
                ],
                "_id": "5fe20fb779160a2fc27c11d7",
                "nameCypress" : "Demographic Questionaire",
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
            "id": "5fe218b524b4213823c82e8d",
            "keyPatInv":"U2FsdGVkX1+07NL4AUPG3yImEoRbslQP55u2EpKFZHtF1Ork/gArz2UWFdD2qzLVt6jWFQN0QRaFh/U5Z8rJhg==",
            "keyPatientResearcher":"U2FsdGVkX1+Is8xYbsoraL9zkpMchEVy7LAR63EB5jOxA5Y/rwLcXEKKzzzxcXF0VFLWndazqetThikNFOwn9Q==",
            "personalData":{
                "email":"U2FsdGVkX18JWuhek4AgMTMCkrWZWOQbSJRqyeC0RB2DkX1FFephUBvEib0/ZjwG",
                "phone":"U2FsdGVkX18JmEbvvSQtJFIAnuvuYp2b3pvD5XShscY=",
                "name":"U2FsdGVkX1/RETEMpFHDNWzLo6WgJ9JRBzmR3PMZtnt0qWe0rR1KBSJIrvDHUKmj",
                "surname":"U2FsdGVkX18PJ+XuhkWZGfUXtRO99CBmmlYkYD/+t+k="
            }
        },
        {
            
            "id": "5fe218c024b4213823c82e8e",
            "keyPatInv": "U2FsdGVkX19eZ1fehZD6sJn0C/rtKVMx2zTSt3WV8cZLVIoKzelAU1h5SCRCGTQTZXJMxGyV1tzd2HATakUVsA==",
            "keyPatientResearcher": "U2FsdGVkX1/KVSrNmXP5ri8WQXTeVounCqz9O9wXUoUqCSKLTxR/rNLw0LIlPKz7B7vI3zchzt6XbLhcN40U/g==",
            "personalData": {
                "email": "U2FsdGVkX1/6h/bqcYAH+5gYGIOG5D12rT0WhlAxkn5sK0mDLi5A2+WhJeTTeryA",
                "phone": "U2FsdGVkX1+2RzhJr/EqHHpUAY59pdVd04tFhDUjITM=",
                "name": "U2FsdGVkX19AG8ZaX1DrxDK6Qt9kHxg3JLgKgWh8bPI=",
                "surname": "U2FsdGVkX1+ZjiX9v8rg3R3S98fPUaSgTtcpW7Ul1Fg="
            }
            
        },
        {
            "id": "5fccaee78583362dd3d50248",
            "keyPatInv": "U2FsdGVkX1/mPlvgZCwnYhxCWYW0j0UfCEGOmvh3mxU3OyFZtnZNudXiqNWijIydHNKrvtaZ2hTc5lwaw6NN3w==",
            "keyPatientResearcher": "U2FsdGVkX18gBKWMD7TYccFDAK7J1o/BM9EcbWUvZ30wBRq+6TIIk/yknU/ezyJMOgAGkfjNESj7ZgkuASNsIA==",
            "personalData": {
                "email": "U2FsdGVkX1/M175udN7Bp5uI6hI/HCNrglC4RrvQoQpBQgLw7QFZrjnKv0UO66Ce",
                "phone": "U2FsdGVkX1/Ob4rrFmVAxynGaJFxvwADsAvyBjADnWk=",
                "name": "U2FsdGVkX1+mWpHIcy7u9KXHLND/1NDziIwoCqI72b0=",
                "surname": "U2FsdGVkX1/Zz6rs03SB3UkHfweYxQlAXxAjzh/oiKE="
            }
        },
    ]
}

//La forma en la que se envían los datos desde el servidor
export const investigation_server = () => {
    let returnData = {...basic_info1()};
    returnData.surveys = edc_data1().surveys;
    returnData.personalFields = personal_data1();
    returnData.patientsPersonalData = patients_personal_data_encripted();
    returnData.status = 1;
    return returnData;
}

export const investigation_server_no_patitents = () => {
    let returnData = {...basic_info1()};
    returnData.surveys = edc_data1().surveys;
    returnData.personalFields = personal_data1();
    returnData.patientsPersonalData = [];
    returnData.status = 1; 
    return returnData;
}

