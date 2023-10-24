
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";
import { Grid, IconButton, Snackbar, Typography } from '@mui/material';
import Modal from '../../../components/general/modal';
import { useSnackBarState } from '../../../hooks';
import { Alert } from '@mui/material';
import { ButtonAdd, IconGenerator, TypographyStyled } from '../../../components/general/mini_components';
import { BillForm } from './BillForm';
import { FUNCTIONALITY, IPatient, ISurvey, SnackbarType } from '../../../constants/types';
import { Bill, BillingInfo, BillItem, BillItemModes, DocumentStatus , DocumentType} from './types';
import { Document } from '../Document';
import { connect, useDispatch } from 'react-redux';
import { createBillService, getBillsPatientService, getDocumentsService, updateBillService, updateDocumentType } from '../../../services/billing';
import Loader from '../../../components/Loader';
import { dateAndTimeFromPostgresString, hasDiscountsActive, stringDatePostgresToDate } from '../../../utils/index.jsx';
import EditBilling from './Edit';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import BillsPatient from './BillsPatient';
import BillsTable from './BillsTable';

import { HOSPITAL_BILLING, HOSPITAL_BILLING_CREATE_BILL, HOSPITAL_BILLING_VIEW_DOCUMENT } from '../../../routes/urls';
import { getBillableComboAction, resetBillItems } from '../../../redux/actions/billingActions';
import { TYPE_ADDITIONAL_INFO_SURVEY } from '../../../constants';
import SectionHeader from '../../components/SectionHeader';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import BillView from './BillView';
import BillCreate from './BillCreate';

interface PropsRedux {
    investigations: any,
    patients: { data: any },
    uuidInvestigation: string,
}

export function documentTypeToIcon(type:DocumentType){
    switch(type){
        case DocumentType.BUDGET:
            return <BarChartIcon />;
        case DocumentType.SUMMARY:
            return <DescriptionIcon />;
        case DocumentType.INVOICE:
            return <ReceiptIcon />;
    }
}

