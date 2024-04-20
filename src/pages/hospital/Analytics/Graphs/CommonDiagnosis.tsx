import React, { useMemo } from 'react';
import { countSexPatients } from '../../../../utils/index.jsx';
import { EnhancedTable } from '../../../../components/general/EnhancedTable.jsx';
import { Translate } from 'react-localize-redux';
import { IPatient, IPersonalData } from '../../../../constants/types.js';
import { useQuery } from '@tanstack/react-query';
import { getStatsMostCommonDiagnosis } from '../../../../services/index.js';
import Loader from '../../../../components/Loader.jsx';

interface CommonDiagnosisProps {
    uuidInvestigation: string,
    startDate: number,
    endDate: number,
    patientsPersonalData: IPatient[],
}

const CommonDiagnosis: React.FC<CommonDiagnosisProps> = ({ patientsPersonalData, uuidInvestigation, 
                                                            startDate, endDate }) => {

    const { isPending, error, data } = useQuery({
        queryKey: ['getStatsMostCommonDiagnosis', uuidInvestigation, startDate, endDate],
        queryFn: () =>
        getStatsMostCommonDiagnosis(uuidInvestigation, startDate, endDate),
        staleTime: Infinity,
    })

    if(isPending){
        return <Loader />;
    }
    if(error){
        return <div>Error: {error.message}</div>;
    }
    return <CommonDiagnosisView loading={isPending} data={data.stats} 
                patientsPersonalData={patientsPersonalData} />;
}

interface CommonDiagnosisViewProps {
    loading:boolean,
    patientsPersonalData:any[], 
    data:Record<string, {name:string, patientIds:number[]}>
}

const CommonDiagnosisView: React.FC<CommonDiagnosisViewProps> = ({ loading, data, patientsPersonalData }) => {
    const rows = useMemo(() => {
        if(!data){
            return [];
        }
        return Object.values(data).map((value) => {
            const tempFilterPatients = patientsPersonalData.filter(patient => {
                return value.patientIds.includes(patient.id);
            });
            const statsSex = countSexPatients(tempFilterPatients);
            return {
                diagnosis: value.name,
                female:statsSex.female,
                male:statsSex.male,
                total:tempFilterPatients.length
            }
        })
    }, [data, patientsPersonalData]);

    const headCells = useMemo(() => {
        return [{ id: "diagnosis", alignment: "left", label: <Translate id={`hospital.analytics.graphs.most-common-diagnosis.diagnostic`} /> },
                { id: "female", alignment: "right", label: <Translate id={`general.female`} /> },
                { id: "male", alignment: "right", label: <Translate id={`general.male`} /> },
                { id: "total", alignment: "right", label: <Translate id={`general.total`} /> }]
    }, []);

    if(loading){
        return <div>Loading...</div>
    }
    return (
        <EnhancedTable noHeader noSelectable headCells={headCells} rows={rows} />
    );
};

export default CommonDiagnosis;
