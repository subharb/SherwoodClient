export const edc_data1 = () => {
    return {
        sections : [
            {
                name:"Personal Data", repeats : false, 
                fields : [
                            {
                                required : true, 
                                is_personal_data:true, 
                                name : "name", 
                                question : "What is your name?", 
                                type:"text",
                                typeValueCypress:"Text"
                            },
                            {
                                required : true, 
                                is_personal_data:true, 
                                name : "surnames", 
                                question : "What are your surnames?", 
                                type:"text",
                                typeValueCypress:"Text"
                            },
                            {
                                required : true, 
                                is_personal_data:true, 
                                name : "address", 
                                question : "What is your address?", 
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
                        question : "Hemoglobina", 
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