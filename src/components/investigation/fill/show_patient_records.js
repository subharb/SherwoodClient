import React, { useState, useEffect } from 'react';
import Table from '../../general/table';
import axios from 'axios';
import { ButtonAdd, ButtonBack } from '../../general/mini_components';
import SurveyForm from './survey_form';

export default function PatientRecords(props) {
    const [sectionSelected, setSectionSelected] = useState(null);
    const [patientRecords, setPatientRecords] = useState([]);
    function addRegistry(sectionID){
        
        setSectionSelected(sectionID);
    }
    useEffect(async () => {
        if(props.initialData){
            setPatientRecords(props.initialData.records);
        }
        else{
            const response = await axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.uuidInvestigation+"/record/"+props.patientID, { headers: {"Authorization" : localStorage.getItem("jwt")} })
            .catch(err => {console.log('Catch', err); return err;}); 
            if(response.request.status === 200){
                setPatientRecords(response.data.records);
            }
        }
       
      }, []);
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
        //Busco por cada section, los submmision de esa sección
        let sectionSubmissions = {};
        for(let s = 0; s < sections.length; s++){
            const sectionID = sections[s]._id;
            sectionSubmissions[sectionID] = {...sections[s]}
            sectionSubmissions[sectionID]["submission"] = [];
            for(let i = 0; i < patientRecords.length; i++){
                const patientRecord = patientRecords[i];
                for(let j = 0; j < patientRecord.submission.length;j++){
                    const submission = patientRecord.submission[j];
                    if(submission.id_section === sectionID){
                        sectionSubmissions[sectionID].submission.push(submission);
                        
                    }
                }
            }
        }
        
        return Object.values(sectionSubmissions).map(section => {
            return(
                <div className="row">
                    { section.name }
                    {
                        Object
                    }
                </div>
            )
        });
    }
    async function sendRecord(values){

        const postObj = {submission : values[Object.keys(values)[0]]}
        const response = await axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.uuidInvestigation+"/record/"+props.patientID, postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            
        }
        setSectionSelected(null);
    }
    
    function renderCore(){
        if(!props.mode || props.mode === "table"){
            if(!sectionSelected){
                return(
                    <Table header={headerTable} values={valuesTable} />
                )
            }
            else{
                const section = props.edc.sections.filter((section) => {
                    return (section._id === sectionSelected)
                  })
                
                return <SurveyForm initialData={ {sections : section }} 
                            callBackForm={(values) => sendRecord(values)}/>
            }
        }
        else{
            return renderRecordsSection(patientRecords, props.edc.sections);
            
        }
        
    }
    const headerTable = ["name", "records", "add record"];
    const valuesTable = props.edc.sections.map(section => {
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
                PatientRecords - {props.edc.sections[0].name}
                
            </div>
            <div className="container">
               {
                   renderCore()
               }
            </div>
        </div>
    )
}

