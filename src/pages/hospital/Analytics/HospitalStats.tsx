import React from 'react';
import { Translate } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import Loader from '../../../components/Loader';
import { TabsSherwood } from '../../components/Tabs';
import TimeTable from '../../dashboards/Analytics/TimeTable';

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
    units:IStatUnit
}
interface HospitalStatsProps {
    stats:{
        departments:IStatDepartment[],
        global:IStatValueResearcher[]
    }
}

const HospitalStats: React.FC<HospitalStatsProps> = ({ stats }) => {
    if(stats === null){
        return <Loader />
    }
    
    const headCells = [{ id: "researcher", alignment: "left", label: <Translate id={`hospital.staff`} /> },
                        { id: "unit", alignment: "left", label: <Translate id={`hospital.departments.unit`} /> },
                        { id: "firstVisit", alignment: "left", label: <Translate id={`hospital.analytics.graphs.activity.first-visit`} /> },
                        { id: "monitoringVisit", alignment: "left", label: <Translate id={`hospital.analytics.graphs.activity.followup-visit`} /> },
                       ];
    if(stats.departments.length === 0){
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
   

    
    if(stats.departments.length === 1){
        return <EnhancedTable noHeader noSelectable={true} rows={statsPerDepartment[0]} headCells={headCells} />
    }
    else{
        const nameDepartments:string[] = stats.departments.map((department) => department.name);
        
       
        return (
            <TabsSherwood name='Hospital Stats' labels={nameDepartments} >
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
