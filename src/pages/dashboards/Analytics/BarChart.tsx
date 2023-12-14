// @ts-nocheck
import React from "react";
import styled, { withTheme } from "styled-components";
import Chart from 'react-apexcharts';
import {
    Card as MuiCard,
    CardContent as MuiCardContent,
    CardHeader,
    IconButton,
    useTheme,
} from "@mui/material";

import { spacing } from "@mui/system";

import "../../../vendor/roundedBarCharts";
import { Bar } from "react-chartjs-2";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const ChartWrapper = styled.div`
  height: 237px;
  width: 100%;
`;

interface BarChartProps{
    series: {
        name: string,
        count: number[]
    }[],
    title:Element,
    categories:Date[]
}


const BarChart = (props:BarChartProps) => {
    const theme = useTheme();
   
    const chart = {
        options: {
            chart: {
                background: 'transparent',
                stacked: false,
                toolbar: {
                    show: false
                },
                zoom: false
            },
            colors: ['#ffb547', '#7783DB', '#E91E63', '#4CAF50', '#FF9800', '#E040FB'],
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'solid',
                opacity: 0
            },
            grid: {
                borderColor: theme.palette.divider
            },
            markers: {
                strokeColors: theme.palette.background.paper,
                size: 6
            },
            stroke: {
                curve: 'straight',
                width: 2
            },
            xaxis: {
                axisBorder: {
                    color: theme.palette.divider,
                    show: true
                },
                axisTicks: {
                    color: theme.palette.divider,
                    show: true
                },
                categories: props.categories.map((month) => month.toLocaleString('default', { month: 'short' })),
            }
        },
        series: props.series.map((serie) => {
            return {
                name: serie.name,
                data: serie.count
            }
        })
    };
    
    return (
        <Card>
            <CardHeader title={props.title} />
            <CardContent>
                <Chart
                    height="360"
                    type="area"
                    {...chart}
                />
            </CardContent>
        </Card>
    );
};

export default BarChart;
