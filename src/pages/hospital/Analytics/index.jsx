
import React, { useEffect, useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';
import { green, red, orange, yellow, blue, amber, brown, cyan, deepOrange } from "@mui/material/colors";
import { Divider as MuiDivider, Grid } from '@mui/material';

import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import { withLocalize } from 'react-localize-redux';
import { ROUTE_401 } from '../../../routes/urls';
import { withTheme } from "styled-components";
import { PERMISSION } from '../../../components/investigation/share/user_roles';
import SectionHeader from '../../components/SectionHeader';
import BillingAnalytics from './Billing';
import { TabsSherwood } from '../../components/Tabs';
import { Selector } from './Selector';
import { MedicalAnalytics } from './Medical';
import { AnalyticsContext, AnalyticsContextProvider } from './Context';


export const LIST_COLORS = [green[500], red[500], orange[500], yellow[500], blue[500], amber[500], brown[500], cyan[500], cyan[500], deepOrange[500]]
const ageGroups = [[0, 10], [11, 20], [21, 30], [31, 40], [41, 50], [51, 60], [61, 70], [71, 80], [81, 1000]];
const COUNT_AGE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export function Analytics(props) {

	const history = useHistory();
    const onlyDepartmentsResearcher = props.investigations.currentInvestigation && props.investigations.currentInvestigation.permissions.includes(PERMISSION.ANALYTICS_DEPARTMENT);
		
	if (props.investigations.loading) {
		return <Loader />
	}
	else if (props.investigations.currentInvestigation && !props.investigations.currentInvestigation.permissions.filter((perm) => [PERMISSION.BUSINESS_READ, PERMISSION.ANALYTICS_DEPARTMENT].includes(perm)).length > 0){
		history.push(ROUTE_401);
		return <Loader />
	}

	return (
		<AnalyticsContextProvider uuidInvestigation={props.investigations.currentInvestigation.uuid}>
			<Helmet title="Analytics Dashboard" />
			<Grid container spacing={6}>
				<Grid item xs={12} style={{ color: "white" }}>
                    <SectionHeader section="analytics"  />
				</Grid>
				{/* <Grid spacing={3} item xs={12} style={{background:'white', padding:'1rem'}}>
                    <Grid container spacing={3}>
                    {
                        renderSelectors()
                    }
                    </Grid>    
                </Grid> */}
			</Grid>
            <AnalyticsCore languageCode={props.activeLanguage.code} onlyDepartmentsResearcher={onlyDepartmentsResearcher}
                billingInfo={props.investigations.currentInvestigation.billingInfo} />
			
		</AnalyticsContextProvider>
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


export function AnalyticsCore({languageCode, billingInfo, onlyDepartmentsResearcher}) {
    const { startDate, endDate, departmentSelected } = React.useContext(AnalyticsContext); 

    return(
        <>
            <Selector onDatesSelectedCallback={(startDate, endDate) => console.log(`Fechas: ${startDate} ${endDate}`)} />
            <TabsSherwood labels={["Medical", "Billing"]} initTab={0} whiteBackground={true}>
                <MedicalAnalytics startDate={startDate} endDate={endDate} 
                    locale={languageCode} currency={billingInfo?.currency}
                    hasBudgets={ billingInfo?.params["budgets"] }
                    uuidInvestigation='cd54d9d8-23af-439b-af94-616fd8e24308'   />
                <BillingAnalytics startDate={startDate} endDate={endDate} 
                    onlyDepartmentsResearcher={onlyDepartmentsResearcher}
                    locale={languageCode} currency={billingInfo?.currency}
                    hasBudgets={ billingInfo?.params["budgets"] }
                    uuidInvestigation='cd54d9d8-23af-439b-af94-616fd8e24308' />
            </TabsSherwood>
        </>
        
    );    
}