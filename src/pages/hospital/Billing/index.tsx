
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";
import { Grid, IconButton, Snackbar, Typography } from '@mui/material';
import Modal from '../../../components/general/modal';
import { usePatients, useSnackBarState } from '../../../hooks';
import { Alert } from '@mui/material';
import { ButtonAdd, TypographyStyled } from '../../../components/general/mini_components';
import { IPatient, ISurvey, SnackbarType } from '../../../constants/types';
import { Bill, BillingInfo, BillItemModes, DocumentStatus , DocumentType} from './types';
import { DocumentPDF } from '../Document';
import { connect, useDispatch } from 'react-redux';
import { createBillService, getBillsPatientService, getDocumentsService, updateBillItemsStatusService, updateBillService, updateDocumentType } from '../../../services/billing';
import Loader from '../../../components/Loader';
import { hasDiscountsActive, stringDatePostgresToDate } from '../../../utils/index.jsx';
import EditBilling from './Edit';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import BillsPatient from './BillsPatient';
import BillsTable from './BillsTable';

import { HOSPITAL_BILLING, HOSPITAL_BILLING_CREATE_BILL, HOSPITAL_BILLING_EDIT, HOSPITAL_BILLING_VIEW_DOCUMENT } from '../../../routes/urls';
import { getBillableComboAction, resetBillItems } from '../../../redux/actions/billingActions';
import { TYPE_ADDITIONAL_INFO_SURVEY } from '../../../constants';
import SectionHeader from '../../components/SectionHeader';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import BillView from './BillView';
import BillCreate from './BillCreate';
import { green, red } from '@mui/material/colors';
import { Done, Edit, Lock, MoneyOff } from '@mui/icons-material';
import { BillStatus } from '../Service/types';
import BillPDF from './BillPDF';
import { patients } from '../../../stories/Outpatients/example_data';

interface PropsRedux {
    investigations: any,
    patients: { data: any },
    uuidInvestigation: string,
}

