
import React, {useEffect, useState} from 'react'
import { useRouter } from '../../hooks';
import { Button, Grid, Typography, Box } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom'
import { MY_SCHEDULE_ROUTE, SEARCH_PATIENT_ROUTE, 
        HOSPITAL_WARD_ROUTE, OUTPATIENTS_ROUTE, ADD_PATIENT_ROUTE } from '../../routes';
import { ButtonGrey, BoxBckgr } from '../../components/general/mini_components';
import photo_holder from "../../img/photo_holder.svg";
import calendar_image from "../../img/calendar.svg";
import Loader from '../../components/Loader';
import {fetchProfileService} from '../../services/sherwoodService';



export default function HomeSchedule(props) {
    const [loading, setLoading] = useState(false);
    const [profileInfo, setProfileInfo] = useState(null);
    const { pathname }= useRouter(props.initialState ? props.initialState.pathname : false);

    useEffect(() => {
        async function fetchProfile(){
            try{
                setLoading(true);
                const response = await fetchProfileService();
                if(response.status === 200){
                    setProfileInfo(response.profileInfo)
                }
                setLoading(false);
            }
            catch(error){
                console.log(error);

            }
        }
        fetchProfile();
    }, [])
    if(pathname === MY_SCHEDULE_ROUTE){
        return(
            <BoxBckgr color="text.primary">
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <Typography variant="h4" gutterBottom display="inline">
                            {props.name} {props.surnames}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <img src={calendar_image} alt="profile_picture" with="100%" />
                    </Grid>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <Link to={HOSPITAL_WARD_ROUTE}>
                            <ButtonGrey >Hospital Ward</ButtonGrey>
                        </Link>
                    </Grid>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <Link to={OUTPATIENTS_ROUTE}>
                            <ButtonGrey >Outpatients</ButtonGrey>
                        </Link>
                    </Grid>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <Link to={SEARCH_PATIENT_ROUTE}>
                            <ButtonGrey >Consultations</ButtonGrey>
                        </Link>
                    </Grid>
                </Grid>
            </BoxBckgr>
        )
    }
    else{
        if(loading || !profileInfo){
            return <Loader />
        }
        return (
            <BoxBckgr style={{padding:'1rem', color:"white"}} color="text.primary">
                <Grid container spacing={3}>
                    <Grid item  xs={12}>
                        <Typography variant="h3" gutterBottom display="inline">
                            Welcome!
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {profileInfo.name} {profileInfo.surnames}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {profileInfo.department}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {profileInfo.institution}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={photo_holder} alt="profile_picture" with="100%" />
                    </Grid>
                    <Grid item container  spacing={3}>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <Link to={MY_SCHEDULE_ROUTE}>
                                <ButtonGrey >My Schedule</ButtonGrey>
                            </Link>
                        </Grid>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <Link to={SEARCH_PATIENT_ROUTE}>
                                <ButtonGrey >Search Patient</ButtonGrey>
                            </Link>
                        </Grid>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <Link to={ADD_PATIENT_ROUTE}>
                                <ButtonGrey >Add Patient</ButtonGrey>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </BoxBckgr>
        )
    }
    
}