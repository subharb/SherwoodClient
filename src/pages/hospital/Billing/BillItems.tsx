import { Button, Checkbox, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { LocalizeContextProps, Translate, withLocalize } from "react-localize-redux";
import { ButtonAdd, ButtonCancel, ButtonContinue, ButtonContinueStyles, ButtonOk, IconGenerator } from "../../../components/general/mini_components";
import { TYPES_DISCOUNT, TYPE_BILL_ITEM } from "../../../constants/types";
import { calculateTotalBill, getDateFromStringOrDate } from "../../../utils/bill";
import { Bill, Billable, BillItem, BillItemKeys, BillItemModes, BillItemTable, DocumentStatus, DocumentType } from "./types";
import styled from "styled-components"
import { Autocomplete } from "@mui/lab"
import { EnhancedTable } from "../../../components/general/EnhancedTable";
import _, { set } from "lodash";
import { dateToFullDateString, hasDefaultValues, stringDatePostgresToDate } from "../../../utils/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { pushBillingItems, saveBillingItems } from "../../../redux/actions/billingActions";
import Modal from "../../../components/general/modal";
import FillSurvey from "../FillSurvey";
import ShowSingleSubmissionPatient from "../ShowSingleSubmissionPatient";
import QuantitySelector from "./QuantitySelector";
import { removeSubmissionPatient } from "../../../redux/actions/submissionsPatientActions";

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

export interface Column{
    name:keyof BillItem,
    type:string,
    validation:string,
    markAllCallback?:() => Promise<void>
}

export interface BillItemsProps extends LocalizeContextProps{
    columns:Column[]
    currency : string,
    print:boolean,
    mode : BillItemModes,
    bill: Bill | null,
    initItems:BillItem[],
    showTotal:boolean,
    repeatBillItems:boolean,
    canUpdateBill:boolean,
    uuidInvestigation?:string,
    error:ReactElement | undefined,
    withDiscount:boolean,
    uuidPatient?:string,
    surveyAdditionalInfo:any,
    canUseAdditionalInfo:boolean,
    onBillItemsValidated : (items: BillItem[]) => void,
    onUpdateBillItemStatus:(items: BillItem[]) => void,
    onCancelBill: () => void
}

type BillableOption = Billable & {inputValue: string}

const TYPES_BILL_ITEM = Object.entries(TYPE_BILL_ITEM).filter(([key, value]) =>{
    return isNaN(Number(key))
})
// Si tiene una columna de tipo "amount" entonces se calcula el total y se valida la suma de todos los amounts sea mayor que 0

const BillItemsCore:React.FC<BillItemsProps> = ({ columns, canUseAdditionalInfo, error, activeLanguage,
                                                    canUpdateBill, currency, print, withDiscount,
                                                    surveyAdditionalInfo, uuidInvestigation,
                                                    uuidPatient, initItems,
                                                    bill, translate, showTotal, repeatBillItems, onUpdateBillItemStatus, onBillItemsValidated, 
                                                    onCancelBill }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showAdditionalInfoID, setShowAdditionalInfoID] = useState(-1);
    const filteredColumns:Column[] = columns.filter((column:Column) => column.type !== "type" || withDiscount)
    const initFieldErrors:any = filteredColumns.reduce((acc:{[id: string] : string}, column) => {
        acc[column.name] = "";
        return acc;
    }, {});
    const [updatedBillItemAmount, setUpdatedBillItemAmount] = useState(0);
    const DEFAULT_CURRENT_ITEM = initFieldErrors;
    const [fieldErrors, setFieldErrors] = useState(initFieldErrors);
    const [addingItem, setAddingItem] = useState(false);
    
    const items:BillItem[]  = useSelector((state:any) => {
        return state.billing.data.billItems ? state.billing.data.billItems.sort((bItemA:BillItem, bItemB:BillItem) => {
            if(bItemA.updatedAt && bItemB.updatedAt){
                const dateA = getDateFromStringOrDate(bItemA.updatedAt);
                const dateB = getDateFromStringOrDate(bItemB.updatedAt);
                return dateA.getTime() - dateB.getTime()
            }
            return 0;
        }) : []});
    const amountToDistribute = useMemo(() => {
        const billItemHidden = items.find((item) => parseInt(item.type) === TYPE_BILL_ITEM.HIDDEN_VALUE);
        if(billItemHidden){
            return (parseInt(billItemHidden.amount as string) * billItemHidden.quantity);
        }
        return 0;
    }, [items]);   
    
    const totalAmountBill = useMemo(() => {
        const removeTypes = print ? [TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO, TYPE_BILL_ITEM.HIDDEN_VALUE] : [TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO];
        return calculateTotalBill(items, removeTypes);
    }, [items, updatedBillItemAmount]);  

    const billables:Billable[] = useSelector((state:any) => state.billing.data.billablesCurrentBill ? state.billing.data.billablesCurrentBill : []);
    //const [items, setItems] = useState<BillItem[]>(initItems);
    const [currentItem, setCurrentItem] = useState<BillItem>(DEFAULT_CURRENT_ITEM as BillItem);    
    const [errorBill, setErrorBill] = useState<ReactElement | undefined>(error ? error : undefined);
    const [editSubmission, setEditSubmission] = useState<any | undefined>(undefined);

    const [itemAdded, setItemAdded] = useState(false);
    
    const printRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        console.log("currentItem cambió", currentItem);
        if(itemAdded){
            addCurrentItem();
        }
        setItemAdded(false);
        
    }, [currentItem]);

    //Si hay initItems, los cargo en redux
    useEffect(() => {
        if(initItems.length > 0){
            dispatch(saveBillingItems(initItems));
        }
    }, [initItems]);

    useEffect(() => {
        if(amountToDistribute !== 0 && print){
            const totalNoHidden = calculateTotalBill(items, [TYPE_BILL_ITEM.HIDDEN_VALUE], true);
            items.forEach((item) => {
                if([TYPE_BILL_ITEM.CHARGE, TYPE_BILL_ITEM.SERVICE].includes(item.type)){
                    const subtotal = item.amount * item.quantity;
                    const amountToAdd = (subtotal * amountToDistribute) / totalNoHidden;
                    item.amountAlter = item.amount + (amountToAdd/item.quantity);
                }
            });
            setUpdatedBillItemAmount(updatedBillItemAmount + 1);
        }
    }, [items, amountToDistribute]);

    function updateStates(itemKey: BillItemKeys, error: string, value: string) {
        let tempFieldErrors = { ...fieldErrors };
        tempFieldErrors[itemKey] = error;
        let tempCurrentItem:BillItem = { ...currentItem };

        const col = filteredColumns.find((col) => {
            return col.name === itemKey
        })
        if(col){
            const key = itemKey.toString() as keyof BillItem;
            const valueState = col.type === "number" ? Number(value) : value;
            if(tempCurrentItem.hasOwnProperty(key)){
                // @ts-ignore: Unreachable code error
                tempCurrentItem[key] = valueState as string;
            }
        }
        
        setFieldErrors(tempFieldErrors);
        setCurrentItem(tempCurrentItem);
    }

    async function toggleAllItemsAs(category:"paid" | "used"){
        const tempItems = [...items];
        tempItems.forEach((item) => {
            const itemValue = item[category];
            if (typeof itemValue == "boolean" || itemValue === null) {
                item[category] = Boolean(!item[category]);
            }            
        });
        await dispatch(saveBillingItems(tempItems));
    }

    function getAmount(val){
        return val.amountAlter ? val.amountAlter : val.amount;
    }
    function updateQuantityBillItem(index:number, quantity:number){
        const tempItems = [...items];
        const error = validateKeyItem(quantity.toString(), "quantity");
        if(error === ""){
            tempItems[index].quantity = quantity;
            dispatch(saveBillingItems(tempItems));
        }
    }

    function validateKeyItem(value: string, itemKey: string) {
        let error = "";
        const col = filteredColumns.find((col) => {
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
                    if(col.validation === "pharmacyItem"){
                        const pharmacyItem = billables.find((item) => item.id === currentItem.id);
                        if(pharmacyItem && amount > (pharmacyItem?.quantity as number)){
                            error = "amount_exceeded";
                        }
                        else if(amount === 0){
                            error = "amount_zero";
                        }   
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
        value: string;
    }>, itemKey: BillItemKeys) {
        const valueString = event.target.value.toString() as string;
        const error = validateKeyItem(valueString, itemKey);
        updateStates(itemKey, error, valueString);
        if(valueString === TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO.toString()){
            console.log("show nomdal");
            setShowModal(true);
        }
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

                const updatedItem:BillItem = {...currentItem, ...billableSelected, quantity : 1, updatedAt: new Date()};
                delete updatedItem.id;
                setCurrentItem(updatedItem);
                
                if(!hasDefaultValues(updatedItem, DEFAULT_CURRENT_ITEM)){
                    setItemAdded(true);              
                }
                
            }
        }
    }
    function helperText(itemType: BillItemKeys): null | ReactElement {
        return fieldErrors[itemType] ? <Translate id={`hospital.billing.item.error.${fieldErrors[itemType]}`} /> : null;
    }
    
    async function onClickContinue(items: BillItem[]) {
        
        if(filteredColumns.find((col) => col.type === BillItemKeys.amount)){
            if (totalAmountBill === 0) {
                setErrorBill(<Translate id="hospital.billing.billing_info.error.positive" />);
                return;    
            }
        }
        if(bill && bill.status === DocumentStatus.CLOSED){
            onUpdateBillItemStatus(items);
        }
        else{
            onBillItemsValidated(items);
        }
        setAddingItem(false);
    }
    
    async function usedItem(index: number) {
        console.log(index);
        const tempItems = [...items] as BillItem[];
        
        tempItems[index].used = !tempItems[index].used;
        await dispatch(saveBillingItems(tempItems));
        
    }
    async function paidItem(index: number) {
        console.log(index);
        const tempItems = [...items] as BillItem[];
        tempItems[index].paid = !tempItems[index].paid;
        await dispatch(saveBillingItems(tempItems));
    }
   
    function renderTextOkButton() {
        if (!canUpdateBill) {
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
                return <>
                    {
                        dateObject.getDate() + " " + dateObject.toLocaleString(activeLanguage.code, { month: 'short', year: 'numeric' })
                    }
                </>
            }
        }
    }

    function renderContentModal(){
        if(showAdditionalInfoID !== -1 && !editSubmission){
            return <ShowSingleSubmissionPatient currentSurvey={surveyAdditionalInfo} forceEdit={false}
                        idSubmission={showAdditionalInfoID} 
                        callBackEditSubmission={(idSubmission:number, uuidSection:string, submission:any) => {
                            setEditSubmission(submission)} } />
        }
        else if(surveyAdditionalInfo && uuidInvestigation){
            return <FillSurvey initData={editSubmission} idSubmission={editSubmission ? editSubmission.id : undefined} uuid={surveyAdditionalInfo.uuid} sections={surveyAdditionalInfo.sections} 
                        country={surveyAdditionalInfo.country} uuidInvestigation={uuidInvestigation}
                        uuidPatient={uuidPatient!} 
                        callBackDataCollectionSavedWithData = {async (data) => {
                            console.log("Data Saved", data);
                            const amount = data.surveyRecords.find((record:any) => record.surveyField.name.toLocaleLowerCase() === "amount").value;
                            const prevBillItemIndex = items.findIndex((item:BillItem) => item.additionalInfoId === data.id);

                            if(prevBillItemIndex !== -1){
                                const tempItems = [...items];
                                tempItems[prevBillItemIndex].amount = amount;
                                tempItems[prevBillItemIndex].updatedAt = new Date();
                                await dispatch(saveBillingItems(tempItems));
                            }
                            else{
                                const additionalItem:BillItem = {
                                    concept: translate(`hospital.billing.item.additional_info`).toString(),
                                    type: TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO,
                                    quantity:1,
                                    amount: amount,
                                    unitCost: amount,
                                    additionalInfoId: data.id,
                                    updatedAt: new Date()
                                }
                                await dispatch(pushBillingItems([additionalItem]))
                            }
                            
                            setCurrentItem(DEFAULT_CURRENT_ITEM);
                            setShowModal(false);
                            setEditSubmission(undefined);
                        }
                        }/>
            
        }
    }
    function onCloseModal(){
        setShowModal(false);
        updateStates(BillItemKeys.type, "", "");
    }

    function renderInsertedBillItems() {
        let filteredItems = [...items];
        if(print){
            filteredItems = items.filter((item) =>{
                return ![TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO, TYPE_BILL_ITEM.HIDDEN_VALUE].includes(item.type)
            } );
        }
        let rows: BillItemTable[] = filteredItems.map((val:BillItemTable, index:number) => {

            if(val.type === TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO && print){
                return; 
            }
            let color = TYPES_DISCOUNT.includes(parseInt(val.type)) ? red[900] : parseInt(val.type) === TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO ? blue[900] : "black";
             
            
            let rowElement:{[id: string] : JSX.Element} = {}
            filteredColumns.forEach((col:Column) => {
                if(col.type === "amount"){
                    const amount = (TYPES_DISCOUNT.includes(Number(val.type))) ? parseInt(getAmount(val)) * -1 : parseInt(getAmount(val));
                    let amountString:string = new Intl.NumberFormat(activeLanguage.code).format(amount);
                    
                    const percentSymbol = (Number(val.type) === TYPE_BILL_ITEM.DISCOUNT_PERCENT ? "%" : "");
                    amountString =  `${amountString} ${percentSymbol} `;
                    
                    
                    rowElement[col.name] =  <Typography variant="body2" style={{ color: color }}>{amountString}</Typography>   
                }
                else if(col.type === "subtotal"){
                    let subtotal = parseInt(getAmount(val)) * parseInt(val.quantity);
                    if(Number(val.type) === TYPE_BILL_ITEM.DISCOUNT_PERCENT){             
                        //Calculate the percetage of the subtotal
                        subtotal = (calculateTotalBill(items, [TYPE_BILL_ITEM.DISCOUNT_PERCENT, TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO, TYPE_BILL_ITEM.HIDDEN_VALUE]) * parseInt(getAmount(val))) / 100;

                        const amountString:string = new Intl.NumberFormat(activeLanguage.code).format(subtotal) + "%";
                        rowElement[col.name] =  <Typography variant="body2" style={{ color: color }}>{amountString}</Typography>   
                    }
                    subtotal = (TYPES_DISCOUNT.includes(Number(val.type))) ? subtotal * -1 : subtotal;
                    
                    let amountString:string = new Intl.NumberFormat(activeLanguage.code).format(subtotal);
                    rowElement[col.name] =  <Typography variant="body2" style={{ color: color }}>{amountString}</Typography>   
                }
                else if(col.type === "type"){
                    const typeSelected = TYPES_BILL_ITEM[val.type][0] as string;
                    rowElement[col.name] = <Typography variant="body2" style={{ color: color }}>{<Translate id={`hospital.billing.item.types.${typeSelected.toLocaleLowerCase()}`} />}</Typography>
                }
                else if(col.type === "number" ){
                    if(!canUpdateBill ||  val.type === TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO){
                        rowElement[col.name] =  <Typography variant="body2" style={{ color: color }}>{val[col.name]}</Typography>
                    }
                    else{
                        rowElement[col.name] = <QuantitySelector quantity={val[col.name] as number} onQuantityChange={(q) => updateQuantityBillItem(index, q)} />
                    }
                }
                else if(col.type === "date"){
                    const date = getDateFromStringOrDate(val[col.name]);
                    rowElement[col.name] = <Typography variant="body2" style={{ color: color }}>{ dateToFullDateString(date, activeLanguage.code) }</Typography>
                }
                else{
                    const plainName = <Typography variant="body2" style={{ color: color }}>{val[col.name]}</Typography>
                    let nameItem = plainName;
                    if(val.type === TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO){
                        nameItem = (
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            {plainName}
                            <IconButton
                                onClick={(e) => {
                                    setShowModal(true);
                                    setShowAdditionalInfoID(val.additionalInfoId) 
                                    e.stopPropagation();
                                    
                                }}
                                size="large">
                                <IconGenerator type="view" />
                            </IconButton> 
                        </div>)
                    }
                    rowElement[col.name] = nameItem
                }
            })
            return {...rowElement, id: index, used: !TYPES_DISCOUNT.includes(val.type) ? renderCheckOrDate("primary", items[index].used, index, usedItem) : <React.Fragment></React.Fragment>,
                    paid: (!TYPES_DISCOUNT.includes(val.type) && bill && bill.type === DocumentType.INVOICE) ? renderCheckOrDate("secondary", items[index].paid, index, paidItem) : <React.Fragment></React.Fragment>,
                    delete: <IconButton onClick={() => removeItem(index)} size="large">
                        <IconGenerator type="delete" />
                    </IconButton>};
    
        }) as BillItemTable[];

        return rows;
    }

    function renderRowAddItem(){
        let row:BillItemTable = {} as BillItemTable;
        filteredColumns.forEach((col:Column) => {
            let value;
            switch(col.type){
                case "autocomplete":
                    value = billables && billables.length > 0 ? 
                    <Autocomplete
                        freeSolo
                        options={billables ? billables.filter((billable) => {
                            if(!repeatBillItems){
                                const itemSelected = items.find((item) => item.id === billable.id);
                                return !itemSelected;
                            }
                            else{
                                return billable
                            }
                        }).sort((a,b) => a.concept > b.concept ? 1 : -1 ) as BillableOption[] : []} 
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
                                helperText={helperText(BillItemKeys.concept)} color="secondary"
                                onChange={(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => changeField(event.target.value, BillItemKeys.concept)}
                                variant="outlined" />
                            }
                    /> : <TextField label="Concept" error={fieldErrors.concept !== ""}
                            helperText={helperText(BillItemKeys.concept)} color="secondary"
                            onChange={(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => changeField(event.target.value, BillItemKeys.concept)}
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
                                    TYPES_BILL_ITEM.filter(([key, value]) => {
                                        if(value === TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO){
                                            return canUseAdditionalInfo && surveyAdditionalInfo;
                                        }
                                        return true;
                                    }).map(([key, value]) =>{
                                        return <MenuItem value={value}><Translate id={`hospital.billing.item.types.${key.toLowerCase()}`} /></MenuItem>
                                    }) 
                                }
                            
                        </Select>
                    </FormControl> : undefined
                break;
                case "amount":
                    value = <TextField label="Amount" variant="outlined" 
                        helperText={helperText(BillItemKeys.amount)} 
                        color="secondary"
                        error={fieldErrors.amount !== ""} type="text" 
                        onChange={(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => changeField(event.target.value, BillItemKeys.amount)} />   
                    break;
                case "number":
                    value = <TextField label={<Translate id={`hospital.billing.item.${col.name}`} />} variant="outlined" 
                        helperText={helperText(BillItemKeys.amount)} 
                        color="secondary"
                        error={fieldErrors[col.name] !== ""} type="text" 
                        onChange={(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => changeField(event.target.value, col.name)} />   
                    break;
           }
           // @ts-ignore: Unreachable code error
           row[col.name] = value;
        });

        row = {...row, id: rows.length - 1, delete: <ButtonAdd  onClick={() => addCurrentItem()}></ButtonAdd >}
        return row;
    }

    async function addCurrentItem() {
        let tempFieldErrors = { ...fieldErrors };
        //Fuerzo el valor 0 para diferenciarlo del valor por defecto.
        //currentItem["type"] = 0;
        filteredColumns.forEach((col) => {
            
            const key = col.name.toString();
            const value = currentItem[key as keyof BillItem] as string;
            tempFieldErrors[col.name] = validateKeyItem(value, col.name);
        })
        if (currentItem[BillItemKeys.type] === 2 &&  parseInt(currentItem[BillItemKeys.amount].toString()) > 99) {
            tempFieldErrors[BillItemKeys.amount] = "amount_percent";
        }
        if (Object.values(tempFieldErrors).reduce((acc, val) => acc && (val === ""), true)) {
            let tempItems = [...items];
            currentItem.updatedAt = new Date();
            tempItems.push({...currentItem});
            if(currentItem.relatedBillables && currentItem.relatedBillables.length > 0){
                for(let i = 0; i < currentItem.relatedBillables.length; i++){
                    const billable:Billable | undefined = billables.find((billable) => billable.id === currentItem?.relatedBillables[i]);
                    if(billable){
                        const currentBillItem:BillItem = {...billable, quantity:1, updatedAt: new Date()}
                        delete currentBillItem.id;
                        tempItems.push(currentBillItem);
                    }
                }
            }

            await dispatch(saveBillingItems(tempItems))
            setAddingItem(false);
            setCurrentItem(DEFAULT_CURRENT_ITEM);
        }
        setErrorBill(undefined);
        setFieldErrors(tempFieldErrors);
    }
    async function removeItem(index: number) {
        console.log("Borrar " + index);
        const tempItems = [...items];
        const elementToDelete = {...tempItems[index]};
        if(elementToDelete.additionalInfoId){
            setEditSubmission(undefined);
            setShowAdditionalInfoID(-1);
            await dispatch(removeSubmissionPatient(uuidPatient ,elementToDelete.additionalInfoId, surveyAdditionalInfo.uuid));
        }
        tempItems.splice(index, 1);
        await dispatch(saveBillingItems(tempItems));
        setErrorBill(undefined);
    }
    
    const rows = renderInsertedBillItems();

    if (addingItem) {
        const rowAddItem = renderRowAddItem();
        rows.push(rowAddItem)
    }
    else if (canUpdateBill && !print) {
        // @ts-ignore: Unreachable code error
        let field: BillItemTable = {}
        filteredColumns.forEach((col:Column) => {
            let value = <React.Fragment></React.Fragment>

        // @ts-ignore: Unreachable code error
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
    if(!canUpdateBill && print){        
        const hasAdditionalInfo = items.find((item) =>{
            return item.type === TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO
        });
        if(hasAdditionalInfo){
            rows.push({
                id: "additional", 
                concept: <Typography style={{fontWeight:'bold'}} >{hasAdditionalInfo.concept}</Typography>,
                type : <></>, 
                amount: <Typography style={{ fontWeight: 'bold', minWidth:'2rem' }} >{new Intl.NumberFormat(activeLanguage.code).format(hasAdditionalInfo.amount) + " " + currency}</Typography>,
                delete: <React.Fragment></React.Fragment>,
            });
        }
    }
    if (items.length > 0 && showTotal) {
    
        rows.push({
            id: items.length, concept: <Typography style={{fontWeight:'bold'}} ><Translate id={`hospital.billing.bill.total`} /></Typography>,
            type : <></>, 
            amount: <Typography style={{ fontWeight: 'bold', minWidth:'2rem' }} >{new Intl.NumberFormat(activeLanguage.code).format(totalAmountBill) + " " + currency}</Typography>,
            delete: <React.Fragment></React.Fragment>,
        });
    }
    // let  headCells = [{ id: "concept", alignment: "left", label: <Translate id={`hospital.billing.item.concept`} /> },
    // { id: "amount", alignment: "left", label: <Translate id={`hospital.billing.item.amount`} /> }
    // ]
    let  headCells = filteredColumns.map((col) => {
        return { id: col.name, alignment: "left", label: <Translate id={`hospital.billing.item.${col.name}`} />}
    })

    // if(withDiscount){
    //     headCells.splice(1, 0, { id: "type", alignment: "left", label: <Translate id={`hospital.billing.item.type`} /> });
    // }

    if (canUpdateBill) {
        // @ts-ignore: Unreachable code error
        headCells.push({ id: "delete", alignment: "right", label: <React.Fragment></React.Fragment> });
    }
    else if(bill?.type === DocumentType.INVOICE && bill.status === DocumentStatus.CLOSED) {
        headCells.push({ id: "paid", alignment: "right", markAllCallback: print ? null : (async () => await toggleAllItemsAs("paid")), label: <React.Fragment><Translate id="general.paid" /></React.Fragment> });
        headCells.push({ id: "used", alignment: "right", markAllCallback: print ? null : (async () => await toggleAllItemsAs("used")), label: <React.Fragment><Translate id="general.used" /></React.Fragment> });
    }
   
    return (
        <div style={{width:'100%'}} ref={printRef} >
            <Modal key="modal" fullWidth medium open={showModal} title="Request Discount" closeModal={() => onCloseModal()}>
            {
                renderContentModal()
            }
            </Modal>
        
            <Grid container item>
                <Grid item xs={12}>
                    <EnhancedTable noFooter noHeader noPagination dense={print}
                        noSelectable disableOrder headCells={headCells} rows={rows} />
                </Grid>
                <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }} >
                    {
                        errorBill &&
                        <Grid item xs={12} style={{ textAlign: "right", paddingTop: "10px" }}>
                            <Typography variant="body2" style={{ color: "red" }} >{errorBill}</Typography>
                        </Grid>
                    }
                   
                    <GridBottom hide={print} item xs={12} paddingTop={5} >
                        <ButtonCancel style={{marginRight:'1rem'}}  onClick={onCancelBill} data-testid="cancel-modal">
                            {
                                !canUpdateBill ? <Translate id="general.close" /> : <Translate id="general.cancel" />
                            }
                        </ButtonCancel>
                        <ButtonOk disabled={items.length === 0} onClick={() => onClickContinue(items)} 
                            data-testid="continue-modal">
                            {renderTextOkButton()}
                        </ButtonOk>
                    </GridBottom>

                </Grid>
            </Grid>
        </div>
    )
}

export const BillItems = withLocalize(BillItemsCore)