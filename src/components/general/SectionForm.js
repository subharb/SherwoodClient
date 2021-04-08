import { isEmpty } from 'lodash';
import React from 'react'
import { SLAVES_TREATMENT, TREATMENT_TYPE } from '../../constants';
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
            const field = props.fields.find(aField => aField.id === idField);
            if(field.type === TREATMENT_TYPE){
                values[key].forEach(treatment => {
                    SLAVES_TREATMENT.forEach(name =>{
                        const slaveField = field.slaves.find(aSlave => aSlave.name === name);
                        let slaveObj = {};
                        slaveObj["id_Field"] = slaveField.id;
                        let valueSlave = null;
                        switch(name){
                            case "drug-code":
                                valueSlave = treatment.drug.id;
                                break;
                            case "drug-start":
                                valueSlave = treatment.startDate;
                                break;
                            case "drug-finish":
                                valueSlave = treatment.endDate;
                                break;
                            case "drug-posology":
                                valueSlave = treatment.posology.value;
                                break;
                            default:
                        }
                        slaveObj["value"] = valueSlave;
                        dataFields.push(slaveObj);
                    });
                    tempObj["id_Field"] = idField;
                    tempObj["value"] = treatment.drug.name;
                });
            }
            else{
                tempObj["id_Field"] = idField;

                tempObj["value"] = values[key];
                dataFields.push(tempObj);
            }
            
        })
        props.callBackSectionForm(dataFields);
    }

    return <Form fields={dictFields} initialData={initialData} submitText={Object.keys(initialData).length > 0 ? "general.update" : null}
            callBackForm = {(values) => callBackForm(values)}/>
}
