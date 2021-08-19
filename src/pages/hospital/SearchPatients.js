import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { Search as SearchPatientIcon } from "@material-ui/icons";
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core';
import Form  from '../../components/general/form';
import {useHistory, useParams} from 'react-router-dom';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { HOSPITAL_PATIENT, ROUTE_404 } from '../../routes';
import Loader from '../../components/Loader';
import { decryptPatientsData } from '../../utils'; 
import PatientsTable from '../../components/general/PatientsTable';
import { Alert } from '@material-ui/lab';
import { ButtonBack } from '../../components/general/mini_components';
import { connect } from 'react-redux';
import { PERSONAL_READ } from '../../constants';
import { useDispatch } from "react-redux";
import { updatePatientsFromId } from '../../redux/actions/patientsActions';
import _ from 'lodash';

let personalFieldsForm = {};
const ID_FIELD = {
    name : "id",
    required: false,
    type : "text",
    label : "id",
    order: 0
}
function SearchPatients(props) {
    
    //const [decryptedPatientData, setDecryptedPatientData] = useState([]);//usePatientsData(investigations ? investigations[0] : null, investigations ? investigations[0].patientsPersonalData : []);
    
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();
    const patients = props.patients.data && props.investigations.currentInvestigation ? props.patients.data[props.investigations.currentInvestigation.uuid] : [];

    const [valuesSearch, setValuesSearch] = useState(null);

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
    async function searchPatientCallBack(values){
        console.log(values);
        setValuesSearch(values);
        
        const maxPatId = patients.length === 0 ? 0 : patients.length === 1 ? patients[0].id : Math.max.apply(Math, patients.map(function(o) { return o.id; }));

        await dispatch(updatePatientsFromId(props.investigations.currentInvestigation, maxPatId)); 

        
    }
    function renderCore(){
        if(!showResults){
            let personalFieldsForm = {}
            props.investigations.currentInvestigation.personalFields.sort((a,b) => a.order - b.order).forEach(personalField => {
                            const copyField = {...personalField};
                            copyField.required = false;
                            personalFieldsForm[personalField.name] = copyField
                        });
            if(Object.keys(personalFieldsForm).length === 0){
                personalFieldsForm["id"] = ID_FIELD;
            }      
            
            return (
                <Box>
                    <Paper style={{padding:'1rem', margin:'1rem'}}>
                        <Translate id="pages.hospital.search-patient.note" />
                        <Form fields={personalFieldsForm} selectRow={(index) =>patientSelected(index)} 
                            submitText="investigation.search-patients.search" callBackForm={searchPatientCallBack} />
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
                let formSearch = [...props.investigations.currentInvestigation.personalFields]
                if(formSearch.length === 0){
                    formSearch.push(ID_FIELD);
                } 
                
                return(
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PatientsTable patients={filteredPatients} 
                                showPatientCallBack={id => patientSelected(id)} 
                                personalFields={formSearch} />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonBack onClick={backToSearch}><Translate id="pages.hospital.search-patient.back-button" /></ButtonBack>
                        </Grid>
                    </Grid>)
            }
        }
    }
    useEffect(() => {
        if(!props.patients.loading && valuesSearch !== null){
            setShowResults(true); 
            let filteredPatients = [];
            if(valuesSearch.hasOwnProperty("id")){
                filteredPatients = patients.filter(pat => pat.id === parseInt(valuesSearch["id"]))
            }
            else{
                //Filtrar decryptedPatientData con values
                
                filteredPatients = patients.sort((a,b) => b.id - a.id).filter(patient =>{
                    let result = true;
                    for(const keyValue of Object.keys(valuesSearch)){
                        const value = valuesSearch[keyValue];
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
            }
        
            setFilteredPatients(filteredPatients);
        }
    }, [props.patients.loading])
    if(!props.investigations.data || props.patients.loading){
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