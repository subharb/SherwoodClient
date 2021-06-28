import React, { useState } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core';
import { BoxBckgr, IconPatient, ButtonAdd, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import SectionForm from '../../components/general/SectionForm';
import PropTypes from 'prop-types';

export default function FillDataCollection(props) {
        
    return (
        <React.Fragment>
            <Grid container  spacing={3}>
                <Grid item container xs={12} spacing={3} style={{color:"white", padding:"1rem"}}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            {props.dataCollection.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{padding:"1rem"}} >
                            <SectionForm initData={props.initData} key={props.sectionSelected.uuid} 
                                fields={props.sectionSelected.fields.sort((a,b) => a.order - b.order)} 
                                callBackSectionForm = {(values) => props.callBackDataCollection(values)}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

FillDataCollection.propTypes = {
    sectionSelected : PropTypes.object,
    /** Data Collection */
    dataCollection: PropTypes.object.isRequired,
    /** Callback function from parent */
    callBackDataCollection: PropTypes.func.isRequired,
  };