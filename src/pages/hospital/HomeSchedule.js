
import React, {useEffect, useState} from 'react'
import { useRouter } from '../../hooks';
import { connect } from 'react-redux';
import { Button, Grid, Typography, Box } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom'
import { MY_SCHEDULE_ROUTE, SEARCH_PATIENT_ROUTE, 
        HOSPITAL_WARD_SETTINGS_ROUTE, OUTPATIENTS_ROUTE, ADD_PATIENT_ROUTE, HOSPITAL_IMAGES, HOSPITAL_LAB } from '../../routes';
import { ButtonGrey, BoxBckgr, LinkPlain } from '../../components/general/mini_components';
import photo_holder from "../../img/photo_holder.svg";
import calendar_image from "../../img/calendar.svg";
import Loader from '../../components/Loader';
import {selectInvestigation} from '../../redux/actions/investigationsActions';
import { useDispatch } from "react-redux";
import { Translate } from 'react-localize-redux';
import { fetchProfileInfo } from '../../redux/actions/profileActions';
import AllInvestigations from '../../components/investigation/show/all';

function HomeSchedule(props) {
    const [loading, setLoading] = useState(false);
  
    const { pathname }= useRouter(props.initialState ? props.initialState.pathname : false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.investigations.currentInvestigation){
            dispatch(fetchProfileInfo(props.investigations.currentInvestigation.uuid));
        }
    }, [props.investigations])

    async function selectHospital(index){
        await dispatch(selectInvestigation(index));
        localStorage.setItem("indexHospital", index);
    }
    function renderCore(){
        if(props.investigations.data.find(inv => inv.shareStatus === 0)){
            //Pendiente de aprobar
            return <AllInvestigations application="hospital" typeUser={localStorage.getItem("type")} 
                initialState={{investigations : props.investigations.data.filter(inv => inv.shareStatus === 0)}}  />
        }
        else if(!props.investigations.currentInvestigation){
            return props.investigations.data.map((inv, index) =>{
                return(
                    <Grid item xs={12} style={{display: 'flex',justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <ButtonGrey onClick={()=>selectHospital(index)} data-testid="select-hospital" >{inv.name}</ButtonGrey>
                    </Grid>) 
            })
        }
        else{
            return(
                <React.Fragment>
                    <Grid item xs={6} style={{display:"flex", flexDirection: "row-reverse"}}>
                        <Grid item xs={6} style={{display: 'flex',justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Typography variant="body2" gutterBottom>
                                {props.investigations.currentInvestigation.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {props.profile.info.name} {props.profile.info.surnames}
                            </Typography>
                            {
                                props.profile.info.department &&
                                <Typography variant="body2" gutterBottom>
                                    {props.profile.info.department.name}
                                </Typography>
                            }
                            {
                                props.profile.info.institution &&
                                <Typography variant="body2" gutterBottom>
                                    {props.profile.info.institution.name}
                                </Typography>
                            }
                        </Grid>                        
                        {props.profile.info.institution &&
                        <Grid item xs={6}>
                            <Typography variant="body2" gutterBottom>
                            {props.profile.info.institution.name}
                            </Typography>
                        </Grid>
                        }
                        
                    </Grid>
                    <Grid item xs={6} style={{display:"flex", justifyContent:"left", alignItems:"center"}}>
                        <img src={photo_holder} alt="profile_picture" with="100%" />
                    </Grid>
                    <Grid item container  spacing={3}>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <LinkPlain to={SEARCH_PATIENT_ROUTE}>
                                <ButtonGrey data-testid="search-patient" ><Translate id="pages.hospital.search-patient.title" /></ButtonGrey>
                            </LinkPlain>
                        </Grid>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <LinkPlain to={ADD_PATIENT_ROUTE}>
                                <ButtonGrey data-testid="add-patient" ><Translate id="pages.hospital.add-patient" /></ButtonGrey>
                            </LinkPlain>
                        </Grid>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <LinkPlain to={HOSPITAL_LAB}>
                                <ButtonGrey data-testid="lab" ><Translate id="pages.hospital.laboratory.name" /></ButtonGrey>
                            </LinkPlain>
                        </Grid>
                        <Grid item xs={12} style={{textAlign:"center"}}>
                            <LinkPlain to={HOSPITAL_IMAGES}>
                                <ButtonGrey data-testid="medical-imaging" ><Translate id="pages.hospital.medical-imaging.name" /></ButtonGrey>
                            </LinkPlain>
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
        }
    }

    if(pathname === MY_SCHEDULE_ROUTE){
        return(
            
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <Typography variant="h4" gutterBottom display="inline">
                            {props.profile.info.name} {props.profile.info.surnames}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <img src={calendar_image} alt="profile_picture" with="100%" />
                    </Grid>
                    {/* <Grid item xs={12} style={{textAlign:"center"}}>
                        <LinkPlain to={HOSPITAL_WARD_SETTINGS_ROUTE}>
                            <ButtonGrey data-testid="hospital-ward" >Hospital Ward</ButtonGrey>
                        </LinkPlain>
                    </Grid> */}
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <LinkPlain to={OUTPATIENTS_ROUTE}>
                            <ButtonGrey data-testid="outpatients" >Outpatients</ButtonGrey>
                        </LinkPlain>
                    </Grid>
                    <Grid item xs={12} style={{textAlign:"center"}}>
                        <LinkPlain to={SEARCH_PATIENT_ROUTE}>
                            <ButtonGrey data-testid="consultations" >Consultations</ButtonGrey>
                        </LinkPlain>
                    </Grid>
                </Grid>
            
        )
    }
    else{
        if(props.investigations.loading || (!props.profile.info && props.investigations.currentInvestigation) ){
            return <Loader />
        }
        
        return (
            <BoxBckgr style={{ color:"white", padding:"1rem"}} color="text.primary">
                <Grid container spacing={3}>
                    <Grid item  xs={12} style={{textAlign:"center"}}>
                        <Typography variant="h1" gutterBottom display="inline" >
                            <Translate id="home" />
                        </Typography>
                    </Grid>
                    {
                        renderCore()
                    }
                </Grid>
            </BoxBckgr>
        )
    }
    
}

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations,
        profile : state.profile
    }
}

export default connect(mapStateToProps, null)(HomeSchedule)