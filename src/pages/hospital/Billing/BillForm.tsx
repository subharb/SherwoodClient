import { Grid, Snackbar, TextField, Typography } from "@mui/material"
import React, { ReactElement, useEffect, useState } from "react"
import { Language, Translate } from "react-localize-redux"
import styled from "styled-components"
import Loader from "../../../components/Loader"
import { IPatient, ReduxStore } from "../../../constants/types"
import { Bill, BillItem, BillItemModes, DocumentType } from "./types";
import { createBillService, updateBillService } from "../../../services/billing";
import { Alert } from "@mui/lab"
import { BillItems, Column } from "./BillItems"
import { useSnackBarState } from "../../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { getBillablesAction } from "../../../redux/actions/investigationsActions"
import { resetBillItems, saveBillingItems } from "../../../redux/actions/billingActions"

interface Props {
    canUpdateBill: boolean,
    patient: IPatient,
    currency: string,
    uuidInvestigation?: string,
    idBillingInfo?:number,
    bill: Bill | null,
    print: boolean,
    surveyAdditionalInfo?: any,
    withDiscount: boolean,
    onBillItemsValidated: (billItems: BillItem[]) => void,
    onUpdateBillItemStatus: (billItems: BillItem[]) => void,
    onCancelBill: () => void

}

const GridContainer = styled(Grid)`
    flex-direction: column;
    @media (min-width: 768px) {
        min-height:500px;
        min-width:400px;   
    }
`
export const BillForm:React.FC<Props> = (props) => {
    const [loading, setLoading] = useState(false);
    const loadingBillables = useSelector((state:ReduxStore) => state.billing.loading);
    const billables = useSelector((state:ReduxStore) => state.billing.data.billablesCurrentBill ? state.billing.data.billablesCurrentBill : []);
    
    const [errorBill, setErrorBill] = useState<ReactElement | undefined>(undefined);
    const [currentItems, setCurrentItems] = useState<BillItem[]>([]);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    
    const dispatch = useDispatch();


    useEffect(() => {
        async function getBillables() {
            console.log(props.patient);
            const insuranceId = props.patient?.personalData.insurance ? props.patient.personalData.insurance : null;
            await dispatch(getBillablesAction(props.uuidInvestigation, props.idBillingInfo, insuranceId));
        }
        if (props.patient && billables.length === 0 && props.idBillingInfo) {
            getBillables();
        }
    
    }, [props.patient]);

    useEffect(() => {
        if(props.bill?.billItems){
            dispatch(saveBillingItems(props.bill.billItems));
        }
        else{
            dispatch(resetBillItems());
        }
    }, [props.bill]);
  

    async function onBillItemsValidated(items:BillItem[]){
        props.onBillItemsValidated(items);
    }

    async function onUpdateBillItemStatus(items:BillItem[]){
        props.onUpdateBillItemStatus(items);
    }
    

    function renderItems(){
        if (loading || loadingBillables) {
            return (<Grid container >
                        <Grid item xs={12}>
                            <Loader />
                        </Grid>
                    </Grid>)
        }
        if(props.patient){
            let columns:Column[] = [{name:"concept", type:"autocomplete", validation:""}, {name:"type", type:"type", validation:""}, {name:"quantity", type:"number", validation:""}, {name:"unitCost", type:"amount", validation:""}, {name:"amount", type:"subtotal", validation:""}, {name:"updatedAt", type:"date", validation:""}];
            return(
                <>
                     <Snackbar
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                        open={showSnackbar.show}
                        autoHideDuration={2000}
                        onClose={() => setShowSnackbar({show:false})}>
                            <div>
                                {
                                    (showSnackbar.message && showSnackbar.severity) &&
                                    <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                                        <Translate id={showSnackbar.message} />
                                    </Alert>
                                }
                        </div>
                    </Snackbar>
                    <BillItems key="bill_items" columns={columns} 
                        uuidPatient={props.patient?.uuid} mode = {BillItemModes.SHOW}
                        initItems = {props.bill ? props.bill.billItems : currentItems.length > 0 ? currentItems : []}
                        repeatBillItems={true} showTotal={true} canUseAdditionalInfo={props.bill?.type === DocumentType.BUDGET}
                        surveyAdditionalInfo={props.surveyAdditionalInfo} 
                        currency={props.currency} print={props.print} withDiscount={props.withDiscount}
                        bill={props.bill}  
                        canUpdateBill={props.canUpdateBill} uuidInvestigation={props.uuidInvestigation}
                        onBillItemsValidated={onBillItemsValidated} onUpdateBillItemStatus={props.onUpdateBillItemStatus}
                        error={errorBill}
                        onCancelBill={props.onCancelBill}  />
                    </>
                ) 
        } 
    }          
    
    return (
        <Grid container >
            {
                renderItems()
            }
        </Grid>
    )
}