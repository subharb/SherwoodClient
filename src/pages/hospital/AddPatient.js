
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Grid, IconButton, Paper, Snackbar, Typography } from '@material-ui/core';
import PersonalDataForm from '../../components/investigation/show/single/personal_data';
import { connect } from 'react-redux';
import { savePatientAction, updatePatientAction } from '../../redux/actions/patientsActions';
import { CloseIcon } from '@material-ui/data-grid';
import Loader from '../../components/Loader';
import { Translate } from 'react-localize-redux';
import { BoxBckgr, GridContainer } from '../../components/general/mini_components';
import { useDispatch } from "react-redux";
import { PersonAddSharp, EditOutlined } from '@material-ui/icons';
import { useSnackBarState, useUpdateEffect } from '../../hooks';
import { Alert } from '@material-ui/lab';
import { PERSONAL_ACCESS } from '../../constants';
import { ROUTE_401, ROUTE_404 } from '../../routes';
import { areSameBirthDates } from '../../utils';
import Modal from '../../components/general/modal';
import { PERMISSION } from '../../constants/types';

export function AddPatient(props) {
    let { uuidPatient } = useParams();
    
    const patient = uuidPatient && props.investigations.data && props.patients.data ? props.patients.data[props.investigations.currentInvestigation.uuid].find(pat => pat.uuid === uuidPatient) : null
    const patientsInvestigation = props.investigations.currentInvestigation &&  props.patients.data ? props.patients.data[props.investigations.currentInvestigation.uuid] : [];
    return <AddPatientComponent investigations={props.investigations} patient={patient} patientsInvestigation={patientsInvestigation} {...props} />
}   

