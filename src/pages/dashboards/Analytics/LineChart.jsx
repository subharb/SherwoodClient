import Chart from 'react-apexcharts';
import { Avatar, Box, Button, Card, Divider, Grid, Typography } from '@material-ui/core';
import { alpha, useTheme } from '@material-ui/core/styles';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ChevronDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const LineChart = (props) => {
    const theme = useTheme();

    const chart = {
        options: {
            chart: {
                background: 'transparent',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            colors: ['#7783DB'],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false
            },
            stroke: {
                width: 3
            },
            theme: {
                mode: theme.palette.mode
            },
            tooltip: {
                enabled: false
            },
            xaxis: {
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                show: false
            }
        },
        series: [
            {
                data: props.series
            }
        ]
    };

    return (
        <Chart
            type="line"
            width={120}
            {...chart}
        />
    );
};
