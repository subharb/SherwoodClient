import React from 'react';
import { Bill, DocumentStatus, DocumentType } from './types';
import { IPatient } from '../../../constants/types';
import PatientInfo from './PatientInfo';
import { Button, Grid, Typography } from '@mui/material';
import { Language, Translate } from 'react-localize-redux';
import { fullDateFromPostgresString } from '../../../utils';
import { BillForm } from './BillForm';
import { documentTypeToIcon } from '.';
import { documentStatusToColor, documentTypeToColor, documentTypeToString } from '../../../utils/bill';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Modal from '../../../components/general/modal';


interface BillViewProps {
    bill: Bill;
    billStatus: DocumentStatus;
    billType: DocumentType;
    patient: IPatient,
    languageCode: string,
    currency: string,
    canUpdateBill: boolean,
    uuidInvestigation: string,
    idBillingInfo:number,
    print: boolean,
    surveyAdditionalInfo?: any,
    withDiscount: boolean,
    onBillSuccesfullyCreated: (bill: Bill) => void,
    onCancelBill: () => void
}

const BillView: React.FC<BillViewProps> = (props) => {
    const [showModal, setShowModal] = React.useState(false);
    const [newDocumentType, setNewDocumentType] = React.useState<DocumentType>(DocumentType.BUDGET);
    
    function onCloseModal(){
        setShowModal(false);
    }

    function createDocumentType(){
        console.log("Crear documento de tipo ", documentTypeToString(newDocumentType));
        setShowModal(false);
    }
    
    function convertDocument(type:DocumentType){
        console.log("Convert to ", documentTypeToString(type));
        setNewDocumentType(type);
        setShowModal(true);
    }

    function renderConvertButton(){
        const typeButton = <>
            <Typography variant="body2" component='span'><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.type" /></span>: </Typography>
            <Button variant="contained" style={{backgroundColor:documentTypeToColor(props.billType)}}  startIcon={documentTypeToIcon(props.billType)}>
                <Translate id={`hospital.billing.bill.types.${documentTypeToString(props.billType)}`}/>
            </Button>
            </>
        
            if(props.billType === DocumentType.BUDGET){
                return (
                    <Grid  item xs={12} alignContent='center'  >
                        
                        { typeButton }
                        <span style={{ display: 'inline', alignItems: 'center',}}><KeyboardArrowRightIcon /></span>
                        <Button variant="contained" style={{backgroundColor:documentTypeToColor(DocumentType.SUMMARY)}} startIcon={documentTypeToIcon(DocumentType.SUMMARY)} 
                            onClick={() => convertDocument(DocumentType.SUMMARY)}>
                            Convert to Summary
                        </Button>
                        
                    </Grid>
                    )
            }
            else if(props.billType === DocumentType.SUMMARY){
                return (
                    <Grid container item xs={6} >
                        { typeButton }
                        <KeyboardArrowRightIcon />
                        <Button variant="contained" style={{backgroundColor:documentTypeToColor(DocumentType.SUMMARY)}}  startIcon={documentTypeToIcon(DocumentType.INVOICE)} 
                            onClick={() => convertDocument(DocumentType.SUMMARY)}>
                            Convert to Invoice
                        </Button>
                    </Grid>
                
                );
            }
        
    }
    return (
        <>
            <Modal key="modal" fullWidth medium open={showModal} title={<Translate id="hospital.billing.bill.view.modal.title" />} closeModal={() => onCloseModal()}
                confirmAction={createDocumentType} >
                <Typography variant="body2" component='span'><Translate id="hospital.billing.bill.view.modal.message" /></Typography>
            </Modal>

            <PatientInfo patient={props.patient} languageCode={props.languageCode} rightSide={
                <Grid item xs={6}  >
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.num_bill" /></span>: {props.bill.id}</Typography>
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.date" /></span>: {fullDateFromPostgresString(props.languageCode, props.bill.createdAt)}</Typography>
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.type" /></span>: <Translate id={`hospital.billing.bill.types.${documentTypeToString(props.billType)}`}/></Typography>
                </Grid>
            } />
            
            
            {
                renderConvertButton()
            }
            
            <BillForm canUpdateBill={props.canUpdateBill} patient={props.patient} currency={props.currency} 
                uuidInvestigation={props.uuidInvestigation} idBillingInfo={props.idBillingInfo} bill={props.bill}
                print={props.print} withDiscount={props.withDiscount} surveyAdditionalInfo={props.surveyAdditionalInfo}
                onBillSuccesfullyCreated={props.onBillSuccesfullyCreated} onCancelBill={props.onCancelBill}
                />
        </>
    );
};

export default BillView;
