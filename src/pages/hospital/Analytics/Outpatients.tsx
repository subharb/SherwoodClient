import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Trend } from '../../dashboards/Analytics/Trend';

interface OutpatientsAnalyticsProps {
    startDate: number;
    endDate: number;
    uuidInvestigation: string;
}

const OutpatientsAnalytics: React.FC<OutpatientsAnalyticsProps> = ({ startDate, endDate, uuidInvestigation }) => {
    return (
        <>
            <Helmet>
                <title>Dashboard: Analytics | Material Kit Pro</title>
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
                                <Trend key="appointments"
                                    label="Total number of appointments"
                                    url={`${import.meta.env.VITE_APP_API_URL}/analytics/${uuidInvestigation}/outpatients/startDate/${startDate}/endDate/${endDate}`}
                                    type="line"
                                />
                            </Grid>
                            <Grid
                                item
                                md={3}
                                sm={6}
                                xs={12}
                            >
                                <Trend key="patients"
                                    label="Total number of patients"
                                    url={`${import.meta.env.VITE_APP_API_URL}/analytics/${uuidInvestigation}/outpatients/patients/startDate/${startDate}/endDate/${endDate}`}
                                    type="line"
                                />
                            </Grid>
                            <Grid
                                item
                                md={3}
                                sm={6}
                                xs={12}
                            >
                                COMponente
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default OutpatientsAnalytics;
