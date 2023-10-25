import React from 'react';
import { Bill, BillItem, DocumentStatus, DocumentType } from './types';
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
import { ColourChip } from '../../../components/general/mini_components-ts';


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
    onUpdateBill: (bill: Bill) => void,
    onChangeDocumentType: (uuidBill:string, type: DocumentType) => void,
    onCancelBill: () => void
}

const BillView: React.FC<BillViewProps> = (props) => {
    const [showModal, setShowModal] = React.useState(false);
    const [newDocumentType, setNewDocumentType] = React.useState<DocumentType>(DocumentType.BUDGET);
    
    function onCloseModal(){
        setShowModal(false);
    }

    function onUpdateBill(billItems: BillItem[]) {
        props.bill.billItems = [...billItems];
        props.onUpdateBill(props.bill);
    }


    function confirmChangeDocumentType(){
        console.log("Crear documento de tipo ", documentTypeToString(newDocumentType));
        setShowModal(false);
        if(props.bill!.uuid){
            props.onChangeDocumentType(props.bill.uuid, newDocumentType);
        }
        
    }
    
    function convertDocument(type:DocumentType){
        console.log("Convert to ", documentTypeToString(type));
        setNewDocumentType(type);
        setShowModal(true);
    }

    function renderConvertButton(){
        const typeButton = <>
                <Typography variant="body2" component='span'><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.type" /></span>: </Typography>
                <ColourChip rgbcolor={documentTypeToColor(props.billType)} 
                    label={<Translate id={`hospital.billing.bill.types.${documentTypeToString(props.billType)}`}/>}
                    avatar={documentTypeToIcon(props.billType)}
                    /> 
            </>
        
            if(props.billType === DocumentType.BUDGET || props.billType === DocumentType.SUMMARY){
                const converButton = props.billType === DocumentType.BUDGET ? 
                                            <Button variant="contained" style={{backgroundColor:documentTypeToColor(DocumentType.SUMMARY)}} endIcon={documentTypeToIcon(DocumentType.SUMMARY)} 
                                                onClick={() => convertDocument(DocumentType.SUMMARY)}>
                                                Convert to Summary
                                            </Button> : 
                                            <Button variant="contained" style={{backgroundColor:documentTypeToColor(DocumentType.INVOICE)}}  endIcon={documentTypeToIcon(DocumentType.INVOICE)} 
                                                onClick={() => convertDocument(DocumentType.INVOICE)}>
                                                Convert to Invoice
                                            </Button>  

                return (
                    <div style={{display:'flex', flexDirection:'row', 'paddingBottom' : '1rem'}}>
                        <div >
                            { typeButton }
                        </div>
                        <div>
                            <div>
                                <KeyboardArrowRightIcon />
                            </div>
                        </div>
                        <div>
                            {
                                converButton
                            }
                        </div>
                    </div>
                )
            }
            else{
                return typeButton;
            }        
    }
    return (
        <>
            <Modal key="modal" fullWidth medium open={showModal} title={<Translate id="hospital.billing.bill.view.modal.title" />} closeModal={() => onCloseModal()}
                confirmAction={confirmChangeDocumentType} >
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
                onBillItemsValidated={onUpdateBill} onCancelBill={props.onCancelBill}
                />
        </>
    );
};

export default BillView;
