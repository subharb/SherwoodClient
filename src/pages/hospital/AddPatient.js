import { Box, Button, Grid, IconButton, Paper, Snackbar, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import PersonalDataForm from '../../components/investigation/show/single/personal_data';
import { connect } from 'react-redux';
import { addPatient } from '../../services/sherwoodService';
import { CloseIcon } from '@material-ui/data-grid';
import Loader from '../../components/Loader';
import { Translate } from 'react-localize-redux';
import { BoxBckgr } from '../../components/general/mini_components';

export function AddPatient(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showSnackbar, setShowSnackBar] = useState(false);

    function handleClose(){
        setShowSnackBar(false);
    }
    async function savePatient(patientData){
        try{
            setIsLoading(true);
            const response = await addPatient(props.investigations.data[0].uuid, patientData);
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
                message="Patient Added"
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
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <Typography variant="h1" gutterBottom display="inline">
                        <Translate id="pages.hospital.add-patient" />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{padding:'1rem'}}>
                        <PersonalDataForm fields={ props.investigations.data[0].personalFields} keyResearcherInvestigation={props.investigations.data[0].keyResearcherInvestigation}
                            initialData={props.patientInfo} callBackForm={(personalData) => savePatient(personalData)}/>
                    </Paper>
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations
    }
}
export default connect(mapStateToProps, null)(AddPatient)
