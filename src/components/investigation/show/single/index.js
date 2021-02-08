import React, { useState, useEffect } from 'react';
import PersonalDataForm from '../fill/personal_data';
import { Alert } from "@material-ui/lab";
import ShowAllRecordsSurvey from '../../show/single/show_all_records_survey';
import { ButtonAdd, ButtonBack, Divider } from '../../../general/mini_components';
import Table from '../../../general/table';
import Axios from 'axios';
import ShowSurveys from '../fill/show_surveys_patient';
import { decryptData, encryptData } from '../../../../utils';

import Loader from '../../../Loader';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Grid, Typography } from "@material-ui/core";
import { EnhancedTable } from '../../../general/EnhancedTable';
import { Translate } from 'react-localize-redux';
/**
 * 
 * Component to add data to an investigation. First you add patients and then you add info of each patient.
 */
export default function ShowInvestigation(props) {
    const [showForm, setShowForm] = useState(0);
    const [level, setLevel] = useState(0);
    const [patientIndex, setPatientIndex] = useState(null);
    const [surveyIndex, setSurveyIndex] = useState(null);
    const [patientsData, setPatientsData] = useState([]);
    const [decryptedPatientData, setDecryptedPatientData] = useState([]);
    const [investigation, setInvestigation] = useState(props.initialData ? props.initialData.investigation : false);
    const [errorEncryption, setErrorEncryption ] = useState(false);
    const history  = useHistory();

    useEffect(() => {
        async function fetchInvestigation(){
            const request = await axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem("type")+'/investigation/'+props.uuid, { headers: {"Authorization" : localStorage.getItem("jwt")}})
                .catch(err => {
                    console.error('Catch', err); 
                    return {status : 401};
            }); 
            //Guardamos el token si la request fue exitosa
            if(request.status === 200){
                setInvestigation(request.data.investigation);
            }
            else if(request.status === 401){
                history.push("/auth/sign-in");
            }
        }
        if((patientsData.length === 0) && investigation){
            setPatientsData(investigation.patientsPersonalData);
        }
        if(!investigation){
            fetchInvestigation();
        }
    }, [investigation]);
    
    useEffect(() => {  
        try{
            if(patientsData.length !== 0 && patientsData.length !== decryptedPatientData.length){
                //const rawKeyResearcher = await decryptData("U2FsdGVkX1+vRAPd6EOpOTY53I8LLfs9iyX0mGh1Xesn6rwUS4UnTQvqTyWQvu0VeYLHUScUUtM22K8+4zJqZQ==", "Cabezadesherwood2")
                let tempDecryptedData = [];
                for(const patient of patientsData){
                    let encryptedFields = {};
                    if(investigation.permissions !== 0){
                        const rawKeyResearcher = investigation.encryptedKeyUsed === 0 ? process.env.REACT_APP_DEFAULT_RESEARCH_PASSWORD : localStorage.getItem("rawKeyResearcher");
                        
                        const keyInvestigation = decryptData(investigation.keyResearcherInvestigation, rawKeyResearcher);
                        
                        for(const personalField of investigation.personalFields){
                            const encryptedField = patient.personalData[personalField];
                            if(!encryptedField){
                                console.error("No coinciden campos!");
                                return "error!";
                            }
                            const decryptedField = decryptData(encryptedField, keyInvestigation);
                            encryptedFields[personalField] = decryptedField; 
                        }
                    }
                    
                    encryptedFields["id"] = patient.id; 
                    tempDecryptedData.push(encryptedFields);
                }
                setDecryptedPatientData(tempDecryptedData);
            }
        }
        catch(error){
            setErrorEncryption(true);
            return;
        }
        
    }, [patientsData])

    function renderPatientsTable(){
        if(investigation.shareStatus === 2){
            if(patientsData.length === 0){
                return (<Typography variant="subtitle1" color="textPrimary">
                            You dont have any patients enrolled yet
                        </Typography>)
            }
            else{      
                const rows = decryptedPatientData.map(patientData => {
                    let tempRow = {};
                    for(const pField of investigation.personalFields){
                        tempRow[pField] = patientData[pField]
                    }
                    return(
                        tempRow
                    )
                });
                const headCells = investigation.personalFields.map(pField => {
                    return { id: pField, alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.${pField}`} /> }
                }) 
                return (
                    <EnhancedTable titleTable={<Translate id="investigation.create.summary.patients" />} rows={rows} headCells={headCells} 
                        actions={{"view":(index => showPatient(index)), "add" : (index) => selectPatient(index)}}
                        />
                )
            }
        }
        else{
            return (
            <Typography variant="subtitle1" color="textPrimary">
                You don't have permission to add new patients
            </Typography>)
        }
    }
    function renderSurveysTable(){
        const headCells = [{ id: "name", alignment: "right", label: <Translate id="investigation.create.personal_data.fields.name" /> }]
        return(
            <EnhancedTable titleTable={<Translate id="investigation.fill.survey.title" />} 
                rows={investigation.surveys.map(survey => {
                    return {name : survey.name}})} 
                headCells={headCells} actions={{"view":(index) => showSurvey(index)}}
                />
        )
    }
    function showSurvey(index){
        setShowForm(4);
        setLevel(0);
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
        
        console.log(patientData);
        
        const request = await Axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+investigation.uuid+"/patient", patientData , { headers: {"Authorization" : localStorage.getItem("jwt")} })
            .catch(err => {console.log('Catch', err); return {status : 401};}); 

        if(request.status === 200){
            //Actualizo los pacientes
            const response = await Axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+investigation.uuid+"/patient", { headers: {"Authorization" : localStorage.getItem("jwt")} })
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
        const response = await Axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+investigation.uuid+"/record/"+patientsData[patientIndex].id+"/survey/"+idSurvey, postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            
        }
        //setShowForm(0);
    }
    function renderAddPatients(){
        if(investigation.shareStatus === 2 && showForm === 0){
            return(
                <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Add new patient<ButtonAdd data-testid="add-patient" onClick={() => setShowForm(1)} />
                    </Typography>
                </Grid>
            )
        }
        else if(investigation.shareStatus !== 2 ){

        }
    }
    function renderForm(){
        switch(showForm){
            case 0:
                return [
                    renderPatientsTable(),
                    <Divider my={6} />,
                    renderSurveysTable()
                ]
            case 1:
                return <PersonalDataForm fields={ investigation.personalFields} keyResearcherInvestigation={investigation.keyResearcherInvestigation}
                            initialData={props.patientInfo} callBackForm={(personalData) => savePatient(personalData)}/>
            case 2: 
            //Add Data
                return <ShowSurveys level={level} updateLevel={(level) => setLevel(level)} mode="add" 
                            patient={decryptedPatientData[patientIndex]} saveRecord={saveRecord}
                            surveys={investigation.surveys} />
            case 3: 
            //View Data
                return <ShowSurveys level={level} updateLevel={(level) => setLevel(level)} mode="view" 
                            patient={decryptedPatientData[patientIndex]} 
                            surveys={investigation.surveys} uuidInvestigation={investigation.uuid}/>

            case 4:
                return <ShowAllRecordsSurvey level={level} updateLevel={(level) => setLevel(level)} survey={investigation.surveys[surveyIndex]} 
                            patients={decryptedPatientData} records={investigation.surveys[surveyIndex].records}/>
            default:
                return null;
        }
    }
    function goBack(){
        if(level === 0){
            setShowForm(0);
        }
        else{
            setLevel(c => c -1);
        }
    }
    if(investigation === false){
        return <Loader />
    }
    else if(errorEncryption){
        console.error("Clave incorrecta");
        return (
            <Alert mb={4} severity="error">
                <Translate id="investigation.share.error.description" />
            </Alert>
        );
    }
    return (
        <Grid container spacing={1} >
            
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom display="inline">
                    {investigation.name}
                </Typography>
            </Grid>
            {
                showForm !== 0 && 
                <Grid item xs={12}>
                    <ButtonBack data-testid="back" onClick={goBack} >Back</ButtonBack>
                </Grid>
            }
            {
                renderAddPatients()
            }
            <Grid item xs={12}>
            {
                renderForm()
            }
            </Grid>
        </Grid>
    )
}
