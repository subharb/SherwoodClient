import { Button, Grid, Snackbar, TextField, Typography } from "@mui/material"
import React, { ReactElement, useEffect, useState } from "react"
import { Language, Translate } from "react-localize-redux"
import styled from "styled-components"
import Loader from "../../../components/Loader"
import { IPatient } from "../../../constants/types"
import { Bill, Billable, BillableCombo, BillItem, BillItemModes } from "./types";
import { createBillService, updateBillService } from "../../../services/billing";
import { Autocomplete } from "@mui/lab"
import { FindPatient } from "./find_patient";

import { dateToFullDateString, fullDateFromPostgresString } from "../../../utils/index.jsx"
import { Alert } from "@mui/lab"
import { BillItems } from "./BillItems"
import { useSnackBarState } from "../../../hooks"
import { useDispatch } from "react-redux"
import { getBillablesAction } from "../../../redux/actions/investigationsActions"

interface Props {
    updatingBill: boolean,
    patients: IPatient[],
    personalFields: [],
    currency: string,
    uuidInvestigation: string,
    idBillingInfo:number,
    bill: Bill | null,
    locale: Language,
    billables?:Billable[],
    print: boolean,
    billableCombos:BillableCombo[],
    withDiscount: boolean,
    onBillSuccesfullyCreated: (bill: Bill) => void,
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
    const [patient, setPatient] = useState<null | IPatient>(props.bill ? props.bill.patientInvestigation : null);
    const [loading, setLoading] = useState(false);
    const [comboSelected, setComboSelected] = useState<BillableCombo | null>(null);
    const [errorBill, setErrorBill] = useState<ReactElement | undefined>(undefined);
    const [currentItems, setCurrentItems] = useState<BillItem[]>([]);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const dispatch = useDispatch();

    useEffect(() => {

    async function getBillables() {
        console.log(patient);
        const insuranceId = patient?.personalData.insurance ? patient.personalData.insurance : null;
        await dispatch(getBillablesAction(props.uuidInvestigation, props.idBillingInfo, insuranceId));
    }
    if (patient) {
        getBillables();
    }
    
    }, [patient]);

    function addBillablesCombo(){
        console.log("addBillablesCombo", comboSelected?.billables);
    }

    function onPatientSelected(idPatient: number) {
        const findPatient = props.patients.find((patient) => patient.id === idPatient);
        if (findPatient) {
            setPatient(findPatient);
        }
        console.log(findPatient);
    }

    function selectCombo(comboSelected:BillableCombo | null){
        if(comboSelected === null){
            return;
        }
        const comboFound = props.billableCombos.find((combo) => combo.id === comboSelected.id);
        if(comboFound){
            console.log("comboFound", comboFound.billables);
            setComboSelected(comboSelected);
        }
    }

    function renderRightSide(){
        if(props.bill){
            return (
                <Grid item xs={6} style={{ textAlign: 'right' }} >
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.num_bill" /></span>: {props.bill.id}</Typography>
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.date" /></span>: {fullDateFromPostgresString(props.locale.code, props.bill.createdAt)}</Typography>
                </Grid>
            )
        }
        else if(props.billableCombos.length > 0){
            return(
                <Grid item xs={6} style={{ paddingTop: '1rem' }} >
                    <Autocomplete
                        options={props.billableCombos}
                        onInputChange={(event, value, reason) => {
                            console.log("onInputChange",value);
                        }}
                        onChange={(event, newValue) => {
                            console.log("onchange", newValue);
                            selectCombo(newValue);
                            }
                        }
                        getOptionLabel={(option) => {
                            return option.name;
                        }}
                        style={{ width: 300 }}
                        renderInput={(params:any) => 
                            <TextField {...params} label="Concept" error={false}
                                helperText={null} color="secondary"
                                //onChange={(event) => changeField(event.target.value, BillItemKeys.concept)}
                                variant="outlined" />
                            }
                    />
                    {
                        comboSelected &&
                        <Button variant="contained" color="primary" onClick={() => addBillablesCombo()}>Add Billables</Button>
                    }
                    
                </Grid>
            )
        }
    }
    function renderPatient() {
        if (!patient) {
            return <FindPatient patients={props.patients}
                        personalFields={props.personalFields}
                        codeLanguage={props.locale.code}
                        onPatientSelected={(idPatient) => onPatientSelected(idPatient)} />
        }
        else {
            return (
                <Grid container>
                    <Grid item xs={6}  >
                        <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.patient" /></span>: {patient.personalData.name} {patient.personalData.surnames}</Typography>
                        <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.birthdate" /></span>: {dateToFullDateString(patient.personalData.birthdate, props.locale.code)}</Typography>
                        <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="investigation.create.personal_data.fields.sex" /></span>: {patient.personalData.sex}</Typography>
                    </Grid>
                    {
                        renderRightSide()
                    }
                </Grid>

            )
        }
    }

    async function onBillItemsValidated(items:BillItem[]){
        
        try{
            setLoading(true);
            let response: { status: number, bill?: Bill };
            if (props.updatingBill && props.bill) {
                response = await updateBillService(props.uuidInvestigation, props.bill.id, items);
            }
            else {
                response = await createBillService(props.uuidInvestigation, patient!.uuid, items);
            }

            if (response.status === 200 && response.bill) {
                props.onBillSuccesfullyCreated(response.bill);
            }
            else {
                setCurrentItems(items);
                setErrorBill(<Translate id="hospital.bill.error.create" />);
            }
            setLoading(false);        
        }
        catch(error:any){
            if(error.status === 401){
                setCurrentItems(items);
                setShowSnackbar({show:true, message: "hospital.billing.bill.error.permission", severity: 'error'});
            }
            
            setLoading(false);
        }
        
    }

    function renderItems(){
        if (loading) {
            return <Loader />
        }
        if(patient){
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
                    <BillItems key="bill_items" columns={[{name:"concept", type:"autocomplete", validation:""}, {name:"type", type:"type", validation:""}, {name:"amount", type:"amount", validation:""}]} 
                        uuidPatient={patient?.uuid} mode = {BillItemModes.SHOW}
                        initItems = {props.bill ? props.bill.billItems : currentItems.length > 0 ? currentItems : []}
                        repeatBillItems={true} showTotal={true}
                        //billablesViaCombo={billablesViaCombo}
                        currency={props.currency} print={props.print} withDiscount={props.withDiscount}
                        bill={props.bill} billables={props.billables ? props.billables : []}
                        updatingBill={props.updatingBill} uuidInvestigation={props.uuidInvestigation}
                        onBillItemsValidated={onBillItemsValidated} error={errorBill}
                        onCancelBill={props.onCancelBill} />
                </>
                
            ) 
        } 
    }          
    
    return (
        <Grid container xs={12} >
            {
                renderPatient()
            }
            {
                renderItems()
            }
        </Grid>
    )
}