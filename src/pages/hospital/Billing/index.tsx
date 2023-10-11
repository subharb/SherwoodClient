
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";
import { Grid, IconButton, Snackbar, Typography } from '@mui/material';
import Modal from '../../../components/general/modal';
import { useSnackBarState } from '../../../hooks';
import { Alert } from '@mui/material';
import { ButtonAdd, IconGenerator, TypographyStyled } from '../../../components/general/mini_components';
import { BillForm } from './BillForm';
import { FUNCTIONALITY, IPatient, ISurvey } from '../../../constants/types';
import { Bill, BillingInfo, BillItemModes } from './types';
import { Document } from '../Document';
import { connect, useDispatch } from 'react-redux';
import { getBillsPatientService, getBillsService } from '../../../services/billing';
import Loader from '../../../components/Loader';
import { hasDiscountsActive } from '../../../utils/index.jsx';
import EditBilling from './Edit';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import BillsPatient from './BillsPatient';
import BillsTable from './BillsTable';

import { HOSPITAL_BILLING, HOSPITAL_BILLING_CREATE_BILL } from '../../../routes/urls';
import { getBillableComboAction, resetBillItems } from '../../../redux/actions/billingActions';
import { TYPE_ADDITIONAL_INFO_SURVEY } from '../../../constants';

interface PropsRedux {
    investigations: any,
    patients: { data: any },
    uuidInvestigation: string,
}

const BillingRedux: React.FC<PropsRedux> = ({ investigations, patients }) => {
    const investigation = investigations.data && investigations.currentInvestigation ? investigations.currentInvestigation : null;
    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const history = useHistory();
    let uuidPatient = useParams<{uuidPatient?:string}>().uuidPatient;

    const section = location.pathname === HOSPITAL_BILLING_CREATE_BILL ? "create_bill" : uuidPatient ? "patient" : "billing";

    const hasDiscounts = investigation && investigation.billingInfo && investigation.billingInfo.params && hasDiscountsActive(investigation.billingInfo.params, investigation.permissions);
    
    const dispatch = useDispatch();

    function navigateToHomeBilling(){
        history.push(HOSPITAL_BILLING);
    }

    function onBillSuccesfullyCreated(bill: Bill) {
        const tempBills = [...bills];
        const existingBillIndex = tempBills.findIndex((aBill) => bill.id === aBill.id);
        if (existingBillIndex !== -1) {
            tempBills[existingBillIndex] = bill;
        }
        else {
            tempBills.push(bill);
            tempBills.sort((billA, billB) => billB.id - billA.id);
        }
        setBills(tempBills);
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
                response = await getBillsService(investigation.uuid);
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
        if(section === "create_bill" && investigation){
            dispatch(getBillableComboAction(investigation.uuid, investigation.billingInfo.id));
        }

        }, [section, investigation])

    if (investigation) {
        const surveyAdditionalInfo:ISurvey | undefined = investigation.surveys.find((survey: any) => survey.type === TYPE_ADDITIONAL_INFO_SURVEY);
        return <BillingLocalized patients={patients.data[investigation.uuid]} withDiscount={hasDiscounts}
                    uuidInvestigation={investigation.uuid as string} hospitalName={investigation.name}
                    personalFields={investigation.personalFields}
                    billingInfo={investigation.billingInfo}
                    section={section} surveyAdditionalInfo={surveyAdditionalInfo}
                    bills={bills} loading={loading} uuidPatient={uuidPatient}
                    onBillSuccesfullyCreated={(bill: Bill) => onBillSuccesfullyCreated(bill)}
                    onCreateBill={() => history.push(HOSPITAL_BILLING_CREATE_BILL)}
                    onPatientSelected={(uuid:string) => onPatientSelected(uuid)}
                    navigateToHomeBilling={navigateToHomeBilling}
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
    bills: Bill[];
    loading: boolean,
    surveyAdditionalInfo?: ISurvey,
    section: "create_bill" | "billing" | "patient",
    withDiscount: boolean,
    onBillSuccesfullyCreated: (bill: Bill) => void,
    onPatientSelected: (uuid:string) => void
    onCreateBill: () => void,
    onCancelBill: () => void,
    navigateToHomeBilling: () => void,
}

export enum BillActions {
    update = "update",
    preview = "preview",
    create = "create",
    default = ""
}