const BillingRedux: React.FC<PropsRedux> = ({ investigations, patients }) => {
    const investigation = investigations.data && investigations.currentInvestigation ? investigations.currentInvestigation : null;
    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const location = useLocation();
    const history = useHistory();
    let uuidPatient = useParams<{uuidPatient?:string}>().uuidPatient;
    let uuidDocument = useParams<{uuidDocument?:string}>().uuidDocument;

    const action = location.pathname === HOSPITAL_BILLING_CREATE_BILL ? BillActions.CREATE : uuidPatient ? BillActions.PATIENT_BILLS : uuidDocument ? BillActions.VIEW : BillActions.DEFAULT;

    const hasDiscounts = investigation && investigation.billingInfo && investigation.billingInfo.params && hasDiscountsActive(investigation.billingInfo.params, investigation.permissions);
    
    const dispatch = useDispatch();

    function navigateToHomeBilling(){
        history.push(HOSPITAL_BILLING);
    }

    function handleError(error:any){
        if(error.status === 401){
            setShowSnackbar({show:true, message: "hospital.billing.bill.error.permission", severity: 'error'});
        }
        else{
            if(error.errorCode === 1){
                setShowSnackbar({show:true, message: "hospital.billing.bill.error.changed", severity: 'error'});
            }
            else{
                setShowSnackbar({show:true, message: "general.error", severity: 'error'});
            }
            
        }
        setLoading(false);
    }

    async function onCreateOrUpdateBill(bill: Bill) {
        console.log("onCreateBill", bill);
        try{
            setLoading(true);
            let response: { status: number, bill?: Bill };
            if (bill.uuid && bill.type === DocumentType.INVOICE && bill.status === DocumentStatus.CLOSED) {
                response = await updateBillService(investigation.uuid, bill.uuid, bill.billItems);
            }
            else {
                response = await createBillService(investigation.uuid, bill.uuidPatient, bill);
            }

            if (response.status === 200 && response.bill) {
                if (bill.uuid) {
                    setShowSnackbar({ message: "hospital.billing.bill.success.updated", show: true, severity: "success" });
                }
                else {
                    setShowSnackbar({ message: "hospital.billing.bill.success.created", show: true, severity: "success" });
                }
            }
            else {
                
                setShowSnackbar({show:true, message: "hospital.billing.bill.error.permission", severity: 'error'});
            }
            setLoading(false);     
            if(typeof response.bill !== "undefined"){
                const tempBills = [...bills];
                const uuidBill = response.bill.uuid;
                const existingBillIndex = tempBills.findIndex((aBill) => uuidBill === aBill.uuid);
                if (existingBillIndex !== -1) {
                    tempBills[existingBillIndex] = response.bill;
                }
                else {
                    tempBills.push(response.bill);
                    tempBills.sort((billA, billB) => {
                        if(billA.updatedAt && billB.updatedAt){
                            return stringDatePostgresToDate(billA.updatedAt).getTime() - stringDatePostgresToDate(billB.updatedAt).getTime();
                        }
                        else{
                            return 0;
                        }
                    });
                }
                setBills(tempBills);
            }
            

        }
        catch(error:any){
            handleError(error);
        }
        // const tempBills = [...bills];
        // const existingBillIndex = tempBills.findIndex((aBill) => bill.uuid === aBill.uuid);
        // if (existingBillIndex !== -1) {
        //     tempBills[existingBillIndex] = bill;
        // }
        // else {
        //     tempBills.push(bill);
        //     tempBills.sort((billA, billB) => billB.id - billA.id);
        // }
        // setBills(tempBills);

        // history.push(HOSPITAL_BILLING_CREATE_BILL);
    }

    async function onChangeDocumentType(uuidBill:string, type: DocumentType) {
        try{
            console.log("onChangeDocumentType", uuidBill, type);
            setLoading(true);
            const response = await updateDocumentType(investigation.uuid, uuidBill, type);
            setShowSnackbar({ message: "hospital.billing.bill.success.changed", show: true, severity: "success" });    
            if(response.status === 200 && response.bill.uuid){
                const tempBills = [...bills];
                tempBills.push(response.bill);
                setBills(tempBills);
                history.push(HOSPITAL_BILLING_VIEW_DOCUMENT.replace(":uuidDocument", response.bill.uuid));
            }
            setLoading(false);
        }
        catch(error:any){
            handleError(error);
        }

    }
    function onPatientSelected(uuid:string){
        history.push(`/billing/patient/${uuid}`);
    }
    function onCancelBill() {
        if(location.pathname !== HOSPITAL_BILLING){
            history.push(HOSPITAL_BILLING);
        }
        
    }
    useEffect(() => {
        async function getBills() {
            setLoading(true);
            let response;
            if(!uuidPatient){
                response = await getDocumentsService(investigation.uuid);
            }
            else{
                response = await getBillsPatientService(investigation.uuid, uuidPatient);
            }
            
            if (response.status === 200) {
                setBills(response.bills);
            }
            setLoading(false);
        }
        if (investigation) {
            getBills();
        }
    }, [investigation]);

    useEffect(() => {
        if(action === BillActions.CREATE && investigation){
            dispatch(getBillableComboAction(investigation.uuid, investigation.billingInfo.id));
        }

        }, [action, investigation])

    if (investigation) {
        const surveyAdditionalInfo:ISurvey | undefined = investigation.surveys.find((survey: any) => survey.type === TYPE_ADDITIONAL_INFO_SURVEY);
        return <BillingLocalized key={uuidDocument} patients={patients.data[investigation.uuid]} withDiscount={hasDiscounts}
                    uuidInvestigation={investigation.uuid as string} hospitalName={investigation.name}
                    personalFields={investigation.personalFields}
                    billingInfo={investigation.billingInfo} uuidDocument={uuidDocument}
                    section={action} surveyAdditionalInfo={surveyAdditionalInfo}
                    bills={bills} loading={loading} uuidPatient={uuidPatient} showSnackbar={showSnackbar}
                    onCreateOrUpdateBill={(bill: Bill) => onCreateOrUpdateBill(bill)}    
                    onChangeDocumentType={onChangeDocumentType}                
                    onPatientSelected={(uuid:string) => onPatientSelected(uuid)}
                    navigateToHomeBilling={navigateToHomeBilling} createBill={() => history.push(HOSPITAL_BILLING_CREATE_BILL)}
                    onCancelBill={onCancelBill}
        />
    }
    else {
        return <Loader />;
    }
}

const mapStateToProps = (state: any) => {
    return {
        investigations: state.investigations,
        patients: state.patients,
    }
}

export default connect(mapStateToProps, null)(BillingRedux);


interface Props extends LocalizeContextProps {
    patients: IPatient[],
    personalFields: [],
    uuidInvestigation: string,
    hospitalName: string,
    billingInfo: BillingInfo,
    uuidPatient?:string,
    showSnackbar:SnackbarType,
    bills: Bill[];
    loading: boolean,
    surveyAdditionalInfo?: ISurvey,
    section: BillActions,
    uuidDocument?: string,
    withDiscount: boolean,
    onChangeDocumentType: (uuidBill:string, type: DocumentType) => void,
    
