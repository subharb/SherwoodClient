import { useQuery } from "@tanstack/react-query";
import { getPatientIdFromDepartment } from "../services";
import { useSelector } from "react-redux";
import { IPatient, IPersonalData } from "../constants/types";

export function usePatientFromDepartment(uuidInvestigation:string, uuidDepartment:string, startDate:number, endDate:number){
    const { isPending, error, data } = useQuery({
        queryKey: ['getPatientIdFromDepartment', uuidInvestigation, uuidDepartment, startDate, endDate],
        queryFn: () =>
            getPatientIdFromDepartment(uuidInvestigation, uuidDepartment, startDate, endDate),
            staleTime: Infinity,
    })
    const patientsPersonalData:IPatient[] = useSelector((state:any) => state.investigations.currentInvestigation.patientsPersonalData);

    const filteredPatients = !isPending && data.stats && data.stats.patientIds ? patientsPersonalData.filter(patient => {
                                return data.stats.patientIds.includes(patient.id);
                            }) : [];
    return { isPending, error, filteredPatients, trend : data ? data.trend : []};

}
