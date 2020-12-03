export const edc_data1 = () => {
    return {
        records:[],
        sections : [
            {
                name:"analitica", 
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
                repeats : true, 
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
    return {
        "name":true,
        "surname":true,
        "phone" : true,
        "email" : true
    }    
}
export const summary_info1 = () => {
    return {
        "basic_info": basic_info1(), 
        "personal_data" : personal_data1(),
        "survey" : edc_data1()
    }   
}

//La forma en la que se envían los datos desde el servidor
export const investigation_server = () => {
    let returnData = {...basic_info1()};
    returnData.survey = edc_data1();
    return returnData;
}