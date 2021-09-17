
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';
import { green, red, orange, yellow, blue } from "@material-ui/core/colors";
import { Box, Button, Divider as MuiDivider, Grid, IconButton, Paper, Snackbar, Typography } from '@material-ui/core';
import PersonalDataForm from '../../components/investigation/show/single/personal_data';
import { connect } from 'react-redux';
import { savePatientAction, updatePatientAction } from '../../redux/actions/patientsActions';
import { CloseIcon } from '@material-ui/data-grid';
import Loader from '../../components/Loader';
import { Translate, withLocalize } from 'react-localize-redux';
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
import TimeTable from '../dashboards/Analytics/TimeTable';
import { getStatsFirstMonitoring } from '../../services/sherwoodService';
import { spacing } from "@material-ui/system";
import DatesSelector from '../dashboards/Analytics/DatesSelector';

const Divider = styled(MuiDivider)(spacing);

export function Analytics(props) {
	const history = useHistory();
	const [startDate, setStartDate] = useState(Date.now() - 2629800000);
	const [endDate, setEndDate] = useState(Date.now());
	const [statsFirstMonitoring, setStatsFirstMonitoring] = useState(null);

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
	useEffect(() => {
		async function getStats() {
			const response = await getStatsFirstMonitoring(props.investigations.currentInvestigation.uuid, startDate, endDate);
			const tempStats = response.stats.map(stat => {
				return [stat.researcher.name + " " + stat.researcher.surnames, stat.firstVisit, stat.monitoringVisit]
			})
			setStatsFirstMonitoring(tempStats);
		}

		if (props.investigations.currentInvestigation) {
			getStats();
		}
	}, [startDate, endDate, props.investigations]);

	if (props.investigations.loading) {
		return <Loader />
	}
	else if (!props.investigations.currentInvestigation.permissions.includes(BUSINESS_READ)) {
		history.push(ROUTE_401);
		return <Loader />
	}
	let countSex = { male: 0, female: 0 };
	props.investigations.currentInvestigation.patientsPersonalData.forEach(patient => {
		if (patient.personalData.sex.toLowerCase() === "male") {
			countSex.male++;
		}
		else {
			countSex.female++;
		}
	})
	const ageGroups = [[0, 10], [11, 20], [21, 30], [31, 40], [41, 50], [51, 60], [61, 70], [71, 80], [81, 1000]];
	let countAge = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	props.investigations.currentInvestigation.patientsPersonalData.forEach(patient => {
		const patientAge = yearsFromDate(patient.personalData.birthdate);
		const indexAgeGroup = ageGroups.findIndex(range => range[0] <= patientAge && range[1] >= patientAge);
		if (indexAgeGroup > -1) {
			countAge[indexAgeGroup]++;
		}
		else {
			console.log(patient.personalData.birthdate);
		}

	})


	return (
		<React.Fragment>
			<Helmet title="Analytics Dashboard" />
			<Grid justify="space-between" container spacing={6}>
				<Grid item>
					<Typography variant="h3" gutterBottom style={{ color: "white" }}>
						Analytics Dashboard
					</Typography>
				</Grid>
			</Grid>
			<Divider my={6} />
			<Grid container spacing={6}>
				{
					props.investigations.currentInvestigation.permissions.includes(PERSONAL_ACCESS) &&
					<Grid item xs={12}>
						<Grid container spacing={6}>
							<Grid item xs={12} sm={12} md={6}>
								<DoughnutChart title={props.translate("hospital.analytics.graphs.sex.title")} labels={[props.translate("hospital.analytics.graphs.sex.male"), props.translate("hospital.analytics.graphs.sex.female")]}
									table={{ title: props.translate("hospital.analytics.graphs.sex.table-title"), columns: [props.translate("hospital.analytics.graphs.sex.count")] }}
									innerInfo={{ title: "Patients", value: props.investigations.currentInvestigation.patientsPersonalData.length }}

									datasets={[
										{
											data: [countSex.male, countSex.female],
											percents: [Math.round(countSex.male / (countSex.male + countSex.female) * 100), Math.round(countSex.female / (countSex.male + countSex.female) * 100)],
											backgroundColor: [props.theme.palette.secondary.main, red[500]],
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
											percents: countAge.map(ageCount => Math.round((ageCount / props.investigations.currentInvestigation.patientsPersonalData.length) * 100)),
											backgroundColor: [props.theme.palette.secondary.main, red[500], orange[500], yellow[500], blue[500], props.theme.palette.secondary.main, red[500], orange[500], yellow[500], blue[500]],
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
					<Grid container item spacing={1}>
						<Grid item xs={0} lg={8} sm={6}> 
							
						</Grid>
						<Grid item xs={12} lg={4} sm={6}> 
							<DatesSelector onCallBack={datesSelected} />
						</Grid>
						<Grid item xs={12} >
							<TimeTable title={props.translate("hospital.analytics.graphs.activity.title")} loading={!statsFirstMonitoring}
								header={[props.translate("hospital.analytics.graphs.activity.table-title"), props.translate("hospital.analytics.graphs.activity.first-visit"), props.translate("hospital.analytics.graphs.activity.followup-visit")]}
								data={statsFirstMonitoring}
								actionCallBack={(value) => changeDate(value)}
							/>
						</Grid>
					</Grid>
				}

			</Grid>
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
