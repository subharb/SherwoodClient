import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import { Search as SearchPatientIcon } from "@mui/icons-material";
import { Box, Grid, Paper, Typography, Button} from '@mui/material';
import Form  from '../../components/general/form';
import {useHistory} from 'react-router-dom';
import Loader from '../../components/Loader';
import PatientsTable from '../../components/general/PatientsTable';
import { ButtonBack, ButtonCancel, ButtonContinue, GridContainer } from '../../components/general/mini_components';
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import { updatePatientsFromId } from '../../redux/actions/patientsActions';
import _ from 'lodash';
import Modal from '../../components/general/modal';
import { DepartmentsAccordionRedux } from './departments/DepartmentsAccordion';
import { decryptSinglePatientData, getPatientID, yearsFromDate } from '../../utils/index.jsx';
import ICT from '../../components/general/SmartFields/ICT';
import { searchPatientByDiagnosis } from '../../services';
import PatientAppointmentInfo from './Outpatients/PatientAppointmentInfo';
import { HOSPITAL_PATIENT } from '../../routes/urls';
import { TabsSherwood } from '../components/Tabs';

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
    const [patientsDiagnoseLoading, setPatientsDiagnoseLoading] = useState(false);
    const insurances = props.investigations.currentInvestigation ? props.investigations.currentInvestigation.insurances : [];
    const patients = props.patients.data && props.investigations.currentInvestigation ? props.patients.data[props.investigations.currentInvestigation.uuid] : [];
    const dispatch = useDispatch();
    const history = useHistory();

    async function searchPatientCallBack(values){
        console.log(values);
        setValuesSearch(values);
        
        const maxPatId = patients.length === 0 ? 0 : patients.length === 1 ? patients[0].id : Math.max.apply(Math, patients.map(function(o) { return o.id; }));

        await dispatch(updatePatientsFromId(props.investigations.currentInvestigation, maxPatId)); 
        
    }
    function diagnoseSelectedCallBack(ict){
        setPatientsDiagnoseLoading(true);
        searchPatientByDiagnosis(props.investigations.currentInvestigation.uuid, ict["ict-code"])
        .then(response => {
            setShowResults(true); 
            const decryptedPatients = response.patients.map(patient => {
                patient.personalData = decryptSinglePatientData(patient.personalData, props.investigations.currentInvestigation);
                return patient;
            })
            setFilteredPatients(decryptedPatients);
            setPatientsDiagnoseLoading(false);
        })
        .catch(error =>{
            console.error(error);
            setPatientsDiagnoseLoading(false);
        })
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
                            if(typeof value.getMonth === 'function'){
                                const patientBirthday = patient.personalData[keyValue];
                                result = patientBirthday.getFullYear() === value.getFullYear() &&
                                            patientBirthday.getMonth() === value.getMonth() &&
                                            patientBirthday.getDate() === value.getDate();
                            }
                            else if(keyValue === "automated_health_id" && value !== ""){
                                result = patient.personalData["automated_health_id"] === value;
                            }
                            else if(value !== "" && patient.personalData[keyValue] && !patient.personalData[keyValue].toLowerCase().includes(value.toLowerCase())){
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

    if(!props.investigations.data || props.patients.loading || patientsDiagnoseLoading){
        return <Loader />
    }
    return(
        <React.Fragment>
            <SearchPatientsComponent showResults={showResults} 
                patients={filteredPatients} investigation={props.investigations.currentInvestigation}
                personalFields={props.investigations.currentInvestigation.personalFields}
                permissions={props.investigations.currentInvestigation.permissions}
                functionalities={props.investigations.currentInvestigation.functionalities}
                insurances={insurances}
                searchPatientCallBack={searchPatientCallBack}
                backToSearchCallBack={backToSearchCallBack} 
                patientSelectedCallBack={patientSelectedCallBack}
                diagnoseSelectedCallBack={diagnoseSelectedCallBack}
                    />
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

export const SearchPatientsComponent = withLocalize((props) => {
    const [actionPatient, setActionPatient] = useState(null);
    const [patientAppointment, setPatientAppointment] = useState(null);
    const [patientHospitalized, setPatientHospitalized] = useState(null);
    const [makeAppointmentAction, setMakeAppointmentAction] = useState(false);

    function backToSearch(){
        props.backToSearchCallBack()
    }
    function patientSelected(id){
        props.patientSelectedCallBack(id);
    }
    function hospitalizePatient(id){
        const findPatientIndex = props.patients.findIndex((pat) => pat.id === id);
        //setPatientHospitalizeIndex(findPatientIndex);
        setActionPatient({...actionPatient, patientIndex:findPatientIndex, action : "hospitalize", section: "inpatients"})
    }

    function selectAppointmentPatient(id){
       
        const findPatientIndex = props.patients.findIndex((pat) => pat.id === id);
        setPatientAppointment({...props.patients[findPatientIndex]});
        
    }

    function makeAppointmentPatient(){
        setMakeAppointmentAction(true);
    }
    
    function confirm(){
        if(actionPatient.action === "hospitalize"){
            setPatientHospitalized({...props.patients[actionPatient.patientIndex]});
        }
        
        setActionPatient(null);
    }
    function resetModal(){
        setPatientAppointment(null);
        setPatientHospitalized(null);
        setActionPatient(null);
    }

    function renderModal(){
        if(actionPatient || patientAppointment || patientHospitalized){
            const indexPatient = actionPatient ? actionPatient.patientIndex : null;
            return (
                <Modal key="modal" open={actionPatient || patientAppointment || patientHospitalized} 
                    
                    title={actionPatient ? <Translate id={`pages.hospital.${actionPatient.section}.confirm`}/> : patientHospitalized ? <Translate id="pages.hospital.inpatients.choose-ward" /> : <Translate id="pages.hospital.outpatients.title" />} 
                    closeModal={resetModal} >
                        {
                            (actionPatient && actionPatient.action === 'hospitalize')&&
                            <Grid container>
                                <Grid item xs={12}>
                                    {
                                        [
                                            <Translate id="investigation.create.personal_data.fields.health_id" />, ",", getPatientID(props.patients[indexPatient])
                                        ]
                                    }
                                    <Typography variant="body2">
                                        <Translate id="investigation.create.personal_data.fields.name" />: {props.patients[indexPatient].personalData.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        <Translate id="investigation.create.personal_data.fields.surnames" />: {props.patients[indexPatient].personalData.surnames}    
                                    </Typography>
                                    <Typography variant="body2">
                                        <Translate id="investigation.create.personal_data.fields.sex" />: {props.patients[indexPatient].personalData.sex === "Male" ? <Translate id="general.male" /> : <Translate id="general.female" />}    
                                    </Typography>
                                    <Typography variant="body2">
                                        <Translate id="investigation.create.personal_data.fields.birthdate" />: {props.patients[indexPatient].personalData.birthdate.toLocaleDateString()}    
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                    <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                        <Translate id="general.cancel" />
                                    </ButtonCancel>
                                    <ButtonContinue onClick={confirm} data-testid="continue-modal" color="green">
                                        <Translate id="general.continue" />
                                    </ButtonContinue>
                                </Grid>
                                
                            </Grid>
                        }
                        {
                            patientHospitalized &&
                            <DepartmentsAccordionRedux currentInvestigation={props.investigation} 
                                uuidPatient={patientHospitalized.uuid} />
                        }
                        {
                            patientAppointment &&
                            <PatientAppointmentInfo uuidInvestigation={props.investigation.uuid}  uuidPatient={patientAppointment.uuid} 
                                appointmentMadeCallback={resetModal} /> 
                        }
                        
                </Modal>
            )   
        }
        else{
            return null;
        }
        
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
                <TabsSherwood initTab={0} name="Search Patients" 
                    labels={[<Translate id="pages.hospital.search-patient.by-personal-details" />, <Translate id="pages.hospital.search-patient.by-diagnose" />]} >
                    <Box label={<Translate id="pages.hospital.search-patient.by-personal-details" />}>
                        <Paper style={{padding:'1rem', margin:'1rem'}}>
                            <Translate id="pages.hospital.search-patient.note" />
                            <Form fields={personalFieldsForm} selectRow={(index) =>patientSelected(index)} 
                                submitText="investigation.search-patients.search" callBackForm={props.searchPatientCallBack} />                        
                        </Paper>
                    </Box>
                    <Box label={<Translate id="pages.hospital.search-patient.by-diagnose" />}>
                        <Paper style={{padding:'1rem', margin:'1rem'}}>
                            <ICT language={props.activeLanguage.code} elementSelected={props.diagnoseSelectedCallBack}/>
                        </Paper>
                    </Box>
                </TabsSherwood> 
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
                console.log("Patients Results", props.patients);
                return(
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PatientsTable patients={props.patients} 
                                personalFields={formSearch} permissions={props.permissions}
                                functionalities={props.functionalities}
                                insurances={props.insurances ? props.insurances : []}
                                showPatientCallBack={id => patientSelected(id)} 
                                selectAppointmentPatientCallBack={(index) => selectAppointmentPatient(index)}
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
            {
                renderModal()
            }
            <Grid container spacing={2} >
                <GridContainer item xs={12}>
                    <SearchPatientIcon style={{fontSize:"2.5rem"}} />
                    <Typography variant="h1" gutterBottom display="inline" style={{marginBottom:"0px"}}>
                        <Translate id="pages.hospital.search-patient.title" />
                    </Typography>
                </GridContainer>
                
                <Grid item xs={12}>
                    {
                        renderCore()
                    }     
                </Grid>         
            </Grid>
        </React.Fragment>
    )
})