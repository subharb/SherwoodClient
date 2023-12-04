import React, { useEffect } from 'react';
import { Bill, BillItem, DocumentStatus, DocumentType } from './types';
import { IPatient } from '../../../constants/types';
import PatientInfo from './PatientInfo';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { Translate } from 'react-localize-redux';
import { fullDateFromPostgresString, researcherFullName } from '../../../utils';
import { BillForm } from './BillForm';
import { TypeBillItemUpdate, documentTypeToIcon } from '.';
import { documentTypeToColor, documentTypeToString } from '../../../utils/bill';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Modal from '../../../components/general/modal';
import { ColourChip } from '../../../components/general/mini_components-ts';
import { useInsurances, useResearcherDepartmentSelector, useResearchersSelector, useStatusDocument } from '../../../hooks';
import Loader from '../../../components/Loader';
import { IconGenerator } from '../../../components/general/mini_components';
import { DocumentPDF } from '../Document';
import BillPDF from './BillPDF';


interface BillViewProps {
    bill: Bill;
    billStatus: DocumentStatus;
    billType: DocumentType;
    hospitalName: string;
    billingInfo: any;
    
    patient: IPatient,
    hasBudgets:boolean,
    languageCode: string,
    currency: string,
    canUpdateBill: boolean,
    uuidInvestigation: string,
    idBillingInfo:number,
    print: boolean,
    surveyAdditionalInfo?: any,
    withDiscount: boolean,
    onUpdateBill: (bill: Bill, typeUpdate:TypeBillItemUpdate) => void,
    onChangeDocumentType: (uuidBill:string, type: DocumentType) => void,
    onCancelBill: () => void
}

