import { Card, Grid } from '@mui/material';
import React, { useMemo } from 'react';
import { BillActions } from '.';
import PatientInfo from '../../../components/PatientInfo';
import BillsTable from './BillsTable';
import { Bill } from './types';

type BillsPatientProps = {
    uuidPatient: string;
    bills: Bill[];
    languageCode: string;
    currency: string;
    patient:any;
    makeActionBillCallBack: (index:number, action:BillActions) => void;
};

const BillsPatient: React.FC<BillsPatientProps> = ({ uuidPatient, currency, patient, bills, languageCode,  makeActionBillCallBack }) => {
    const totalBills = useMemo(() => {
        return bills.reduce((total, bill) => {
            return {total: total.total + Number(bill.total), totalPaid: total.totalPaid + Number(bill.totalPaid)}
        }, {total:0, totalPaid:0})
    }, [bills])
        
    function renderBills(){
        if(bills.length === 0){
            return <Card>No bills</Card>
        }
        else{
            return <BillsTable patients={[patient]} currency={currency} bills={bills} languageCode={languageCode} 
                        makeActionBillCallBack={makeActionBillCallBack}/>
        }
    }
    return (
        <Grid container xs={12} spacing={3}>
            <Grid item xs={12}>
                <Card style={{padding:"1rem"}}>
                    <PatientInfo uuidPatient={uuidPatient} 
                        auxiliarInfo={[{title:"hospital.billing.total_amount", value:totalBills.total+" "+currency}, {title:"hospital.billing.total_paid", value:totalBills.totalPaid+" "+currency}]} />
                </Card>
            </Grid>
            <Grid item xs={12}>
            {
                renderBills()
            }
            </Grid>
        </Grid>
    );
};

export default BillsPatient;
