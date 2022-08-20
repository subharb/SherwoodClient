import { Button, Checkbox, Grid, IconButton, TextField, Typography } from "@material-ui/core"
import { red } from "@material-ui/core/colors"
import React, { ReactElement, useEffect, useRef, useState } from "react"
import { Language, Translate } from "react-localize-redux"
import styled from "styled-components"
import { EnhancedTable } from "../../../components/general/EnhancedTable"
import { ButtonAdd, IconGenerator } from "../../../components/general/mini_components"
import Loader from "../../../components/Loader"
import { Bill, Billable, BillItem, BillItemKeys, BillItemTable, IPatient, TYPE_BILL_ITEM } from "../../../constants/types"
import { createBillService, updateBillService } from "../../../services/billing"
import { calculateTotalBill } from "../../../utils/bill"
import { FindPatient } from "./find_patient"

import { dateToFullDateString, fullDateFromPostgresString } from "../../../utils"
import { Autocomplete, createFilterOptions } from "@material-ui/lab"

interface Props {
    updatingBill: boolean,
    patients: IPatient[],
    personalFields: [],
    currency: string,
    uuidInvestigation: string,
    bill: Bill | null,
    locale: Language,
    billables?:Billable[],
    print: boolean,
    onBillSuccesfullyCreated: (bill: Bill) => void,
    onCancelBill: () => void

}

type BillableOption = Billable & {inputValue: string}

const FactureHolder = styled.div<{ hide: boolean }>`
    margin-top:2rem;
    text-align:center;
    background-color:#e6e6e6;
    padding:0.5rem;
    color:#000;
    font-weight:bold;
    display:${props => props.hide ? 'none' : 'auto'};
`;
const GridContainer = styled(Grid)`
    flex-direction: column;
    @media (min-width: 768px) {
        min-height:500px;
        min-width:400px;   
    }
`

const GridBottom = styled(Grid) <{ hide: boolean }>`
    display:${props => props.hide ? 'none' : 'flex'};
    justify-content:end;
`;

const DEFAULT_CURRENT_ITEM = { concept: "", type: -1, amount: 0 }

const filter = createFilterOptions<BillableOption>();

