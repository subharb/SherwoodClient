import React from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from './EnhancedTable';
import PropTypes from 'prop-types';
import { FUNCTIONALITY } from '../../constants/types';
import { formatPatients } from '../../utils';
import { PERMISSION } from '../investigation/share/user_roles';

function PatientsTable(props) {
    
    const rows = formatPatients(props.patients, props.personalFields);
    const headCells = props.personalFields.map(pField => {
        return { id: pField.name, alignment: "left", label: !props.translate(`investigation.create.personal_data.short-fields.${pField.name}`).includes("Missing") ? props.translate(`investigation.create.personal_data.short-fields.${pField.name}`) : pField.label }
    }) 
    let actions = [];
    if(props.permissions.includes(PERMISSION.MEDICAL_WRITE) && props.functionalities.includes(FUNCTIONALITY.HOSPITALIZATION)){
        actions.push({"type" : "hospital", "func" : (index) => props.hospitalizePatientCallBack(index)})
    }
    if(props.permissions.includes(PERMISSION.CREATE_APPOINTMENTS) && props.functionalities.includes(FUNCTIONALITY.OUTPATIENTS)){
        actions.push({"type" : "appointment", "func" : (index) => props.makeAppointmentPatientCallBack(index)})
    }
    return (
        <EnhancedTable noHeader noSelectable  titleTable={<Translate id="investigation.create.summary.patients" />} 
            rows={rows} headCells={headCells} 
            selectRow={index => props.showPatientCallBack(index)}
            actions={actions}
            />
    )
    
}

PatientsTable.propTypes = {
    patients:PropTypes.array,
    mobile:PropTypes.bool,
    personalFields:PropTypes.array,
    showPatientCallBack:PropTypes.func,
    addInfoPatientCallBack:PropTypes.func,
    hospitalizePatientCallBack:PropTypes.func
}

export default withLocalize(PatientsTable)