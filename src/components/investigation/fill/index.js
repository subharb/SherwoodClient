import React, { useState, useEffect } from 'react';
import PersonalDataForm from './personal_data';
import SurveyForm from './survey_form';
import ShowPatientRecords from './show_patient_records';
import { ButtonAdd, ButtonBack } from '../../general/mini_components';
import Table from '../../general/table';
import Axios from 'axios';

/**
 * 
 * Component to add data to an investigation. First you add patients and then you add info of each patient.
 */
export default function AddDataInvestigation(props) {
    const [showForm, setShowForm] = useState(0);
    const [patientIndex, setPatientIndex] = useState(null);
    const [patientsData, setPatientsData] = useState(props.initialData.patientsPersonalData ? props.initialData.patientsPersonalData : []);
    function renderPatientsTable(){
        if(patientsData.length === 0){
            return "You dont have any patients enrolled yet"
        }
        else{
            const valuesPatientData = patientsData.map(patient => {
                return props.initialData.survey.personalFields.map(personalField => {
                    return patient.personalData[personalField];
                });
            })
            return <Table header={props.initialData.survey.personalFields} 
                        values={valuesPatientData} viewCallBack={(index) => showPatient(index)}
                        addCallBack={(index) => {selectPatient(index)}} />
        }
        
    }
    function showPatient(index){
        setPatientIndex(index);
        setShowForm(3);
    }
    function selectPatient(index){
        setPatientIndex(index);
        setShowForm(2);
    }
    async function savePatient(personalData){
        //Hay que encriptar los valores del objecto y enviarlo
        console.log(personalData);
        
        const response = await Axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.initialData.uuid+"/patient", personalData , { headers: {"Authorization" : localStorage.getItem("jwt")} })
        .catch(err => {console.log('Catch', err); return err;}); 

        if(response.request.status === 200){
            //Actualizo los pacientes
            const response = await Axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.initialData.uuid+"/patient", { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
            if(response.request.status === 200){
                setPatientsData(response.data.patients);
            }
        }
        setShowForm(0);
    }
    async function saveRecord(values){
        console.log(values);

        const recordArray = Object.keys(values).map(keySection => {
            return {
                id_section:keySection,
                answers:{...values[keySection]}
            }
        })
        const postObj = {submission : recordArray}
        const response = await Axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.initialData.uuid+"/record/"+patientsData[patientIndex].id, postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            
        }
        setShowForm(0);
    }
    function getNamePatient(){
        let patientName = "";
        if(props.initialData.survey.personalFields.includes("name")){
            patientName = patientsData[patientIndex].personalData["name"]
        }
        if(props.initialData.survey.personalFields.includes("surname")){
            patientName += " "+patientsData[patientIndex].personalData["surname"]
        }
        patientName += " - "+patientsData[patientIndex].id;
        return patientName;
    }
    function renderForm(){
        switch(showForm){
            case 0:
                return renderPatientsTable();
            case 1:
                return <PersonalDataForm fields={ props.initialData.survey.personalFields} initialData={props.patientInfo} callBackForm={(personalData) => savePatient(personalData)}/>
            case 2: 
                return <SurveyForm initialData={ props.initialData.survey } patientName={getNamePatient()} callBackForm={(values) => saveRecord(values) }/>
            case 3: 
                return <ShowPatientRecords initialData={ props.initialData.records } uuidInvestigation={props.initialData.uuid} survey={props.initialData.survey} patient={patientsData[patientIndex]}/> 
            default:
                return null;
        }
    }
    return (
        <div className="container">
            {
                showForm !== 0 && 
                <ButtonBack onClick={() => setShowForm(0)} >Back</ButtonBack>
            }
            <div className="row">
                <h5>{props.initialData.name}</h5>
            </div>
            {
                showForm === 0 && 
                <div className="row">
                    Add new patient<ButtonAdd data-testid="add-patient" onClick={() => setShowForm(1)} />
                </div>
            }
            {
                renderForm()
            }
        </div>
    )
}
