
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
import { BillItem, BillItemTable, IPatient } from '../../../constants/types';
import { calculateTotalBill } from '../../../utils/bill';
import { createBillService } from '../../../services/billing';
import { connect } from 'react-redux';

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
                currency={investigation.billing.currency} />
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
}

const Billing:React.FC<Props> = (props) => {
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false)

    async function resetSnackBar(){
        setShowSnackbar({show:false});
        
    }
    function onCancelBill(){
        setShowModal(false);
    
    }
    function onBillCreated(){
        
    }
    return(
        <React.Fragment>
			<Helmet title="Analytics Dashboard" />
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
            <Modal key="modal" medium open={showModal} title="Create bill" closeModal={() => setShowModal(false)}>
                    <BillForm patients={props.patients} personalFields={props.personalFields} 
                        currency={props.currency} uuidInvestigation={props.uuidInvestigation}
                        onBillSuccesfullyCreated={() => onBillCreated()} 
                        onCancelBill={onCancelBill}/>
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
        </React.Fragment>
    )
}

export const BillingLocalized = withLocalize(Billing);