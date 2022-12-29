import { Card, Grid } from '@material-ui/core';
import React from 'react';
import { BillActions } from '.';
import PatientInfo from '../../../components/PatientInfo';
import BillsTable from './BillsTable';

type BillsPatientProps = {
    uuidPatient: string;
    bills: any[];
    languageCode: string;
    currency: string;
    patient:any;
    makeActionBillCallBack: (index:number, action:BillActions) => void;
};

const BillsPatient: React.FC<BillsPatientProps> = ({ uuidPatient, currency, patient, bills, languageCode,  makeActionBillCallBack }) => {
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
                    <PatientInfo uuidPatient={uuidPatient}/>
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
