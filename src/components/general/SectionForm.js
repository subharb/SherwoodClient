import { isEmpty } from 'lodash';
import React from 'react'
import { DIAGNOSIS_TYPE, SLAVES_DIAGNOSIS, SLAVES_TREATMENT, TREATMENT_TYPE } from '../../constants';
import Form from './form';

export default function SectionForm(props) {
    const dictFields = {};
    const preString = "field_";
    let initialData = {}; //props.initData ? props.initData : null;
    props.fields.forEach(field => {
        let copyField = Object.assign({}, field);
        copyField["name"] = preString+field.id.toString();
        dictFields[preString+field.id.toString()] = copyField;
        if(props.initData){
            const record = props.initData.surveyRecords.find(record => record.surveyField.name === field.name);
            if(record){
                initialData[preString+field.id.toString()] = record.value;
            }            
        }
    });

    function callBackForm(values){
        let copyValues = Object.assign({}, values)
        const dataFields = [];
        Object.keys(values).forEach(key =>{
            let tempObj = {};
            const idField = parseInt(key.replace(preString, ""));
            
            tempObj["id_field"] = idField;

            tempObj["value"] = values[key];
            dataFields.push(tempObj);
            
            
        })
        props.callBackSectionForm(dataFields);
    }

    return <Form fields={dictFields} initialData={initialData} submitText={Object.keys(initialData).length > 0 ? "general.update" : null}
            callBackForm = {(values) => callBackForm(values)}/>
}
