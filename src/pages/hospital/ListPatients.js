import React from 'react'
import { BoxBckgr } from '../../components/general/mini_components';
import { useRouter } from '../../hooks';
import { Button, Grid, Typography, Box, Link } from '@material-ui/core';
import PropTypes from 'prop-types';

function ListPatients(props) {
    const { pathname }= useRouter(props.initialState ? props.initialState.pathname : false);

    return (
        <BoxBckgr color="text.primary">
            <Grid container spacing={3}>
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <Typography variant="h4" gutterBottom display="inline">
                        {props.name} {props.surnames}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom display="inline">
                        Hospital Ward
                    </Typography>
                </Grid>
                <Grid item xs={12} container>
                    {props.listPatients.map(item => {
                        if(item.dateIn === null){
                            return(
                                <Grid item xs={2}>
                                    FREE
                                </Grid>
                            )
                        }
                        else{
                            return(
                                <Grid item xs={2}>
                                    {item.patient.name}
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