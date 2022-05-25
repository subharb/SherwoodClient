
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
import { BillItem, IPatient } from '../../../constants/types';

const Divider = styled(MuiDivider)(spacing);

interface Props extends LocalizeContextProps{
    patients:IPatient[],
    personalFields:[],
    currency: string,
    onPatientSelected:(idPatient:number) => void,
}

const Billing:React.FC<Props> = (props) => {
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [showModal, setShowModal] = useState(false);

    async function resetSnackBar(){
        setShowSnackbar({show:false});
        
    }
    function onCancelBill(){
        setShowModal(false);
    }
    function onBillCreated(items:BillItem[]){

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
            <Modal key="modal" open={showModal} title="Create bill">
                    <BillForm patients={props.patients} personalFields={props.personalFields} 
                        currency={props.currency} 
                        onBillCreated={(items) => onBillCreated(items)} 
                        onCancelBill={onCancelBill}/>
            </Modal>
			<Grid justify="space-between" direction='row' container spacing={6}>
				<Grid item xs={6}>
					<Typography variant="h3" gutterBottom style={{ color: "white" }}>
						Billing
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

export default withLocalize(Billing);