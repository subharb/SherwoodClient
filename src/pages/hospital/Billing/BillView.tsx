import React from 'react';
import { Bill } from './types';
import { IPatient } from '../../../constants/types';
import PatientInfo from './PatientInfo';
import { Grid, Typography } from '@mui/material';
import { Language, Translate } from 'react-localize-redux';
import { fullDateFromPostgresString } from '../../../utils';
import { BillForm } from './BillForm';

interface BillViewProps {
    bill: Bill;
    patient: IPatient,
    languageCode: string,
    updatingBill: boolean,
    patients: IPatient[],
    personalFields: [],
    currency: string,
    uuidInvestigation: string,
    idBillingInfo:number,
    locale: Language,
    print: boolean,
    surveyAdditionalInfo?: any,
    withDiscount: boolean,
    onBillSuccesfullyCreated: (bill: Bill) => void,
    onCancelBill: () => void
}

const BillView: React.FC<BillViewProps> = (props) => {
    return (
        <>
            <PatientInfo patient={props.patient} languageCode={props.languageCode} rightSide={
                <Grid item xs={6} style={{ textAlign: 'right' }} >
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.num_bill" /></span>: {props.bill.id}</Typography>
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.date" /></span>: {fullDateFromPostgresString(props.languageCode, props.bill.createdAt)}</Typography>
                </Grid>
            } />
            <BillForm {...props} />
        </>
    );
};

export default BillView;