    onPatientSelected: (uuid:string) => void
    onCreateOrUpdateBill: (bill:Bill) => void,
    createBill: () => void,
    onCancelBill: () => void,
    navigateToHomeBilling: () => void,
}

export enum BillActions {
    UPDATE = "update",
    PREVIEW = "preview",
    CREATE = "create",
    PATIENT_BILLS = "patient_bills",
    VIEW = "view",
    DEFAULT = ""
}


const Billing: React.FC<Props> = (props) => {
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [showModal, setShowModal] = useState(false);
    const [actionBill, setActionBill] = useState<BillActions>(props.section);
    const [currentBill, setCurrentBill] = useState<Bill | null>(null);
    const [edit, setEdit] = useState(!props.billingInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.uuidDocument && props.section === "view") {
            const findBill = props.bills.find((bill) => bill.uuid === props.uuidDocument);
            if (findBill) {
                setActionBill(BillActions.VIEW);
                setCurrentBill(findBill);
            }
        }

    }, [props.uuidDocument, props.bills]);

    async function resetSnackBar() {
        setShowSnackbar({ show: false });
        if(actionBill === BillActions.CREATE){
            props.navigateToHomeBilling();
        }
    }
    async function onCancelBill() {
        setShowModal(false);
        setCurrentBill(null);
        await dispatch(resetBillItems());
        props.onCancelBill();
    }
    
    function toogleEditBillingInfo() {
        setEdit(edit => !edit);
    }

    useEffect(() => {
        if (props.showSnackbar) {
            setShowSnackbar(props.showSnackbar);
        }
    }, [props.showSnackbar]);


    function makeActionBill(idBill: number, action: BillActions) {
        console.log(idBill);
        const tempBill = props.bills.find((bill) => bill.id === idBill);

        if (tempBill) {
            const patient = props.patients.find((patient) => patient.uuid === tempBill.uuidPatient);
            if (patient) {
                setActionBill(action);
                setShowModal(true);
                setCurrentBill(tempBill);
            }
        }

    }

    async function onCloseModal() {
        setShowModal(false);
        setCurrentBill(null);
        
    }

    function onBillingInfoSuccesfullyUpdated(type: BillItemModes) {
        //setEdit(false);
        if (type === BillItemModes.SHOW) {
            setShowSnackbar({ message: "hospital.billing.billing_info.success.updated", show: true, severity: "success" });
        }
        else {
            setShowSnackbar({ message: "hospital.billing.billables.success.updated", show: true, severity: "success" });
        }

    }

    function renderCore() {
        if (props.loading) {
            return <Loader />;
        }
        else if (edit) {
            return <EditBilling uuidInvestigation={props.uuidInvestigation} billables={props.billingInfo && props.billingInfo.billables ? props.billingInfo.billables : []} withDiscount={props.withDiscount}
                billingInfo={props.billingInfo} onBillingInfoSuccesfullyUpdated={(type: BillItemModes) => onBillingInfoSuccesfullyUpdated(type)} />
        }
        else if(props.section === BillActions.PATIENT_BILLS && props.uuidPatient){
            const currentPatient = props.patients.find((patient) => patient.uuid === props.uuidPatient);
            return(<>
                        { renderBillForm() }
                        <BillsPatient patient={currentPatient} uuidPatient={props.uuidPatient} bills={props.bills} 
                            currency={props.billingInfo.currency} languageCode={props.activeLanguage.code}
                            makeActionBillCallBack={makeActionBill}/>
            </>)
        }
        else if(props.section === BillActions.VIEW && props.uuidDocument && currentBill){
            const currentPatient = props.patients.find((patient) => patient.uuid === currentBill.uuidPatient);
            return (<BillView bill={currentBill} billStatus={currentBill.status} billType={currentBill.type} 
                        patient={currentPatient!} languageCode={props.activeLanguage.code} canUpdateBill={currentBill.status === DocumentStatus.DRAFT} 
                        currency={props.billingInfo.currency} uuidInvestigation={props.uuidInvestigation} idBillingInfo={props.billingInfo.id}
                        print={false} withDiscount={props.withDiscount} surveyAdditionalInfo={props.surveyAdditionalInfo}
                        onUpdateBill={(bill: Bill) => props.onCreateOrUpdateBill(bill)} 
                        onChangeDocumentType={props.onChangeDocumentType}
                        onCancelBill={onCancelBill}
                        />)
        }
        else {
            if (props.billingInfo) {
                if(actionBill === BillActions.CREATE){
                    return <BillCreate patients={props.patients} personalFields={props.personalFields} currency={props.billingInfo.currency} 
                                uuidInvestigation={props.uuidInvestigation} canCreateBugdet={Boolean(props.billingInfo.params.budgets)}
                                idBillingInfo={props.billingInfo.id} languageCode={props.activeLanguage.code} withDiscount={props.withDiscount} 
                                onCreateBill={(bill: Bill) => props.onCreateOrUpdateBill(bill)}
                                onCancelBill={onCancelBill} 
                                />
                }
                return (
                    <>
                        { renderBillForm() }
                        <BillsTable hasBudgets={Boolean(props.billingInfo.params.budgets)} patients={props.patients} currency={props.billingInfo.currency} 
                            bills={props.bills} languageCode={props.activeLanguage.code} 
                                makeActionBillCallBack={makeActionBill}/>
                    </>
                );
            }
        }
    }
    function renderBillForm() {
        switch (actionBill) {
            case BillActions.VIEW:
            case BillActions.UPDATE:
                const billFormComponent = <BillForm withDiscount={props.withDiscount}
                                            currency={props.billingInfo.currency} uuidInvestigation={props.uuidInvestigation}
                                            onBillItemsValidated={() => console.log("onBillItemsValidated")}
                                            onCancelBill={onCancelBill} print={false} patient={props.patients.find((pat) => pat.uuid === currentBill?.uuidPatient)!}
                                            bill={currentBill} canUpdateBill={currentBill ? currentBill.status === DocumentStatus.DRAFT : false}
                                            idBillingInfo={props.billingInfo.id} surveyAdditionalInfo={props.surveyAdditionalInfo}
                                        />
                if([BillActions.CREATE, BillActions.VIEW].includes(actionBill)){
                    return(
                        billFormComponent
                    )
                }
                
                return (
                    <Modal key="modal" fullWidth medium open={showModal} title={!currentBill ? "Create bill" : ""} closeModal={() => onCloseModal()}>
                        { billFormComponent }
                    </Modal>
                )
            // case BillActions.preview:
            //     return (
            //         <Modal key="modal" medium size="sm" open={showModal} title={""} closeModal={() => onCloseModal()}>
            //             <Document address={props.billingInfo.address} hospitalName={props.hospitalName} logoBlob={props.billingInfo.logoBlob} currency={props.billingInfo.currency}
            //                 email={props.billingInfo.email} size="A4" phone={props.billingInfo.phone} name={currentBill ? "Bill" + currentBill.id : ""} >
            //                 <BillForm patients={props.patients} personalFields={props.personalFields} withDiscount={props.withDiscount}
            //                     currency={props.billingInfo.currency} uuidInvestigation={props.uuidInvestigation}
            //                     surveyAdditionalInfo={props.surveyAdditionalInfo}
            //                     onBillSuccesfullyCreated={(bill: Bill) => onBillSuccesfullyCreated(bill)}
            //                     onCancelBill={onCancelBill} print={true}
            //                     idBillingInfo={props.billingInfo.id}
            //                     bill={currentBill} updatingBill={currentBill !== null}
            //                     locale={props.activeLanguage}
            //                 />
            //             </Document>
            //         </Modal>
            //     )
            default:
                return null;
        }
    }

    return (
        <>
            <Helmet title="Billing Dashboard" />
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={showSnackbar.show}
                autoHideDuration={2000}
                onClose={resetSnackBar}>
                <div>
                    {
                        (showSnackbar.message && showSnackbar.severity) &&
                        <Alert onClose={() => setShowSnackbar({ show: false })} severity={showSnackbar.severity}>
                            <Translate id={showSnackbar.message} />
                        </Alert>
                    }
                </div>
            </Snackbar>

            {/* {
                renderModal()
            } */}

            <Grid justifyContent="space-between" direction='row' container padding={2} style={{ color: "white" }}>
                <Grid item xs={12} container>
                    <Grid item xs={6} style={{ paddingBottom: '1rem' }}>
                        <SectionHeader section="billing" edit={edit} 
                            editCallback={toogleEditBillingInfo}  />
                        
                        {!props.billingInfo ?
                            <TypographyStyled variant="body2" gutterBottom >
                                <Translate id="hospital.billing.no_billing_info" />
                            </TypographyStyled>
                            :
                            <ButtonAdd disabled={props.section === BillActions.CREATE || props.loading || edit}
                                type="button" data-testid="add_bill"
                                onClick={props.createBill} />
                        }
                    </Grid>
                </Grid>

            </Grid>
            {
                renderCore()
            }

        </>
    );
}

export const BillingLocalized = withLocalize(Billing);