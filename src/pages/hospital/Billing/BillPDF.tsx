import React, { useMemo } from 'react';
import { Bill, DocumentType } from './types';
import { Grid, Typography } from '@mui/material';
import { IDepartment, IPatient, IResearcher, TYPE_BILL_ITEM } from '../../../constants/types';
import { HeaderDocument } from '../Document/header';
import { documentTypeToString } from '../../../utils/bill';
import { Translate } from 'react-localize-redux';
import { dateToFullDateString, fullDateFromPostgresString, getPatientID, patientFullName, researcherFullName } from '../../../utils';
import { BillForm } from './BillForm';
import { useDepartments, useInsurances, usePatientSubmission } from '../../../hooks';
import SignatureMajor from '../../../img/signatures/CHOM-major.png';
import SignatureFinancier from '../../../img/signatures/CHOM-financier.png';
import SignatureDirecteur from '../../../img/signatures/CHOM-directeur.png';
import Loader from '../../../components/Loader';
import { Divider } from '@mui/material';

interface BillPDFProps {
    bill:Bill;
    uuidInvestigation:string;
    type:DocumentType;
    hospitalName:string;
    uuidPrescribingDoctor:string | null;
    uuidDepartment:string | null;
    phone:string;
    address:string,
    email:string,
    city:string;
    currency:string;
    locale:string;
    patient:IPatient;
    logoBlob:string;
}

