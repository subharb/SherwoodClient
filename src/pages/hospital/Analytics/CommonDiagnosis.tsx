import React, { useMemo } from 'react';
import { countSexPatients } from '../../../utils/index.jsx';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { Translate } from 'react-localize-redux';

interface CommonDiagnosisProps {
    loading:boolean,
    patientsPersonalData:any[], 
    data:Record<string, {name:string, patientIds:number[]}>
}

const CommonDiagnosis: React.FC<CommonDiagnosisProps> = ({ loading, data, patientsPersonalData }) => {
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
