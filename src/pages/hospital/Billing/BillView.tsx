import React from 'react';
import { Bill, DocumentStatus, DocumentType } from './types';
import { IPatient } from '../../../constants/types';
import PatientInfo from './PatientInfo';
import { Button, Grid, Typography } from '@mui/material';
import { Language, Translate } from 'react-localize-redux';
import { fullDateFromPostgresString } from '../../../utils';
import { BillForm } from './BillForm';
import { documentTypeToIcon } from '.';
import { documentTypeToString } from '../../../utils/bill';


interface BillViewProps {
    bill: Bill;
    billStatus: DocumentStatus;
    billType: DocumentType;
    patient: IPatient,
    languageCode: string,
    updatingBill: boolean,
    patients: IPatient[],
    personalFields: [],
    currency: string,
    canUpdateBill: boolean,
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
    const iconDocument = documentTypeToIcon(props.billType);

    function convertDocument(type:DocumentType){
        console.log("Convert to ", documentTypeToString(type));
    }

    function renderConvertButton(){
        if(props.billStatus === DocumentStatus.CLOSED){
            if(props.billType === DocumentType.BUDGET){
                return (
                    <Button variant="contained" color="primary" startIcon={documentTypeToIcon(DocumentType.SUMMARY)} onClick={() => convertDocument(DocumentType.SUMMARY)}>
                        Convert to Summary
                    </Button>
                    )
            }
            else if(props.billType === DocumentType.SUMMARY){
                <Button variant="contained" color="primary" startIcon={documentTypeToIcon(DocumentType.INVOICE)} onClick={() => convertDocument(DocumentType.SUMMARY)}>
                    Convert to Invoice
                </Button>
            }
        }
        
        
    }
    return (
        <>
            <PatientInfo patient={props.patient} languageCode={props.languageCode} rightSide={
                <Grid item xs={6} style={{ textAlign: 'right' }} >
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.num_bill" /></span>: {props.bill.id}</Typography>
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.date" /></span>: {fullDateFromPostgresString(props.languageCode, props.bill.createdAt)}</Typography>
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.type" /></span>: <Translate id={`hospital.billing.bill.types.${documentTypeToString(props.billType)}`}/></Typography>
                </Grid>
            } />
            {
                renderConvertButton()
            }
            
            <BillForm {...props}  />
        </>
    );
};

export default BillView;
