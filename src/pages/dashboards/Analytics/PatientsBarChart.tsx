// @ts-nocheck
import React, { useMemo } from 'react';
import { IDepartment } from '../../../constants/types';
import BarChart from './BarChart';

interface PatientsBarChartProps {
    departments:IDepartment[],
    departmentSelected:IDepartment,
    statsPerDepartment: { [departmentId: string]: number[] },
    patients:any[],
    title:Element
}
const PatientsBarChart: React.FC<PatientsBarChartProps> = ({ departments, title, patients, departmentSelected, statsPerDepartment }) => {

    const categories = useMemo(() => {
        return Object.keys(statsPerDepartment).sort((a, b) => new Date(a) - new Date(b) );
    }, [statsPerDepartment]);

    function seriesPerDepartment(currentDepartment:IDepartment){
        
        const seriesDepartment = categories.map((key) => {
            const countPatientsInDepartment = statsPerDepartment[key].filter((patient) => patient.department.uuid === currentDepartment.uuid).length;
            return countPatientsInDepartment;
        });
        return {
            name: currentDepartment.name,
            count: seriesDepartment
        };

    }
    const series = useMemo(() => {
        let tempSeries = [];
        if(!departments || !statsPerDepartment){
            return [];
        }
        if(!departmentSelected){
            for(let i = 0; i < departments.length; i++){
                const currentDepartment = departments[i];
                tempSeries.push(seriesPerDepartment(currentDepartment));
            }
            return tempSeries;
        }
        else{
            return [seriesPerDepartment(departmentSelected)];
        }
    }, [patients, statsPerDepartment]);
    
    if(categories && series){
        return(
            <BarChart title={title} categories={categories} series={series} />
        );
    }
    else{
        return null;
    }
};

export default PatientsBarChart;