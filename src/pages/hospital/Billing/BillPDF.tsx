import React from 'react';
import { Bill, DocumentType } from './types';
import { Grid, Typography } from '@mui/material';
import { IPatient, TYPE_BILL_ITEM } from '../../../constants/types';
import { HeaderDocument } from '../Document/header';
import { documentTypeToString } from '../../../utils/bill';
import { Translate } from 'react-localize-redux';
import { fullDateFromPostgresString, getPatientID, patientFullName } from '../../../utils';
import { BillForm } from './BillForm';


interface BillPDFProps {
    bill:Bill;
    type:DocumentType;
    hospitalName:string;
    phone:string;
    address:string,
    email:string,
    currency:string;
    locale:string;
    patient:IPatient;
    logoBlob:string;
    onClose:()=>void;
}

const BillPDF: React.FC<BillPDFProps> = ({ patient, bill, hospitalName, locale, type, logoBlob, email, phone, currency, address }) => {
    function renderHeader(){
        return(
            <Grid container item xs={12}>
                <HeaderDocument size='A4' currency={currency} address={address} 
                    logoBlob={logoBlob}
                    hospitalName={hospitalName} email={email} phone={phone} />
            </Grid>
        );
    }
    function renderTitle(){
        return(
            <Grid container item xs={12}>
                <Typography variant="h1" style={{textTransform:'capitalize'}}>
                    <Translate id={`hospital.billing.pdf.title.${documentTypeToString(type)}`}/>
                </Typography>
            </Grid>
        )
    }
    function renderSubtitle(){
        switch(type){
            case DocumentType.SUMMARY:
                return(
                    <>
                        <Typography variant='body2'>
                            <Translate id={`hospital.billing.pdf.subtitle.${documentTypeToString(type)}`} />
                        </Typography> 
                        {
                            patientInformation()
                        }
                    </>
                )
            case DocumentType.BUDGET:
                return(
                    <>
                     {
                        patientInformation()
                    }
                        </>
                )
        }
        return(
            <Grid container item xs={12}>
                Subtitle
            </Grid>
        )
        
    }
    function renderBillForm(){
        return(
            <Grid container item xs={12}>
                <Typography variant='h4'>
                    <Translate id={`hospital.billing.pdf.billform_title.${documentTypeToString(type)}`} />
                </Typography>
                <BillForm canUpdateBill={false} currency={currency} patient={patient}
                    bill={bill} print={true} />
            </Grid>
        )
    }
    function renderFooter(){
        let content;
        switch(type){
            case DocumentType.BUDGET:
                const hasAdditionalInfo = bill.billItems.find((item) =>{
                    return item.type === TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO
                });
                if(hasAdditionalInfo){

                }
                content = (
                    "Footer"
                )
        }
        return(
            <Grid container item xs={12}>
                {
                    content
                }
            </Grid>
        )
    }
    function patientInformation(){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h4'>
                        <Translate id="hospital.billing.pdf.patient_identity" />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body2'>{patientFullName(patient)} <Translate id="general.born" /> {fullDateFromPostgresString(locale, patient.personalData.birthdate)}</Typography>
                    {
                        patient.personalData.health_id &&
                        <Typography variant='body2'><Translate id="hospital.billing.pdf.num_dossier" /> : {getPatientID(patient)} </Typography>
                    }
                    <Typography variant='body2'><Translate id="investigation.create.personal_data.fields.id" /> : {getPatientID(patient)} </Typography>
                </Grid>
            </Grid>
        )
    }
    return (
        <Grid container spacing={3}>

            {
                renderHeader()
            }
            {
                renderTitle()
            }
            {
                renderSubtitle()
            }
            {
                renderBillForm()
            }
            {
                renderFooter()
            }
        </Grid>
    );
};

export default BillPDF;
