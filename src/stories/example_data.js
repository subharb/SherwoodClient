export const edc_data1 = () => {
    return {
        records:[],
        sections : [
            {
                name:"analitica",
                "_id": "5fccaedb8583362dd3d50246",
                repeats : false, 
                fields : [
                    {
                        required : true, 
                        encrypted:true, 
                        name : "hemoglobina", 
                        label : "Hemoglobina", 
                        type:"number",
                        typeValueCypress:"Number"
                    
                    },
                    {
                        required : true, 
                        encrypted:true, 
                        name : "leuco", 
                        label : "Leucocitos", 
                        type:"number",
                        typeValueCypress:"Number"
                    
                    },
                    {
                        required : true, 
                        encrypted:true, 
                        name : "gluco", 
                        label : "Glucose(mg/dl)", 
                        type:"number",
                        typeValueCypress:"Number"
                    
                    },
                    {
                        required : true, 
                        encrypted:true, 
                        name : "cholesterol", 
                        label : "Cholesterol(mg/dl)", 
                        type:"number",
                        typeValueCypress:"Number"
                    
                    },
                    {
                        required : true, 
                        encrypted:true, 
                        name : "red_blood", 
                        label : "Red blood cells(mg/dl)", 
                        type:"number",
                        typeValueCypress:"Number"
                    
                    },
                    {
                        required : true, 
                        encrypted:true, 
                        name : "comments", 
                        label : "Otros comentarios", 
                        type:"textarea",
                        typeValueCypress:"Number"
                    
                    }
                ]
            },
            {
                name:"Quality of life", 
                "_id": "5fccaedb8583362dd3d50247",
                repeats : false, 
                fields : [
                    {
                        required : true, 
                        encrypted:true, 
                        name : "quality", 
                        label : "What is your quality of life at the moment?", 
                        type:"evaluate",
                        typeValueCypress:"Number"
                    
                    },
                ]}
        ], addingSection:false, editingIndexSection:false}
}

export const records_patient1 = () =>{
    return [
        {
            "submission": [
                {
                    "id_section": "5fccaedb8583362dd3d50246",
                    "answers": {
                        "hemoglobina": 132,
                        "leucocitos": 112
                    }
                },
                {
                    "id_section": "5fccaedb8583362dd3d50247",
                    "answers": {
                        "evaluation": 13
                    }
                }
            ],
            "_id": "5fccaf388583362dd3d50249",
            "id_patient": "5fccaee78583362dd3d50248",
            "created_At": "2020-12-06T10:15:20.311Z",
            "updated_At": "2020-12-06T10:15:20.311Z"
        },
        {
            "submission": [
                {
                    "id_section": "5fccaedb8583362dd3d50246",
                    "answers": {
                        "hemoglobina": 132,
                        "leucocitos": 112
                    }
                },
                {
                    "id_section": "5fccaedb8583362dd3d50247",
                    "answers": {
                        "evaluation": 13
                    }
                }
            ],
            "_id": "5fcd0ed717ca0461e2fa47db",
            "id_patient": "5fccaee78583362dd3d50248",
            "created_At": "2020-12-06T17:03:19.093Z",
            "updated_At": "2020-12-06T17:03:19.093Z"
        },
        {
            "submission": [
                {
                    "id_section": "5fccaedb8583362dd3d50246",
                    "answers": {
                        "hemoglobina": "11",
                        "leuco": "22",
                        "gluco": "333",
                        "cholesterol": "111",
                        "red_blood": "111",
                        "comments": "aaaa"
                    }
                },
                {
                    "id_section": "5fccaedb8583362dd3d50247",
                    "answers": {
                        "quality": 9
                    }
                }
            ],
            "_id": "5fcd0f5417ca0461e2fa47dc",
            "id_patient": "5fccaee78583362dd3d50248",
            "created_At": "2020-12-06T17:05:24.401Z",
            "updated_At": "2020-12-06T17:05:24.401Z"
        },
        {
            "submission": [
                {
                    "id_section": "5fccaedb8583362dd3d50246",
                    "answers": {
                        "hemoglobina": "11",
                        "leuco": "22",
                        "gluco": "333"
                    }
                },
                {
                    "id_section": "5fccaedb8583362dd3d50247",
                    "answers": {
                        "quality": 5
                    }
                }
            ],
            "_id": "5fcd0fa017ca0461e2fa47dd",
            "id_patient": "5fccaee78583362dd3d50248",
            "created_At": "2020-12-06T17:06:40.376Z",
            "updated_At": "2020-12-06T17:06:40.376Z"
        },
        {
            "submission": [
                {
                    "id_section": "5fccaedb8583362dd3d50246",
                    "answers": {
                        "hemoglobina": "22",
                        "leuco": "22",
                        "gluco": "22",
                        "cholesterol": "22",
                        "red_blood": "22"
                    }
                },
                {
                    "id_section": "5fccaedb8583362dd3d50247",
                    "answers": {
                        "quality": 3
                    }
                }
            ],
            "_id": "5fcd106817ca0461e2fa47de",
            "id_patient": "5fccaee78583362dd3d50248",
            "created_At": "2020-12-06T17:10:00.644Z",
            "updated_At": "2020-12-06T17:10:00.644Z"
        }
    ]
}
export const basic_info1 = () => {
    return {
        "name":"COVID Nose ",
        "acronym":"CN","type":"audit","researcher":"Pedro Rodriguez",
        "institution":"Oxford University","contact":"test@email.com",
        "ethics_body":"12345","reference_number_state":"1",
        "uuid" : "ff4b1de5-9163-4eb1-85fc-59d19f2741dd"
    }    
}

export const personal_data1 = () => {
    return ["name", "surname", "phone", "email"];
}

export const patient_data1 = () => {
    return {"name" : "Peter", "surname" : "Petrelli", "phone" : "+34 123 1234", "email" : "peter@sherwood.science"}
}
export const summary_info1 = () => {
    return {
        "basic_info": basic_info1(), 
        "personal_data" : personal_data1(),
        "survey" : edc_data1()
    }   
}

export const patients_personal_data = () => {
    return [
        {
            "id": "5fccaee78583362dd3d50248",
            "personalData": {
                "name": "John",
                "surname": "Hopkins",
                "email": "patient@sherwood.science",
                "phone": "+34 545454"
            }
        },
        {
            
            "id": "5fccaee78583362dd3d50248",
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
    returnData.survey = edc_data1();
    returnData.survey.personalFields = personal_data1();
    returnData.patientsPersonalData = patients_personal_data();
    return returnData;
}

export const investigation_server_no_patitents = () => {
    let returnData = {...basic_info1()};
    returnData.survey = edc_data1();
    returnData.survey.personalFields = personal_data1();
    returnData.patientsPersonalData = [];
    return returnData;
}