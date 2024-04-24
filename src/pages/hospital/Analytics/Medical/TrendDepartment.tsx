import React from 'react';
import { Trend, TrendProps } from '../../../dashboards/Analytics/Trend';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../components/Loader';

interface TrendDepartmentProps extends TrendProps{
    departmentSelected: string;
}

export const TrendDepartment: React.FC<TrendDepartmentProps> = ({ departmentSelected, url, locale, key, label }) => {
    const {isPending, error, data }= useQuery({
        queryKey: [url],
        queryFn: () =>
            fetch(url, {
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                }
            })
                .then((res) => res.json()),
            staleTime: Infinity,
    });

    if(isPending){
        return <Loader />;
    }
    if(error){
        return <div>Error: {error.message}</div>;
    }
    if(departmentSelected !== 'all'){
        
    }
    return (
        <Trend key={key}
            label={label}
            totalIndex={0}
            locale={locale}
            dataTrend={data.trend}
            type="bars"
        />
    );
};