export enum TypeBillItemUpdate{
    BillItems = "billItems",
    BillItemsStatus = "billItemsStatus"
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

export function documentStatusToIcon(type:DocumentStatus){
    switch(type){
        case DocumentStatus.DRAFT:
            return <Edit />;
        case DocumentStatus.CLOSED:
            return <Lock />;
    }
}

export function paidStatusToIcon(type:BillStatus){
    switch(type){
        case BillStatus.PAID:
            return <Done />;
        case BillStatus.PENDING_PAYMENT:
            return <MoneyOff/>;
    }
}

export function paidStatusToColor(type:BillStatus){
    switch(type){
        case BillStatus.PAID:
            return green[500];
        case BillStatus.PENDING_PAYMENT:
            return red[500];
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
    const canCreateBills = investigation && investigation.permissions && investigation.permissions.includes("CREATE_BILLING");
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

    async function onCreateOrUpdateBill(bill: Bill, typeUpdate:TypeBillItemUpdate = TypeBillItemUpdate.BillItems) {
        console.log("onCreateBill", bill);
        try{
            setLoading(true);
            let response: { status: number, bill?: Bill };
            if (bill.uuid) {
                if(typeUpdate === TypeBillItemUpdate.BillItems){
                    response = await updateBillService(investigation.uuid, bill.uuid, bill);
                }
                else{
                    response = await updateBillItemsStatusService(investigation.uuid, bill.uuid, bill);
                }
            }
            else {
                response = await createBillService(investigation.uuid, bill.uuidPatient, bill);
            }

            if (response.status === 200 && response.bill) {
                if (response.bill.uuid) {
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

    if (investigation && patients) {
        const surveyAdditionalInfo:ISurvey | undefined = investigation.surveys.find((survey: any) => survey.type === TYPE_ADDITIONAL_INFO_SURVEY);
        return <BillingLocalized key={uuidDocument} withDiscount={hasDiscounts}
                    uuidInvestigation={investigation.uuid as string} hospitalName={investigation.name}
                    personalFields={investigation.personalFields}
                    billingInfo={investigation.billingInfo} uuidDocument={uuidDocument}
                    section={action} surveyAdditionalInfo={surveyAdditionalInfo}
                    bills={bills} loading={loading} uuidPatient={uuidPatient} showSnackbar={showSnackbar}
                    canCreateBills={canCreateBills}
                    onCreateOrUpdateBill={(bill: Bill, typeUpdate:TypeBillItemUpdate) => onCreateOrUpdateBill(bill, typeUpdate)}    
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
        patients : state.investigations.currentInvestigation && state.patients.data ? state.patients.data[state.investigations.currentInvestigation.uuid] : null
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
    canCreateBills: boolean,
    loading: boolean,
    surveyAdditionalInfo?: ISurvey,
    section: BillActions,
    uuidDocument?: string,
    withDiscount: boolean,
    onChangeDocumentType: (uuidBill:string, type: DocumentType) => void,
    
    onPatientSelected: (uuid:string) => void
    onCreateOrUpdateBill: (bill:Bill, typeUpdate:TypeBillItemUpdate) => void,
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
    const { patients } = usePatients(props.uuidInvestigation);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [showModal, setShowModal] = useState(false);
    const [actionBill, setActionBill] = useState<BillActions>(props.section);
    const [currentBill, setCurrentBill] = useState<Bill | null>(null);
    
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const editing = location.pathname === HOSPITAL_BILLING_EDIT;

    useEffect(() => {
        if (props.uuidDocument && props.section === "view") {
            const findBill = props.bills.find((bill) => bill.uuid === props.uuidDocument);
            if (findBill) {
                setActionBill(BillActions.VIEW);
                setCurrentBill(findBill);
            }
        }

    }, [props.uuidDocument, props.bills]);

    useEffect(() => {
        if (location.pathname === HOSPITAL_BILLING && !props.billingInfo) {
            history.push(HOSPITAL_BILLING_EDIT);
        }
    }, []);

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
        if(editing){
            history.push(HOSPITAL_BILLING);
        }
        else{
            history.push(HOSPITAL_BILLING_EDIT);
        }
    }

    useEffect(() => {
        if (props.showSnackbar) {
            setShowSnackbar(props.showSnackbar);
        }
    }, [props.showSnackbar]);


    function makeActionBill(uuidBill: string, action: BillActions) {
        console.log(uuidBill);
        const tempBill = props.bills.find((bill) => bill.uuid === uuidBill);

        if (tempBill) {
            
            const patient = patients.find((patient) => patient.uuid === tempBill.uuidPatient);
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
        setActionBill(BillActions.DEFAULT);
    }

    function onBillingInfoSuccesfullyUpdated(type: BillItemModes) {
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
        else if (editing) {
            return <EditBilling uuidInvestigation={props.uuidInvestigation} 
                        billables={[]} 
                        withDiscount={props.withDiscount}
                        billingInfo={props.billingInfo} 
                        onBillingInfoSuccesfullyUpdated={(type: BillItemModes) => onBillingInfoSuccesfullyUpdated(type)} />
        }
        else if(props.section === BillActions.PATIENT_BILLS && props.uuidPatient){
            const currentPatient = patients.find((patient) => patient.uuid === props.uuidPatient);
            return(<>
                        { renderBillForm() }
                        <BillsPatient patient={currentPatient} uuidPatient={props.uuidPatient} bills={props.bills} 
                            currency={props.billingInfo.currency} languageCode={props.activeLanguage.code}
                            makeActionBillCallBack={makeActionBill}/>
            </>)
        }
        else if(props.section === BillActions.VIEW && props.uuidDocument && currentBill){
            const currentPatient = patients.find((patient) => patient.uuid === currentBill.uuidPatient);
            return (<>
                    { renderBillForm() }
                    <BillView bill={currentBill} billStatus={currentBill.status} billType={currentBill.type} 
                        billingInfo={props.billingInfo} hospitalName={props.hospitalName} 
                        patient={currentPatient!} hasBudgets={Boolean(props.billingInfo.params.budgets)} languageCode={props.activeLanguage.code} canUpdateBill={currentBill.status === DocumentStatus.DRAFT} 
                        currency={props.billingInfo.currency} uuidInvestigation={props.uuidInvestigation} idBillingInfo={props.billingInfo.id}
                        print={false} withDiscount={props.withDiscount} surveyAdditionalInfo={props.surveyAdditionalInfo}
                        onUpdateBill={(bill: Bill, typeUpdate:TypeBillItemUpdate) => props.onCreateOrUpdateBill(bill, typeUpdate)} 
                        onChangeDocumentType={props.onChangeDocumentType}
                        onCancelBill={onCancelBill}
                    />
                    </>)
        }
        else {
            if (props.billingInfo) {
                if(actionBill === BillActions.CREATE){
                    return <BillCreate patients={patients} personalFields={props.personalFields} currency={props.billingInfo.currency} 
                                uuidInvestigation={props.uuidInvestigation} canCreateBugdet={Boolean(props.billingInfo.params.budgets)}
                                idBillingInfo={props.billingInfo.id} languageCode={props.activeLanguage.code} withDiscount={props.withDiscount} 
                                onCreateBill={(bill: Bill) => props.onCreateOrUpdateBill(bill, TypeBillItemUpdate.BillItems)}
                                onCancelBill={onCancelBill} 
                                />
                }
                return (
                    <>
                        { renderBillForm() }
                        <BillsTable hasBudgets={Boolean(props.billingInfo.params.budgets)} patients={patients} currency={props.billingInfo.currency} 
                            bills={props.bills} languageCode={props.activeLanguage.code} canCreateBugdet={Boolean(props.billingInfo.params.budgets)}
                                makeActionBillCallBack={makeActionBill}/>
                    </>
                );
            }
        }
    }
    function renderBillForm() {
        switch (actionBill) {
            case BillActions.PREVIEW:
                const currentPatient = patients.find((patient) => patient.uuid === currentBill!.uuidPatient);
                return (
                    <Modal key="modal" fullWidth medium open={showModal} title={!currentBill ? "Create bill" : ""} closeModal={() => onCloseModal()}>
                        <DocumentPDF size='A4' name={currentBill!.id.toString()}>
                            <BillPDF bill={currentBill!} type={currentBill!.type} patient={currentPatient!}
                                hospitalName={props.hospitalName} phone={props.billingInfo.phone}
                                address={props.billingInfo.address} logoBlob={props.billingInfo.logoBlob}
                                currency={props.billingInfo.currency} email={props.billingInfo.email}
                                city={props.billingInfo.city} uuidDepartment={currentBill!.uuidDepartment}
                                locale={props.activeLanguage.code} uuidPrescribingDoctor={currentBill!.uuidPrescribingDoctor}
                                uuidInvestigation={props.uuidInvestigation} />
                        </DocumentPDF>
                    </Modal>
                )
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

            <Grid justifyContent="space-between" direction='row' container padding={2} style={{ color: "white" }}>
                <Grid item xs={12} container>
                    <Grid item xs={6} style={{ paddingBottom: '1rem' }}>
                        <SectionHeader section="billing" edit={editing} 
                            editCallback={toogleEditBillingInfo}  />
                        {!props.billingInfo ?
                            <TypographyStyled variant="body2" gutterBottom >
                                <Translate id="hospital.billing.no_billing_info" />
                            </TypographyStyled>
                            :
                            props.canCreateBills ? 
                            <ButtonAdd disabled={props.section === BillActions.CREATE || props.loading || editing}
                                type="button" data-testid="add_bill"
                                onClick={props.createBill} />
                            : null
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