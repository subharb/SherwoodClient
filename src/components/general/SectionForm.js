import React from 'react'
import Form from './form';

export default function SectionForm(props) {
    const dictFields = {};
    props.fields.forEach(field => {
        let copyField = Object.assign({}, field);
        copyField["name"] = field.id;
        dictFields[field.id] = copyField;
    });

    function callBackForm(values){
        let copyValues = Object.assign({}, values)
        const dataFields = [];
        Object.keys(values).forEach(key =>{
            let tempObj = {};
            tempObj["id_field"] = parseInt(key);
            tempObj["value"] = values[key];
            dataFields.push(tempObj);
        })
        props.callBackSectionForm(dataFields);
    }
    return <Form fields={dictFields} 
                callBackForm = {(values) => callBackForm(values)}/>
}