export const BillForm: React.FC<Props> = (props) => {
    const [patient, setPatient] = useState<null | IPatient>(props.bill ? props.bill.patientInvestigation : null);
    const [items, setItems] = useState<BillItem[]>(props.bill ? props.bill.billItems : []);
    const [addingItem, setAddingItem] = useState(false);
    const [currentItem, setCurrentItem] = useState<BillItem>(DEFAULT_CURRENT_ITEM);
    const [fieldErrors, setFieldErrors] = useState({ "concept": "", "type": "", "amount": "" });
    const [errorBill, setErrorBill] = useState<ReactElement>();
    const [billableSelected, setBillableSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const printRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        console.log("currentItem cambió", currentItem);
        if(currentItem.concept !== DEFAULT_CURRENT_ITEM.concept 
                && currentItem.amount !== DEFAULT_CURRENT_ITEM.amount 
                && currentItem.type !== DEFAULT_CURRENT_ITEM.type){
                    addCurrentItem();
                }
        
    }, [currentItem]);

    function onPatientSelected(idPatient: number) {
        const findPatient = props.patients.find((patient) => patient.id === idPatient);
        if (findPatient) {
            setPatient(findPatient);
        }
        console.log(findPatient);
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
                        props.bill &&
                        <Grid item xs={6} style={{ textAlign: 'right' }} >
                            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.num_bill" /></span>: {props.bill.id}</Typography>
                            <Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.billing.bill.date" /></span>: {fullDateFromPostgresString(props.locale.code, props.bill.createdAt)}</Typography>
                        </Grid>
                    }
                </Grid>

            )
        }
    }
    function validateKeyItem(value: string, itemKey: BillItemKeys) {
        let error = "";
        switch (itemKey) {
            case BillItemKeys.concept:
                if (value.length < 3) {
                    error = "concept_short";
                }

                break;
            case BillItemKeys.amount:
                const amount = Number(value)
                if (amount <= 0 || isNaN(amount)) {
                    error = "amount_negative";
                }
                break;
            case BillItemKeys.type:
            //
        }

        return error;
    }

    function updateStates(itemKey: BillItemKeys, error: string, value: string) {
        let tempFieldErrors = { ...fieldErrors };
        tempFieldErrors[itemKey] = error;
        let tempCurrentItem = { ...currentItem };
        switch (itemKey) {
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
    function changeSelect(event: React.ChangeEvent<{
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
            const billableSelected = props.billables?.find((billable) => billable.id === billableId);
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
            }
        }
    }
    function helperText(itemType: BillItemKeys): null | ReactElement {
        return fieldErrors[itemType] ? <Translate id={`hospital.billing.item.error.${fieldErrors[itemType]}`} /> : null;
    }
    function removeItem(index: number) {
        console.log("Borrar " + index);
        const tempItems = [...items];
        tempItems.splice(index, 1);
        setItems(tempItems);
        setErrorBill(undefined);
    }
    async function onClickContinue(items: BillItem[]) {
        if (calculateTotalBill(items) > 0 && patient) {
            setLoading(true);
            let response: { status: number, bill?: Bill };
            if (props.updatingBill && props.bill) {
                response = await updateBillService(props.uuidInvestigation, props.bill.id, items);
            }
            else {
                response = await createBillService(props.uuidInvestigation, patient?.uuid, items);
            }

            if (response.status === 200 && response.bill) {
                props.onBillSuccesfullyCreated(response.bill);
            }
            else {
                setErrorBill(<Translate id="hospital.bill.error.create" />);
            }
            setLoading(false);
            setAddingItem(false);
            //props.onBillCreated(items);
        }
        else {
            setErrorBill(<Translate id="hospital.bill.error.positive" />);
        }
    }
    function addCurrentItem() {
        let tempFieldErrors = { ...fieldErrors };
        //Fuerzo el valor 0 para diferenciarlo del valor por defecto.
        currentItem["type"] = 0;
        Object.keys(BillItemKeys).forEach((iKey) => {
            console.log(iKey as BillItemKeys);
            const iTemKey = iKey as BillItemKeys;
            tempFieldErrors[iTemKey] = validateKeyItem(currentItem[iTemKey].toString(), iTemKey);
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
    function renderCheckOrDate(color: "default" | "primary" | "secondary" | undefined,
        value: boolean | string | undefined, index: number, fn: (index: number) => void) {
        if (typeof value == "boolean" || value === null) {
            return <Checkbox color={color} checked={value} disabled={props.print} onClick={() => fn(index)} />
        }
        else if (value) {
            const dateObject = new Date(value.replace(' ', 'T').replace(' ', 'Z'));
            if (dateObject) {
                return <React.Fragment>{dateObject.getDate() + " " + dateObject.toLocaleString(props.locale.code, { month: 'short', year: 'numeric' })}</React.Fragment>
            }
        }
    }

    function renderTextOkButton() {
        if (props.updatingBill) {
            return <Translate id="hospital.billing.bill.update" />
        }
        else {
            return <Translate id="hospital.billing.bill.save" />
        }
    }
    function renderItems() {
        if (loading) {
            return <Loader />
        }
        if (patient) {
            let rows: BillItemTable[] = items.map((val, index) => {

                const color = val.type !== 0 ? red[900] : "black";
                const amountString = val.type !== 0 ? "- " + val.amount + " " + (val.type === 2 ? "%" : props.currency) : val.amount + " " + props.currency;

                return {
                    id: index,
                    concept: <Typography variant="body2" style={{ color: color }}>{val.concept}</Typography>,
                    type: <Typography variant="body2" style={{ color: color }}><Translate id={`hospital.billing.item.types.${TYPE_BILL_ITEM[val.type].toLowerCase()}`} /></Typography>,
                    amount: <Typography variant="body2" style={{ color: color }}>{amountString}</Typography>,
                    delete: <IconButton onClick={() => removeItem(index)}>
                        <IconGenerator type="delete" />
                    </IconButton>,
                    used: val.type === 0 ? renderCheckOrDate("primary", items[index].used, index, usedItem) : <React.Fragment></React.Fragment>,
                    paid: val.type === 0 ? renderCheckOrDate("secondary", items[index].paid, index, paidItem) : <React.Fragment></React.Fragment>,
                }
            });

            if (addingItem) {
                console.log(Object.keys(TYPE_BILL_ITEM));
                let field: BillItemTable = {
                    id: rows.length - 1,
                    concept: props.billables && props.billables.length > 0 ? <Autocomplete
                        id="concept"
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        options={props.billables ? props.billables as BillableOption[] : []}
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
                          filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                    
                            // Suggest the creation of a new value
                            if (params.inputValue !== '') {
                                filtered.push({
                                    inputValue: params.inputValue,
                                    concept: params.inputValue,
                                    amount:0,
                                    type:0,
                                    insurance:null,
                                    id:0
                                });
                            }
                    
                            return filtered;
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
                        renderInput={(params) => 
                            <TextField {...params} label="Concept" error={fieldErrors.concept !== ""}
                                helperText={helperText(BillItemKeys.concept)}
                                onChange={(event) => changeField(event.target.value, BillItemKeys.concept)}
                                variant="outlined" />
                            }
                    /> : <TextField label="Concept" error={fieldErrors.concept !== ""}
                            helperText={helperText(BillItemKeys.concept)}
                            onChange={(event) => changeField(event.target.value, BillItemKeys.concept)}
                            variant="outlined" />,
                    amount: <TextField label="Amount" variant="outlined" 
                                helperText={helperText(BillItemKeys.amount)} 
                                error={fieldErrors.amount !== ""} type="text" 
                                onChange={(event) => changeField(event.target.value, BillItemKeys.amount)} />,
                    delete: <IconButton onClick={() => addCurrentItem()}>
                                <IconGenerator type="add" />
                            </IconButton>
                }
                rows.push(field)
            }
            else if (!props.updatingBill) {
                let field: BillItemTable = {
                    id: rows.length - 1,
                    concept: <React.Fragment></React.Fragment>,
                    //type :   <React.Fragment></React.Fragment>,
                    amount: <React.Fragment></React.Fragment>,
                    delete: <React.Fragment><Translate id="hospital.billing.item.add_item" /> <ButtonAdd disabled={addingItem}
                        type="button" data-testid="add_bill"
                        onClick={() => {
                            setErrorBill(undefined);
                            setAddingItem(true)
                        }} /></React.Fragment>

                }
                rows.push(field);
            }
            if (items.length > 0) {
                let totalBill = calculateTotalBill(items);
                rows.push({
                    id: items.length, concept: <React.Fragment><Typography style={{ fontWeight: 'bold' }} ><Translate id={`hospital.billing.bill.total`} /></Typography></React.Fragment>,
                    //type : <Typography style={{fontWeight:'bold'}} ><Translate id={`hospital.billing.bill.total`} /></Typography> , 
                    amount: <Typography style={{ fontWeight: 'bold' }} >{totalBill + " " + props.currency}</Typography>,
                    delete: <React.Fragment></React.Fragment>,
                });
            }
            const headCells = [{ id: "concept", alignment: "left", label: <Translate id={`hospital.billing.item.concept`} /> },
            //{ id: "type", alignment: "left", label: <Translate id={`hospital.billing.item.type`} /> },
            { id: "amount", alignment: "left", label: <Translate id={`hospital.billing.item.amount`} /> }
            ]

            if (!props.updatingBill) {
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
                            <FactureHolder hide={!props.bill}>
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
                            <GridBottom hide={props.print} item xs={12} >
                                <Button disabled={loading} onClick={props.onCancelBill} data-testid="cancel-modal" color="primary">
                                    <Translate id="general.cancel" />
                                </Button>
                                <Button disabled={loading || items.length === 0} onClick={() => onClickContinue(items)} data-testid="continue-modal" color="primary">
                                    {renderTextOkButton()}
                                </Button>
                            </GridBottom>

                        </Grid>
                    </Grid>
                </div>
            )
        }
    }

    return (
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