import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { Search as SearchPatientIcon } from "@material-ui/icons";
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core';
import Form  from '../../components/general/form';
import {useHistory, useParams} from 'react-router-dom';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { HOSPITAL_PATIENT } from '../../routes';
import Loader from '../../components/Loader';
import { decryptPatientsData } from '../../utils'; 
import PatientsTable from '../../components/general/PatientsTable';
import { Alert } from '@material-ui/lab';
import { ButtonBack } from '../../components/general/mini_components';
import { connect } from 'react-redux';

let personalFieldsForm = {};

function SearchPatients(props) {
    
    //const [decryptedPatientData, setDecryptedPatientData] = useState([]);//usePatientsData(investigations ? investigations[0] : null, investigations ? investigations[0].patientsPersonalData : []);
    
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const history = useHistory();

    const patients = props.patients.data && props.investigations.currentInvestigation ? props.patients.data[props.investigations.currentInvestigation.uuid] : [];
    // useEffect(() => {
    //     if(props.investigations.currentInvestigation){
    //         props.investigations.currentInvestigation.personalFields.sort((a,b) => a.order - b.order).forEach(personalField => {
    //             const copyField = {...personalField};
    //             copyField.required = false;
    //             personalFieldsForm[personalField.name] = copyField
    //         });
    //         setDecryptedPatientData(decryptPatientsData(props.investigations.currentInvestigation.patientsPersonalData, props.investigations.currentInvestigation))
    //     }
    // }, [props.investigations.currentInvestigation])
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
        const filteredPatients = patients.sort((a,b) => b.id - a.id).filter(patient =>{
            let result = true;
            for(const keyValue of Object.keys(values)){
                const value = values[keyValue];
                const pF = props.investigations.currentInvestigation.personalFields.find(pp => pp.name === keyValue);
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
            let personalFieldsForm = {}
            props.investigations.currentInvestigation.personalFields.sort((a,b) => a.order - b.order).forEach(personalField => {
                            const copyField = {...personalField};
                            copyField.required = false;
                            personalFieldsForm[personalField.name] = copyField
                        });
            
            return (
                <Box>
                    <Paper style={{padding:'1rem'}}>
                        <Translate id="pages.hospital.search-patient.note" />
                        <Form fields={personalFieldsForm} selectRow={(index) =>patientSelected(index)} 
                            submitText="investigation.search-patients.search" callBackForm={searchPatientCallBack}/>
                        
                    </Paper>
                </Box>
                
                );
        }
        else{
            if(filteredPatients.length === 0){
                return ([
                    <Box mb={2}>
                        <Paper style={{padding:'1rem'}}>
                            No patients meet the criteria
                        </Paper>
                    </Box>,    
                    <ButtonBack mt={2} onClick={backToSearch}><Translate id="pages.hospital.search-patient.back-button" /></ButtonBack>,
                ])
                
            }
            else{
                
                return(
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PatientsTable patients={filteredPatients} 
                                showPatientCallBack={id => patientSelected(id)} 
                                personalFields={props.investigations.currentInvestigation.personalFields} />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonBack onClick={backToSearch}><Translate id="pages.hospital.search-patient.back-button" /></ButtonBack>
                        </Grid>
                    </Grid>)
            }
        }
    }
    if(!props.patients.data){
        return <Loader />
    }
    return (
        <React.Fragment>
            <Grid container spacing={2} >
                <Grid item xs={12} style={{display:"flex", justifyContent:"center", alignItems:"center", color:"white"}}>
                    <SearchPatientIcon style={{fontSize:"2.5rem"}} />
                    <Typography variant="h1" gutterBottom display="inline" style={{marginBottom:"0px"}}>
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

const mapStateToProps = (state) =>{
    return {
        patients : state.patients,
        investigations:state.investigations
    }
}

SearchPatients.propTypes = {
    personalFields:PropTypes.array,
}

export default connect(mapStateToProps, null)(SearchPatients)