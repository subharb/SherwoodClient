import React, { useState } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core';
import { BoxBckgr, IconPatient, ButtonAdd, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import { yearsFromDate, daysFromDate } from '../../utils';
import Form from '../../components/general/form';




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
                            <Form fields={props.dataCollection.sections[0].fields} 
                                    callBackForm = {(values) => props.callBackDataCollection(values)}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}
