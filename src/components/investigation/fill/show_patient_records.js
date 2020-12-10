import React, { useState, useEffect } from 'react';
import Table from '../../general/table';
import axios from 'axios';
import ShowRecordsSection from './show_records_section';
import { ButtonAdd, ButtonBack } from '../../general/mini_components';
import SurveyForm from './survey_form';
import { findSubmissionsFromSection } from '../../../utils';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';

/**
 * Component in charge of showing records of a given patient
 */
export default function PatientRecords(props) {
    const [sectionSelected, setSectionSelected] = useState(null);
    const [patientRecords, setPatientRecords] = useState(props.initialData ? props.initialData : []);
    const [showError, setShowError] = useState(0);
    function addRegistry(sectionID){
        setSectionSelected(sectionID);
    }
    useEffect(() => {
        (async () => {
            if(patientRecords.length === 0){
                console.log("CARGANDO");
                const response = await axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.uuidInvestigation+"/record/"+props.patient.id, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
                if(response.request.status === 200){
                    
                    setPatientRecords(response.data.records);
                }
                else{
                    
                    setShowError(1);
                }
            }
    })()}, []);
    function numberRecordsSection(section){
        let nRegistros = 0
        for(let i = 0; i < patientRecords.length; i++){
            const patientRecord = patientRecords[i];
            for(let j = 0; j < patientRecord.submission.length;j++){
                const submission = patientRecord.submission[j];
                if(submission.id_section === section._id){
                    nRegistros++;
                }
            }
        }
        return nRegistros;
    }
    
    function renderSection(section, nRecords){
        let registers = "No hay registros";
        let addButton = <ButtonAdd onClick={() => addRegistry(section._id)} />;
        if(nRecords !== 0){
            registers = "Hay "+nRecords+" registros";
            if(!section.repeats){
                addButton = "No boton";
            }
        }
        return(
            [section.name, registers, addButton]
        )
    }
    function renderRecordsSection(records, sections){    
        return Object.values(sections).map(section => {
            const submissionsSection = findSubmissionsFromSection(patientRecords.records, section._id);
            return(
                <ShowRecordsSection submissions={submissionsSection} section={section} />
            )
        });
    }
    async function sendRecord(values){

        const postObj = {submission : values[Object.keys(values)[0]]}
        const response = await axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.uuidInvestigation+"/record/"+props.patient.id, postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            
        }
        setSectionSelected(null);
    }
    
    function renderCore(){
        if(showError === 0){
            if(!props.mode || props.mode === "table"){
                if(!sectionSelected){
                    return(
                        <Table header={headerTable} values={valuesTable} />
                    )
                }
                else{
                    const section = props.survey.sections.filter((section) => {
                        return (section._id === sectionSelected)
                      })
                    
                    return <SurveyForm initialData={ {sections : section }} 
                                callBackForm={(values) => sendRecord(values)}/>
                }
            }
            else{
                return renderRecordsSection(patientRecords, props.survey.sections);
                
            }
        }
        else{
            return "HA HABIDO UN ERROR"
        }
        
    }
    const headerTable = ["name", "records", "add record"];
    const valuesTable = props.survey.sections.map(section => {
            const nRecords = numberRecordsSection(section);
            return( 
                renderSection(section, nRecords)
            ) 
        })
    return (
        <div className="container">
            {
                sectionSelected !== null && 
                <ButtonBack onClick={() => setSectionSelected(null)} >Back</ButtonBack>
            }
            <div className="row">
                PatientRecords - 
                <Translate id="investigation.fill.survey.patient_name" />: {`${props.patient.personalData.name} ${props.patient.personalData.surname}`} - {props.patient.id}
                
            </div>
            <div className="container">
               {
                   renderCore()
               }
            </div>
        </div>
    )
}

PatientRecords.propTypes = {
    /**
     Información del paciente para precargar
    */
    initialData: PropTypes.object,
    /**
     Personal infomation of the Patient
    */
    patient: PropTypes.object,
    /**
     Submissions of the patient
    */
    submissions: PropTypes.array
};
