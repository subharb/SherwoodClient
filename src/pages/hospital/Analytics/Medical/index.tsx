import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Selector } from '../Selector';
import { Trend } from '../../../dashboards/Analytics/Trend';
import DoughnutChart from '../../../dashboards/Analytics/DoughnutChart';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { blue, orange, red, yellow } from '@mui/material/colors';
import { usePatientFromDepartment } from '../../../../hooks/analytics';
import { IDepartment, IPatient } from '../../../../constants/types';
import Loader from '../../../../components/Loader';
import { postErrorSlack, yearsFromDate } from '../../../../utils';
import { useTheme } from 'styled-components';
import { PatientsBarChart } from './PatientsBarChart';
import { useDepartments } from '../../../../hooks';
import {AnalyticsContext} from '../Context';

interface MedicalAnalyticsProps {
    currency: string,
    locale: string,   
}

export const MedicalAnalytics: React.FC<MedicalAnalyticsProps> = ({ currency, locale}) => {
    const { startDate, endDate, uuidInvestigation, departments, departmentSelected} = useContext(AnalyticsContext);
    if(startDate === null || endDate === null || uuidInvestigation === null){
        return <div>Loading</div>
    }
    const {filteredPatients, isPending } = usePatientFromDepartment(uuidInvestigation!, "all", startDate, endDate);

    if(isPending){
        return <Loader />
    }
    return (
        <LocalizedMedicalAnalyticsView currency={currency} startDate={startDate} endDate={endDate}
            locale={locale} uuidInvestigation={uuidInvestigation} filteredPatients={filteredPatients}
            departments={ departments ? departments : [] } departmentSelected={departmentSelected ? departmentSelected : ""} />
    )};

interface MedicalAnalyticsViewProps extends MedicalAnalyticsProps, LocalizeContextProps {
    filteredPatients:IPatient[];
    startDate: number;
    endDate: number;
    uuidInvestigation: string;
    departments: IDepartment[];
    departmentSelected: string
}
const MedicalAnalyticsView: React.FC<MedicalAnalyticsViewProps> = ({ uuidInvestigation, departments, departmentSelected, startDate, endDate, currency, locale, filteredPatients,
                                                                        translate }) => {
    
    const ageGroups = [[0, 10], [11, 20], [21, 30], [31, 40], [41, 50], [51, 60], [61, 70], [71, 80], [81, 1000]];
    const COUNT_AGE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const [countAge, setCountAge] = useState([...COUNT_AGE])
    const [countSex, setCountSex] = useState({ male: 0, female: 0 });
    const theme = useTheme();
    
                                                                            
    useEffect(() => {
        let tempCountSex = {male : 0, female : 0};
        filteredPatients.forEach(patient => {
            if(!patient.personalData){
                postErrorSlack(window.location, "No personal data in patient:"+JSON.stringify(patient.personalData) , "");
            }
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

    return (
        <>
        <Helmet>
            <title>Dashboard: Analytics Billing</title>
        </Helmet>
        <Box
            sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            md={3}
                            sm={6}
                            xs={12}
                        >
                           <Trend key="billing"
                                label={`Total billing ${currency}`}
                                totalIndex={1}
                                locale={locale}
                                url={`${import.meta.env.VITE_APP_API_URL}/analytics/${uuidInvestigation}/billing/startDate/${startDate}/endDate/${endDate}`}
                                type="bars"
                            />
                        </Grid>
                        <Grid
                            item
                            md={3}
                            sm={6}
                            xs={12}
                        >
                            <Trend key="total discount"
                                label={`Total ${currency}`}
                                totalIndex={1}
                                locale={locale}
                                url={`${import.meta.env.VITE_APP_API_URL}/analytics/${uuidInvestigation}/billing/startDate/${startDate}/endDate/${endDate}`}
                                type="bars"
                            />
                        </Grid>
                        <Grid
                            item
                            md={3}
                            sm={6}
                            xs={12}
                        >
                            <DoughnutChart title={translate("hospital.analytics.graphs.sex.title")} labels={[translate("hospital.analytics.graphs.sex.male"), translate("hospital.analytics.graphs.sex.female")]}
									table={{ title: translate("hospital.analytics.graphs.sex.table-title"), columns: [translate("hospital.analytics.graphs.sex.count")] }}
									innerInfo={{ title: "Patients", value: filteredPatients.length }}
									datasets={[
										{
											data: [countSex.male, countSex.female],
											percents: [Math.round(countSex.male / (countSex.male + countSex.female) * 100), Math.round(countSex.female / (countSex.male + countSex.female) * 100)],
											backgroundColor: ["#028186", "#ef6657"],
											borderWidth: 5,
											borderColor: theme.palette.background.paper,
										}
									]} />
                        </Grid>  
                        <Grid
                            item
                            md={3}
                            sm={6}
                            xs={12}
                        >
                            <DoughnutChart title={translate("hospital.analytics.graphs.age.title")} labels={ageGroups.map(groupAge => { if (groupAge[1] === 1000) { return ">" + groupAge[0] } else { return groupAge[0] + "-" + groupAge[1] } })}
                                table={{ title: translate("hospital.analytics.graphs.age.table-title"), columns: [[translate("hospital.analytics.graphs.sex.count")]] }}
                                datasets={[
                                    {
                                        data: countAge,
                                        percents: countAge.map(countAge => Math.round((countAge / filteredPatients.length) * 100)),
                                        backgroundColor: [theme.palette.secondary.main, red[500], orange[500], yellow[500], blue[500], theme.palette.secondary.main, red[500], orange[500], yellow[500], blue[500]],
                                        borderWidth: 5,
                                        borderColor: theme.palette.background.paper,
                                    }
                                ]} />  
                        </Grid>   
                        <Grid
                            item
                            md={3}
                            sm={6}
                            xs={12}
                        >
                        <PatientsBarChart title={translate("hospital.analytics.graphs.patients.title").toString()} 
                            departments={ departments }
                            departmentSelected={departments ? departments.find((dep) => dep.uuid === departmentSelected) : null} />                 
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
    );
};

const LocalizedMedicalAnalyticsView = withLocalize(MedicalAnalyticsView);

// Use a named export instead of the default export
export { LocalizedMedicalAnalyticsView };
