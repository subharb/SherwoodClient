// @ts-nocheck
import React from "react";
import styled, { withTheme } from "styled-components/macro";
import Chart from 'react-apexcharts';
import {
    Card as MuiCard,
    CardContent as MuiCardContent,
    CardHeader,
    IconButton,
    useTheme,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import "../../../vendor/roundedBarCharts";
import { Bar } from "react-chartjs-2";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const ChartWrapper = styled.div`
  height: 237px;
  width: 100%;
`;

interface BarChartProps{
    series: {
        name: string,
        count: number
    }[],
    title:Element,
    categories:Date[]
}

interface ChartData{
    [dateString: string] : {count:number, date:Date}
    
}

const BarChart = (props:BarChartProps) => {
    const theme = useTheme();
    const firstDatasetColor = theme.palette.secondary.main;
    const secondDatasetColor =
        theme.palette.type === "dark"
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(0, 0, 0, 0.1)";

    // const months:ChartData = props.elements.reduce((acc, element) => {
    //     const date = new Date(element.dateCreated);
    //     const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //     const dateString = firstDay.toDateString();
    //     if (!acc.hasOwnProperty(dateString)) {
    //         acc[dateString] = {
    //             count: 0,
    //             date: firstDay
    //         }
    //     }
    //     else {
    //         acc[dateString].count++
    //     }

    //     return acc;
    // }, {} as ChartData);

    const options = {
        maintainAspectRatio: false,
        cornerRadius: 2,
        legend: {
            display: false,
        },
        scales: {
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    stacked: true,
                    ticks: {
                        stepSize: 20,
                        fontColor: theme.palette.text.secondary,
                    },
                },
            ],
            xAxes: [
                {
                    stacked: true,
                    gridLines: {
                        color: "transparent",
                    },
                    ticks: {
                        fontColor: theme.palette.text.secondary,
                    },
                },
            ],
        },
    };
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
            colors: ['#ffb547', '#7783DB'],
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
