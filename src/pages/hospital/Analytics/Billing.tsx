import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Trend } from '../../dashboards/Analytics/Trend';
import { BillingChart } from '../../dashboards/Analytics/BillingBarChart';
import { BillingInsuranceBars } from '../../dashboards/Analytics/BillingInsuranceBars';

interface BillingAnalyticsProps {
    startDate: number;
    endDate: number;
    uuidInvestigation: string;
    locale: string;
    currency: string;
    hasBudgets: boolean;
}

const BillingAnalytics: React.FC<BillingAnalyticsProps> = ({ startDate, endDate, uuidInvestigation, 
                                                                locale, currency, hasBudgets }) => {
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
                            <BillingChart startDate={startDate} endDate={endDate} uuidInvestigation={uuidInvestigation} 
                                currency={currency}
                                />
                        </Grid>
                        {
                            hasBudgets &&
                            <Grid
                            item
                            md={3}
                            sm={6}
                            xs={12}
                        >
                            <BillingInsuranceBars locale={locale} startDate={1702487541503} endDate={endDate} uuidInvestigation={uuidInvestigation}
                                currency={currency} />
                        </Grid>
                        }
                        
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
    );
};

export default BillingAnalytics;
