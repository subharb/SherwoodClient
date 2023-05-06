
import React, { useEffect, useMemo, useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';
import { green, red, orange, yellow, blue, amber, brown, cyan, deepOrange } from "@material-ui/core/colors";
import { Box, Button, Card, CardContent, Divider as MuiDivider, Grid, IconButton, Paper, Snackbar, Typography } from '@material-ui/core';

import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { Translate, withLocalize } from 'react-localize-redux';
import { ROUTE_401 } from '../../../routes';
import DoughnutChart from '../../dashboards/Analytics/DoughnutChart';
import styled, { withTheme } from "styled-components/macro";
import { yearsFromDate } from '../../../utils';
import TimeTable from '../../dashboards/Analytics/TimeTable';
import { getPatientIdFromDepartment, getStatsActivityService, getStatsFirstMonitoring, getStatsMostCommonDiagnosis, getStatsOutpatients, getStatsPatientsPerDepartment } from '../../../services';
import { spacing } from "@material-ui/system";
import DatesSelector from '../../dashboards/Analytics/DatesSelector';

import SearchTable from '../../dashboards/Analytics/SearchTable';
import HospitalStats from './HospitalStats';
import { useDeparmentsSelector } from '../../../hooks';
import PatientsBarChart from '../../dashboards/Analytics/PatientsBarChart';
import { PERMISSION } from '../../../components/investigation/share/user_roles';
import { FUNCTIONALITY } from '../../../constants/types';
import OutpatientsStats from './OutpatientsStats';
import { TypographyStyled } from '../../../components/general/mini_components';

const Divider = styled(MuiDivider)(spacing);

export const LIST_COLORS = [green[500], red[500], orange[500], yellow[500], blue[500], amber[500], brown[500], cyan[500], cyan[500], deepOrange[500]]
const ageGroups = [[0, 10], [11, 20], [21, 30], [31, 40], [41, 50], [51, 60], [61, 70], [71, 80], [81, 1000]];
const COUNT_AGE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
export function Analytics(props) {
	const history = useHistory();
	const [startDate, setStartDate] = useState(new Date(2020, 0, 1).getTime());
	const [endDate, setEndDate] = useState(Date.now());
	const [statsFirstMonitoring, setStatsFirstMonitoring] = useState(null);
    const [loadingStatsFirstMonitoring, setLoadingStatsFirstMonitoring] = useState(false);
	const [mostCommonDiagnosis, setMostCommonDiagnosis] = useState(null);
	const [filteredPatients, setFilteredPatients] = useState([]);
    const [activityPatients, setActivityPatients] = useState([]);
	const [countSex, setCountSex] = useState({ male: 0, female: 0 });
    const onlyDepartmentsResearcher = props.investigations.currentInvestigation && props.investigations.currentInvestigation.permissions.includes(PERMISSION.ANALYTICS_DEPARTMENT);
	const {renderDepartmentSelector, departmentSelected, departments} = useDeparmentsSelector(true, onlyDepartmentsResearcher, true, "all");
    const [appointmentsPerDepartment, setAppointmentsPerDepartment] = useState(null);
	const [countAge, setCountAge] = useState([...COUNT_AGE])
	const [loadingPatientsInfo, setLoadingPatientsInfo] = useState(false);
   
	function changeDate(value) {
		console.log("Date Changed!", value);
		let tempStartDate = null;
		let tempEndDate = null;
		switch (value) {
			case 0:
				tempStartDate = new Date();
				tempStartDate.setHours(0, 0, 0, 0);
				tempEndDate = new Date();
				break;
			case 1:
				tempStartDate = new Date(Date.now() - 172800000);
				tempStartDate.setHours(0, 0, 0, 0);
				tempEndDate = new Date(Date.now() - 86400000);
				tempEndDate.setHours(0, 0, 0, 0);
				break;
			case 2:
				tempStartDate = new Date(Date.now() - 604800000);
				tempStartDate.setHours(0, 0, 0, 0);
				tempEndDate = new Date();
				break;
			case 3:
				tempStartDate = new Date(Date.now() - 2592000000);
				tempStartDate.setHours(0, 0, 0, 0);
				tempEndDate = new Date();
				break;
			case 4:
				var date = new Date();
				tempStartDate = new Date(date.getFullYear(), date.getMonth(), 1);
				tempStartDate.setHours(0, 0, 0, 0);
				tempEndDate = new Date();
				break;
			case 5:
				tempStartDate = new Date();
				tempStartDate.setDate(0); // set to last day of previous month
				tempStartDate.setDate(1); // set to the first day of that month
				tempStartDate.setHours(0, 0, 0, 0);
				tempEndDate = new Date();
				tempEndDate.setDate(0); // set to last day of previous month
				tempEndDate.setHours(23, 59, 59, 0);
				break;
			default:
				console.log("Not defined");
		}
		console.log(tempStartDate.getTime());
		console.log(tempEndDate.getTime());
		setStartDate(tempStartDate.getTime());
		setEndDate(tempEndDate.getTime());
	}
    
	function datesSelected(dates) {
		console.log("We have dates", dates);
		setStartDate(dates[0].getTime());
		setEndDate(dates[1].getTime());
	}
	
    function renderSelectors(){
        if(departments === null){
            return (
                <Grid item xs={12}>
                    <Loader />
                </Grid>
            )
        }
        if(departments.length === 1){
            return (
                <Grid item xs={12}>
                    <DatesSelector onCallBack={datesSelected} />
                </Grid>
            )
        }
        return(
            <>
                <Grid item sm={6} xs={12}>
                    { renderDepartmentSelector() }
                </Grid>
                <Grid item sm={6} xs={12}>
                    <DatesSelector onCallBack={datesSelected} />
                </Grid>
            </>
            
        )
    }
    
    useEffect(() => {
        let tempCountSex = {male : 0, female : 0};
        filteredPatients.forEach(patient => {
            
            if (patient.personalData.sex.toLowerCase() === "male") {
                tempCountSex.male++;
            }
            else {
                tempCountSex.female++;
            }
            
        })
        let tempCountAge = [...COUNT_AGE];
        filteredPatients.forEach(patient => {
            const patientAge = yearsFromDate(patient.personalData.birthdate);
            const indexAgeGroup = ageGroups.findIndex(range => range[0] <= patientAge && range[1] >= patientAge);
            if (indexAgeGroup > -1) {
                tempCountAge[indexAgeGroup]++;
            }
            else {
                console.log(patient.personalData.birthdate);
            }
        })
        setCountAge(tempCountAge);
        setCountSex(tempCountSex);
    }, [filteredPatients]);
    
    useEffect(() => {
        if(departmentSelected && props.investigations.currentInvestigation){
            setLoadingPatientsInfo(true);
            getPatientIdFromDepartment(props.investigations.currentInvestigation.uuid, departmentSelected, startDate, endDate)
                .then(response => {
                    if(response.stats.patientIds){
                        const tempFilterPatients = props.investigations.currentInvestigation.patientsPersonalData.filter(patient => {
                            return response.stats.patientIds.includes(patient.id);
                        })
                        setLoadingPatientsInfo(false);
                        setFilteredPatients(tempFilterPatients);
                    }  
                })
        }
        
    }, [departmentSelected, props.investigations.currentInvestigation]);

    useEffect(() => {
        let tempFilteredPatients = [];
        for(let i = 0; i < Object.keys(activityPatients).length; i++){
            const key = Object.keys(activityPatients)[i];
            const patientsActivity = departmentSelected !== "all" ? activityPatients[key].filter((patient) => {
                return patient.department.uuid === departmentSelected;
            }) : activityPatients[key];
            
            const patientsPersonalData = patientsActivity.map((patientAct) => {
                const patientFound = props.investigations.currentInvestigation.patientsPersonalData.find((patient) => patient.id === patientAct.idPatientInvestigation);
                return patientFound;
            })
            tempFilteredPatients = tempFilteredPatients.concat(patientsPersonalData);
        }
        setFilteredPatients(tempFilteredPatients);
        
    }, [activityPatients]);
	
    useEffect(() => {
		async function getStats() {
            setLoadingStatsFirstMonitoring(true);
			getStatsFirstMonitoring(props.investigations.currentInvestigation.uuid, startDate, endDate)
							.then(response => {
								setStatsFirstMonitoring(response);
                                setLoadingStatsFirstMonitoring(false);
							})
			getStatsMostCommonDiagnosis(props.investigations.currentInvestigation.uuid, startDate, endDate)
							.then(response => {
								setMostCommonDiagnosis(Object.entries(response.stats).map(keyValue => {
									return [keyValue[0], keyValue[1]]
								}));
							})
            getStatsActivityService(props.investigations.currentInvestigation.uuid, startDate, endDate)
                            .then(response => {
                                setActivityPatients(response.stats);
                            })
            getStatsOutpatients(props.investigations.currentInvestigation.uuid, startDate, endDate)
                .then(response => {
                    setAppointmentsPerDepartment(response.stats);
            })
			
		}

		if (props.investigations.currentInvestigation) {
			getStats();
		}
	}, [startDate, endDate, props.investigations]);

    function renderCore(){
        if(loadingPatientsInfo){
            return (
                
                    <Loader />
                
            )
        }
        else{
            return(
                <Grid container spacing={6} style={{marginTop:'1rem'}}>
				{
					props.investigations.currentInvestigation.permissions.includes(PERMISSION.PERSONAL_ACCESS) &&
					<Grid item xs={12}>
						<Grid container spacing={6}>
							<Grid item xs={12} sm={12} md={6}>
								<DoughnutChart title={props.translate("hospital.analytics.graphs.sex.title")} labels={[props.translate("hospital.analytics.graphs.sex.male"), props.translate("hospital.analytics.graphs.sex.female")]}
									table={{ title: props.translate("hospital.analytics.graphs.sex.table-title"), columns: [props.translate("hospital.analytics.graphs.sex.count")] }}
									innerInfo={{ title: "Patients", value: filteredPatients.length }}

									datasets={[
										{
											data: [countSex.male, countSex.female],
											percents: [Math.round(countSex.male / (countSex.male + countSex.female) * 100), Math.round(countSex.female / (countSex.male + countSex.female) * 100)],
											backgroundColor: ["#028186", "#ef6657"],
											borderWidth: 5,
											borderColor: props.theme.palette.background.paper,
										}
									]} />
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<DoughnutChart title={props.translate("hospital.analytics.graphs.age.title")} labels={ageGroups.map(groupAge => { if (groupAge[1] === 1000) { return ">" + groupAge[0] } else { return groupAge[0] + "-" + groupAge[1] } })}
									table={{ title: props.translate("hospital.analytics.graphs.age.table-title"), columns: [[props.translate("hospital.analytics.graphs.sex.count")]] }}


									datasets={[
										{
											data: countAge,
											percents: countAge.map(countAge => Math.round((countAge / filteredPatients.length) * 100)),
											backgroundColor: [props.theme.palette.secondary.main, red[500], orange[500], yellow[500], blue[500], props.theme.palette.secondary.main, red[500], orange[500], yellow[500], blue[500]],
											borderWidth: 5,
											borderColor: props.theme.palette.background.paper,
										}
									]} />
							</Grid>
                            <Grid item xs={12}>
                                <PatientsBarChart title={<Translate id="hospital.analytics.graphs.patients.title" />} 
                                    departments={departments} statsPerDepartment = {activityPatients}
                                    departmentSelected={departments ? departments.find((dep) => dep.uuid === departmentSelected) : null} />
                            </Grid>
						</Grid>
					</Grid>
				}
                {
                    !departmentSelected &&
                    <>
                        <Grid item xs={12}> 
                            <SearchTable label={props.translate("hospital.analytics.graphs.search-diagnose.search").toString()}
                                uuidInvestigation={props.investigations.currentInvestigation.uuid}
                                startDate={startDate} endDate={endDate} locale={props.activeLanguage.code}
                                title={props.translate("hospital.analytics.graphs.search-diagnose.title").toString()} />
                        </Grid>
                        <Grid item xs={12} lg={5} sm={6}> 
                            
                        </Grid>
                        <Grid item xs={12} >
                            <TimeTable title={props.translate("hospital.analytics.graphs.most-common-diagnosis.title")} loading={!mostCommonDiagnosis}
                                header={[props.translate("hospital.analytics.graphs.most-common-diagnosis.diagnostic"), props.translate("hospital.analytics.graphs.most-common-diagnosis.count")]}
                                data={mostCommonDiagnosis}
                                actionCallBack={(value) => changeDate(value)}
                            />
                        </Grid>
                    </>
                }
				
                <Grid container item spacing={1}>
                    <Grid item xs={12} >
                        <HospitalStats loading={loadingStatsFirstMonitoring} stats={statsFirstMonitoring} 
                            departmentSelected={departmentSelected} />
                    </Grid>
                </Grid>
				{
                    (props.investigations.currentInvestigation && 
                        props.investigations.currentInvestigation.functionalities.includes(FUNCTIONALITY.OUTPATIENTS)) && appointmentsPerDepartment && 
                    <Grid container item spacing={1}>
                        {/* <DoughnutChart title={props.translate("hospital.analytics.graphs.appointments.title")} labels={Object.keys(appointmentsPerDepartment).map((uuidDepartment) => departments.find((dep) => dep.uuid === uuidDepartment).name)}
                            table={{ title: props.translate("hospital.analytics.graphs.appointments.table-title"), columns: [props.translate("hospital.analytics.graphs.sex.count")] }}
                            innerInfo={{ title: props.translate("hospital.analytics.graphs.appointments.title"), value: outpatientsTotal }}

                            datasets={[
                                {
                                    data: Object.values(appointmentsPerDepartment),
                                    percents: Object.values(appointmentsPerDepartment).map((count) => Math.round((count / outpatientsTotal) * 100)),
                                    backgroundColor: [props.theme.palette.secondary.main, red[500]],
                                    borderWidth: 5,
                                    borderColor: props.theme.palette.background.paper,
                                }
                            ]} /> */}
                        <OutpatientsStats functionalities={props.investigations.currentInvestigation.functionalities} 
                            appointmentsPerDepartment={appointmentsPerDepartment} theme={props.theme} departments={departments} />
                    </Grid>
                    
                }
                

			</Grid>
            )
        }
    }

	if (props.investigations.loading) {
		return <Loader />
	}
	else if (props.investigations.currentInvestigation && !props.investigations.currentInvestigation.permissions.filter((perm) => [PERMISSION.BUSINESS_READ, PERMISSION.ANALYTICS_DEPARTMENT].includes(perm)).length > 0){
		history.push(ROUTE_401);
		return <Loader />
	}
	return (
		<React.Fragment>
			<Helmet title="Analytics Dashboard" />
			<Grid container spacing={6}>
				<Grid item xs={12} style={{ color: "white" }}>
					<TypographyStyled variant="h3" gutterBottom >
						Analytics Dashboard
					</TypographyStyled>					
				</Grid>
				<Grid spacing={3} item container xs={12} style={{background:'white', padding:'1rem'}}>
                    {
                        renderSelectors()
                    }
                </Grid>
			</Grid>
            {
                renderCore()
            }
			
		</React.Fragment>
	)
}

Analytics.propTypes = {
	investigations: PropTypes.object

};

const mapStateToProps = (state) => {
	return {
		investigations: state.investigations
	}
}
export default withTheme(withLocalize(connect(mapStateToProps, null)(Analytics)))
