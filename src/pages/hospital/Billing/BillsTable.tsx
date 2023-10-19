import React, { useMemo, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { BillActions } from '.';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { fullDateFromPostgresString } from '../../../utils/index.jsx';
import SearchBox from '../../../components/general/SearchBox';
import { BillStatus } from '../Service/types';
import { green, red } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { ColourChip } from '../../../components/general/mini_components-ts';

type BillsTableProps = {
    bills: any[];
    patients: any[];
    languageCode: string;
    currency: string;
    makeActionBillCallBack: (index:number, action:BillActions) => void;
};


export const statusToColor = (status:BillStatus) => {
    let colour = "#000";
    switch(status){
        case BillStatus.PAID:
            colour = green[900];
            break;
        case BillStatus.PENDING_PAYMENT: 
            colour = red[900];
            break;
    }
    return colour;
}

const BillsTable: React.FC<BillsTableProps> = ({ bills, patients, languageCode, currency, makeActionBillCallBack }) => {
    const [patientName, setPatientName] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<BillStatus[]>([]);
    const billsPatients = useMemo(() => {
        return bills.map((bill) => {

            const patient = patients.find((patient) => patient.id === bill.patientInvestigation.id);
            return {
                "id" : bill.id,
                "patient" : patient?.personalData.name+" "+patient?.personalData.surnames, 
                "total" : new Intl.NumberFormat(languageCode).format(Number(bill.total)),
                "statusPayment" : (Number(bill.total) - Number(bill.totalPaid)) > 0 ? <ColourChip rgbcolor={green[900]} label={<Translate id="hospital.billing.bill.paid" />}/> : <ColourChip rgbcolor={red[900]} label={<Translate id="hospital.billing.bill.pending" />}/> ,
                                                                                        
                "dateCreation" : fullDateFromPostgresString(languageCode, bill.createdAt)
            }
        })}, [bills, patients, languageCode]);
    function callbackNameTyped(name:string){
        setPatientName(name);        
    }

    function applyStatusFilter(status:BillStatus){
        if(statusFilter && statusFilter.includes(status)){
            if(statusFilter.length === 1){
                setStatusFilter([]);
            }
            else{
                setStatusFilter(statusFilter.filter((s) => s !== status));
            }
        }
        else if(statusFilter){
            setStatusFilter([...statusFilter, status]);
        }
        else{
            setStatusFilter([status]);
        }
        
    }

    const rows = billsPatients.filter((bill) => {
        let shouldBeFiltered = patientName.length === 0 && statusFilter.length === 0;
        const activeNameFilter = patientName.length > 0;
        let matchNameFilter = false;
        if(activeNameFilter){
            matchNameFilter = bill.patient.toLocaleLowerCase().includes(patientName.toLocaleLowerCase());
            shouldBeFiltered = matchNameFilter;
        }
        if(statusFilter.length > 0){
            if(statusFilter.includes(BillStatus.PAID)){
                shouldBeFiltered = activeNameFilter ? matchNameFilter && bill.totalPending === 0 : bill.totalPending === 0;
            }
            if(statusFilter.includes(BillStatus.PENDING_PAYMENT)){
                shouldBeFiltered = activeNameFilter ? matchNameFilter && bill.totalPending > 0 : bill.totalPending > 0;
            }
        }
        return shouldBeFiltered;
    })
    const headCells = [
            { id: "id", alignment: "left", label: "ID" },
            { id: "patient", alignment: "left", label: <Translate id={`hospital.billing.bill.patient`} /> },
            { id: "total", alignment: "left", label: [<Translate id={`hospital.billing.bill.total`} />,"("+currency+")"] },
            { id: "statusPayment", alignment: "left", label: [<Translate id={`hospital.billing.bill.paid`} />]},
            { id: "dateCreation" , alignment: "right",  label: [<Translate id={`hospital.billing.bill.date`} />] } 
        ]
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SearchBox textField={{label:"hospital.billing.search_patient", callBack:callbackNameTyped}}
                    activeFilters={statusFilter}
                    filterItems={[
                        {label:"paid", value:BillStatus.PAID, color:statusToColor(BillStatus.PAID), callBack:() => applyStatusFilter(BillStatus.PAID)},
                        {label:"pending_payment", value:BillStatus.PENDING_PAYMENT, color:statusToColor(BillStatus.PENDING_PAYMENT), callBack:() => applyStatusFilter(BillStatus.PENDING_PAYMENT)},
                    ]} />
            </Grid>
            <Grid item xs={12}>
                <EnhancedTable noHeader headCells={headCells} rows={rows}  noSelectable
                actions={[{"type" : "edit", "func" : (index:number) => makeActionBillCallBack(index, BillActions.update)},
                        {"type" : "view", "func" : (index:number) => makeActionBillCallBack(index, BillActions.preview)}]} />
                </Grid>
        </Grid>
    );
};

export default BillsTable;
