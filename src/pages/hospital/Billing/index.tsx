
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";
import styled, { withTheme } from "styled-components/macro";
import { Box, Button, Divider as MuiDivider, Grid, IconButton, Paper, Snackbar, Typography } from '@material-ui/core';
import { spacing } from "@material-ui/system";
import Modal from '../../../components/general/modal';
import { useSnackBarState } from '../../../hooks';
import { Alert } from '@material-ui/lab';
import { ButtonAdd } from '../../../components/general/mini_components';
import { BillForm } from './bill_form';
import { Bill, IPatient } from '../../../constants/types';

import { connect } from 'react-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';

const Divider = styled(MuiDivider)(spacing);

interface PropsRedux{
    investigations:any,
    patients:any,
    uuidInvestigation : string
}

const BillingRedux:React.FC<PropsRedux> = ({investigations, patients}) => {
    const investigation = investigations.data && investigations.currentInvestigation ? investigations.currentInvestigation : null;
    
    if(investigation){
        return <BillingLocalized patients={patients} 
                uuidInvestigation={investigation.uuid as string}
                personalFields={investigation.personalFields}
                currency={investigation.billing.currency} 
                bills={[]} />
    }
    else{
        return null;
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
    currency: string,
    bills:Bill[];
}

const Billing:React.FC<Props> = (props) => {
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentBill, setCurrentBill] = useState<Bill | null>(null);
    const [patientBill, setPatientBill] = useState<IPatient | null>(null);

    async function resetSnackBar(){
        setShowSnackbar({show:false});
        
    }
    function onCancelBill(){
        setShowModal(false);
    
    }
    function onBillCreated(){
        
    }
    function billSelected(idBill:number){
        console.log(idBill);
        const tempBill = props.bills.find((bill)=>bill.id === idBill);
        
        if(tempBill){
            const patient = props.patients.find((patient) => patient.id === tempBill.patientInvestigation.id);
            if(patient){
                tempBill.patientInvestigation = patient;
            }            
            setShowModal(true);
            setCurrentBill(tempBill);
        }
        
    }
    function onCloseModal(){
        setShowModal(false);
        setCurrentBill(null);
    }
    function renderBills(){
        if(props.bills.length === 0){
            return "No hay facturas";
        }
        else{
            const rows = props.bills.map((bill) => {
                const patient = props.patients.find((patient) => patient.id === bill.patientInvestigation.id);
                return {
                    "id" : bill.id,
                    "patient" : patient?.personalData.name+" "+patient?.personalData.surnames, 
                    "total" : bill.total,
                    "totalPaid" : bill.totalPaid
                }
            });
            const headCells = [{ id: "patient", alignment: "left", label: <Translate id={`hospital.billing.bill.patient`} /> },
                    { id: "total", alignment: "left", label: <Translate id={`hospital.billing.bill.total`} /> },
                    { id: "totalPaid", alignment: "left", label: <Translate id={`hospital.billing.bill.total_pending`} /> }
                ]
            return <EnhancedTable headCells={headCells} rows={rows}  
                    actions={[{"type" : "view", "func" : (index:number) => billSelected(index)}]} />
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
                        <React.Fragment>
                        {
                            showSnackbar.message && 
                            <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                                <Translate id={showSnackbar.message} />
                            </Alert>
                        }
                        </React.Fragment>
                </Snackbar>
            <Modal key="modal" medium open={showModal} title={!currentBill ? "Create bill" : "Bill Id:"+currentBill.id} closeModal={() => onCloseModal()}>
                    <BillForm patients={props.patients} personalFields={props.personalFields} 
                        currency={props.currency} uuidInvestigation={props.uuidInvestigation}
                        onBillSuccesfullyCreated={() => onBillCreated()} 
                        onCancelBill={onCancelBill}
                        bill={currentBill} updatingBill = {currentBill !== null}
                        />
            </Modal>
			<Grid justify="space-between" direction='row' container spacing={6}>
				<Grid item xs={6}>
					<Typography variant="h3" gutterBottom style={{ color: "white" }}>
						<Translate id="hospital.billing.title" />
					</Typography>	
                    <ButtonAdd disabled={showModal} 
                        type="button" data-testid="add_bill" 
                        onClick={() => {
                            setShowModal(true);
                        }} />				
				</Grid>
				
			</Grid>
			<Divider my={6} />
            <Grid direction='row' container spacing={6}>
                {
                    renderBills()
                }
            </Grid>
        </React.Fragment>
    )
}

export const BillingLocalized = withLocalize(Billing);