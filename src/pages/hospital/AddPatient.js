import { Box, Button, IconButton, Paper, Snackbar } from '@material-ui/core';
import React, { useState } from 'react'
import PersonalDataForm from '../../components/investigation/show/single/personal_data';
import { connect } from 'react-redux';
import { addPatient } from '../../services/sherwoodService';
import { CloseIcon } from '@material-ui/data-grid';
import Loader from '../../components/Loader';

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
            const response = await addPatient(props.investigations[0].uuid, patientData);
            setIsLoading(false);
            setShowSnackBar(true);
        }
        catch(error){
            setIsLoading(true);
            setError(true);
        }
    }
    if(props.investigations.length === 0 || isLoading){
        return <Loader />
    }
    return (
        <Box>
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
            <Paper style={{padding:'1rem'}}>
                <PersonalDataForm fields={ props.investigations[0].personalFields} keyResearcherInvestigation={props.investigations[0].keyResearcherInvestigation}
                    initialData={props.patientInfo} callBackForm={(personalData) => savePatient(personalData)}/>
            </Paper>
        </Box>
    )
}

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations
    }
}
export default connect(mapStateToProps, null)(AddPatient)
