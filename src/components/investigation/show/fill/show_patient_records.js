import React, { useState, useEffect } from 'react';
import Table from '../../../general/table';
import axios from 'axios';
import ShowRecordsSection from './show_records_section';
import { ButtonAdd, ButtonBack } from '../../../general/mini_components';
import { findSubmissionsFromSection, numberRecordsSection } from '../../../../utils';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { EnhancedTable } from '../../../general/EnhancedTable';

/**
 * Component in charge of showing records of a given patient in a survey
 */
export default function PatientRecords(props) {
    const [sectionSelected, setSectionSelected] = useState(null);
    const [patientRecords, setPatientRecords] = useState(props.initialData ? props.initialData : []);
    const [showError, setShowError] = useState(0);
    function addRegistry(indexSection){
        setSectionSelected(indexSection);
    }
    async function fetchRecords(){
        const response = await axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.uuidInvestigation+"/record/"+props.patient.id+"/survey/"+props.survey._id, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            setPatientRecords(response.data.surveys[0].records);
        }
        else{
            setShowError(1);
        }
    }
    useEffect(() => {
        (async () => {
            if(patientRecords.length === 0){
                console.log("CARGANDO");
                fetchRecords()
            }
    })()}, []);
    
    
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
            { name : section.name, register : registers}
        )
    }
    function renderRecordsSection(records, sections){    
        return Object.values(sections).map(section => {
            const currentPatientRecords = records.filter(submission => submission.id_patient === props.patient.id);
            const submissionsSection = findSubmissionsFromSection(currentPatientRecords, section._id);

            return(
                <ShowRecordsSection submissions={submissionsSection} section={section} />
            )
        });
    }
    async function sendRecord(values){
        const recordArray = Object.keys(values).map(keySection => {
            return {
                id_section:keySection,
                answers:{...values[keySection]}
            }
        })
        const postObj = {submission : recordArray}
        const response = await axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.uuidInvestigation+"/record/"+props.patient.id, postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            fetchRecords();
        }
        setSectionSelected(null);
    }
    
    function renderCore(){
        if(showError === 0){
            if(!props.mode || props.mode === "table"){
                if(!sectionSelected){
                    const headCells = [{ id: "name", alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.name`} /> }, 
                                         { id: "records", alignment: "right", label: <Translate id={`investigation.fill.records`} /> } 
                                        ];
                    const rows = props.survey.sections.map(section => {
                        const nRecords = numberRecordsSection(section, patientRecords);
                        return( 
                            renderSection(section, nRecords)
                        ) 
                    })
                    return(
                        <EnhancedTable titleTable="" rows={rows} headCells={headCells} actions = {{"add" : (index) => addRegistry(index)}} />
                    )
                }
                // else{
                //     const section = props.survey.sections.filter((section) => {
                //         return (section._id === sectionSelected)
                //       })
                    
                //     return <SurveySections initialData={ {sections : section }} 
                //                 uuidInvestigation={props.uuidInvestigation}
                //                 callBackForm={(values) => sendRecord(values)}/>
                // }
            }
            else{
                return renderRecordsSection(patientRecords, props.survey.sections);
            }
        }
        else{
            return "HA HABIDO UN ERROR"
        }
    }
    
    return (
        <div className="container">
            {
                sectionSelected !== null && 
                <ButtonBack onClick={() => setSectionSelected(null)} >Back</ButtonBack>
            }
            <div className="row">
                PatientRecords - <Translate id="investigation.fill.survey.patient_name" />: {`${props.patient.name} ${props.patient.surname}`} - {props.patient.id}
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
     UUID de la investigación
    */
    idSurvey:PropTypes.string,
    /**
     Personal information of the Patient
    */
    patient: PropTypes.object,
    /**
     Mostrar datos en modo tabla o modo elementos
    */
    mode : PropTypes.string
};
