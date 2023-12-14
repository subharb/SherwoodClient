import React, { useMemo } from 'react';
import BarChart from './BarChart';
import { IDepartment } from '../../../constants/types';
import { Translate } from 'react-localize-redux';
import Loader from '../../../components/Loader';
import { stat } from 'fs';

interface BillingChartProps {
    loading:boolean,
    currency:string,
    stats:{[dateString:string] : {[uuidDepartment:string] : number}},
    departments:IDepartment[];
}

interface SeriesDepartment{
    name: string;
    count: number[];
}

const BillingChart: React.FC<BillingChartProps> = ({ loading, currency, stats, departments }) => {
    
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
        })
        
        return tempSeries;
    }, [stats]) 

    if(loading){
        return <Loader />; 
    }

    return (
        <>
            <BarChart title={[<Translate id="hospital.analytics.graphs.billing.title" />, "("+currency+")"]} 
                categories={categories} series={seriesDepartment} />
        </>
    );
};

export default BillingChart;
