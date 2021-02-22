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

let personalFieldsForm = {};

export default function SearchPatients(props) {
    const {investigations, isLoading, error} = useInvestigations(props.investigations ? props.investigations : null);
    const { decryptedPatientData, errorEncryption} = usePatientsData(investigations ? investigations[0] : null, investigations ? investigations[0].patientsPersonalData : []);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const history = useHistory();
    

    useEffect(() => {
        if(investigations){
            investigations[0].personalFields.forEach(personalField => {
                personalFieldsForm[personalField] = {
                    required : false,
                    type:"text",
                    label:"investigation.create.personal_data.fields."+personalField,
                    shortLabel:"investigation.create.personal_data.fields."+personalField,
                    validation : "notEmpty"
                }
            });
        }
    }, [investigations])
    function backToSearch(){
        setFilteredPatients([]);
        setShowResults(false);
    }
    function patientSelected(index){
        console.log(HOSPITAL_PATIENT);
        const nextUrl = HOSPITAL_PATIENT.replace(":idPatient", filteredPatients[index].id)
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
                if(value !== "" && !patient[keyValue].toLowerCase().includes(value.toLowerCase())){
                    result = false;
                }
            }
            return result;
        });
        setFilteredPatients(filteredPatients);
    }
    function renderCore(){
        if(!showResults){
            return (
                <Box p={1}>
                    <Paper>
                        <Form fields={personalFieldsForm} selectRow={(index) =>patientSelected(index)} 
                            callBackForm={searchPatientCallBack}/>
                    </Paper>
                </Box>
                
                );
        }
        else{
            if(filteredPatients.length === 0){
                return (
                    <Box p={1}>
                        <Paper>
                            No patients meet the criteria
                        </Paper>
                    </Box>
                )
                
            }
            else{
                const headCells = investigations[0].personalFields.map(pField =>{
                    return { id:pField, alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.${pField}`} /> }
                });
                const rows = filteredPatients.map(patient => {
                    let tempData = {}
                    for(const pField of investigations[0].personalFields){
                        tempData[pField] = patient[pField]
                    }
                    return tempData;
                })  
                return(
                    [
                        <EnhancedTable noHeader noSelectable headCells={headCells} 
                            selectRow={patientSelected} rows={rows}/>,
                        <Button onClick={backToSearch}>Close</Button>
                    ]
                )
            }
        }
                    
    }
    if(isLoading){
        return <Loader />
    }
    return (
        <BoxBckgr color="text.primary" style={{padding:"1rem", color:"white"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <Typography variant="h4" gutterBottom display="inline">
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

