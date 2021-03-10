import React from 'react'
import Form from './form';

export default function SectionForm(props) {
    const dictFields = {};
    props.fields.map(field => {
        field["name"] = field.id;
        dictFields[field.id] = field;
    });

    function callBackForm(values){
        const dataFields = [];
        Object.keys(values).map(key =>{
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
