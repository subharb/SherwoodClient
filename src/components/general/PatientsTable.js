import React from 'react'
import { Translate } from 'react-localize-redux';
import { EnhancedTable } from './EnhancedTable';
import PropTypes from 'prop-types';

export default function PatientsTable(props) {
    const rows = props.patients.map(patient => {
        let tempRow = {};
        for(const pField of props.personalFields){
            let value = patient.personalData[pField.name];
            if(pField.type === "date"){
                value = new Date(parseInt(patient.personalData[pField.name])).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                    }).replace(/\./g, '/');
            }
            tempRow[pField.name] = value;
        }
        return(
            tempRow
        )
    });
    const headCells = props.personalFields.map(pField => {
        return { id: pField.name, alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.${pField.name}`} /> }
    }) 
    if(props.mobile){
        return (
            <EnhancedTable titleTable={<Translate id="investigation.create.summary.patients" />} rows={rows} headCells={headCells} 
                selectRow={index => props.showPatientCallBack(index)}
                />
        )
    }
    else{
        return (
            <EnhancedTable titleTable={<Translate id="investigation.create.summary.patients" />} rows={rows} headCells={headCells} 
                actions={{"view":(index => props.showPatientCallBack(index)), "add" : (index) => props.addInfoPatientCallBack(index)}}
                />
        )
    }
    
}

PatientsTable.propTypes = {
    patients:PropTypes.array,
    mobile:PropTypes.bool,
    personalFields:PropTypes.array,
    showPatientCallBack:PropTypes.func,
    addInfoPatientCallBack:PropTypes.func
}
