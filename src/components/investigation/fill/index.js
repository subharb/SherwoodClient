import React, { useState, useEffect } from 'react';
import PersonalDataForm from './personal_data';
import SurveyForm from './survey_form';
import { ButtonAdd } from '../../general/mini_components';
import Table from '../../general/table';
import Axios from 'axios';

export default function AddDataInvestigation(props) {
    const [showForm, setShowForm] = useState(0);
    const [patientIndex, setPatientIndex] = useState(null);
    const [patientsData, setPatientsData] = useState([]);
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
                        values={valuesPatientData} editCallBack={(index) => alert("Edit:"+index)}
                        addCallBack={(index) => {selectPatient(index)}} />
        }
        
    }
    function selectPatient(index){
        alert("Patient:"+index);
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
    function saveRecord(values){
        console.log(values);
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
            default:
                return null;
        }
    }
    useEffect(() => {
        if(props.initialData.patientsPersonalData.length !== patientsData.length){
            setPatientsData(props.initialData.patientsPersonalData);
        }
      }, []);
    return (
        <div className="container">
            {
                showForm !== 0 && 
                <button onClick={() => setShowForm(0)}>Back</button>
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
