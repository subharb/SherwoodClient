import React from 'react'
import Form from './form';

export default function SectionForm(props) {
    const arrayFields = props.fields.map(field => {
        field["name"] = field.id;
        return field;
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
    return <Form fields={arrayFields} 
                callBackForm = {(values) => callBackForm(values)}/>
}