const Billing: React.FC<Props> = (props) => {
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [showModal, setShowModal] = useState(false);
    const [actionBill, setActionBill] = useState<BillActions>(props.section === "create_bill" ? BillActions.create : BillActions.default);
    const [currentBill, setCurrentBill] = useState<Bill | null>(null);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();

    async function resetSnackBar() {
        setShowSnackbar({ show: false });
        if(actionBill === BillActions.create){
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

    async function onBillSuccesfullyCreated(bill: Bill) {
        if (currentBill) {
            setShowSnackbar({ message: "hospital.billing.bill.success.updated", show: true, severity: "success" });
        }
        else {
            setShowSnackbar({ message: "hospital.billing.bill.success.created", show: true, severity: "success" });
        }
        //await dispatch(resetBillItems());
        onCloseModal();
        props.onBillSuccesfullyCreated(bill);
        //setCurrentBill(null);

    }
    function makeActionBill(idBill: number, action: BillActions) {
        console.log(idBill);
        const tempBill = props.bills.find((bill) => bill.id === idBill);

        if (tempBill) {
            const patient = props.patients.find((patient) => patient.id === tempBill.patientInvestigation.id);
            if (patient) {
                tempBill.patientInvestigation = patient;
            }
            setActionBill(action);
            setShowModal(true);
            setCurrentBill(tempBill);
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
    function onPatientSelected(idPatient: number) {
        const findPatient = props.patients.find((patient) => patient.id === idPatient);
        if (findPatient) {
            props.onPatientSelected(findPatient.uuid);
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
        else if(props.section === "patient" && props.uuidPatient){
            const currentPatient = props.patients.find((patient) => patient.uuid === props.uuidPatient);
            return(<>
                        { renderBillForm() }
                        <BillsPatient patient={currentPatient} uuidPatient={props.uuidPatient} bills={props.bills} 
                        currency={props.billingInfo.currency} languageCode={props.activeLanguage.code}
                        makeActionBillCallBack={makeActionBill}/>
            </>)
        }
        else {
            if (props.billingInfo) {
                if(actionBill === BillActions.create){
                    return renderBillForm();
                }
                return (
                    <>
                        { renderBillForm() }
                        <BillsTable patients={props.patients} currency={props.billingInfo.currency} bills={props.bills} languageCode={props.activeLanguage.code} 
                                makeActionBillCallBack={makeActionBill}/>
                    </>
                );
            }
        }
    }
    function renderBillForm() {
        switch (actionBill) {
            case BillActions.update:
            case BillActions.create:
                const billFormComponent = <BillForm patients={props.patients} personalFields={props.personalFields} withDiscount={props.withDiscount}
                                            currency={props.billingInfo.currency} uuidInvestigation={props.uuidInvestigation}
                                            onBillSuccesfullyCreated={(bill: Bill) => onBillSuccesfullyCreated(bill)}
                                            onCancelBill={onCancelBill} print={false}
                                            bill={currentBill} updatingBill={currentBill !== null}
                                            idBillingInfo={props.billingInfo.id} surveyAdditionalInfo={props.surveyAdditionalInfo}
                                            locale={props.activeLanguage}
                                        />
                if(actionBill === BillActions.create){
                    return(
                        billFormComponent
                    )
                }
                
                return (
                    <Modal key="modal" fullWidth medium open={showModal} title={!currentBill ? "Create bill" : ""} closeModal={() => onCloseModal()}>
                        { billFormComponent }
                    </Modal>
                )
            case BillActions.preview:
                return (
                    <Modal key="modal" medium size="sm" open={showModal} title={""} closeModal={() => onCloseModal()}>
                        <Document address={props.billingInfo.address} hospitalName={props.hospitalName} logoBlob={props.billingInfo.logoBlob} currency={props.billingInfo.currency}
                            email={props.billingInfo.email} size="A4" phone={props.billingInfo.phone} name={currentBill ? "Bill" + currentBill.id : ""} >
                            <BillForm patients={props.patients} personalFields={props.personalFields} withDiscount={props.withDiscount}
                                currency={props.billingInfo.currency} uuidInvestigation={props.uuidInvestigation}
                                surveyAdditionalInfo={props.surveyAdditionalInfo}
                                onBillSuccesfullyCreated={(bill: Bill) => onBillSuccesfullyCreated(bill)}
                                onCancelBill={onCancelBill} print={true}
                                idBillingInfo={props.billingInfo.id}
                                bill={currentBill} updatingBill={currentBill !== null}
                                locale={props.activeLanguage}
                            />
                        </Document>
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

            {/* {
                renderModal()
            } */}

            <Grid justifyContent="space-between" direction='row' container padding={2} style={{ color: "white" }}>
                <Grid item xs={12} container>
                    <Grid item xs={6} style={{ paddingBottom: '1rem' }}>
                        <div>
                            <TypographyStyled variant="h3" gutterBottom style={{ display: 'inline-block' }}>
                                <Translate id="hospital.billing.title" />
                            </TypographyStyled>
                            <IconButton
                                onClick={(e) => {
                                    toogleEditBillingInfo();
                                }}
                                size="large">
                                <IconGenerator type={!edit ? "settings" : "back"} />
                            </IconButton>
                        </div>
                        {!props.billingInfo ?
                            <TypographyStyled variant="body2" gutterBottom >
                                <Translate id="hospital.billing.no_billing_info" />
                            </TypographyStyled>
                            :
                            <ButtonAdd disabled={props.section === "create_bill" || props.loading || edit}
                                type="button" data-testid="add_bill"
                                onClick={props.onCreateBill} />
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