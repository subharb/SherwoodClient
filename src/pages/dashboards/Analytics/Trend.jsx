import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material';
import Chart from 'react-apexcharts';
import ChevronUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LineChart } from './LineChart';
import { BarChartLine } from './BarChartLine';
import { alpha } from '@material-ui/core';
import { useMemo } from 'react';

const Trend = ({ label, type }) => {
    
}

const TrendView = ({ label, series, totalNumber, type }) => {
    const theme = useTheme();
    const percentage = useMemo(() => ((series[series.length - 1] - series[0]) / series[0]) * 100);
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
                        {totalNumber}
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
