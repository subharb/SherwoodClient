import React from 'react'
import { BoxBckgr } from '../../components/general/mini_components';
import { useRouter } from '../../hooks';
import { Button, Grid, Typography, Box, Link } from '@material-ui/core';

export default function ListPatients(props) {
    const { pathname }= useRouter(props.initialState ? props.initialState.pathname : false);

    return (
        <BoxBckgr color="text.primary">
            <Grid container spacing={3}>
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <Typography variant="h4" gutterBottom display="inline">
                        {props.name} {props.surnames}
                    </Typography>
                </Grid>
                
            </Grid>
        </BoxBckgr>
    )
}
