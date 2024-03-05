import { Grid } from '@mui/material';
import React from 'react';
import Loader from '../../../components/Loader';
import { IDepartment } from '../../../constants/types';
import DatesSelector from '../../dashboards/Analytics/DatesSelector';
import { useDeparmentsSelector } from '../../../hooks';

interface SelectorProps {
    onlyDepartmentsResearcher: string,
    onDatesSelected: (dates:Date[]) => void,
}

export const Selector: React.FC<SelectorProps> = ({ onlyDepartmentsResearcher, onDatesSelected }) => {
    
    const { renderDepartmentSelector, departmentSelected, departments} = useDeparmentsSelector(true, onlyDepartmentsResearcher, true, "all");

    if(departments === null){
        return (
            <Grid item xs={12}>
                <Loader />
            </Grid>
        )
    }
    if(departments.length === 1){
        return (
            <Grid item xs={12}>
                <DatesSelector onCallBack={onDatesSelected} />
            </Grid>
        )
    }
    return(
        <>
            <Grid item sm={6} xs={12}>
                { renderDepartmentSelector() }
            </Grid>
            <Grid item sm={6} xs={12}>
                <DatesSelector onCallBack={onDatesSelected} />
            </Grid>
        </>
        
    )
};
