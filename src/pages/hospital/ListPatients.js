import React from 'react'
import { BoxBckgr } from '../../components/general/mini_components';
import { useRouter } from '../../hooks';
import { Button, Grid, Typography, Box, Link } from '@material-ui/core';
import PatientButton from '../../components/general/PatientButton';
import PropTypes from 'prop-types';

function ListPatients(props) {
    const { pathname }= useRouter(props.initialState ? props.initialState.pathname : false);

    return (
        <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{textAlign:"center", color:"white"}}>
                    <Typography variant="h4" gutterBottom display="inline">
                        {props.name} {props.surnames}
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{color:"white"}}>
                    <Typography variant="h4" gutterBottom display="inline">
                        Hospital Ward
                    </Typography>
                </Grid>
                <Grid item xs={12} container spacing={3} justify="center">
                    {props.listPatients.map(item => {
                        if(item.dateIn === null){
                            return(
                                <Grid item>
                                    <PatientButton type="ward" />
                                </Grid>
                            )
                        }
                        else{
                            
                            return(
                                <Grid item>
                                    <PatientButton name={item.patient.name} surnames={item.patient.surnames}
                                    type="ward" age="23 years" gender={item.patient.gender} number={item.number}/>
                                </Grid>
                            )
                        }
                        
                    })}
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}

ListPatients.propTypes = {
    name:PropTypes.string,
    surnames:PropTypes.string,
    listPatients:PropTypes.array
}

export default ListPatients