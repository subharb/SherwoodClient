export const edc_data1 = () => {
    return {
        sections : [{
            name:"Personal Data", repeats : false, 
                    fields : [{required : true, 
                                is_personal_data:true, 
                                name : "name", 
                                question : "¿cual es tu nombre?", 
                                type:"text"}
                            ]
        },
        {
            name:"analitica", repeats : false, 
                    fields : [
                        {
                            required : true, 
                            is_personal_data:true, 
                            name : "name", 
                            question : "Hemoglonbina", 
                            type:"number"}
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