export function AddPatientComponent(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [confirmPatient, setConfirmPatient] = useState(null);
    const [lastPatient, setLastPatient] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();

    function handleClose(){
        setShowSnackbar({show:false});
    }
    useUpdateEffect(() => {
        if(!props.patients.loading){
            let messageId = "";
            let severity = "success";
            if(props.patient){
                messageId = "hospital.patient.updated-patient";
            }
            else{
                messageId = "hospital.patient.new-patient";
            }
            if(props.patients.error === 2){
                messageId += "-offline";
                severity = "warning";
            }
            else if(props.patients.error){
                messageId = "hospital.patient.error";
                severity = "error";
            }
            setShowSnackbar({show:true, severity:severity, message : messageId});
            setLastPatient(props.patientsInvestigation[props.patientsInvestigation.length -1])
        }
        
    }, [props.patients.loading])

    function goToPatient(){
        const uuidPatient = props.patient ? props.patient.uuid : lastPatient.uuid;
        history.push(`/patient/${uuidPatient}`);
    }
    async function callBackSaveUpdate(patientData, rawPatientData){
        if(!props.patient){
            //Si es guardar, verifica si este paciente ya estaba
            const existingPatient = props.patients.data[props.investigations.currentInvestigation.uuid].find((pat) => {
                if(rawPatientData.hasOwnProperty("health_id") && pat.personalData["health_id"] === rawPatientData["health_id"]){
                    return true;
                }
                const rawName = rawPatientData["name"].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const rawSurName = rawPatientData["surnames"].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const patName = pat.personalData["name"].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const patSurname = pat.personalData["surnames"].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                console.log(`${rawName} === ${patName} =>${rawName === patName}`);
                console.log(`${rawSurName} === ${patSurname} =>${rawSurName === patSurname}`);
                console.log(`${rawPatientData["birthdate"]} === ${pat.personalData["birthdate"]} =>${areSameBirthDates(rawPatientData["birthdate"], pat.personalData["birthdate"])}`);
                
                if(rawName === patName && 
                    rawSurName === patSurname &&
                    areSameBirthDates(rawPatientData["birthdate"], pat.personalData["birthdate"]))
                return true;
            });
            if(existingPatient){
                //showModal    
                setConfirmPatient({
                    rawData : rawPatientData,
                    encryptedData: patientData
                });
                return;
            }
        }
        saveUpdatePatient(patientData)
    }
    async function saveUpdatePatient(patientData){
        try{
            setIsLoading(true);
            
            if(props.patient){
                await dispatch( updatePatientAction(props.investigations.currentInvestigation, props.patient.uuid, patientData));
                
            }
            else{
                await dispatch( savePatientAction(props.investigations.currentInvestigation, patientData));
                
            }
            setIsLoading(false);   
            setConfirmPatient(null);   
        }
        catch(error){
            setIsLoading(true);
            setShowSnackbar({show:true, severity:"error", message : "hospital.patient.error"});
        }
    }
    if(props.investigations.loading || isLoading){
        return <Loader />
    }
    else if(!props.investigations.currentInvestigation.permissions.includes(PERMISSION.PERSONAL_ACCESS)){
        history.push(ROUTE_401);
        return <Loader />
    }
    return (
        <BoxBckgr color="text.primary">
            <Modal key="modal" open={confirmPatient} 
                title={<Translate id="pages.hospital.confirm-patient.title" />}
                closeModal={() => setConfirmPatient(null)}
                confirmAction={() => saveUpdatePatient(confirmPatient.encryptedData)}>
                    {
                        confirmPatient &&
                        [<Translate id="pages.hospital.confirm-patient.description" />,
                        <div>
                            {
                                confirmPatient.rawData.hasOwnProperty("health_id") && 
                                <p><Translate id="investigation.create.personal_data.fields.health_id" />: {confirmPatient.rawData["health_id"]}</p>
                            }
                            <p><Translate id="investigation.create.personal_data.fields.name" />: {confirmPatient.rawData["name"]}</p>
                            <p><Translate id="investigation.create.personal_data.fields.surnames" />: {confirmPatient.rawData["surnames"]}</p>
                            <p><Translate id="investigation.create.personal_data.fields.birthdate" />: {confirmPatient.rawData["birthdate"].toLocaleDateString()}</p>
                        </div>
                        ]
                    }
                
            </Modal>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSnackbar.show}
                autoHideDuration={4000}
                onClose={handleClose}>
                    {
                        showSnackbar.message && 
                        <>
                        <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                            <Translate id={showSnackbar.message} />
                            {
                                showSnackbar.severity === "success" &&
                                <Button onClick={goToPatient} size="small">
                                    <Translate id="pages.hospital.go-to-patient" />
                                </Button>
                            }
                            
                        </Alert>
                        
                        </>
                    }
                </Snackbar>
            
            <Grid container spacing={3}>
                <GridContainer item xs={12}>
                    {!props.patient &&
                        <PersonAddSharp style={{fontSize:"2.5rem"}} />
                    }
                    {
                        props.patient &&
                        <EditOutlined style={{fontSize:"2.5rem"}} />
                    }
                    <Typography variant="h1" gutterBottom display="inline" style={{marginBottom:"0px"}}>
                    {
                        !props.patient &&
                        <Translate id="pages.hospital.add-patient" />
                    }
                    {
                        props.patient &&
                        <Translate id="pages.hospital.edit-patient" />
                    }
                    </Typography>
                </GridContainer>
                <Grid item xs={12}>
                    <Paper style={{padding:'1rem'}}>
                        <PersonalDataForm fields={ props.investigations.currentInvestigation.personalFields} hospital={true}
                            keyResearcherInvestigation={props.investigations.currentInvestigation.keyResearcherInvestigation}
                            submitText={props.patient ? "general.update" : null}
                            initialData={props.patient ? props.patient.personalData : null} 
                            callBackForm={(personalData, rawPersonalData) => callBackSaveUpdate(personalData, rawPersonalData)}/>
                    </Paper>
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}

AddPatientComponent.propTypes = {
    investigations:PropTypes.object

  };

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations,
        patients:state.patients
    }
}
export default connect(mapStateToProps, null)(AddPatient)
