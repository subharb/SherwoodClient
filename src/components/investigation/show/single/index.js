import React, { useState, useEffect } from 'react';
import PersonalDataForm from '../fill/personal_data';
import SurveySections from '../fill/survey_form';
import ShowAllRecordsSurvey from '../../show/single/show_all_records_survey';
import { ButtonAdd, ButtonBack } from '../../../general/mini_components';
import Table from '../../../general/table';
import Axios from 'axios';
import ShowSurveys from '../fill/show_surveys_patient';
import { decryptData } from '../../../../utils';

/**
 * 
 * Component to add data to an investigation. First you add patients and then you add info of each patient.
 */
export default function ShowInvestigation(props) {
    const [showForm, setShowForm] = useState(0);
    const [patientIndex, setPatientIndex] = useState(null);
    const [surveyIndex, setSurveyIndex] = useState(null);
    const [patientsData, setPatientsData] = useState(props.investigation.patientsPersonalData ? props.investigation.patientsPersonalData : []);
    const [decryptedPatientData, setDecryptedPatientData] = useState([]);
    async function decriptPatientData() {
        if(patientsData.length !== 0 && patientsData.length !== decryptedPatientData.length){
            const rawKeyResearcher = localStorage.getItem("rawKeyResearcher");
            //const rawKeyResearcher = await decryptData("U2FsdGVkX1+vRAPd6EOpOTY53I8LLfs9iyX0mGh1Xesn6rwUS4UnTQvqTyWQvu0VeYLHUScUUtM22K8+4zJqZQ==", "Cabezadesherwood2")
    
            for(const patient of patientsData){
                let encryptedFields = [];
                const keyPatientResearcher = await decryptData(patient.keyPatResearcher, rawKeyResearcher);
                for(const personalField of props.investigation.personalFields){
                    const encryptedField = patient.personalData[personalField];
                    if(!encryptedField){
                        console.error("No coinciden campos!");
                        return "error!";
                    }
                    const decryptedField = await decryptData(encryptedField, keyPatientResearcher);
                    encryptedFields.push(decryptedField); 
                }
                decryptedPatientData.push(encryptedFields);
            }
            setDecryptedPatientData(decryptedPatientData);
        }
    }
    useEffect(() => {
        decriptPatientData();
     })

    function renderPatientsTable(){
        if(patientsData.length === 0){
            return <div>You dont have any patients enrolled yet</div>
        }
        else{            
            return <Table header={props.investigation.personalFields} 
                        values={decryptedPatientData} viewCallBack={(index) => showPatient(index)}
                        addCallBack={(index) => {selectPatient(index)}} />
        }
    }
    function renderSurveysTable(){
        return [
            <h5>Data Collections</h5>,
            <Table header={["name"]} 
                values={props.investigation.surveys.map(survey => {
                    return [survey.name]
                })} viewCallBack={(index) => showSurvey(index)}
                />
        ]
    }
    function showSurvey(index){
        setShowForm(4);
        setSurveyIndex(index);
    }
    function showPatient(index){
        setPatientIndex(index);
        setShowForm(3);
    }
    function selectPatient(index){
        setPatientIndex(index);
        setShowForm(2);
    }
    async function savePatient(patientData){
        //Hay que encriptar los valores del objecto y enviarlo
        console.log(patientData);
        
        const response = await Axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.investigation.uuid+"/patient", patientData , { headers: {"Authorization" : localStorage.getItem("jwt")} })
        .catch(err => {console.log('Catch', err); return err;}); 

        if(response.request.status === 200){
            //Actualizo los pacientes
            const response = await Axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.investigation.uuid+"/patient", { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
            if(response.request.status === 200){
                setPatientsData(response.data.patients);
            }
        }
        setShowForm(0);
    }
    async function saveRecord(values, idSurvey){
        console.log(values);

        const recordArray = Object.keys(values).map(keySection => {
            return {
                id_section:keySection,
                answers:{...values[keySection]}
            }
        })
        const postObj = {submission : recordArray}
        const response = await Axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.investigation.uuid+"/record/"+patientsData[patientIndex].id+"/survey/"+idSurvey, postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            
        }
        //setShowForm(0);
    }
    function renderForm(){
        switch(showForm){
            case 0:
                return [
                    renderPatientsTable(),
                    renderSurveysTable()
                ]
            case 1:
                return <PersonalDataForm fields={ props.investigation.personalFields} 
                            initialData={props.patientInfo} callBackForm={(personalData) => savePatient(personalData)}/>
            case 2: 
            //Add Data
                return <ShowSurveys mode="add" patient={patientsData[patientIndex]} saveRecord={saveRecord}
                            surveys={props.investigation.surveys} />
            case 3: 
            //View Data
                return <ShowSurveys mode="view" patient={patientsData[patientIndex]} saveRecord={saveRecord}
                            surveys={props.investigation.surveys} uuidInvestigation={props.investigation.uuid}/>
                // return <ShowPatientRecords mode="elements" initialData={ props.investigation.records } 
                //             uuidInvestigation={props.investigation.uuid} survey={props.investigation.surveys} 
                //             patient={patientsData[patientIndex]}/> 
            case 4:
                return <ShowAllRecordsSurvey survey={props.investigation.surveys[surveyIndex]} 
                            patients={patientsData} records={props.investigation.surveys[surveyIndex].records}/>
            default:
                return null;
        }
    }
    return (
        <div className="container">
            {
                showForm !== 0 && 
                <ButtonBack data-testid="back" onClick={() => setShowForm(0)} >Back</ButtonBack>
            }
            <div className="row">
                <h5>{props.investigation.name}</h5>
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
