import { Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import Loader from '../../../components/Loader';
import { IDepartment } from '../../../constants/types';
import DatesSelector from '../../dashboards/Analytics/DatesSelector';
import { useDeparmentsSelector } from '../../../hooks';
import { AnalyticsContext } from './Context';

interface SelectorProps {
    onlyDepartmentsResearcher: string,
    onDatesSelectedCallback: (dates:Date[]) => void,
}

export const Selector: React.FC<SelectorProps> = ({ onlyDepartmentsResearcher, onDatesSelectedCallback }) => {
    const { setStartDate, setEndDate, setDepartmentSelected, setDepartments } = useContext(AnalyticsContext);
    const { renderDepartmentSelector, departmentSelected, departments} = useDeparmentsSelector(true, onlyDepartmentsResearcher, true, "all");

    useEffect(() => {
        if(departmentSelected !== null){
            setDepartmentSelected(departmentSelected);
        }
    }, [departmentSelected]);

    useEffect(() => {
        if(departments !== null){
            setDepartments(departments);
        }
    }, [departments]);

    function onDatesSelected(dates:Date[]){
        setStartDate(dates[0].getTime());
        setEndDate(dates[1].getTime());
        onDatesSelectedCallback(dates);
    }

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
