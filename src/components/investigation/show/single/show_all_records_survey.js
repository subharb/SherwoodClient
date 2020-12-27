import React, { useEffect, useState } from 'react'
import PatientRecords from '../fill/show_patient_records';
import PropTypes from 'prop-types';

/**
 * 
 * Component that shows all records of a given survey. 
 * It allows to navigate visualiazing each patient and its sections at a time.
 */
export default function ShowAllRecordsSurvey(props) {
    let [currentPatient, setCurrentPatient] = useState(0);
    let [dictPatients, setDictPatients] = useState({});
    useEffect(() => {
        //Agrupamos los records por paciente
        let dictPatients = {}
        props.records.forEach(record => {
            const patient = props.patients.find(patient => {
                return patient.id === record.id_patient
            })
            let tempPatient = {patient: patient, submission:record.submission}
            if(dictPatients.hasOwnProperty(record.id_patient)){
                dictPatients[record.id_patient].submission = dictPatients[record.id_patient].submission.concat(record.submission)
            }
            else{
                dictPatients[record.id_patient] = tempPatient;
            }
        });
        setDictPatients(dictPatients);
    }, []);
    if(Object.values(dictPatients).length === 0){
        return "No records"
    }
    return (
        <div className="container">
            <div className="row">
                ShowAllRecordsSurvey {props.surveyName}
            </div>
            <div className="container">
                {Object.values(dictPatients).length} Pacientes
                <div className="row">
                    {currentPatient} Current Patient
                </div>
                <div className="row">
                    <button disabled={currentPatient === 0} onClick={() => setCurrentPatient(currentPatient-1)}>Prev</button>
                    <button disabled={currentPatient === Object.values(dictPatients).length -1} onClick={() =>setCurrentPatient(currentPatient+1)}>Next</button>
                </div>
                <PatientRecords initialData={props.records} 
                    mode="elements" survey={props.survey} patient={Object.values(dictPatients)[currentPatient].patient} />
            </div>
        </div>
        
    )
}

ShowAllRecordsSurvey.propTypes = {
    records: PropTypes.array,
    survey: PropTypes.object
};
