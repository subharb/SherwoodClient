import { Avatar, Grid, List, ListItem, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import Loader from '../../../../components/Loader';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import HotelIcon from '@mui/icons-material/Hotel';
import { IconPatient } from '../../../../components/general/mini_components';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';

import { Translate } from 'react-localize-redux';
import { PERMISSION } from '../../../../components/investigation/share/user_roles';


export enum WardFormModes {
    Edit = "edit",
    Select = "select"
}

interface Props {
    name:string,
    beds:{
        total:number,
        male:number,
        female:number,
        undefined:number,
        busyTotal:number,
        busyMale:number,
        busyFemale:number,
        busyUndefined:number
    },
    mode?:WardFormModes,
    permissions:PERMISSION[],
    editCallBack ?: () => void,
    viewCallBack ?: () => void,
    deleteCallBack ?: () => void,
    settingsCallBack ?: () => void,
    selectWardCallBack ?:() => void,
}

interface PropsEdit extends Props{
    editCallBack : () => void,
    viewCallBack : () => void,
    deleteCallBack : () => void,
    settingsCallBack : () => void,
}

interface PropsSelect extends Props{
    selectWardCallBack :() => void
}

const Row = styled(Grid)`
    display:flex;
    border-bottom:2px #ccc solid;
`;

export const WardFormEdit :React.FC<PropsEdit> = (props) => <WardForm {...props} mode={WardFormModes.Edit}/>
export const WardFormSelect :React.FC<PropsSelect> = (props) => <WardForm {...props} mode={WardFormModes.Select}/>

const WardForm:React.FC<Props> = ({mode, name, beds, permissions, editCallBack, settingsCallBack, viewCallBack, deleteCallBack, selectWardCallBack}) => {

    
    return(
        <Grid container item spacing={3} style={{width:'20rem', marginRight:'2rem', marginBottom:'1rem'}}>
            <Row item container>
                <Grid item xs={8}>
                    <Typography variant="body2" component="div"> { name }</Typography>
                </Grid>
                {
                    mode === WardFormModes.Edit && 
                    <React.Fragment>
                        <Grid item xs={1}>
                            <VisibilityIcon style={{cursor:"pointer"}} onClick={viewCallBack } />
                        </Grid>
                        {
                            permissions.includes(PERMISSION.SHARE_RESEARCHERS) &&
                            <React.Fragment>
                                <Grid item xs={1}>
                                    <EditIcon style={{cursor:"pointer"}} onClick={editCallBack } />
                                </Grid>
                                <Grid item xs={1}>
                                    <SettingsIcon style={{cursor:"pointer"}} onClick={settingsCallBack } />
                                </Grid>
                                <Grid item xs={1}>
                                    <DeleteIcon style={{cursor:"pointer"}} onClick={deleteCallBack } />
                                </Grid>
                            </React.Fragment>
                        }
                    </React.Fragment>
                    
                }
                {
                    mode === WardFormModes.Select && 
                    <Grid item xs={4} style={{justifyContent: "right", display: "flex"}}>
                        <ArrowForwardIos style={{cursor:"pointer"}} 
                            onClick={selectWardCallBack } />
                    </Grid>
                }
            </Row>
            <Row item container xs={12} alignItems="center" >
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <HotelIcon />
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Typography variant="body2"><Translate id="hospital.departments.forms.ward.beds" /></Typography> 
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Typography variant="body2">{beds.busyTotal}/{beds.total}</Typography>
                </Grid>
            </Row>
            <Row item container alignItems="center">
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <IconPatient gender="male"  width="15"  />
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Typography variant="body2"><Translate id="general.male" /></Typography>
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Typography variant="body2">{beds.busyMale}/{beds.male}</Typography>
                </Grid>
            </Row>
            <Row item container alignItems="center">
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <IconPatient gender="female" width="15" />
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Typography variant="body2"><Translate id="general.female" /></Typography>
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Typography variant="body2">{beds.busyFemale}/{beds.female}</Typography>
                </Grid>
            </Row>
            <Row item container alignItems="center">
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <IconPatient gender="undefined" width="15" />
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Typography variant="body2"><Translate id="general.undetermined" /></Typography>
                </Grid>
                <Grid item xs={4} style={{textAlign:'center'}}>
                    <Typography variant="body2">{beds.busyUndefined}/{beds.undefined}</Typography>
                </Grid>
            </Row>
        </Grid>
        )
    

}

export default WardForm;