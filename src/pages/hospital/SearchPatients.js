import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { BoxBckgr } from '../../components/general/mini_components';
import { Grid, Typography } from '@material-ui/core';
import Form  from '../../components/general/form';

export default function SearchPatients(props) {
    
    let personalFieldsForm = {};

    props.personalFields.forEach(personalField => {
        personalFieldsForm[personalField] = {
            required : false,
            type:"text",
            label:"investigation.create.edc."+personalField,
            shortLabel: "investigation.table.is_personal_data",
            validation : "notEmpty"
        }
    });
    function searchPatientCallBack(){

    }
    return (
        <BoxBckgr color="text.primary" style={{padding:"1rem", color:"white"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <Typography variant="h4" gutterBottom display="inline">
                        Search Patients
                    </Typography>
                </Grid>
                <Form fields={personalFieldsForm} callBackForm={searchPatientCallBack}/>
        </Grid>
        </BoxBckgr>
    )
}

SearchPatients.propTypes = {
    personalFields:PropTypes.array
}

