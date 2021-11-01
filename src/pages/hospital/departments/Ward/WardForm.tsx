import { Avatar, Grid, List, ListItem, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Loader from '../../../../components/Loader';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import HotelIcon from '@material-ui/icons/Hotel';
import { IconPatient } from '../../../../components/general/mini_components';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';


export enum WardFormModes {
    Edit = "edit",
    Select = "select"
}
interface Props {
    name:string,
    beds:{
        total:number,
        male:number,
        female:number
    },
    mode?:WardFormModes,
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

const WardForm:React.FC<Props> = ({mode, name, beds, editCallBack, settingsCallBack, viewCallBack, deleteCallBack, selectWardCallBack}) => {


    return(
        <Grid container item spacing={3} style={{maxWidth:'20rem', marginRight:'2rem', marginBottom:'1rem'}}>
            <Row item container>
                <Grid item xs={8}>
                    <Typography variant="body2" component="div"> { name }</Typography>
                </Grid>
                {
                    mode === WardFormModes.Edit && 
                    <React.Fragment>
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

export default WardForm;