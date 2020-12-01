export const edc_data1 = () => {
    return {
        records:[],
        sections : [
            {
                name:"Personal Data", repeats : false, 
                fields : [
                            {
                                required : true, 
                                is_personal_data:true, 
                                name : "name", 
                                label : "What is your name?", 
                                type:"text",
                                typeValueCypress:"Text"
                            },
                            {
                                required : true, 
                                is_personal_data:true, 
                                name : "surnames", 
                                label : "What are your surnames?", 
                                type:"text",
                                typeValueCypress:"Text"
                            },
                            {
                                required : true, 
                                is_personal_data:true, 
                                name : "address", 
                                label : "What is your address?", 
                                type:"text",
                                typeValueCypress:"Text"
                            }
                        ]
            },
            {
                name:"analitica", 
                repeats : false, 
                fields : [
                    {
                        required : true, 
                        is_personal_data:true, 
                        name : "hemoglobina", 
                        label : "Hemoglobina", 
                        type:"number",
                        typeValueCypress:"Number"
                    
                    }
                    ]
                }], addingSection:false, editingIndexSection:false}
}

export const basic_info1 = () => {
    return {
        "name":"COVID Nose ",
        "acronym":"CN","type":"audit","researcher":"Pedro Rodriguez",
        "institution":"Oxford University","contact":"test@email.com",
        "ethics_body":"12345","reference_number_state":"1"
    }    
}

export const summary_info1 = () => {
    return {
        "basic_info": basic_info1(), 
        "survey" : edc_data1()
    }   
}

//La forma en la que se envían los datos desde el servidor
export const investigation_server = () => {
    let returnData = {...basic_info1()};
    returnData.survey = edc_data1();
    return returnData;
}