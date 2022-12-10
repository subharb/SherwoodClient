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
        if(patients.length === 0) return [];
        const orderedPatients = patients.sort((a,b) => a.dateCreated - b.dateCreated);
        const startDate = new Date(orderedPatients[0].dateCreated);
        const endDate = new Date(orderedPatients[orderedPatients.length - 1].dateCreated);
        const numberMonths =  endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear()) + 1;
        let months = [];
        for(let i = 0; i < numberMonths; i++){
            months.push(new Date(startDate.getFullYear(), startDate.getMonth() + i, 1));
        }
        return months;
    }, [patients])

    function seriesPerDepartment(currentDepartment:IDepartment){
        
        if(statsPerDepartment[currentDepartment.uuid as string]){
            const patientIds = statsPerDepartment[currentDepartment.uuid as string];
            let copyPatientsId = [...patientIds];
            const patientsInDate = categories.map((month) => {
                const patientsInPeriod = patientIds.filter((patientId) => {
                    const findPatient = patients.find((patient) => patient.id === patientId);
                    if(!findPatient){
                        return false;
                    }
                    const patientDate = new Date(findPatient.dateCreated);
                    return patientDate.getMonth() === month.getMonth() 
                            && patientDate.getFullYear() === month.getFullYear();
                })
                copyPatientsId = copyPatientsId.filter( function( el ) {
                    return patientsInPeriod.indexOf( el ) < 0;
                  } );
                return patientsInPeriod.length;
               
            })
            return {
                name: currentDepartment.name,
                count: patientsInDate
            }
        }
        else{
            return {
                name: currentDepartment.name,
                count: categories.map(() => 0)
            }
        }
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
    }, [patients]);
    
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