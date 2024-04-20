import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material';
import ChevronUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChevronDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LineChart } from './LineChart';
import { BarChartLine } from './BarChartLine';
import { alpha } from '@material-ui/core';
import { useMemo } from 'react';
import Loader from '../../../components/Loader';
import { useQuery } from '@tanstack/react-query';
import { RadialChartLine } from './RadialChart';

export interface TrendProps {
    label: string;
    type: string;
    url?: string;
    dataTrend?: any;
    totalIndex: number;
    locale: string;
    isLoading?: boolean;
}

type ExclusiveProps<T> = T extends { url: any } ? { url: string } : { dataTrend: any };


interface TrendViewProps extends Omit<TrendProps, "url" | "dataTrend" | "isLoading" | "totalIndex">{
    series: number[];
    totalNumber: number;
    type: string;
    
}

export const Trend: React.FC<TrendProps & ExclusiveProps<TrendProps>> = ({ label, isLoading, type, url, dataTrend, totalIndex, locale }) => {
    let isPending = false;
    let error: Error | null = null;
    let trend: any | null = null;

    if (url) {
        const response = useQuery({
            queryKey: [url],
            queryFn: () =>
                fetch(url, {
                    headers: {
                        "Authorization": localStorage.getItem("jwt")
                    }
                })
                    .then((res) => res.json()),
                staleTime: Infinity,
        });
        isPending = response.isPending;
        error = response.error;
        trend = response.data?.trend;
    } else {
        isPending = false;
        error = null;
        trend = dataTrend;
    }

    if (isPending || isLoading) {
        return <Loader />;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!trend) {
        return <div>NO DATA</div>;
    }

    return (
        <TrendView
            label={label}
            series={trend.data}
            locale={locale}
            totalNumber={trend.totals[totalIndex]}
            type={type}
        />
    );
};

export const TrendView: React.FC<TrendViewProps> = ({ label, series, totalNumber, type, locale }) => {
    const theme = useTheme();
    const percentage = useMemo(() => {
        const firstNonZero = series.findIndex((item) => item !== 0);
        if (firstNonZero === -1) {
            return 0;
        }
        const percentage = ((series[series.length - 1] - series[firstNonZero]) / series[firstNonZero]) * 100;
        if(isNaN(percentage)){
            return 0;
        }
        return percentage;
    }, [series]);

    function renderIcon(percentage: number) {
        let icon = <ChevronDownIcon fontSize="small" />;
        let color = theme.palette.error.main;
        let colorString = "error.main";
        if (percentage > 0) {
            icon = <ChevronUpIcon fontSize="small" />;
            color = theme.palette.success.main;
            colorString = "success.main";
        }

        return (
            <Avatar
                sx={{
                    backgroundColor: (theme) => alpha(color, 0.08),
                    color: colorString,
                    height: 36,
                    width: 36
                }}
            >
                {icon}
            </Avatar>
        );
    }

    function renderTrend(percentage: number, type: string) {
        console.log(percentage);
        if (percentage > 0) {
            return `${percentage.toFixed(0)}% increase`;
        } else {
            return `${percentage.toFixed(0)}% decrease`;
        }
    }

    function renderGraph(type: string, series: number[]) {
        if (type === "line") {
            return <LineChart series={series} />;
        }
        else if (type === "bars") {
            return <BarChartLine series={series} />;
        }
        return <RadialChartLine series={series} />;
    }

    return (
        <Card style={{ width: '100%' }}>
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
                        {isNaN(totalNumber) ? "0" : new Intl.NumberFormat(locale).format(totalNumber)}
                    </Typography>
                </div>
                {renderGraph(type, series)}
            </Box>
            {
                type !== "radial" && 
                <>
                    <Divider />
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                px: 3,
                                py: 2
                            }}
                        >
                            {renderIcon(percentage)}
                            <Typography
                                color="textSecondary"
                                sx={{ ml: 1 }}
                                variant="caption"
                            >
                                {renderTrend(percentage, type)}
                            </Typography>
                        </Box>
                </>
            }
            
        </Card>
    );
};