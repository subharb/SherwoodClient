
import React, {useEffect, useState} from 'react'
import { useProfileInfo, useRouter } from '../../hooks';
import { connect, useSelector } from 'react-redux';
import { Button, Grid, Typography, Box } from '@mui/material';
import { useHistory, Link } from 'react-router-dom'
import { MY_SCHEDULE_ROUTE, SEARCH_PATIENT_ROUTE, 
        HOSPITAL_WARD_SETTINGS_ROUTE, OUTPATIENTS_ROUTE, ADD_PATIENT_ROUTE, HOSPITAL_IMAGES, HOSPITAL_LAB, HOSPITAL_MY_DEPARTMENTS_ROUTE, HOSPITAL_ANALYTICS } from '../../routes/urls';
import { ButtonGrey, BoxBckgr, LinkPlain, TypographyStyled } from '../../components/general/mini_components';
import photo_holder from "../../img/photo_holder.svg";
import calendar_image from "../../img/calendar.svg";
import Loader from '../../components/Loader';
import {selectInvestigation} from '../../redux/actions/investigationsActions';
import { useDispatch } from "react-redux";
import { Translate } from 'react-localize-redux';
import { fetchProfileInfoAction } from '../../redux/actions/profileActions';
import AllInvestigations from '../../components/investigation/show/all';
import { FUNCTIONALITY } from '../../constants/types';
import { PERMISSION } from '../../components/investigation/share/user_roles';
import DICOMViewer from './patient/DICOMViewer';

function HomeSchedule(props) {
    const [loading, setLoading] = useState(false);
    const { profile } = useProfileInfo();
    const { pathname }= useRouter(props.initialState ? props.initialState.pathname : false);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if(props.investigations.currentInvestigation && !profile){
    //         dispatch(fetchProfileInfoAction(props.investigations.currentInvestigation.uuid));
    //     }
    // }, [props.investigations])

    function renderLogoOrProfile(){
        if(props.investigations.currentInvestigation.functionalities.includes(FUNCTIONALITY.AESTHETICS) &&
            props.investigations.currentInvestigation.aesthetics.params.hasOwnProperty("squareLogo")){
            return <img src={props.investigations.currentInvestigation.aesthetics.params.squareLogo} 
                        alt="profile_picture" width="150" />
        }
        else{
            return <img src={photo_holder} alt="profile_picture" with="100%" />
        }
            
        
    }

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
            const investigation = props.investigations.currentInvestigation;
            return(
                <React.Fragment>
                    <Grid item xs={6} style={{display:"flex", flexDirection: "row-reverse"}}>
                        <Grid item xs={6} style={{display: 'flex',justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <TypographyStyled variant="body2" gutterBottom>
                                {props.investigations.currentInvestigation.name}
                            </TypographyStyled>
                            <TypographyStyled variant="body2" gutterBottom>
                                {props.profile.info.name} {props.profile.info.surnames}
                            </TypographyStyled>
                            {
                                props.profile.info.department &&
                                <TypographyStyled variant="body2" gutterBottom>
                                    {props.profile.info.department.name}
                                </TypographyStyled>
                            }
                            {
                                props.profile.info.institution &&
                                <TypographyStyled variant="body2" gutterBottom>
                                    {props.profile.info.institution.name}
                                </TypographyStyled>
                            }
                        </Grid>                        
                        {props.profile.info.institution &&
                        <Grid item xs={6}>
                            <TypographyStyled variant="body2" gutterBottom>
                            {props.profile.info.institution.name}
                            </TypographyStyled>
                        </Grid>
                        }
                        
                    </Grid>
                    <Grid item xs={6} style={{display:"flex", justifyContent:"left", alignItems:"center"}}>
                        {
                            renderLogoOrProfile()
                        }
                    </Grid>
                    <Grid item container  spacing={3}>
                        {
                            
                            <React.Fragment>
                                <Grid item xs={12} style={{textAlign:"center"}}>
                                    <LinkPlain to={SEARCH_PATIENT_ROUTE}>
                                        <ButtonGrey data-testid="search-patient" ><Translate id="pages.hospital.search-patient.title" /></ButtonGrey>
                                    </LinkPlain>
                                </Grid>
                                {(investigation.permissions.includes(PERMISSION.PERSONAL_ACCESS)) &&
                                    <Grid item xs={12} style={{textAlign:"center"}}>
                                        <LinkPlain to={ADD_PATIENT_ROUTE}>
                                            <ButtonGrey data-testid="add-patient" ><Translate id="pages.hospital.add-patient" /></ButtonGrey>
                                        </LinkPlain>
                                    </Grid>
                                }
                                {(investigation.permissions.includes(PERMISSION.MEDICAL_READ)) &&
                                <>
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
                                </>
                                }
                                
                                {
                                    (investigation.permissions.includes(PERMISSION.VIEW_HOSPITALIZATION) && investigation.functionalities.includes(FUNCTIONALITY.HOSPITALIZATION)) &&
                                    <Grid item xs={12} style={{textAlign:"center"}}>
                                        <LinkPlain to={HOSPITAL_MY_DEPARTMENTS_ROUTE}>
                                            <ButtonGrey data-testid="inpatients" ><Translate id="pages.hospital.inpatients.title" /></ButtonGrey>
                                        </LinkPlain>
                                    </Grid>
                                }
                            </React.Fragment>
                        }
                        {
                            investigation.permissions.includes(PERMISSION.BUSINESS_READ) &&
                            <Grid item xs={12} style={{textAlign:"center"}}>
                                <LinkPlain to={HOSPITAL_ANALYTICS}>
                                    <ButtonGrey data-testid="analytcs" ><Translate id="pages.hospital.analytics.title" /></ButtonGrey>
                                </LinkPlain>
                            </Grid>
                            
                        } 
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
                        <img src={photo_holder} alt="profile_picture" with="100%" />
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
            <BoxBckgr style={{ color:"white", padding:"1rem", height:'100%'}} color="text.primary">
                <Grid container spacing={3}>
                    <Grid item  xs={12} style={{textAlign:"center"}}>
                        <TypographyStyled variant="h1" gutterBottom display="inline" >
                            <Translate id="home" />
                        </TypographyStyled>
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