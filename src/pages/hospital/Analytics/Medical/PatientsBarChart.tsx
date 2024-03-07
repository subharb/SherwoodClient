import React, { useMemo } from 'react';
import { IDepartment } from '../../../../constants/types';
import BarChart from '../../../dashboards/Analytics/BarChart';
import { useQuery } from '@tanstack/react-query';
import { getStatsActivityService } from '../../../../services';
import Loader from '../../../../components/Loader';

interface PatientsBarChartProps {
    uuidInvestigation: string,
    startDate: number,
    endDate: number,
    departments:IDepartment[],
    departmentSelected:IDepartment,
    
    patients:any[],
    title:Element
}

export const PatientsBarChart: React.FC<PatientsBarChartProps> = ({ uuidInvestigation, startDate, endDate, departments, title, patients, departmentSelected, statsPerDepartment }) => {
    const { isPending, error, data } = useQuery({
        queryKey: ['getStatsActivityService', uuidInvestigation, startDate, endDate],
        queryFn: () =>
        getStatsActivityService(uuidInvestigation, startDate, endDate),
    })

    if(isPending){
        return <Loader />;
    }
    if(error){
        return <div>Error: {error.message}</div>;
    }
    
    return <PatientsBarChartView departments={departments} departmentSelected={departmentSelected} 
                title={title} patients={patients} statsPerDepartment={data.stats} />;
};



interface PatientsBarChartViewProps extends Omit<PatientsBarChartProps, "uuidInvestigation" | "startDate" | "endDate"> {
    statsPerDepartment: { [departmentId: string]: number[] },
}

export const PatientsBarChartView: React.FC<PatientsBarChartViewProps> = ({ departments, title, patients, departmentSelected, statsPerDepartment }) => {

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