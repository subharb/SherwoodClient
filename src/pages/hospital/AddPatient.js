
import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Grid, IconButton, Paper, Snackbar, Typography } from '@material-ui/core';
import PersonalDataForm from '../../components/investigation/show/single/personal_data';
import { connect } from 'react-redux';
import { savePatientAction, updatePatientAction } from '../../redux/actions/patientsActions';
import { CloseIcon } from '@material-ui/data-grid';
import Loader from '../../components/Loader';
import { Translate } from 'react-localize-redux';
import { BoxBckgr } from '../../components/general/mini_components';
import { useDispatch } from "react-redux";
import { PersonAddSharp, EditOutlined } from '@material-ui/icons';

export function AddPatient(props) {
    let { uuidPatient } = useParams();

    const patient = uuidPatient && props.investigations.data && props.patients.data ? props.patients.data[props.investigations.currentInvestigation.uuid].find(pat => pat.uuid === uuidPatient) : null
    return <AddPatientComponent investigations={props.investigations} patient={patient} />
}   

export function AddPatientComponent(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showSnackbar, setShowSnackBar] = useState(false);

    
    const dispatch = useDispatch();

    function handleClose(){
        setShowSnackBar(false);
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
            setShowSnackBar(true);
        }
        catch(error){
            setIsLoading(true);
            setError(true);
        }
    }
    if(props.investigations.loading || isLoading){
        return <Loader />
    }
    return (
        <BoxBckgr color="text.primary" style={{color:"white"}}>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSnackbar}
                autoHideDuration={2000}
                onClose={handleClose}
                message={props.patient ? <Translate id="hospital.patient.updated-patient" /> : <Translate id="hospital.patient.new-patient" />}
                action={
                <React.Fragment>
                    <Button color="secondary" size="small" onClick={handleClose}>
                    
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
            <Grid container spacing={3}>
                <Grid item xs={12} style={{display:"flex", justifyContent:"center", alignItems:"center", color:"white"}}>
                    <Typography variant="h1" gutterBottom display="inline" style={{marginBottom:"0px"}}>
                    {
                        !props.patient &&
                        [<PersonAddSharp style={{fontSize:"2.5rem"}} />,
                        <Translate id="pages.hospital.add-patient" />]
                    }
                    {
                        props.patient &&
                        [<EditOutlined style={{fontSize:"2.5rem"}} />,
                        <Translate id="pages.hospital.edit-patient" />]
                    }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{padding:'1rem'}}>
                        <PersonalDataForm fields={ props.investigations.currentInvestigation.personalFields} hospital={true}
                            keyResearcherInvestigation={props.investigations.currentInvestigation.keyResearcherInvestigation}
                            submitText={props.patient ? "general.update" : null}
                            initialData={props.patient ? props.patient.personalData : null} callBackForm={(personalData) => saveUpdatePatient(personalData)}/>
                    </Paper>
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}

AddPatientComponent.propTypes = {
    /** Checks if it's in loading state */
    investigations:PropTypes.object

  };

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations,
        patients:state.patients
    }
}
export default connect(mapStateToProps, null)(AddPatient)
