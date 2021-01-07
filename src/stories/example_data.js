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
export const basic_info1 = () => {
    return {
        "name":"COVID Nose ",
        "acronym":"CN","type":"audit","principal_researcher":"Pedro Rodriguez",
        "institution":"Oxford University","contact":"test@email.com",
        "ethics_body":"12345","reference_number_state":"1",
        "uuid" : "ce0430a6-e333-4c90-9b48-7fc9bbecc38d"
    }    
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
export const summary_info1 = () => {
    return {
        "basic_info": basic_info1(), 
        "personal_data" : personal_data1(),
        "surveys" : edc_data1().surveys
    }   
}

export const patients_personal_data = () => {
    return [
        {
            "id": "5fe218b524b4213823c82e8d",
            "personalData": {
                "name" : "U2FsdGVkX1+KDOBCYusKwV2psyZEI1qWaO7CSe2uOo8=", 
                "surname" : "U2FsdGVkX19gyeNwfNSi23TYseiCWwqe0C0A4mwfEVc=", 
                "phone" : "U2FsdGVkX1/ru9t1lEG5Iho/EUWfsRYQ1JTNOmoyzjU=", 
                "email" : "U2FsdGVkX19PGWrZ4ggVKCG0tLybQRp7dmfkgQlD864zXxLcDNcBvE3B2DKjE/Ot"
            }
        },
        {
            
            "id": "5fe218c024b4213823c82e8e",
            "personalData": {
                "name" : "Donald",
                "surname" : "Trump",
                "email" : "trump@sherwood.science",
                "phone" : "+34 545454"
            }
            
        },
        {
            "id": "5fccaee78583362dd3d50248",
            "personalData": {
                "name" : "Peter",
                "surname" : "Petrelli",
                "email" : "petrelli@sherwood.science",
                "phone" : "+34 545454"
            }
            
        },
    ]
}

//La forma en la que se envían los datos desde el servidor
export const investigation_server = () => {
    let returnData = {...basic_info1()};
    returnData.surveys = edc_data1().surveys;
    returnData.personalFields = personal_data1();
    returnData.patientsPersonalData = patients_personal_data();
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

