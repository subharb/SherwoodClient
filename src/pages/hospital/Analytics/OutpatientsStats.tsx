import { Grid, Theme } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useMemo } from 'react';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { ThemeProps, withTheme } from 'styled-components';
import { FUNCTIONALITY, IDepartment } from '../../../constants/types';
import DoughnutChart from '../../dashboards/Analytics/DoughnutChart';

interface OutpatientsStatsProps extends LocalizeContextProps {
    functionalities: string[];
    appointmentsPerDepartment: { [uuidDepartment: string]: number };
    theme: Theme,
    departments: IDepartment[]
}

const OutpatientsStatsLocalized: React.FC<OutpatientsStatsProps> = ({ functionalities, departments, appointmentsPerDepartment, translate, theme }) => {
    const outpatientsTotal = useMemo(() => {
        if(appointmentsPerDepartment){
            return Object.values(appointmentsPerDepartment).reduce((acc, curr) => acc + curr, 0);
        }
        return 0;
    }, [appointmentsPerDepartment]);

    if( (functionalities.includes(FUNCTIONALITY.OUTPATIENTS)) && appointmentsPerDepartment && departments ) {
        const labels = Object.keys(appointmentsPerDepartment).map((uuidDepartment) => {
            const department = departments.find((department) => department.uuid === uuidDepartment);
            return department ? department.name : '';
        });
        return (
            <Grid container item spacing={1}>
                <DoughnutChart title={translate("hospital.analytics.graphs.appointments.title")} labels={labels}
                    table={{ title: translate("hospital.analytics.graphs.appointments.table-title"), columns: [translate("hospital.analytics.graphs.sex.count")] }}
                    innerInfo={{ title: translate("hospital.analytics.graphs.appointments.title"), value: outpatientsTotal }}
                    datasets={[
                        {
                            data: Object.values(appointmentsPerDepartment),
                            percents: Object.values(appointmentsPerDepartment).map((count) => Math.round((count / outpatientsTotal as number) * 100)),
                            backgroundColor: [theme.palette.secondary.main, red[500]],
                            borderWidth: 5,
                            borderColor: theme.palette.background.paper,
                        }
                    ]} />
            </Grid>        
        );  
    }
    return null;
    
};

const OutpatientsStats = withTheme(withLocalize(OutpatientsStatsLocalized));

export default OutpatientsStats;
