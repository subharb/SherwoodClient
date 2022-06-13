
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";
import styled, { withTheme } from "styled-components/macro";
import { Divider as MuiDivider, Grid, IconButton, Paper, Snackbar, Typography } from '@material-ui/core';
import { spacing } from "@material-ui/system";
import Modal from '../../../components/general/modal';
import { useSnackBarState } from '../../../hooks';
import { Alert } from '@material-ui/lab';
import { ButtonAdd } from '../../../components/general/mini_components';
import { BillForm } from './bill_form';
import { Bill, BillingInfo, IPatient } from '../../../constants/types';
import { Document } from '../Document';
import { connect } from 'react-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { getBillsService } from '../../../services/billing';
import Loader from '../../../components/Loader';

const Divider = styled(MuiDivider)(spacing);

interface PropsRedux{
    investigations:any,
    patients:{data:any},
    uuidInvestigation : string,

}


const BillingRedux:React.FC<PropsRedux> = ({investigations, patients}) => {
    const investigation = investigations.data && investigations.currentInvestigation ? investigations.currentInvestigation : null;
    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState(false);

    function onBillSuccesfullyCreated(bill:Bill){
        const tempBills = [...bills];
        const existingBillIndex = tempBills.findIndex((aBill) => bill.id === aBill.id);
        if(existingBillIndex !== -1){
            tempBills[existingBillIndex] = bill;
        }
        else{
            tempBills.push(bill);
        }
        setBills(tempBills);
    }
    useEffect(() => {
        async function getBills(){
            setLoading(true);
            const response = await getBillsService(investigation.uuid);
            if(response.status === 200){
                setBills(response.bills);
            }
            setLoading(false);
        }
        if(investigation){
            getBills();
        }
    }, [investigation]) 
    if(investigation){
        return <BillingLocalized patients={patients.data[investigation.uuid]} 
                    uuidInvestigation={investigation.uuid as string}
                    personalFields={investigation.personalFields}
                    billingInfo = {investigation.billingInfo}
                    bills={bills} loading={loading} 
                    onBillSuccesfullyCreated={(bill:Bill) => onBillSuccesfullyCreated(bill)} 
                    />
    }
    else{
        return <Loader />;
    }
    
}

const mapStateToProps = (state:any) =>{
    return {
        investigations : state.investigations,
        patients: state.patients,
    }
}

export default connect(mapStateToProps, null)(BillingRedux);


interface Props extends LocalizeContextProps{
    patients:IPatient[],
    personalFields:[],
    uuidInvestigation:string,
    billingInfo: BillingInfo,
    bills:Bill[];
    loading:boolean,
    onBillSuccesfullyCreated:(bill:Bill) => void,
}

export enum BillActions{
    update = "update",
    preview = "preview",
    create = "update",
    default = ""
}


