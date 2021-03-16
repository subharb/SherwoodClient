import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { BoxBckgr } from '../../components/general/mini_components';
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core';
import Form  from '../../components/general/form';
import { usePatientsData, useInvestigations } from '../../hooks';
import {useHistory, useParams} from 'react-router-dom';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { HOSPITAL_PATIENT } from '../../routes';
import Loader from '../../components/Loader';
import { decryptPatientData } from '../../utils'; 
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
            investigations[0].personalFields.forEach(personalField => {
                const copyField = {...personalField};
                copyField.required = false;
                personalFieldsForm[personalField.name] = copyField
            });
            setDecryptedPatientData(decryptPatientData(investigations[0].patientsPersonalData, investigations[0]))
        }
    }, [investigations])
    function backToSearch(){
        setFilteredPatients([]);
        setShowResults(false);
    }
    function patientSelected(index){
        console.log(HOSPITAL_PATIENT);
        const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", filteredPatients[index].uuid)
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
                    if(value !== "" && patient[keyValue] !== value){
                        result = false;
                    }
                }
                else{
                    if(value !== "" && !patient[keyValue].toLowerCase().includes(value.toLowerCase())){
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
                    <Button onClick={backToSearch}>Close</Button>
                ]
                    
                )
                
            }
            else{
                
                return <PatientsTable patients={filteredPatients} mobile 
                        showPatientCallBack={index => patientSelected(index)} 
                        personalFields={investigations[0].personalFields} />
            }
        }
                    
    }
    if(isLoading){
        return <Loader />
    }
    return (
        <BoxBckgr color="text.primary" style={{color:"white"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <Typography variant="h1" gutterBottom display="inline">
                        Search Patients
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    
                        {
                        renderCore()
                        }     
                                
                </Grid>         
            </Grid>
        </BoxBckgr>
    )
}

SearchPatients.propTypes = {
    personalFields:PropTypes.array,
}

