import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material';
import ChevronUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LineChart } from './LineChart';
import { BarChartLine } from './BarChartLine';
import { alpha } from '@material-ui/core';
import { useMemo } from 'react';
import Loader from '../../../components/Loader';
import {
    useQuery,
  } from '@tanstack/react-query'


export const Trend = ({ label, type, url, totalIndex, locale }) => {
    const { isPending, error, data } = useQuery({
        queryKey: [url],
        queryFn: () =>
          fetch(url, {
            headers : {
                "Authorization": localStorage.getItem("jwt")
            }
        })
        .then((res) =>
            res.json(),
        ),
    })
    
    if(isPending){
        return <Loader />
    }
    if(error){
        return <div>Error: {error.message}</div>
    }
    if(!data){
        return "NO DATA"
    }
    return (
        <TrendView label={label} series={data.trend.data} locale={locale}
            totalNumber={data.trend.totals[totalIndex]} type={type} />
    )
}

export const TrendView = ({ label, series, totalNumber, type, locale }) => {
    const theme = useTheme();
    const percentage = useMemo(() => {
        const firstNonZero = series.findIndex((item) => item !== 0);
        if(firstNonZero === -1){
            return 0;
        }
        return ((series[series.length - 1] - series[firstNonZero]) / series[firstNonZero]) * 100;
    }, [series]);
    function renderIcon(percentage) {
        let icon = <ChevronDownIcon fontSize="small" />;
        let color = theme.palette.error.main;
        let colorString = "error.main";
        if(percentage > 0){
            icon = <ChevronUpIcon fontSize="small" />;
            color = theme.palette.success.main;
            colorString = "success.main";
        }
        

        return(
                <Avatar
                    sx={{
                        backgroundColor: (theme) => alpha(color, 0.08),
                        color: colorString,
                        height: 36,
                        width: 36
                    }}
                >
                    { icon }
                </Avatar>)
        
    }
    function renderTrend(percentage) {
        if(percentage > 0){
            return `${percentage.toFixed(0)}% increase`;
        }
        else{
            return `${percentage.toFixed(0)}% decrease`;
        }
    }
    function renderGraph(type, series) {
        if(type === "line"){
            return <LineChart series={series} />
        }
        return <BarChartLine series={series} />
    }
    return (

        <Card style={{ width: '300px' }}>
            <Box sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                p: 3
            }}
            >
                <div>
                    <Typography color="textPrimary" variant="subtitle2">
                        {label}
                    </Typography>
                    <Typography style={{ fontSize: '20px' }} color="textPrimary" sx={{ mt: 1 }} variant="h4">
                        {new Intl.NumberFormat(locale).format(totalNumber) }
                    </Typography>
                </div>
                {
                    renderGraph(type, series)
                }
            </Box>
            <Divider />
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    px: 3,
                    py: 2
                }}
            >
                {
                    renderIcon(percentage)
                }
                <Typography
                    color="textSecondary"
                    sx={{ ml: 1 }}
                    variant="caption"
                >
                    { renderTrend(percentage) }
                </Typography>
            </Box>
        </Card>
    );
};
