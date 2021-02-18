import React, { useState } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core';
import { BoxBckgr, IconPatient, ButtonAdd, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import { yearsFromDate, daysFromDate } from '../../utils';
import Form from '../../components/general/form';
import Modal from '../../components/general/modal';
import axios from 'axios';
import { Translate } from 'react-localize-redux';
import { Alert } from "@material-ui/lab";
import Loader from '../../components/Loader';

export default function FillDataCollection(props) {
    const [loading, setLoading] = useState(props.initialState ? props.initialState.loading : false)
    const [error, setError] = useState(props.initialState ? props.initialState.error : false)
    const [saved, setSaved] = useState(props.initialState ? props.initialState.saved : false)
    let years = yearsFromDate(props.dateOfBirth);
    let stay = daysFromDate(props.dateIn);

    async function saveRecord(data){
        //No iteramos por secciones porque en modo hospital se supone que solo habrá una sección
        console.log(data);
        setLoading(true);
        const postObj = {submission : [
            {
                id_section:props.dataCollection.sections[0]._id,
                answers:data
            }
            ]
        }
        const response = await axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+props.investigation.uuid+"/record/"+props.patientId+"/survey/"+props.dataCollection._id, postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            setSaved(true);
            setTimeout(() => {
                props.callBackDataCollection()
              }, 1000);
        }
        else{
            setError(true);
        }
        setLoading(false);
    }
    if(error){
        return(
            <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
                <Alert mb={4} severity="error">
                    <Translate id="investigation.share.error.description" />
                </Alert>
            </BoxBckgr>
            
        )
    }
    return (
        <BoxBckgr color="text.primary">
            <Modal open={loading || saved}>
                {
                    loading &&
                    <Loader />
                }
                {
                    saved &&
                    <CheckCircleOutlineSvg style={{ color: "green",fontSize: 80 }}/>
                }
                
            </Modal>
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
                                    callBackForm = {(values) => saveRecord(values)}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}