const BillPDF: React.FC<BillPDFProps> = ({ patient, bill, uuidDepartment, city, uuidInvestigation, uuidPrescribingDoctor, hospitalName, locale, type, logoBlob, email, phone, currency, address }) => {
    const [insurances, loadingInsurances, patientInsurance] = patient.personalData.insurance ? useInsurances(parseInt(patient.personalData.insurance.toString())) : [null, false];
    const { researchers, loadingDepartments, departments } = uuidPrescribingDoctor ? useDepartments() : { researchers: [], loadingDepartments: false, departments: []};

    const prescribingDoctor:IResearcher | undefined = useMemo(() => {
        return researchers.find((researcher) => researcher.uuid === uuidPrescribingDoctor);
    }, [researchers]);

    const department:IDepartment | undefined = useMemo(() => {
        return uuidDepartment ? departments.find((department:IDepartment) => department.uuid === uuidDepartment) : undefined;
    }, [departments]);

    const hasAdditionalInfo = bill.billItems.find((item) =>{
        return item.type === TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO
    });
    const additionalInfo = !hasAdditionalInfo ? null : usePatientSubmission(hasAdditionalInfo!.additionalInfoId)
    
    const insuranceName = useMemo(() => {
        return additionalInfo ? additionalInfo!.surveyRecords.find((record) => record.surveyField.name === "insurance") : null;
    }, [additionalInfo]);
    const insuranceAmount = useMemo(() => {
        return additionalInfo ? additionalInfo!.surveyRecords.find((record) => record.surveyField.name === "amount") : null;
    }, [additionalInfo]);
    
    const surgeryDate = useMemo(() => {
        return additionalInfo ? additionalInfo!.surveyRecords.find((record) => record.surveyField.name === "date_surgery") : null;
    }
    , [additionalInfo]);

    const emissionDate = useMemo(() => {
        return additionalInfo ? additionalInfo!.surveyRecords.find((record) => record.surveyField.name === "date_emission") : null;
    }
    , [additionalInfo]);

    const letterNumber = useMemo(() => {
        return additionalInfo ? additionalInfo!.surveyRecords.find((record) => record.surveyField.name === "letter_number") : null;
    }
    , [additionalInfo]);
    const amount_letter = useMemo(() => {
        return additionalInfo ? additionalInfo!.surveyRecords.find((record) => record.surveyField.name === "amount_letters") : null;
    }
    ,[additionalInfo]);
    
    function renderHeader(){
        return(
            <Grid container item xs={12}>
                <HeaderDocument size='A4' currency={currency} address={address} 
                    logoBlob={logoBlob} city={city} locale={locale}
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
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            <Translate id={`hospital.billing.pdf.subtitle.${documentTypeToString(type)}`} />
                        </Typography> 
                        {
                            patientInformation()
                        }
                        {
                            prescribingDoctor &&
                            <Typography variant='body2'>
                                <Translate id={`hospital.billing.pdf.doctor`} />: {researcherFullName(prescribingDoctor)}
                            </Typography> 
                        } 
                        {
                            department &&
                            <Typography variant='body2'>
                                <Translate id={`hospital.billing.pdf.department`} />: {department.name}
                            </Typography> 
                        }
                    </Grid>
                )
            case DocumentType.BUDGET:
                return(
                    <Grid item xs={12}>
                        {
                            patientInformation()
                        }
                    </Grid>
                );
            case DocumentType.INVOICE:
                return(
                    <Grid item xs={12}>
                        <Typography variant='body2'>
                            <Translate id={`hospital.billing.pdf.invoice.number`} />: {bill.id}
                        </Typography> 
                        {
                            insuranceName && letterNumber &&
                            <>
                                <Typography variant='body2'>
                                    <Translate id={`hospital.billing.pdf.invoice.attention`} />: {insuranceName.value}
                                </Typography> 
                                <Typography variant='body2'>
                                    <Translate id={`hospital.billing.pdf.invoice.police_number`} />: {letterNumber.value}
                                </Typography> 
                                <Typography variant='body2'>
                                    <Translate id={`hospital.billing.pdf.invoice.date_emission`} />: {dateToFullDateString(emissionDate.value, locale)}
                                </Typography>
                                <Typography variant='body2'>
                                    <Translate id={`hospital.billing.pdf.invoice.date_surgery`} />: {dateToFullDateString(surgeryDate.value, locale)}
                                </Typography>
                            </>
                        }
                       
                        {
                            patientInformation()
                        }
                        {
                            prescribingDoctor &&
                            <Typography variant='body2'>
                                <Translate id={`hospital.billing.pdf.doctor`} />: {researcherFullName(prescribingDoctor)}
                            </Typography> 
                        }
                        {
                            department &&
                            <Typography variant='body2'>
                                <Translate id={`hospital.billing.pdf.department`} />: {department.name}
                            </Typography> 
                        }
                        
                    </Grid>
                );
        }      
    }
    function renderBillForm(){
        let prelude;
        switch(type){
            case DocumentType.SUMMARY:
                const totalCost = bill.total;
                const paidExternally = patientInsurance && patientInsurance.name === "PAF" ? 0 : totalCost;
                const paid = 0;
                const toPay = patientInsurance && patientInsurance.name === "PAF" ? totalCost : 0;
                prelude = (
                    <>
                        <Grid container item xs={12}>
                            <Typography variant='body2'>
                                <Translate id={`hospital.billing.pdf.total_cost`} />: { new Intl.NumberFormat(locale).format(bill.total) } {currency}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12}>
                            <Typography variant='body2' style={{fontWeight:'bold'}}>
                                <Translate id={`hospital.billing.pdf.paid_externally`} />: { new Intl.NumberFormat(locale).format(paidExternally) } {currency}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12}>
                            <Typography variant='body2' style={{fontWeight:'bold'}}>
                                <Translate id={`hospital.billing.pdf.paid`} />: { new Intl.NumberFormat(locale).format(paid) } {currency}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12}>
                            <Typography variant='body2' style={{fontWeight:'bold'}}>
                                <Translate id={`hospital.billing.pdf.to_pay`} />: { new Intl.NumberFormat(locale).format(toPay) } {currency}
                            </Typography>
                        </Grid>
                    </>
                )
        }
        return(
            <Grid container item xs={12}>
                {
                    prelude
                }
                <Typography variant='h3'>
                    <Translate id={`hospital.billing.pdf.billform_title.${documentTypeToString(type)}`} />
                </Typography>
                <BillForm canUpdateBill={false} currency={currency} patient={patient}
                    bill={bill} print={true} />
            </Grid>
        )
    }
    function renderFooter(){
        let content;
        if(uuidInvestigation !== "cd54d9d8-23af-439b-af94-616fd8e24308"){
            return null;
        }
        switch(type){
            case DocumentType.BUDGET:  
                content = (<>
                {
                    insuranceName && insuranceAmount &&
                    <Grid item xs={12}>
                        <Typography variant='body2'>
                            <Translate id={`hospital.billing.pdf.summary.attention`} />{new Intl.NumberFormat(locale).format(insuranceName.value)}
                        </Typography>
                        <Typography variant='body2'>
                            <Translate id={`hospital.billing.pdf.summary.total_rating`} />{new Intl.NumberFormat(locale).format(insuranceAmount.value)}
                        </Typography>
                        <Typography variant='body2'>
                            <Translate id={`hospital.billing.pdf.summary.coverage`} />
                        </Typography>
                    </Grid>
                }
                    <Grid item xs={6}>
                        <img src={SignatureFinancier} width="100%" />
                    </Grid>
                    <Grid item xs={6}>
                        <img src={SignatureMajor} width="100%" />
                    </Grid>
                </>
            )
            break;
            case DocumentType.SUMMARY:
                content = (<>
                        <Grid item xs={6}>
                            <img src={SignatureMajor} width="100%" />
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                    </>
                )
            break;
            case DocumentType.INVOICE:
                const paidPatient = insuranceAmount ? bill.total  - insuranceAmount.value: 0;
                content = (<>
                        {
                            insuranceName && insuranceAmount &&
                            <Grid item xs={12}>
                                <Typography variant='body2'>
                                    <Translate id={`hospital.billing.pdf.amount_paid_insurance`} /> <span style={{fontWeight:'bold'}}>{insuranceName.value}</span>: { new Intl.NumberFormat(locale).format(insuranceAmount.value) } {currency}
                                </Typography>
                                <Typography variant='body2'>
                                    <Translate id={`hospital.billing.pdf.amount_paid_patient`} />: {new Intl.NumberFormat(locale).format(paidPatient)} {currency}
                                </Typography>
                                <Typography variant='body2'>
                                    <Translate id={`hospital.billing.pdf.total_letters`} /> { amount_letter.value } {currency}
                                </Typography>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <div style={{padding:'2rem'}}>
                                <Divider style={{width:'100%'}} />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <img src={SignatureFinancier} width="100%" />
                        </Grid>
                        <Grid item xs={6}>
                            <img src={SignatureDirecteur}  width="100%"/>
                        </Grid>
                    </>
                )
            break;
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
            <Grid container paddingTop={4} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='body2' style={{fontWeight:'bold'}}>
                        <Translate id="hospital.billing.pdf.patient_identity" />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='body2'>{patientFullName(patient)} <Translate id="general.born" /> {dateToFullDateString(patient.personalData.birthdate, locale)}</Typography>

                    {
                        patientInsurance &&
                        <Typography variant='body2'><Translate id="investigation.create.personal_data.fields.insurance" />: {patientInsurance.name} </Typography>
                    }
                    {
                        patient.personalData.health_id &&
                        <Typography variant='body2'><Translate id="hospital.billing.pdf.num_dossier" />: {getPatientID(patient)} </Typography>
                    }
                    <Typography variant='body2'><Translate id="investigation.create.personal_data.fields.id" />: {getPatientID(patient)} </Typography>
                </Grid>
            </Grid>
        )
    }

    if(loadingDepartments){
        return <Loader />
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