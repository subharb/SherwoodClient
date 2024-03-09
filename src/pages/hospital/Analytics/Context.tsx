import React, { useState } from 'react';
import { IDepartment } from '../../../constants/types';


interface IAnalyticsContext {
    startDate: number | null;
    endDate: number | null;
    uuidInvestigation: string | null;
    departmentSelected: string | null;
    departments: IDepartment[] | null;
    setStartDate: (startDate: number | null) => void;
    setEndDate: (endDate: number | null) => void;
    setDepartments: (departments: IDepartment[] | null) => void;
    setDepartmentSelected: (departmentSelected: string | null) => void;
}
const AnalyticsContext = React.createContext<IAnalyticsContext>({
    startDate: null,
    endDate: null,
    uuidInvestigation: null,
    departmentSelected: null,
    departments: null,
    setStartDate: (x) => {},
    setEndDate: (x) => {},
    setDepartments: (x) => {},
    setDepartmentSelected: (x) => {},
});

const AnalyticsContextProvider = ({ uuidInvestigation, children }: { uuidInvestigation : string, children: React.ReactNode }) => {
    const [startDate, setStartDate] = useState<number | null>(null);
    const [endDate, setEndDate] = useState<number | null>(null);
    const [departmentSelected, setDepartmentSelected] = useState<string | null>(null);
    const [departments, setDepartments] = useState<IDepartment[] | null>(null);


    return (
        <AnalyticsContext.Provider value={{ startDate, endDate, uuidInvestigation, 
                                                departmentSelected, departments, setStartDate, setEndDate,
                                                setDepartments, setDepartmentSelected }}>
            {children}
        </AnalyticsContext.Provider>
    );
  };

export  {AnalyticsContext, AnalyticsContextProvider};