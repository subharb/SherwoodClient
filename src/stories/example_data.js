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
                "_id": "5fccaedb8583362dd3d50246",
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

export const basic_info1 = () => {
    return {
        "name":"COVID Nose ",
        "acronym":"CN","type":"audit","researcher":"Pedro Rodriguez",
        "institution":"Oxford University","contact":"test@email.com",
        "ethics_body":"12345","reference_number_state":"1"
    }    
}

export const personal_data1 = () => {
    return ["name", "surname", "phone", "email"];
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