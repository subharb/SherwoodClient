import { Avatar, Grid, List, ListItem, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Loader from '../../../../components/Loader';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import HotelIcon from '@material-ui/icons/Hotel';
import { IconPatient } from '../../../../components/general/mini_components';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';

interface Props {
    loading:boolean,
    name:string,
    uuid:string
    beds:{
        total:number,
        male:number,
        female:number
    },
    editCallBack : () => void,
    viewCallBack : () => void,
    deleteCallBack : () => void,
    settingsCallBack : () => void,
}

const Row = styled(Grid)`
    display:flex;
    border-bottom:2px #ccc solid;
`;

const WardForm:React.FC<Props> = ({loading, name, beds, editCallBack, settingsCallBack, viewCallBack, deleteCallBack}) => {

    if(loading){
        return <Loader />
    }
    else{
        return(
            <Grid container spacing={3} style={{maxWidth:'20rem'}}>
                <Row item container>
                    <Grid item xs={8}>
                        <Typography variant="body2" component="div"> { name }</Typography>
                    </Grid>
                    <Grid item xs={1}>
                       <EditIcon style={{cursor:"pointer"}} onClick={editCallBack } />
                    </Grid>
                    <Grid item xs={1}>
                       <VisibilityIcon style={{cursor:"pointer"}} onClick={viewCallBack } />
                    </Grid>
                    <Grid item xs={1}>
                       <SettingsIcon style={{cursor:"pointer"}} onClick={settingsCallBack } />
                    </Grid>
                    <Grid item xs={1}>
                       <DeleteIcon style={{cursor:"pointer"}} onClick={deleteCallBack } />
                    </Grid>
                </Row>
                <Row item container xs={12} alignItems="center" >
                    <Grid item xs={4} style={{textAlign:'center'}}>
                        <HotelIcon />
                    </Grid>
                    <Grid item xs={4} style={{textAlign:'center'}}>
                        <Typography variant="body2">Number beds</Typography> 
                    </Grid>
                    <Grid item xs={4} style={{textAlign:'center'}}>
                        <Typography variant="body2">{beds.total}</Typography>
                    </Grid>
                </Row>
                <Row item container alignItems="center">
                    <Grid item xs={4} style={{textAlign:'center'}}>
                        <IconPatient gender="male"  width="15"  />
                    </Grid>
                    <Grid item xs={4} style={{textAlign:'center'}}>
                        <Typography variant="body2">Male</Typography>
                    </Grid>
                    <Grid item xs={4} style={{textAlign:'center'}}>
                        <Typography variant="body2">{beds.male}</Typography>
                    </Grid>
                </Row>
                <Row item container alignItems="center">
                    <Grid item xs={4} style={{textAlign:'center'}}>
                        <IconPatient gender="female" width="15" />
                    </Grid>
                    <Grid item xs={4} style={{textAlign:'center'}}>
                        <Typography variant="body2">Female</Typography>
                    </Grid>
                    <Grid item xs={4} style={{textAlign:'center'}}>
                        <Typography variant="body2">{beds.female}</Typography>
                    </Grid>
                </Row>
            </Grid>
            )
    }

}

export default WardForm;