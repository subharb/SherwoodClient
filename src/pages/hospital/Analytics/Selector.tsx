import { Grid } from '@mui/material';
import React from 'react';
import Loader from '../../../components/Loader';
import { IDepartment } from '../../../constants/types';
import DatesSelector from '../../dashboards/Analytics/DatesSelector';

interface AppProps {
    departments : IDepartment[] | null,
    onDatesSelected: (dates:Date[]) => void,
    renderDepartmentSelector: () => JSX.Element
}

const App: React.FC<AppProps> = ({ departments, renderDepartmentSelector,  onDatesSelected }) => {
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

export default App;
