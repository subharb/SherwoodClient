
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { green, red, orange, yellow, blue } from "@material-ui/core/colors";
import { Box, Button, Grid, IconButton, Paper, Snackbar, Typography } from '@material-ui/core';
import PersonalDataForm from '../../components/investigation/show/single/personal_data';
import { connect } from 'react-redux';
import { savePatientAction, updatePatientAction } from '../../redux/actions/patientsActions';
import { CloseIcon } from '@material-ui/data-grid';
import Loader from '../../components/Loader';
import { Translate } from 'react-localize-redux';
import { BoxBckgr } from '../../components/general/mini_components';
import { useDispatch } from "react-redux";
import { PersonAddSharp, EditOutlined } from '@material-ui/icons';
import { useSnackBarState, useUpdateEffect } from '../../hooks';
import { Alert } from '@material-ui/lab';
import { BUSINESS_READ, PERSONAL_ACCESS } from '../../constants';
import { ROUTE_401, ROUTE_404 } from '../../routes';
import Stats from '../dashboards/Analytics/Stats';
import BarChart from '../dashboards/Analytics/BarChart';
import DoughnutChart from '../dashboards/Analytics/DoughnutChart';
import styled, { withTheme } from "styled-components/macro";
import { yearsFromDate } from '../../utils';
import TrafficTable from '../dashboards/Analytics/TrafficTable';

export function Analytics(props) {
    const history = useHistory();
    
    
    if(props.investigations.loading){
        return <Loader />
    }
    else if(!props.investigations.currentInvestigation.permissions.includes(BUSINESS_READ)){
        history.push(ROUTE_401);
        return <Loader />
    }
    let countSex = {male:0, female:0};
    props.investigations.currentInvestigation.patientsPersonalData.forEach(patient =>{
        if(patient.personalData.sex.toLowerCase() === "male"){
          countSex.male++;
        }
        else{
          countSex.female++;
        }
    })
    const ageGroups=[[0,14], [14,24], [24, 54], [54, 64], [64, 1000]];
    let countAge =[0, 0, 0,0,0];
    props.investigations.currentInvestigation.patientsPersonalData.forEach(patient =>{
        const patientAge = yearsFromDate(patient.personalData.birthdate);
        const indexAgeGroup = ageGroups.findIndex(range => range[0]<= patientAge && range[1] > patientAge);
        if(indexAgeGroup > -1){
          countAge[indexAgeGroup]++;
        }
        else{
          console.log(patient.personalData.birthdate);
        }
        
    })
    return(
        <Grid container spacing={6}>
          {
            props.investigations.currentInvestigation.permissions.includes(PERSONAL_ACCESS) &&
          <Grid item xs={12}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={6}>
                    <DoughnutChart title="Patients genre" labels={["Male", "Female"]}
                        table={{title:"Patients Genre", columns : ["Genre"]}}
                        innerInfo={{title:"Patients", value:props.investigations.currentInvestigation.patientsPersonalData.length}}
                        
                        datasets={[
                              {
                                data: [countSex.male, countSex.female],
                                percents:[Math.round(countSex.male/(countSex.male+countSex.female)*100), Math.round(countSex.female/(countSex.male+countSex.female)*100)],
                                backgroundColor: [props.theme.palette.secondary.main, red[500]],
                                borderWidth: 5,
                                borderColor: props.theme.palette.background.paper,
                              }
                              ]} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <DoughnutChart title="Patients Ages" labels={ageGroups.map(groupAge => groupAge[0]+"-"+groupAge[1])}
                        table={{title:"Patients Ages", columns : ["Age"]}}
                        
                        
                        datasets={[
                              {
                                data: countAge,
                                percents:countAge.map(ageCount => Math.round((ageCount/props.investigations.currentInvestigation.patientsPersonalData.length)*100)),
                                backgroundColor: [props.theme.palette.secondary.main, red[500], orange[500], yellow[500], blue[500]],
                                borderWidth: 5,
                                borderColor: props.theme.palette.background.paper,
                              }
                              ]} />
                </Grid>
              </Grid>  
            </Grid>
          }
          {
            props.investigations.currentInvestigation.permissions.includes(BUSINESS_READ) &&
            <Grid item xs={12} lg={8}>
              <TrafficTable />
            </Grid>
          }
         
      </Grid>
    )
}

Analytics.propTypes = {
    investigations:PropTypes.object

  };

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations
    }
}
export default withTheme(connect(mapStateToProps, null)(Analytics))
