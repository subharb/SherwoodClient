import React from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from './EnhancedTable';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { HOSPITAL_PATIENT } from '../../routes';

function PatientsTable(props) {
    const rows = props.patients.map(patient => {
        let tempRow = {};
        for(const pField of props.personalFields){
            if(patient.personalData){
                let value = patient.personalData[pField.name];
                if(pField.type === "date"){
                    value = new Date(patient.personalData[pField.name]).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                        }).replace(/\./g, '/');
                }
                if(pField.name === 'sex'){
                    value = <Translate id={`hospital.analytics.graphs.sex.${patient.personalData[pField.name].toLowerCase()}`} />
                }
                tempRow[pField.name] = value;
            }
            
        }
        tempRow["id"] = patient.id;
        return(
            tempRow
        )
    });
    const headCells = props.personalFields.map(pField => {
        return { id: pField.name, alignment: "left", label: !props.translate(`investigation.create.personal_data.short-fields.${pField.name}`).includes("Missing") ? props.translate(`investigation.create.personal_data.short-fields.${pField.name}`) : pField.label }
    }) 
    return (
        <EnhancedTable noHeader noSelectable  titleTable={<Translate id="investigation.create.summary.patients" />} rows={rows} headCells={headCells} 
            selectRow={index => props.showPatientCallBack(index)}
            />
    )
    
}

PatientsTable.propTypes = {
    patients:PropTypes.array,
    mobile:PropTypes.bool,
    personalFields:PropTypes.array,
    showPatientCallBack:PropTypes.func,
    addInfoPatientCallBack:PropTypes.func
}

export default withLocalize(PatientsTable)