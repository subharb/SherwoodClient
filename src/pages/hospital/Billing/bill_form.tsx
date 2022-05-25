import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core"
import { number } from "prop-types"
import React, { ReactElement, useState } from "react"
import { Translate } from "react-localize-redux"
import styled from "styled-components"
import { EnhancedTable } from "../../../components/general/EnhancedTable"
import FieldSherwood from "../../../components/general/FieldSherwood"

import { ButtonAdd, IconGenerator } from "../../../components/general/mini_components"
import { BillItem, BillItemKeys, BillItemTable, IPatient, TYPE_BILL_ITEM } from "../../../constants/types"
import { FindPatient } from "./find_patient"

interface Props{
    patients:IPatient[],
    personalFields:[],
    currency: string,
    onBillCreated:(items:BillItem[]) => void,
    onCancelBill:() => void,
    
}

const GridContainer = styled(Grid)`
    flex-direction: column;
    @media (min-width: 768px) {
        min-height:500px;
        min-width:200px;   
    }
`


const DEFAULT_CURRENT_ITEM = {concept:"", type :0, amount:0}

export const BillForm:React.FC<Props> = (props) => {
    const [patient, setPatient] = useState<null | IPatient>(null);
    const [items, setItems] = useState<BillItem[]>([]);
    const [addingItem, setAddingItem] = useState(false);
    const [currentItem, setCurrentItem] = useState<BillItem>(DEFAULT_CURRENT_ITEM);
    const [fieldErrors, setFieldErrors] = useState({"concept" : "", "type" :"", "amount" :""})

    function onPatientSelected(idPatient:number){
        const findPatient = props.patients.find((patient) => patient.id === idPatient);
        if(findPatient){
            setPatient(findPatient);
        }
        console.log(findPatient);
    }
    function renderPatient(){
        if(!patient){
            return <FindPatient patients={props.patients} 
                personalFields={props.personalFields}
                onPatientSelected={(idPatient) => onPatientSelected(idPatient)} />
        }
        else{
            return(
                <Grid item xs={12}>
                    <Typography  variant="body2">Patient: {patient.personalData.name} {patient.personalData.surnames}</Typography> 
                </Grid>
            )
        }
    }
    function validateKeyItem(value:string, itemKey:BillItemKeys){
        let error = "";
        switch(itemKey){
            case BillItemKeys.concept : 
                if(value.length < 3){
                    error = "concept_short";
                }       
                
            break;
            case BillItemKeys.amount:
                const amount = Number(value)
                if(amount <= 0 || isNaN(amount)){
                    error = "amount_negative";
                }                
            break;
            case BillItemKeys.type:
                //
        }
        
        return error;
    }

    function updateStates(itemKey:BillItemKeys, error:string, value:string){
        let tempFieldErrors = {...fieldErrors};
        tempFieldErrors[itemKey] = error;
        let tempCurrentItem = {...currentItem};
        switch(itemKey){
            case BillItemKeys.concept:
                tempCurrentItem[itemKey] = value;
                break;
            case BillItemKeys.amount:
            case BillItemKeys.type:
                tempCurrentItem[itemKey] = Number(value);
        }
        setFieldErrors(tempFieldErrors);
        setCurrentItem(tempCurrentItem);
    }
    function changeSelect(event:React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>, itemKey:BillItemKeys){
        const valueString = event.target.value as string;
        const error = validateKeyItem(valueString, itemKey);
        updateStates(itemKey, error, valueString);
    }
    function changeField(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, itemKey:BillItemKeys){
        const error = validateKeyItem(event.target.value, itemKey);
        updateStates(itemKey, error, event.target.value);
    }
    function helperText(itemType:BillItemKeys):null | ReactElement{
        return fieldErrors[itemType] ? <Translate id={`hospital.billing.item.error.${fieldErrors[itemType]}`} /> : null;
    }
    function removeItem(index:number){
        console.log("Borrar "+index);
        const tempItems = [...items];
        tempItems.splice(index, 1);
        setItems(tempItems);
    }
    function addITem(index:number){
        console.log(index);
        let tempFieldErrors = {...fieldErrors};
        Object.keys(BillItemKeys).forEach((iKey) => {
            console.log(iKey as BillItemKeys);
            const iTemKey = iKey as BillItemKeys;
            tempFieldErrors[iTemKey] = validateKeyItem(currentItem[iTemKey].toString(), iTemKey);
        })
        if(currentItem[BillItemKeys.type] === 2 && currentItem[BillItemKeys.amount] > 99){
            tempFieldErrors[BillItemKeys.amount] = "amount_percent";
        }
        if(Object.values(tempFieldErrors).reduce((acc,val) => acc && (val === ""), true )){
            let tempItems = [...items];
            tempItems.push({concept:currentItem[BillItemKeys.concept],
                            amount:currentItem[BillItemKeys.amount],
                            type : currentItem[BillItemKeys.type] });

            setItems(tempItems);
            setAddingItem(false);
            setCurrentItem(DEFAULT_CURRENT_ITEM);
        }
        setFieldErrors(tempFieldErrors);
    }
    function calculateTotalBill(items:BillItem[]){
        let amountSeparation = [0,0,0];
        for(let i = 0; i < items.length; i++){
            const currentBillItem = items[i];
            amountSeparation[currentBillItem.type] += currentBillItem.amount; 
        }
        const firstAmount = amountSeparation[0] - amountSeparation[1];
        const discountAmount = (firstAmount*amountSeparation[2])/100;
        const total = firstAmount - discountAmount;
        //Redondeo a dos decimales
        return  Math.round(total * 100) / 100
    }
    function renderItems(){
        if(patient){
            let rows:BillItemTable[] = items.map((val, index) => {
                
                const color = val.type !== 0 ? "red" : "black";
                const amountString = val.type !== 0 ? "- "+val.amount+" "+(val.type === 2 ? "%" : props.currency) : val.amount+" €";
                return {id : index, 
                        concept :<Typography variant="body2" style={{color:color}}>{val.concept}</Typography>, 
                        type : <Typography variant="body2" style={{color:color}}><Translate id={`hospital.billing.item.types.${TYPE_BILL_ITEM[val.type].toLowerCase()}`} /></Typography>, 
                        amount:<Typography variant="body2" style={{color:color}}>{amountString}</Typography>,
                        action : <IconButton onClick={() => removeItem(index)}>
                                    <IconGenerator type="delete"/>
                                </IconButton>
                    }});
            let totalBill = calculateTotalBill(items);
            if(addingItem){
                let field: BillItemTable = {
                        id:rows.length -1,
                        concept : <TextField label="Concept" type="text"  error={fieldErrors.concept !== ""} 
                                        helperText={helperText(BillItemKeys.concept)} 
                                        onChange={(event) => changeField(event, BillItemKeys.concept)}
                                        variant="outlined"/>, 
                        type :   <FormControl variant="outlined" fullWidth margin="dense" error={fieldErrors.type !== ""}>
                                    <InputLabel id="show_treatment">Type</InputLabel>
                                    <Select
                                        labelId="show_treatment"
                                        id="show_treatment"
                                        label="type"
                                        value={currentItem[BillItemKeys.type]}
                                        onChange={(event:React.ChangeEvent<{
                                            name?: string | undefined;
                                            value: unknown;
                                        }>) => changeSelect(event, BillItemKeys.type)}
                                        >
                                            {
                                                Object.entries(TYPE_BILL_ITEM).map(([key, value]) => <MenuItem value={value}><Translate id={`hospital.billing.item.types.${key.toLowerCase()}`} /></MenuItem>)
                                            }
                                        
                                    </Select>
                                </FormControl>,
                        amount : <TextField label="Amount" variant="outlined" helperText={helperText(BillItemKeys.amount)} error={fieldErrors.amount !== ""}  type="text" onChange={(event) => changeField(event, BillItemKeys.amount)}/>,
                        action : <IconButton onClick={() => addITem(rows.length -1)}>
                                    <IconGenerator type="add"/>
                                </IconButton>
                    }
                rows.push(field)
            }
            if(items.length > 0){
                rows.push({id : items.length, concept : <React.Fragment></React.Fragment>, 
                    type : <Typography style={{fontWeight:'bold'}} ><Translate id={`hospital.billing.bill.total`} /></Typography> , 
                    amount:<Typography style={{fontWeight:'bold'}} >{totalBill +" "+props.currency}</Typography>,
                    action : <React.Fragment></React.Fragment>,
                });
            }
            const headCells = [{ id: "concept", alignment: "left", label: <Translate id={`hospital.billing.item.concept`} /> },
                    { id: "type", alignment: "left", label: <Translate id={`hospital.billing.item.type`} /> },
                    { id: "amount", alignment: "left", label: <Translate id={`hospital.billing.item.amount`} /> },
                    { id: "action", alignment: "right", label: "" }
                ]
              
            return(
                <React.Fragment>
                    <Grid item xs={12}>
                        <Typography  variant="body2">Add Item <ButtonAdd disabled={addingItem} 
                            type="button" data-testid="add_bill" 
                            onClick={() => {
                                setAddingItem(true)
                            }} />
                        </Typography> 
                    </Grid>
                    {
                        rows.length > 0 && 
                        <Grid container>
                            <Grid item xs={12}>
                                <EnhancedTable noFooter noSelectable headCells={headCells} rows={rows} 
                                    />
                            </Grid>
                            <Grid item xs={12} style={{display: "flex",justifyContent: "end"}} >
                                <Button onClick={props.onCancelBill} data-testid="cancel-modal" color="primary">
                                    <Translate id="general.cancel" />
                                </Button>
                                <Button onClick={() => props.onBillCreated(items)} data-testid="continue-modal" color="primary">
                                    <Translate id="general.continue" />
                                </Button>
                            </Grid>
                        </Grid>
                    }
                </React.Fragment>
            )
        }
    }
    return(
        <GridContainer container xs={12} >
            {
                renderPatient()
            }
            {
                renderItems()
            }
        </GridContainer>
    )
}