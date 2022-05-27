import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core"
import { red } from "@material-ui/core/colors"
import React, { ReactElement, useState } from "react"
import { Translate } from "react-localize-redux"
import styled from "styled-components"
import { EnhancedTable } from "../../../components/general/EnhancedTable"
import { ButtonAdd, IconGenerator } from "../../../components/general/mini_components"
import { BillItem, BillItemKeys, BillItemTable, IPatient, TYPE_BILL_ITEM } from "../../../constants/types"
import { createBillService } from "../../../services/billing"
import { calculateTotalBill } from "../../../utils/bill"
import { FindPatient } from "./find_patient"

interface Props{
    patients:IPatient[],
    personalFields:[],
    currency: string,
    uuidInvestigation:string,
    onBillSuccesfullyCreated:() => void,
    onCancelBill:() => void,
    
}

const GridContainer = styled(Grid)`
    flex-direction: column;
    @media (min-width: 768px) {
        min-height:500px;
        min-width:400px;   
    }
`


const DEFAULT_CURRENT_ITEM = {concept:"", type :0, amount:0}

export const BillForm:React.FC<Props> = (props) => {
    const [patient, setPatient] = useState<null | IPatient>(null);
    const [items, setItems] = useState<BillItem[]>([]);
    const [addingItem, setAddingItem] = useState(false);
    const [currentItem, setCurrentItem] = useState<BillItem>(DEFAULT_CURRENT_ITEM);
    const [fieldErrors, setFieldErrors] = useState({"concept" : "", "type" :"", "amount" :""});
    const [errorBill, setErrorBill] = useState<ReactElement>();
    const [loading, setLoading] = useState(false);

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
                    <Typography variant="body2">Patient: {patient.personalData.name} {patient.personalData.surnames}</Typography> 
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
        setErrorBill(undefined);
    }
    async function onClickContinue(items:BillItem[]){
        if(calculateTotalBill(items) > 0 && patient){
            setLoading(true);
            const response = await createBillService(props.uuidInvestigation, patient?.uuid, items);
            if(response.status === 200){
                props.onBillSuccesfullyCreated();  
            }
            else{
                setErrorBill(<Translate id="hospital.bill.error.create" />);
            }
            setLoading(false);
            setAddingItem(false);
            //props.onBillCreated(items);
        }
        else{
            setErrorBill(<Translate id="hospital.bill.error.positive" />);
        }
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
        setErrorBill(undefined);
        setFieldErrors(tempFieldErrors);
    }
   
    function renderItems(){
        if(patient){
            let rows:BillItemTable[] = items.map((val, index) => {
                
                const color = val.type !== 0 ? red[900] : "black";
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
                console.log(Object.keys(TYPE_BILL_ITEM));
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
                                                Object.entries(TYPE_BILL_ITEM).filter(([key, value]) =>{
                                                    return isNaN(Number(key))
                                                }).map(([key, value]) =>{
                                                    return <MenuItem value={value}><Translate id={`hospital.billing.item.types.${key.toLowerCase()}`} /></MenuItem>
                                                }) 
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
            else{
                let field: BillItemTable = {
                    id:rows.length -1,
                    concept : <React.Fragment></React.Fragment>, 
                    type :   <React.Fragment></React.Fragment>,
                    amount : <React.Fragment></React.Fragment>,
                    action : <React.Fragment><Translate id="hospital.billing.item.add_item" /> <ButtonAdd disabled={addingItem} 
                                type="button" data-testid="add_bill" 
                                onClick={() => {
                                    setErrorBill(undefined);
                                    setAddingItem(true)
                                }} /></React.Fragment>
                                
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
                    <Grid container>
                        <Grid item xs={12}>
                            <EnhancedTable noFooter noSelectable headCells={headCells} rows={rows} 
                                />
                        </Grid>
                        <Grid item xs={12} style={{display: "flex",flexDirection:"column"}} >
                            {
                                !errorBill &&
                                <Grid item xs={12} style={{textAlign:"right", paddingTop:"10px"}}>
                                    <Typography variant="body2" style={{color:"red"}} >{errorBill}</Typography>
                                </Grid>
                                
                            }
                             <Grid item xs={12} style={{display: "flex",justifyContent: "end"}} >
                                <Button onClick={props.onCancelBill} data-testid="cancel-modal" color="primary">
                                    <Translate id="general.cancel" />
                                </Button>
                                <Button disabled={loading || items.length === 0} onClick={() => onClickContinue(items)} data-testid="continue-modal" color="primary">
                                    <Translate id="general.continue" />
                                </Button>
                             </Grid>
                            
                        </Grid>
                    </Grid>
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