const Billing:React.FC<Props> = (props) => {
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [actionBill, setActionBill] = useState<BillActions>(BillActions.default);
    const [currentBill, setCurrentBill] = useState<Bill | null>(null);
    const [patientBill, setPatientBill] = useState<IPatient | null>(null);

    async function resetSnackBar(){
        setShowSnackbar({show:false});
        
    }
    function onCancelBill(){
        setShowModal(false);
        setCurrentBill(null);
    }
    function onBillSuccesfullyCreated(bill:Bill){
        console.log(bill);
        setShowModal(false);

        if(currentBill){
            setShowSnackbar({message:"hospital.billing.bill.success.updated", show:true, severity:"success"});

        }
        else{
            setShowSnackbar({message:"hospital.billing.bill.success.created", show:true, severity:"success"});
        }
        props.onBillSuccesfullyCreated(bill);
        setCurrentBill(null);
        
    }
    function makeActionBill(idBill:number, action:BillActions){
        console.log(idBill);
        const tempBill = props.bills.find((bill)=>bill.id === idBill);
        
        if(tempBill){
            const patient = props.patients.find((patient) => patient.id === tempBill.patientInvestigation.id);
            if(patient){
                tempBill.patientInvestigation = patient;
            }            
            setActionBill(action);
            setShowModal(true);
            setCurrentBill(tempBill);
        }
        
    }

    function onCloseModal(){
        setShowModal(false);
        setCurrentBill(null);
    }
    function renderBills(){
        if(props.loading){
            return <Loader />
        }
        if(props.bills.length === 0){
            return <Translate id="hospital.billing.no_bills" />;
        }
        else{
            const rows = props.bills.map((bill) => {
                const patient = props.patients.sort((patA, patB) => patB.id - patA.id).find((patient) => patient.id === bill.patientInvestigation.id);
                return {
                    "id" : bill.id,
                    "patient" : patient?.personalData.name+" "+patient?.personalData.surnames, 
                    "total" : bill.total,
                    "totalPending" : bill.total - bill.totalPaid
                }
            });
            const headCells = [
                    { id: "id", alignment: "left", label: "ID" },
                    { id: "patient", alignment: "left", label: <Translate id={`hospital.billing.bill.patient`} /> },
                    { id: "total", alignment: "left", label: <Translate id={`hospital.billing.bill.total`} /> },
                    { id: "totalPending", alignment: "left", label: <Translate id={`hospital.billing.bill.total_pending`} /> }
                ]
            return <EnhancedTable headCells={headCells} rows={rows}  noSelectable
                    actions={[{"type" : "edit", "func" : (index:number) => makeActionBill(index, BillActions.update)},
                            {"type" : "view", "func" : (index:number) => makeActionBill(index, BillActions.preview)}]} />
        }
    }
    function renderModal(){
        switch(actionBill){
            case BillActions.update:
            case BillActions.create:
                return (
                    <Modal key="modal" fullWidth medium open={showModal} title={!currentBill ? "Create bill" : ""} closeModal={() => onCloseModal()}>
                        <BillForm patients={props.patients } personalFields={props.personalFields} 
                             currency={props.billingInfo.currency} uuidInvestigation={props.uuidInvestigation}
                             onBillSuccesfullyCreated={(bill:Bill) => onBillSuccesfullyCreated(bill)} 
                             onCancelBill={onCancelBill} print={false}
                             bill={currentBill} updatingBill = {currentBill !== null}
                             locale={props.activeLanguage}
                         />
                     </Modal>
                 )
            case BillActions.preview:
                return(
                    <Modal key="modal" medium size="sm" open={showModal} title={""} closeModal={() => onCloseModal()}>
                        <Document address={props.billingInfo.address} urlLogo={props.billingInfo.urlLogo} currency={props.billingInfo.currency}
                                email={props.billingInfo.email} size="A4" telephone={props.billingInfo.telephone} name={currentBill ? "Bill"+currentBill.id : ""} >
                            <BillForm patients={props.patients } personalFields={props.personalFields} 
                                currency={props.billingInfo.currency} uuidInvestigation={props.uuidInvestigation}
                                onBillSuccesfullyCreated={(bill:Bill) => onBillSuccesfullyCreated(bill)} 
                                onCancelBill={onCancelBill} print={true}
                                bill={currentBill} updatingBill = {currentBill !== null}
                                locale={props.activeLanguage}
                                />
                        </Document>
                    </Modal>
                )
            default:
                return null;
        }
    }
    return(
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
                                <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                                    <Translate id={showSnackbar.message} />
                                </Alert>
                            }
                        </div>
                        
                        
                </Snackbar>
            
                {
                    renderModal()
                }
            
			<Grid justify="space-between" direction='row'  container spacing={6}>
				<Grid item xs={6}>
					<Typography variant="h3" gutterBottom style={{ color: "white" }}>
						<Translate id="hospital.billing.title" />
					</Typography>	
                    <ButtonAdd disabled={showModal || props.loading} 
                        type="button" data-testid="add_bill" 
                        onClick={() => {
                            setActionBill(BillActions.create);
                            setShowModal(true);
                        }} />				
				</Grid>
				
			</Grid>
			<Divider my={6} />
            <Grid direction='row' container spacing={6} justify="center" style={{ color: "white" }}>
                {
                    renderBills()
                }
            </Grid>
        </React.Fragment>
    )
}

export const BillingLocalized = withLocalize(Billing);