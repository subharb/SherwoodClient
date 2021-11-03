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

import PatientsTable from '../../components/general/PatientsTable';

import { ButtonBack, ButtonCancel, ButtonContinue } from '../../components/general/mini_components';
import { connect } from 'react-redux';

import { useDispatch } from "react-redux";
import { updatePatientsFromId } from '../../redux/actions/patientsActions';
import _ from 'lodash';
import Modal from '../../components/general/modal';
import { DepartmentsAccordionRedux } from './departments/DepartmentsAccordion';
import { yearsFromDate } from '../../utils';

let personalFieldsForm = {};
const ID_FIELD = {
    name : "id",
    required: false,
    type : "text",
    label : "id",
    order: 0
}

function SearchPatients(props){
    const [valuesSearch, setValuesSearch] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState([]);
    

    const patients = props.patients.data && props.investigations.currentInvestigation ? props.patients.data[props.investigations.currentInvestigation.uuid] : [];
    const dispatch = useDispatch();
    const history = useHistory();

    async function searchPatientCallBack(values){
        console.log(values);
        setValuesSearch(values);
        
        const maxPatId = patients.length === 0 ? 0 : patients.length === 1 ? patients[0].id : Math.max.apply(Math, patients.map(function(o) { return o.id; }));

        await dispatch(updatePatientsFromId(props.investigations.currentInvestigation, maxPatId)); 

        
    }
    function backToSearchCallBack(){
        setFilteredPatients([]);
        setShowResults(false);
    }
    
    function patientSelectedCallBack(id){
        console.log(HOSPITAL_PATIENT);
        const selectedPatient = filteredPatients.find(pat => pat.id === id);
        const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", selectedPatient.uuid)
        console.log("Next url", nextUrl);
        history.push(nextUrl);
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
    return <SearchPatientsComponent showResults={showResults} 
                patients={filteredPatients}
                personalFields={props.investigations.currentInvestigation.personalFields}
                searchPatientCallBack={searchPatientCallBack}
                backToSearchCallBack={backToSearchCallBack} 
                patientSelectedCallBack={patientSelectedCallBack}
                permissions={props.investigations.currentInvestigation.permissions}
            />
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

export function SearchPatientsComponent(props) {
    
    const [patientHospitalizeIndex, setPatientHospitalizeIndex] = useState(-1);
    const [patientHospitalized, setPatientHospitalized] = useState(null);

    function backToSearch(){
        props.backToSearchCallBack()
    }
    function patientSelected(id){
        props.patientSelectedCallBack(id);
    }
    function hospitalizePatient(id){
        const findPatientIndex = props.patients.findIndex((pat) => pat.id === id);
        setPatientHospitalizeIndex(findPatientIndex);
        
    }
    
    function confirmHospitalization(){
        setPatientHospitalized({...props.patients[patientHospitalizeIndex]});
    }
    function resetModal(){
        console.log(patientHospitalizeIndex);
        setPatientHospitalizeIndex(-1);
    }
    function renderCore(){
        if(!props.showResults){
            let personalFieldsForm = {}
            props.personalFields.sort((a,b) => a.order - b.order).forEach(personalField => {
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
                            submitText="investigation.search-patients.search" callBackForm={props.searchPatientCallBack} />                        
                    </Paper>
                </Box>
                
                );
        }
        else{
            if(props.patients.length === 0){
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
                let formSearch = [...props.personalFields]
                if(formSearch.length === 0){
                    formSearch.push(ID_FIELD);
                } 
                
                return(
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PatientsTable patients={props.patients} 
                                showPatientCallBack={id => patientSelected(id)} 
                                personalFields={formSearch} permissions={props.permissions}
                                hospitalizePatientCallBack={(index) => hospitalizePatient(index)} />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonBack onClick={backToSearch}><Translate id="pages.hospital.search-patient.back-button" /></ButtonBack>
                        </Grid>
                    </Grid>)
            }
        }
    }
   
    
    return (
        <React.Fragment>
            <Modal key="modal" open={patientHospitalizeIndex !== -1} 
                title={!patientHospitalized ? "¿Desea hospitalizar a este paciente?" : "Seleccione la sala"} 
                closeModal={resetModal}
                >
                    {
                        (patientHospitalizeIndex !== -1 && !patientHospitalized) &&
                        <Grid container>
                            <Grid item xs={12}>
                                {
                                    props.patients[patientHospitalizeIndex].personalData.health_id &&
                                    [
                                        <Translate id="investigation.create.personal_data.fields.health_id" />, ",", props.patients[patientHospitalizeIndex].personalData.health_id
                                    ]
                                }
                                {
                                    !props.patients[patientHospitalizeIndex].personalData.health_id && 
                                    <Typography variant="body2" >
                                        <Translate id="investigation.create.personal_data.fields.uuid" />:{ props.patients[patientHospitalizeIndex]?.id}
                                    </Typography>
                                }
                                <Typography variant="body2">
                                    <Translate id="investigation.create.personal_data.fields.name" />: {props.patients[patientHospitalizeIndex].personalData.name}
                                </Typography>
                                <Typography variant="body2">
                                    <Translate id="investigation.create.personal_data.fields.surnames" />: {props.patients[patientHospitalizeIndex].personalData.surnames}    
                                </Typography>
                                <Typography variant="body2">
                                    <Translate id="investigation.create.personal_data.fields.sex" />: {props.patients[patientHospitalizeIndex].personalData.sex === "Male" ? <Translate id="general.male" /> : <Translate id="general.female" />}    
                                </Typography>
                                <Typography variant="body2">
                                    <Translate id="hospital.analytics.graphs.age.table-title" />: {yearsFromDate(props.patients[patientHospitalizeIndex].personalData.birthdate)}    
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                    <Translate id="general.cancel" />
                                </ButtonCancel>
                                <ButtonContinue onClick={confirmHospitalization} data-testid="continue-modal" color="primary">
                                    <Translate id="general.continue" />
                                </ButtonContinue>
                            </Grid>
                        </Grid>
                    }
                    {
                        patientHospitalized &&
                        <DepartmentsAccordionRedux currentInvestigation={props.investigations.currentInvestigation} 
                            uuidPatient={patientHospitalized.uuid} />
                    }
                    
            </Modal>
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
