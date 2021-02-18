
import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { BoxBckgr, IconPatient, ButtonAdd, ButtonGrey } from '../../components/general/mini_components';
import Modal from '../../components/general/modal';
import { yearsFromDate, daysFromDate } from '../../utils'


export default function Patient(props) {
    const [showDataCollections, setShowDataCollections] = useState(false);
    let years = yearsFromDate(props.dateOfBirth);
    let stay = daysFromDate(props.dateIn);
    
    function fillDataCollection(id){
        console.log("Ir a "+id);
    }
    return (
        
        <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
            <Modal open={showDataCollections} closeModal={() => setShowDataCollections(false)}>
                <Grid container spacing={3}  justify="center">
                {
                    props.dataCollections.map(dataCollection => {
                        return(
                            <Grid item>
                                <ButtonGrey onClick={() => fillDataCollection(dataCollection.id)}>{dataCollection.name}</ButtonGrey>
                            </Grid>
                        )
                    })
                }
                </Grid>
            </Modal>
            <Grid container style={{backgroundColor:"white"}} spacing={3}>
                <Grid item container xs={12}>
                    <Grid item container xs={3} >
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {props.number}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <IconPatient gender={props.gender} />
                        </Grid>
                    </Grid>
                    <Grid item container xs={4}>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {props.name} {props.surnames}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                ID: {props.id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {years} years
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {stay} days
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={5}>
                        <Grid item xs={4}>
                            <ButtonAdd onClick={() => setShowDataCollections(!showDataCollections)} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}
