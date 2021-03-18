import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { BoxBckgr, CloseButton } from '../../components/general/mini_components';
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core';
import Form  from '../../components/general/form';
import { usePatientsData, useInvestigations } from '../../hooks';
import {useHistory, useParams} from 'react-router-dom';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { HOSPITAL_PATIENT } from '../../routes';
import Loader from '../../components/Loader';
import { decryptPatientsData } from '../../utils'; 
import PatientsTable from '../../components/general/PatientsTable';

let personalFieldsForm = {};

export default function SearchPatients(props) {
    const {investigations, isLoading, error} = useInvestigations(props.investigations ? props.investigations : null);
    const [decryptedPatientData, setDecryptedPatientData] = useState([]);//usePatientsData(investigations ? investigations[0] : null, investigations ? investigations[0].patientsPersonalData : []);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if(investigations){
            investigations[0].personalFields.sort((a,b) => a.order - b.order).forEach(personalField => {
                const copyField = {...personalField};
                copyField.required = false;
                personalFieldsForm[personalField.name] = copyField
            });
            setDecryptedPatientData(decryptPatientsData(investigations[0].patientsPersonalData, investigations[0]))
        }
    }, [investigations])
    function backToSearch(){
        setFilteredPatients([]);
        setShowResults(false);
    }
    function patientSelected(id){
        console.log(HOSPITAL_PATIENT);
        const selectedPatient = filteredPatients.find(pat => pat.id === id);
        const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", selectedPatient.uuid)
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    function searchPatientCallBack(values){
        console.log(values);
        setShowResults(true); 
        //Filtrar decryptedPatientData con values
        const filteredPatients = decryptedPatientData.filter(patient =>{
            let result = true;
            for(const keyValue of Object.keys(values)){
                const value = values[keyValue];
                const pF = investigations[0].personalFields.find(pp => pp.name === keyValue);
                if(pF.options.length > 0){
                    if(value !== "" && patient.personalData[keyValue] !== value){
                        result = false;
                    }
                }
                else{
                    if(value !== "" && !patient.personalData[keyValue].toLowerCase().includes(value.toLowerCase())){
                        result = false;
                    }
                }
                
            }
            return result;
        });
        setFilteredPatients(filteredPatients);
    }
    function renderCore(){
        if(!showResults){
            return (
                <Box>
                    <Paper style={{padding:'1rem'}}>
                        <Form fields={personalFieldsForm} selectRow={(index) =>patientSelected(index)} 
                            submitText="investigation.search-patients.search" callBackForm={searchPatientCallBack}/>
                    </Paper>
                </Box>
                
                );
        }
        else{
            if(filteredPatients.length === 0){
                return ([
                    <Box >
                        <Paper style={{padding:'1rem'}}>
                            No patients meet the criteria
                        </Paper>
                    </Box>,    
                    <Button onClick={backToSearch}><Translate id="pages.hospital.search-patient.back-button" /></Button>,
                ])
                
            }
            else{
                
                return [
                    <PatientsTable patients={filteredPatients} mobile 
                        showPatientCallBack={id => patientSelected(id)} 
                        personalFields={investigations[0].personalFields} />,
                    <Button onClick={backToSearch}><Translate id="pages.hospital.search-patient.back-button" /></Button>,
                ]
            }
        }
                    
    }
    if(isLoading){
        return <Loader />
    }
    return (
        <React.Fragment>
            <Grid container spacing={3} >
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <Typography variant="h1" gutterBottom display="inline"  style={{color:"white"}}>
                        <Translate id="pages.hospital.search-patient.title" />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    
                        {
                        renderCore()
                        }     
                                
                </Grid>         
            </Grid>
        </React.Fragment>
    )
}

SearchPatients.propTypes = {
    personalFields:PropTypes.array,
}