const BillView: React.FC<BillViewProps> = (props) => {
    const [showModalConfirm, setShowModalConfirm] = React.useState(false);
    const [showModalPDF, setShowModalPDF] = React.useState(false);
    const [newDocumentType, setNewDocumentType] = React.useState<DocumentType>(DocumentType.BUDGET);
    const {statusDocument, renderStatusDocument} = useStatusDocument(props.billStatus, false);
    const [insurances, loadingInsurances, patientInsurance] = props.patient.personalData.insurance ? useInsurances(parseInt(props.patient.personalData.insurance.toString())) : [null, false];

    const {renderResearcherDepartmentSelector, loadingResearcherOrDepartments, 
            researcherSelected, departmentSelected, uuidDepartmentSelected, departments,
            uuidResearcherSelected, markAsErrorDepartmentCallback, markAsErrorReseacherCallback} = useResearcherDepartmentSelector(props.bill.uuidPrescribingDoctor ? props.bill.uuidPrescribingDoctor : "", props.bill.uuidDepartment ? props.bill.uuidDepartment : "" );

    function onCloseModal(){
        setShowModalConfirm(false);
        setShowModalPDF(false);
    }

    function onUpdateBill(billItems: BillItem[], typeUpdate:TypeBillItemUpdate) {
        if(props.billType === DocumentType.INVOICE){
            if(!researcherSelected){
                markAsErrorReseacherCallback();
                return
            }
            if(!departmentSelected && departments.length > 0){
                markAsErrorDepartmentCallback();
                return
            }
        }
        
        props.bill.status = statusDocument;
        
        props.bill.uuidDepartment = uuidDepartmentSelected;
        props.bill.uuidPrescribingDoctor = uuidResearcherSelected;
        props.bill.billItems = [...billItems];
        props.onUpdateBill(props.bill, typeUpdate);
    }


    function confirmChangeDocumentType(){
        console.log("Crear documento de tipo ", documentTypeToString(newDocumentType));
        setShowModalConfirm(false);
        if(props.bill!.uuid){
            props.onChangeDocumentType(props.bill.uuid, newDocumentType);
        }
    }
    
    function convertDocument(type:DocumentType){
        console.log("Convert to ", documentTypeToString(type));
        setNewDocumentType(type);
        setShowModalConfirm(true);
    }

    function renderPrescribingDoctor(){
        if(props.billType === DocumentType.INVOICE){
            if(loadingResearcherOrDepartments){
                return <Loader />
            }
            if(props.billStatus === DocumentStatus.CLOSED){
                let researcherAndDepartment = [];
                if(researcherSelected){
                    researcherAndDepartment.push([
                        <Typography variant="body2"  fontWeight='bold'  component='span' ><Translate id="hospital.billing.prescribingDoctor" />: </Typography>, <Typography variant="body2"  component='span' >{researcherFullName(researcherSelected)}</Typography>, <br/> 
                    ])
                }
                if(departmentSelected){
                    researcherAndDepartment.push([
                        <Typography variant="body2" fontWeight='bold'  component='span' ><Translate id="hospital.billing.department" />: </Typography>, <Typography variant="body2"   component='span'>{departmentSelected.name}</Typography>
                    ])
                }
                return (
                    <Card style={{margin:'10px'}}>
                        <Box padding={2} >  
                            <Grid container >
                                <Grid item xs={6}  >
                                    {researcherAndDepartment}
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>)
            }
            else{
                return (
                    <Card style={{margin:'10px'}}>
                        <Box padding={2} >  
                        {
                            renderResearcherDepartmentSelector()
                        }
                        </Box>
                    </Card>
                )
            }
            
        }
        return null;
    }

    function renderConvertButton(){
        if(!props.hasBudgets || !patientInsurance){
            return(
                <Card style={{margin:'10px'}}>
                    <Box padding={2} >  
                     { renderStatusDocument() }
                    </Box>
                </Card>
            )
        }
        const typeButton = <>
                <Typography variant="body2" component='span'><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.type" /></span>: </Typography>
                <ColourChip rgbcolor={documentTypeToColor(props.billType)} 
                    label={<Translate id={`hospital.billing.bill.types.${documentTypeToString(props.billType)}`}/>}
                    avatar={documentTypeToIcon(props.billType)}
                    /> 
            </>
            let convertGrid = null
            if(props.billType === DocumentType.BUDGET || props.billType === DocumentType.SUMMARY){
                const converButton = props.billType === DocumentType.SUMMARY && patientInsurance.name !== "PAF" ? 
                                            <ColourChip rgbcolor={documentTypeToColor(DocumentType.BUDGET)} avatar={documentTypeToIcon(DocumentType.BUDGET)} 
                                                label={<Translate id="hospital.billing.convert.to_budget"/>}
                                                onClick={() => convertDocument(DocumentType.BUDGET)} />    
                                            : 
                                            <ColourChip rgbcolor={documentTypeToColor(DocumentType.INVOICE)}  avatar={documentTypeToIcon(DocumentType.INVOICE)} 
                                                onClick={() => convertDocument(DocumentType.INVOICE)} 
                                                label={<Translate id="hospital.billing.convert.to_invoice"/>} /> 
                                                
                convertGrid = (
                    <>
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
                    </>
                );
            }
            return (
                <Card style={{margin:'10px'}}>
                        <Box padding={2} >  
                    <div style={{'paddingBottom' : '1rem'}}>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <div >
                                { typeButton }
                            </div>
                            { convertGrid } 
                        </div>
                        {
                            renderStatusDocument()
                        }
                    </div>
                </Box>
                </Card>
            )      
    }
    function renderModal(){
        if(showModalConfirm){
            return(
                <Modal key="modal" fullWidth medium open={true} title={<Translate id="hospital.billing.bill.view.modal.title" />} closeModal={() => onCloseModal()}
                    confirmAction={confirmChangeDocumentType} >
                    <Typography variant="body2" component='span'><Translate id="hospital.billing.bill.view.modal.message" /></Typography>
                </Modal>
            )
        }
        else if(showModalPDF){
            return (<Modal key="modal" fullWidth medium open={true} title={!props.bill ? "Create bill" : ""} closeModal={() => onCloseModal()}>
                        <DocumentPDF size='A4' name={props.bill!.id.toString()}>
                            <BillPDF bill={props.bill!} type={props.bill!.type} patient={props.patient}
                                hospitalName={props.hospitalName} phone={props.billingInfo.phone}
                                address={props.billingInfo.address} logoBlob={props.billingInfo.logoBlob}
                                currency={props.billingInfo.currency} email={props.billingInfo.email}
                                city={props.billingInfo.city} uuidDepartment={props.bill!.uuidDepartment}
                                locale={props.languageCode} uuidPrescribingDoctor={props.bill!.uuidPrescribingDoctor}
                                uuidInvestigation={props.uuidInvestigation} />
                        </DocumentPDF>
                    </Modal>)
        }
        return null;
    }
    return (
        <>
            {
                renderModal()
            }
            <Card style={{margin:'10px'}}>
                <Box padding={2} >  
                    <PatientInfo patient={props.patient} languageCode={props.languageCode} rightSide={
                        <Grid item xs={6}  >
                            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.num_bill" /></span>: {props.bill.id}</Typography>
                            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.date" /></span>: {fullDateFromPostgresString(props.languageCode, props.bill.createdAt)}</Typography>
                            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.type" /></span>: <Translate id={`hospital.billing.bill.types.${documentTypeToString(props.billType)}`}/></Typography>
                            {
                                props.billStatus === DocumentStatus.CLOSED &&
                                <>
                                    <Typography component="span" variant="body2"><span style={{ fontWeight: 'bold' }}>
                                        <Translate id="hospital.billing.bill.view_pdf" /></span></Typography>
                                        :
                                    <Button onClick={() => setShowModalPDF(true)} ><IconGenerator type="pdf" /></Button>  
                                </> 
                            }
                        </Grid>
                    } />
                </Box>
            </Card>
            
            {
                renderConvertButton()
            }

            {
                renderPrescribingDoctor()
            }
            <BillForm canUpdateBill={props.canUpdateBill} patient={props.patient} currency={props.currency} 
                uuidInvestigation={props.uuidInvestigation} idBillingInfo={props.idBillingInfo} bill={props.bill}
                print={props.print} withDiscount={props.withDiscount} surveyAdditionalInfo={props.surveyAdditionalInfo}
                onBillItemsValidated={(billItems:BillItem[]) => onUpdateBill(billItems, TypeBillItemUpdate.BillItems)}
                onUpdateBillItemStatus={(billItems:BillItem[]) => onUpdateBill(billItems, TypeBillItemUpdate.BillItemsStatus)}
                onCancelBill={props.onCancelBill} 
                />
        </>
    );
};

export default BillView;
