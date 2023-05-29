import React from 'react';
import { Translate } from 'react-localize-redux';
import { BillActions } from '.';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { fullDateFromPostgresString } from '../../../utils/index.jsx';

type BillsTableProps = {
    bills: any[];
    patients: any[];
    languageCode: string;
    currency: string;
    makeActionBillCallBack: (index:number, action:BillActions) => void;
};

const BillsTable: React.FC<BillsTableProps> = ({ bills, patients, languageCode, currency, makeActionBillCallBack }) => {
    const rows = bills.map((bill) => {
        // if(!bill.patientInvestigation){
        //     console.log("Patient not found for bill: ", bill);    
        //     return {
        //         "id" : bill.id,
        //         "patient" : "error - "+bill.billItems[0].concept,
        //         "total" : 0,
        //         "totalPending" : 0,
        //         "dateCreation" : 0
        //     }
        // }
        const patient = patients.find((patient) => patient.id === bill.patientInvestigation.id);
        return {
            "id" : bill.id,
            "patient" : patient?.personalData.name+" "+patient?.personalData.surnames, 
            "total" : Number(bill.total),
            "totalPending" : Number(bill.total) - Number(bill.totalPaid),
            "dateCreation" : fullDateFromPostgresString(languageCode, bill.createdAt)
        }
    });
    const headCells = [
            { id: "id", alignment: "left", label: "ID" },
            { id: "patient", alignment: "left", label: <Translate id={`hospital.billing.bill.patient`} /> },
            { id: "total", alignment: "left", label: [<Translate id={`hospital.billing.bill.total`} />,"("+currency+")"] },
            { id: "totalPending", alignment: "left", label: [<Translate id={`hospital.billing.bill.total_pending`} />,"("+currency+")"]},
            { id: "dateCreation" , alignment: "right",  label: [<Translate id={`hospital.billing.bill.date`} />] } 
        ]
    return (
        <EnhancedTable noHeader headCells={headCells} rows={rows}  noSelectable
        actions={[{"type" : "edit", "func" : (index:number) => makeActionBillCallBack(index, BillActions.update)},
                {"type" : "view", "func" : (index:number) => makeActionBillCallBack(index, BillActions.preview)}]} />
    );
};

export default BillsTable;
