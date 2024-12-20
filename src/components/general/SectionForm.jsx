import { isEmpty } from 'lodash';
import React from 'react'
import { connect } from 'react-redux';
import { DIAGNOSIS_TYPE, SLAVES_DIAGNOSIS, SLAVES_TREATMENT, TREATMENT_TYPE } from '../../constants';
import Form from './form';

export default function SectionForm(props) {
    const dictFields = {};
    const preString = "field_";
    const sectionStart = "title_section_";
    let initialData = {}; //props.initData ? props.initData : null;
    props.fields.forEach(field => {
        
        let copyField = Object.assign({}, field);
        const preText = field.type === "title_section_" ? sectionStart : preString;
        copyField["name"] = preText+field.id.toString();
        
        dictFields[preString+field.id.toString()] = copyField;
        if(props.initData){
            const record = props.initData.surveyRecords.find(record => record.surveyField.id === field.id);
            if(record){
                if(Array.isArray(record.value) ){
                    console.log("Es un array!");
                }
                initialData[preString+field.id.toString()] = Array.isArray(record.value) ? [...record.value] : record.value;
            }            
        }
    });

    function callBackForm(values, buttonSubmitted){
        let copyValues = Object.assign({}, values)
        const dataFields = [];
        Object.keys(values).forEach(key =>{
            if(!key.includes(sectionStart)){
                const idField = parseInt(key.replace(preString, ""));
                const surveyField = props.fields.find(field => field.id === idField);
                
                dataFields.push({
                    surveyField : {...surveyField},
                    value : values[key]
                });
            }
        })
        props.callBackSectionForm(dataFields, buttonSubmitted);
    }

    return (
        <Form fields={dictFields} initialData={initialData} country={props.country} 
            uuidSurvey={props.uuidSurvey} alterSubmitButton={props.alterSubmitButton}
            department={props.department}
            uuidInvestigation={props.uuidInvestigation} uuidPatient={props.uuidPatient}
            submitText={Object.keys(initialData).length > 0 ? "general.update" : null}
            callBackForm = {(values, buttonSubmitted) => callBackForm(values, buttonSubmitted)}/>)
}
