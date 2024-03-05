import React, { useMemo } from 'react';
import BarChart from './BarChart';
import { IDepartment } from '../../../constants/types';
import { Translate } from 'react-localize-redux';
import Loader from '../../../components/Loader';
import { stat } from 'fs';
import { useQuery } from '@tanstack/react-query';
import { useDepartments } from '../../../hooks';

interface BillingChartProps {
    currency:string,
    startDate: number,
    endDate: number,
    uuidInvestigation : string
}

interface SeriesDepartment{
    name: string;
    count: number[];
} 

export const BillingChart: React.FC<BillingChartProps> = ({ startDate, endDate, currency, uuidInvestigation}) => {
    const {departments, loadingDepartments } = useDepartments();
    const url = import.meta.env.VITE_APP_API_URL + "/analytics/" + uuidInvestigation + "/billing/startDate/" + startDate + "/endDate/" + endDate;
    const { isPending, error, data } = useQuery({
        queryKey: ["billingChart"],
        queryFn: () =>
          fetch(url, {
            headers : {
                "Authorization": localStorage.getItem("jwt") || ""
            }
        })
        .then((res) =>
            res.json(),
        ),
    });

    if(isPending || loadingDepartments){
        return <Loader />;
    }
    if(error){
        return <div>Error: {error.message}</div>;
    }
    return <BillingChartView currency={currency} 
            stats={data} departments={departments} />;
};
        
interface BillingChartViewProps extends Omit<BillingChartProps, "uuidInvestigation" | "startDate" | "endDate"> {
    stats: { [date: string]: { [department: string]: number } },
    departments: IDepartment[]
}


export const BillingChartView: React.FC<BillingChartViewProps> = ({ currency, stats, departments }) => {
    
    const categories = useMemo(() => {
        if(!stats){
            return [];
        }
        return Object.keys(stats).map((dateString) => new Date(dateString)).sort((a, b) => a.getTime() - b.getTime() );
    }, [stats]);

    const seriesDepartment:SeriesDepartment[] = useMemo(() => {
        let tempSeries:SeriesDepartment[] = [];
        departments.forEach((department) => {
            const uuidDepartment = department.uuid as string;
            let countDepartment:number[] = [];
            categories.forEach((date) => {
                const dateString = date.toISOString().split('T')[0];
                const count = stats[dateString][department.uuid as string] ? stats[dateString][department.uuid as string] : 0;
                countDepartment.push(count);
            });
            tempSeries.push({
                name: department.name,
                count: countDepartment
            });
        });
        
        return tempSeries;
    }, [stats]);

    return (
        <>
            <BarChart title={[<Translate id="hospital.analytics.graphs.billing.title" />, "("+currency+")"]} 
                categories={categories} series={seriesDepartment} />
        </>
    );
};
