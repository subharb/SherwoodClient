import { Button, Checkbox, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";
import { ButtonAdd, IconGenerator } from "../../../components/general/mini_components";
import { TYPES_DISCOUNT, TYPE_BILL_ITEM } from "../../../constants/types";
import { calculateTotalBill } from "../../../utils/bill";
import { Bill, Billable, BillItem, BillItemKeys, BillItemModes, BillItemTable } from "./types";
import styled from "styled-components"
import { Autocomplete } from "@material-ui/lab"
import { EnhancedTable } from "../../../components/general/EnhancedTable";

const FactureHolder = styled.div<{ hide: boolean }>`
    margin-top:2rem;
    text-align:center;
    background-color:#e6e6e6;
    padding:0.5rem;
    color:#000;
    font-weight:bold;
    display:${props => props.hide ? 'none' : 'auto'};
`;

const GridBottom = styled(Grid) <{ hide: boolean }>`
    display:${props => props.hide ? 'none' : 'flex'};
    justify-content:end;
`;

interface Column{
    name:string,
    type:string,
    validation:string
}

interface BillItemsProps extends LocalizeContextProps{
    columns:Column[]
    currency : string,
    print:boolean,
    mode : BillItemModes,
    bill: Bill | null,
    billables: Billable[],
    updatingBill:boolean,
    uuidInvestigation:string,
    error:ReactElement | undefined,
    withDiscount:boolean,
    uuidPatient?:string,
    onBillItemsValidated : (items: BillItem[]) => void,
    onCancelBill: () => void
}

type BillableOption = Billable & {inputValue: string}

const TYPES_BILL_ITEM = Object.entries(TYPE_BILL_ITEM).filter(([key, value]) =>{
    return isNaN(Number(key))
})


const BillItemsCore:React.FC<BillItemsProps> = ({ columns, mode, error, activeLanguage,
                                                    updatingBill, currency, print, withDiscount,
                                                    bill, billables, onBillItemsValidated, 
                                                    onCancelBill }) => {
    //const [fieldErrors, setFieldErrors] = useState({ "concept": "", "type": "", "amount": "" });
    
    const initFieldErrors = columns.reduce((acc:{[id: string] : string}, column) => {
        acc[column.name] = "";
        return acc;
    }, {});
    const DEFAULT_CURRENT_ITEM = initFieldErrors;
    const [fieldErrors, setFieldErrors] = useState(initFieldErrors);
    const [addingItem, setAddingItem] = useState(false);
    const [items, setItems] = useState<BillItem[]>(bill && mode === BillItemModes.BILL ? bill.billItems : mode === BillItemModes.BILLABLE && billables ? billables : []);
    const [currentItem, setCurrentItem] = useState<BillItem>(DEFAULT_CURRENT_ITEM);    
    const [errorBill, setErrorBill] = useState<ReactElement | undefined>(error ? error : undefined);
    const [billableSelected, setBillableSelected] = useState(false);
    const [itemAdded, setItemAdded] = useState(false);
    
    const printRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        console.log("currentItem cambió", currentItem);
        if(itemAdded){
            addCurrentItem();
        }
        setItemAdded(false);
        
    }, [currentItem]);

    function updateStates(itemKey: BillItemKeys, error: string, value: string) {
        let tempFieldErrors = { ...fieldErrors };
        tempFieldErrors[itemKey] = error;
        let tempCurrentItem = { ...currentItem };

        const col = columns.find((col) => {
            return col.name === itemKey
        })
        if(col){
            tempCurrentItem[itemKey] = col.type === "number" ? Number(value) : value;
        }
        
        setFieldErrors(tempFieldErrors);
        setCurrentItem(tempCurrentItem);
    }
    function validateKeyItem(value: string, itemKey: BillItemKeys) {
        let error = "";
        const col = columns.find((col) => {
            return col.name === itemKey
        })
        if(col){
            switch (col.type) {
                case "autocomplete":
                    if (value.length < 3) {
                        error = "concept_short";
                    }
    
                    break;
                case "amount":
                case "number":
                    const amount = Number(value)
                    if (amount < 0) {
                        error = "amount_negative";
                    }
                    if (isNaN(amount)) {
                        error = "valid_number";
                    }
                    break;
                case BillItemKeys.type:
                //
            }
        }
        

        return error;
    }
    function changeType(event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>, itemKey: BillItemKeys) {
        const valueString = event.target.value as string;
        const error = validateKeyItem(valueString, itemKey);
        updateStates(itemKey, error, valueString);
    }
    function changeField(value:string, itemKey: BillItemKeys) {
        const error = validateKeyItem(value, itemKey);
        updateStates(itemKey, error, value);
    }
    function onBillableSelected(billable:string, billableId?:number, index?:number){
        console.log(billable);
        console.log(billableId); 
        if(!billableId){
            updateStates(BillItemKeys.concept, "", billable);
        }
        else{
            const billableSelected = billables?.find((billable) => billable.id === billableId);
            if(billableSelected && index !== undefined){
                // changeField(billableSelected.concept, BillItemKeys.concept);
                // changeField(billableSelected.amount.toString(), BillItemKeys.amount);
                // changeField(billableSelected.type.toString(), BillItemKeys.type);
                setCurrentItem({
                    concept :billableSelected.concept,
                    amount : billableSelected.amount,
                    type : billableSelected.type,
                    billableId : billableId
                });  
                setItemAdded(true);              
            }
        }
    }
    function helperText(itemType: BillItemKeys): null | ReactElement {
        return fieldErrors[itemType] ? <Translate id={`hospital.billing.item.error.${fieldErrors[itemType]}`} /> : null;
    }
    
    async function onClickContinue(items: BillItem[]) {
       
        if (calculateTotalBill(items) > 0) {
            onBillItemsValidated(items);
            
        }
        else {
            setErrorBill(<Translate id="hospital.bill.error.positive" />);
        }
        setAddingItem(false);
    }
    
    function usedItem(index: number) {
        console.log(index);
        const tempItems = [...items];
        tempItems[index].used = !tempItems[index].used;
        setItems(tempItems);
    }
    function paidItem(index: number) {
        console.log(index);
        const tempItems = [...items];
        tempItems[index].paid = !tempItems[index].paid;
        setItems(tempItems);
    }
   

    function renderTextOkButton() {
        if (updatingBill) {
            return <Translate id="hospital.billing.bill.update" />
        }
        else {
            return <Translate id="hospital.billing.bill.save" />
        }
    }

    function renderCheckOrDate(color: "default" | "primary" | "secondary" | undefined,
        value: boolean | string | undefined, index: number, fn: (index: number) => void) {
        if (typeof value == "boolean" || value === null) {
            return <Checkbox color={color} checked={value} disabled={print} onClick={() => fn(index)} />
        }
        else if (value) {
            const dateObject = new Date(value.replace(' ', 'T').replace(' ', 'Z'));
            if (dateObject) {
                return <React.Fragment>{dateObject.getDate() + " " + dateObject.toLocaleString(activeLanguage.code, { month: 'short', year: 'numeric' })}</React.Fragment>
            }
        }
    }
    function addCurrentItem() {
        let tempFieldErrors = { ...fieldErrors };
        //Fuerzo el valor 0 para diferenciarlo del valor por defecto.
        //currentItem["type"] = 0;
        columns.forEach((col) => {
            
            
            tempFieldErrors[col.name] = validateKeyItem(currentItem[col.name].toString(), col.name);
        })
        if (currentItem[BillItemKeys.type] === 2 && currentItem[BillItemKeys.amount] > 99) {
            tempFieldErrors[BillItemKeys.amount] = "amount_percent";
        }
        if (Object.values(tempFieldErrors).reduce((acc, val) => acc && (val === ""), true)) {
            let tempItems = [...items];
            tempItems.push({...currentItem});

            setItems(tempItems);
            setAddingItem(false);
            setCurrentItem(DEFAULT_CURRENT_ITEM);
        }
        setErrorBill(undefined);
        setFieldErrors(tempFieldErrors);
    }
    function removeItem(index: number) {
        console.log("Borrar " + index);
        const tempItems = [...items];
        tempItems.splice(index, 1);
        setItems(tempItems);
        setErrorBill(undefined);
    }
    
    let rows: BillItemTable[] = items.map((val, index) => {

        const color = TYPES_DISCOUNT.includes(val.type) ? red[900] : "black";
        const amountString =  TYPES_DISCOUNT.includes(val.type) ? "- " + val.amount + " " + (val.type === 2 ? "%" : currency) : val.amount + " " + currency;
        
        let rowElement:{[id: string] : JSX.Element} = {}
        columns.forEach((col:Column) => {
            if(col.type === "amount"){
                rowElement[col.name] = <Typography variant="body2" style={{ color: color }}>{amountString}</Typography>   
            }
            else{
                rowElement[col.name] = <Typography variant="body2" style={{ color: color }}>{val[col.name]}</Typography>
            }
                
            
        })
        return {...rowElement, id: index, used: !TYPES_DISCOUNT.includes(val.type) ? renderCheckOrDate("primary", items[index].used, index, usedItem) : <React.Fragment></React.Fragment>,
                paid: !TYPES_DISCOUNT.includes(val.type) ? renderCheckOrDate("secondary", items[index].paid, index, paidItem) : <React.Fragment></React.Fragment>,
                delete: <IconButton onClick={() => removeItem(index)}>
                    <IconGenerator type="delete" />
                </IconButton>}

    });

    if (addingItem) {
        let field: BillItemTable = {}
        columns.forEach((col:Column) => {
            let value;
            switch(col.type){
                case "autocomplete":
                    value = billables && billables.length > 0 ? 
                    <Autocomplete
                        freeSolo
                        options={[BillItemModes.BILL, BillItemModes.GENERAL].includes(mode)  &&  billables ? billables as BillableOption[] : []}
                        onInputChange={(event, value, reason) => {
                            onBillableSelected(value);
                        }}
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                onBillableSelected(newValue);
                            } else if (newValue && newValue.inputValue) {
                                // Create a new value from the user input
                                onBillableSelected(newValue.inputValue);
                            } else if(newValue){
                                onBillableSelected(newValue?.concept, newValue.id, rows.length - 1,);
                            }
                            }}
                        
                            getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option.concept;
                            }}
                        style={{ width: 300 }}
                        renderInput={(params:any) => 
                            <TextField {...params} label="Concept" error={fieldErrors.concept !== ""}
                                helperText={helperText(BillItemKeys.concept)}
                                onChange={(event) => changeField(event.target.value, BillItemKeys.concept)}
                                variant="outlined" />
                            }
                    /> : <TextField label="Concept" error={fieldErrors.concept !== ""}
                            helperText={helperText(BillItemKeys.concept)}
                            onChange={(event) => changeField(event.target.value, BillItemKeys.concept)}
                            variant="outlined" />
                break;
                case "type":
                    value = withDiscount ?  
                    <FormControl variant="outlined" fullWidth margin="dense" error={fieldErrors.type !== ""}>
                        <InputLabel id="show_treatment">Type</InputLabel>
                        <Select
                            labelId="show_treatment"
                            id="show_treatment"
                            label="type"
                            value={currentItem[BillItemKeys.type]}
                            onChange={(event:React.ChangeEvent<{
                                name?: string | undefined;
                                value: unknown;
                            }>) => changeType(event, BillItemKeys.type)}
                            >
                                {
                                    TYPES_BILL_ITEM.map(([key, value]) =>{
                                        return <MenuItem value={value}><Translate id={`hospital.billing.item.types.${key.toLowerCase()}`} /></MenuItem>
                                    }) 
                                }
                            
                        </Select>
                    </FormControl> : undefined
                break;
                case "amount":
                    value = <TextField label="Amount" variant="outlined" 
                        helperText={helperText(BillItemKeys.amount)} 
                        error={fieldErrors.amount !== ""} type="text" 
                        onChange={(event) => changeField(event.target.value, BillItemKeys.amount)} />   
                    break;
                case "number":
                    value = <TextField label={<Translate id={`hospital.billing.item.${col.name}`} />} variant="outlined" 
                        helperText={helperText(BillItemKeys.amount)} 
                        error={fieldErrors[col.name] !== ""} type="text" 
                        onChange={(event) => changeField(event.target.value, col.name)} />   
                    break;
           }
           field[col.name] = value;
        });

        field = {...field, id: rows.length - 1, delete: <IconButton onClick={() => addCurrentItem()}>
                         <IconGenerator type="add" />
                     </IconButton>}
        
        rows.push(field)
    }
    else if (!updatingBill) {
        let field: BillItemTable = {}
        columns.forEach((col:Column) => {
            let value = <React.Fragment></React.Fragment>
        //     switch(col.type){
        //         case "autocomplete":
        //         case "amount":
        //             value = <React.Fragment></React.Fragment>
        //         break;                
        //    }
           field[col.name] = value;
        });
        field = {...field, delete: <React.Fragment><Translate id="hospital.billing.item.add_item" /> <ButtonAdd disabled={addingItem}
                        type="button" data-testid="add_bill"
                        onClick={() => {
                            setErrorBill(undefined);
                            setAddingItem(true)
                        }} /></React.Fragment>}

        rows.push(field);
    }
    if (items.length > 0 && mode === BillItemModes.BILL) {
        let totalBill = calculateTotalBill(items);
        rows.push({
            id: items.length, concept: <React.Fragment><Typography style={{ fontWeight: 'bold' }} ><Translate id={`hospital.billing.bill.total`} /></Typography></React.Fragment>,
            type : <Typography style={{fontWeight:'bold'}} ><Translate id={`hospital.billing.bill.total`} /></Typography> , 
            amount: <Typography style={{ fontWeight: 'bold' }} >{totalBill + " " + currency}</Typography>,
            delete: <React.Fragment></React.Fragment>,
        });
    }
    // let  headCells = [{ id: "concept", alignment: "left", label: <Translate id={`hospital.billing.item.concept`} /> },
    // { id: "amount", alignment: "left", label: <Translate id={`hospital.billing.item.amount`} /> }
    // ]
    let  headCells = columns.map((col) => {
        return { id: col.name, alignment: "left", label: <Translate id={`hospital.billing.item.${col.name}`} />}
    })

    if(withDiscount){
        headCells.splice(1, 0, { id: "type", alignment: "left", label: <Translate id={`hospital.billing.item.type`} /> });
    }

    if (!updatingBill) {
        headCells.push({ id: "delete", alignment: "right", label: <React.Fragment></React.Fragment> });
    }
    else {
        headCells.push({ id: "paid", alignment: "right", label: <React.Fragment>Paid</React.Fragment> });
        headCells.push({ id: "used", alignment: "right", label: <React.Fragment>Used</React.Fragment> });
    }
   
    return (
        <div ref={printRef} >
            <Grid container>
                <Grid item xs={12}>
                    <FactureHolder hide={!bill}>
                        <Translate id="hospital.billing.bill.name" />
                    </FactureHolder>
                    <EnhancedTable noFooter noHeader noSelectable headCells={headCells} rows={rows}
                    />
                </Grid>
                <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }} >
                    {
                        !errorBill &&
                        <Grid item xs={12} style={{ textAlign: "right", paddingTop: "10px" }}>
                            <Typography variant="body2" style={{ color: "red" }} >{errorBill}</Typography>
                        </Grid>

                    }
                    <GridBottom hide={print} item xs={12} >
                        <Button onClick={onCancelBill} data-testid="cancel-modal" color="primary">
                            <Translate id="general.cancel" />
                        </Button>
                        <Button disabled={items.length === 0} onClick={() => onClickContinue(items)} data-testid="continue-modal" color="primary">
                            {renderTextOkButton()}
                        </Button>
                    </GridBottom>

                </Grid>
            </Grid>
        </div>
    )
}

export const BillItems = withLocalize(BillItemsCore)