
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";
import { Divider as MuiDivider, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import Modal from '../../../components/general/modal';
import { useSnackBarState } from '../../../hooks';
import { Alert } from '@mui/material';
import { ButtonAdd, IconGenerator, TypographyStyled } from '../../../components/general/mini_components';
import { BillForm } from './bill_form';
import { FUNCTIONALITY, IPatient } from '../../../constants/types';
import { Bill, BillingInfo, BillItemModes } from './types';
import { Document } from '../Document';
import { connect, useDispatch } from 'react-redux';
import { getBillsPatientService, getBillsService } from '../../../services/billing';
import Loader from '../../../components/Loader';
import { hasDiscountsActive } from '../../../utils/index.jsx';
import EditBilling from './Edit';
import { getBillablesAction } from '../../../redux/actions/investigationsActions';

import { useHistory, useParams } from 'react-router-dom';
import BillsPatient from './BillsPatient';
import { TabsSherwood } from '../../components/Tabs';
import BillsTable from './BillsTable';

import { FindPatient } from './find_patient';

interface PropsRedux {
    investigations: any,
    patients: { data: any },
    uuidInvestigation: string,
}

const BillingRedux: React.FC<PropsRedux> = ({ investigations, patients }) => {
    const investigation = investigations.data && investigations.currentInvestigation ? investigations.currentInvestigation : null;
    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    let uuidPatient = useParams<{uuidPatient?:string}>().uuidPatient;


    const hasDiscounts = investigation && investigation.billingInfo && investigation.billingInfo.params && hasDiscountsActive(investigation.billingInfo.params, investigation.permissions);
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
    }, [investigation])
    if (investigation) {
        return <BillingLocalized patients={patients.data[investigation.uuid]} withDiscount={hasDiscounts}
                    uuidInvestigation={investigation.uuid as string} hospitalName={investigation.name}
                    personalFields={investigation.personalFields}
                    billingInfo={investigation.billingInfo}
                    bills={bills} loading={loading} uuidPatient={uuidPatient}
                    onBillSuccesfullyCreated={(bill: Bill) => onBillSuccesfullyCreated(bill)}
                    onPatientSelected={(uuid:string) => onPatientSelected(uuid)}
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
    withDiscount: boolean,
    onBillSuccesfullyCreated: (bill: Bill) => void,
    onPatientSelected: (uuid:string) => void
}

export enum BillActions {
    update = "update",
    preview = "preview",
    create = "update",
    default = ""
}


const Billing: React.FC<Props> = (props) => {
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [showModal, setShowModal] = useState(false);
    const [actionBill, setActionBill] = useState<BillActions>(BillActions.default);
    const [currentBill, setCurrentBill] = useState<Bill | null>(null);
    const [edit, setEdit] = useState(false);
    

    async function resetSnackBar() {
        setShowSnackbar({ show: false });

    }
    function onCancelBill() {
        setShowModal(false);
        setCurrentBill(null);
    }
    function toogleEditBillingInfo() {
        setEdit(edit => !edit);
    }
    function onBillSuccesfullyCreated(bill: Bill) {
        console.log(bill);
        setShowModal(false);

        if (currentBill) {
            setShowSnackbar({ message: "hospital.billing.bill.success.updated", show: true, severity: "success" });

        }
        else {
            setShowSnackbar({ message: "hospital.billing.bill.success.created", show: true, severity: "success" });
        }
        props.onBillSuccesfullyCreated(bill);
        setCurrentBill(null);

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

    function onCloseModal() {
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
        else if(props.uuidPatient){
            const currentPatient = props.patients.find((patient) => patient.uuid === props.uuidPatient);
            return <BillsPatient patient={currentPatient} uuidPatient={props.uuidPatient} bills={props.bills} 
                        currency={props.billingInfo.currency} languageCode={props.activeLanguage.code}
                        makeActionBillCallBack={makeActionBill}/>
        }
        else {
            if (props.billingInfo) {
                return (
                    <TabsSherwood name="Billing Info" style={{color: "white"}}
                        labels={[props.translate("hospital.billing.all_bills").toString(), props.translate("hospital.billing.search_patient").toString()]} >
                        <BillsTable patients={props.patients} currency={props.billingInfo.currency} bills={props.bills} languageCode={props.activeLanguage.code} 
                            makeActionBillCallBack={makeActionBill}/>
                        <FindPatient patients={props.patients}
                            personalFields={props.personalFields}
                            codeLanguage={props.activeLanguage.code}
                            onPatientSelected={(idPatient) => onPatientSelected(idPatient)}
                            />
                    </TabsSherwood>
                );
            }
        }
    }
    function renderModal() {
        switch (actionBill) {
            case BillActions.update:
            case BillActions.create:
                return (
                    <Modal key="modal" fullWidth medium open={showModal} title={!currentBill ? "Create bill" : ""} closeModal={() => onCloseModal()}>
                        <BillForm patients={props.patients} personalFields={props.personalFields} withDiscount={props.withDiscount}
                            currency={props.billingInfo.currency} uuidInvestigation={props.uuidInvestigation}
                            onBillSuccesfullyCreated={(bill: Bill) => onBillSuccesfullyCreated(bill)}
                            onCancelBill={onCancelBill} print={false} billables={props.billingInfo.billables}
                            bill={currentBill} updatingBill={currentBill !== null}
                            idBillingInfo={props.billingInfo.id}
                            locale={props.activeLanguage}
                        />
                    </Modal>
                )
            case BillActions.preview:
                return (
                    <Modal key="modal" medium size="sm" open={showModal} title={""} closeModal={() => onCloseModal()}>
                        <Document address={props.billingInfo.address} hospitalName={props.hospitalName} logoBlob={props.billingInfo.logoBlob} currency={props.billingInfo.currency}
                            email={props.billingInfo.email} size="A4" phone={props.billingInfo.phone} name={currentBill ? "Bill" + currentBill.id : ""} >
                            <BillForm patients={props.patients} personalFields={props.personalFields} withDiscount={props.withDiscount}
                                currency={props.billingInfo.currency} uuidInvestigation={props.uuidInvestigation}
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
        <React.Fragment>
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

            {
                renderModal()
            }

            <Grid justifyContent="space-between" direction='row' container spacing={6} style={{ color: "white" }}>
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
                                <IconGenerator type={!edit ? "settings" : "back"}  color="primary"/>
                            </IconButton>
                        </div>
                        {!props.billingInfo ?
                            <Typography variant="body2" gutterBottom style={{ color: "white" }}>
                                <Translate id="hospital.billing.no_billing_info" />
                            </Typography>
                            :
                            <ButtonAdd disabled={showModal || props.loading || edit}
                                type="button" data-testid="add_bill"
                                onClick={() => {
                                    setActionBill(BillActions.create);
                                    setShowModal(true);
                                }} />
                        }
                    </Grid>
                </Grid>

            </Grid>
            {
                renderCore()
            }

        </React.Fragment>
    );
}

export const BillingLocalized = withLocalize(Billing);