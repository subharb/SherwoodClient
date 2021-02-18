
import React, { useState } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core';
import styled from 'styled-components';
import { BoxBckgr, IconPatient, ButtonAdd, ButtonGrey } from '../../components/general/mini_components';
import Modal from '../../components/general/modal';
import { yearsFromDate, daysFromDate } from '../../utils';
import FillDataCollection from './FillDataCollection';


export default function Patient(props) {
    const [showDataCollections, setShowDataCollections] = useState(false);
    const [dataCollectionSelected, setDataCollectionSelected] = useState(null);
    let years = yearsFromDate(props.dateOfBirth);
    let stay = daysFromDate(props.dateIn);
    
    function fillDataCollection(dataCollection){
        setShowDataCollections(false);
        setDataCollectionSelected(dataCollection);
    }
    function callBackDataCollection(){
        console.log("Patient Data saved!");
    }
    return (
        
        <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
            <Modal open={showDataCollections} closeModal={() => setShowDataCollections(false)}>
                <Grid container spacing={3} >
                {
                    props.dataCollections.map(dataCollection => {
                        return(
                            <Grid item xs={12} style={{textAlign:"center"}}>
                                <ButtonGrey onClick={() => fillDataCollection(dataCollection)}>{dataCollection.name}</ButtonGrey>
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
                                ID: {props.patientID}
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
                    <Grid item container xs={5}  justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <ButtonAdd onClick={() => setShowDataCollections(!showDataCollections)} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                        {
                            dataCollectionSelected !== null &&
                            <FillDataCollection key={dataCollectionSelected._id} dataCollection={dataCollectionSelected}
                                patientId={props.patientId} investigation={props.investigation} callBackDataCollection={callBackDataCollection}/>
                        }
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}
