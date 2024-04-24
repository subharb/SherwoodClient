import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Translate } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import Loader from '../../../components/Loader';
import { TabsSherwood } from '../../components/Tabs';
import TimeTable from '../../dashboards/Analytics/TimeTable';
import { useQuery } from '@tanstack/react-query';
import { getStatsFirstMonitoring } from '../../../services';
import { AnalyticsContext } from './Context';

interface IStatReseacher{
    name: string,
    surnames: string,
    uuid : string
}
interface IStatValueResearcher {
    researcher : IStatReseacher,
    unit:string,
    firstVisit : number,
    monitoringVisit : number,
    
}
interface IStatDictReseacher{
    [uuidUnit: string] : IStatValueResearcher;
}
interface IStatUnit{
    [uuidUnit: string] : IStatDictReseacher;
}
interface IStatDepartment{
    name:string,
    uuid:string,
    units:IStatUnit
}
interface HospitalStatsProps{
 
}
interface HospitalStatsViewProps {
    loading:boolean,
    departmentSelected:string,
    stats:{
        departments:IStatDepartment[],
        global:IStatValueResearcher[]
    }
}

const HospitalStats: React.FC<HospitalStatsProps> = ({ }) => {
    const { startDate, endDate, uuidInvestigation, 
        departments, departmentSelected} = useContext(AnalyticsContext);

    const { isPending, error, data } = useQuery({
        queryKey: ['statsFirstMonitoring', uuidInvestigation, departmentSelected, startDate, endDate],
        queryFn: () =>
            getStatsFirstMonitoring(uuidInvestigation, startDate, endDate),
            staleTime: Infinity,
    })

    if(isPending){
        return <Loader />
    }

    return <HospitalStatsView stats={data} departmentSelected={departmentSelected ? departmentSelected : "all"} loading={isPending} />
};

const HospitalStatsView: React.FC<HospitalStatsViewProps> = ({ stats, departmentSelected, loading }) => {
    if(stats === null){
        return <Loader />
    }
    
    const headCells = [{ id: "researcher", alignment: "left", label: <Translate id={`hospital.staff`} /> },
                        { id: "unit", alignment: "left", label: <Translate id={`hospital.departments.unit`} /> },
                        { id: "firstVisit", alignment: "left", label: <Translate id={`hospital.analytics.graphs.activity.first-visit`} /> },
                        { id: "monitoringVisit", alignment: "left", label: <Translate id={`hospital.analytics.graphs.activity.followup-visit`} /> },
                       ];
    if(stats.departments.length === 0 || departmentSelected === "all"){
        const statsGlobal = stats.global.map((statRes) => {
            return {
                researcher : statRes.researcher.name +" " +statRes.researcher.surnames,
                firstVisit: statRes.firstVisit,
                monitoringVisit:statRes.monitoringVisit,
            }
        })
        headCells.splice(1,1)
        return <EnhancedTable noHeader noSelectable={true} rows={statsGlobal} headCells={headCells} />
    }
    const statsPerDepartment =  stats.departments.map((department)=>{
        let tempStatsUnit =  Object.values(department.units).map((unit)=>{
            return Object.values(unit).map((unitValue)=>{
                return {
                    researcher : unitValue.researcher.name +" " +unitValue.researcher.surnames,
                    firstVisit: unitValue.firstVisit,
                    monitoringVisit:unitValue.monitoringVisit,
                    unit:unitValue.unit
                }
            })
        })
        return tempStatsUnit.flat();
    })
   
    if(loading){
        return <Loader />
    }
    else if(stats.departments.length === 1 ||  departmentSelected){
        let statsTable;
        const indexDepartment = !departmentSelected ? 0 : stats.departments.findIndex((department) => department.uuid === departmentSelected);
        if(indexDepartment === -1){
            return <Typography variant="body2" component="h2" style={{ color: "white" }}>No stats for this department</Typography>
        }  
        else{
            statsPerDepartment[indexDepartment]
        }    

        return <EnhancedTable noHeader noSelectable={true} 
                rows={statsPerDepartment[indexDepartment]} headCells={headCells} />
    }
    else{
        const nameDepartments:string[] = stats.departments.map((department) => department.name);
        
       
        return (
            <TabsSherwood name='Hospital Stats' style={{  color: "white" }} labels={nameDepartments} >
                {
                    statsPerDepartment.map((statsDepartment) => {
                        return <EnhancedTable noHeader noSelectable={true} rows={statsDepartment} headCells={headCells} />
                    })
                }
            </TabsSherwood>
        )
        
    }
};

export default HospitalStats;
