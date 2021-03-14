import React, { useState } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core';
import { BoxBckgr, IconPatient, ButtonAdd, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import { yearsFromDate, daysFromDate } from '../../utils';
import SectionForm from '../../components/general/SectionForm';
import PropTypes from 'prop-types';

export default function FillDataCollection(props) {
    
    let years = yearsFromDate(props.dateOfBirth);
    let stay = daysFromDate(props.dateIn);

    return (
        <BoxBckgr color="text.primary">
            <Grid container  spacing={3}>
                <Grid item container xs={12} spacing={3} style={{color:"white", padding:"1rem"}}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            {props.dataCollection.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{padding:"1rem"}} >
                            <SectionForm fields={props.sectionSelected.fields} 
                                callBackSectionForm = {(values) => props.callBackDataCollection(values)}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}

FillDataCollection.propTypes = {
    /** DateOfBirth */
    dateOfBirth: PropTypes.object.isRequired,
    sectionSelected : PropTypes.number,
    /** Date of entrance in hospital */
    dateIn: PropTypes.object.isRequired,
    /** Data Collection */
    dataCollection: PropTypes.object.isRequired,
    /** Callback function from parent */
    callBackDataCollection: PropTypes.func.isRequired,
  };