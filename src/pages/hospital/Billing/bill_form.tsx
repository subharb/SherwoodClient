import { Grid, TextField, Typography } from "@material-ui/core"
import { number } from "prop-types"
import React, { ReactElement, useState } from "react"
import { Translate } from "react-localize-redux"
import { EnhancedTable } from "../../../components/general/EnhancedTable"
import FieldSherwood from "../../../components/general/FieldSherwood"

import { ButtonAdd } from "../../../components/general/mini_components"
import { IPatient } from "../../../constants/types"
import { FindPatient } from "./find_patient"

interface Props{
    patients:IPatient[],
    personalFields:[],
    onPatientSelected:(idPatient:number) => void,
}
interface Item{
    concept:string,
    type:number,
    amount:number
}
interface ItemField{
    id?:number,
    concept:ReactElement,
    type:ReactElement,
    amount:ReactElement
}

enum ItemKeys{
    concept = "concept",
    amount = "amount",
    type = "type"
}

export const BillForm:React.FC<Props> = (props) => {
    const [patient, setPatient] = useState<null | IPatient>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [addingItem, setAddingItem] = useState(false);
    const [currentItem, setCurrentItem] = useState<Item>({concept:"", type :0, amount:0});
    const [fieldErrors, setFieldErrors] = useState({"concept" : false, "type" :false, "amount" :false})

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
    function validateKeyItem(value:string, itemKey:ItemKeys):boolean{
        let error = false;
        switch(itemKey){
            case ItemKeys.concept : 
                if(value.length < 3){
                    error = true;
                }       
                
            break;
            case ItemKeys.amount:
                const amount = Number(value)
                if(amount <= 0 || isNaN(amount)){
                    error = true;
                }
                
            break;
            case ItemKeys.type:
                //
        }
        
        return error;
    }

    function updateStates(itemKey:ItemKeys, error:boolean, value:string){
        let tempFieldErrors = {...fieldErrors};
        tempFieldErrors[itemKey] = error;
        let tempCurrentItem = {...currentItem};
        switch(itemKey){
            case ItemKeys.concept:
                tempCurrentItem[itemKey] = value;
                break;
            case ItemKeys.amount:
            case ItemKeys.type:
                tempCurrentItem[itemKey] = Number(value);
        }
        setFieldErrors(tempFieldErrors);
        setCurrentItem(tempCurrentItem);
    }
    function changeField(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, itemKey:ItemKeys){
        const error = validateKeyItem(event.target.value, itemKey);
        updateStates(itemKey, error, event.target.value);
    }
    function helperText(itemType:ItemKeys):null | ReactElement{
        return fieldErrors[itemType] ? <Translate id={`hospital.billing.item.error.${itemType}`} /> : null;
    }
    function addITem(index:number){
        console.log(index);
        let tempFieldErrors = {...fieldErrors};
        Object.keys(ItemKeys).forEach((iKey) => {
            console.log(iKey as ItemKeys);
            const iTemKey = iKey as ItemKeys;
            tempFieldErrors[iTemKey] = validateKeyItem(currentItem[iTemKey].toString(), iTemKey);
        })
        setFieldErrors(tempFieldErrors);
    }
    function renderItems(){
        if(patient){
            let rows:(Item | ItemField)[] = [...items];
            if(addingItem){
                let field: ItemField = {id:rows.length -1,
                                        concept : <TextField label="Concept" error={fieldErrors.concept} helperText={helperText(ItemKeys.concept)} type="text" onChange={(event) => changeField(event, ItemKeys.concept)}/>, 
                                        type :  <TextField label="Type" type="text" error={fieldErrors.type}  helperText={helperText(ItemKeys.type)} onChange={(event) => changeField(event, ItemKeys.type)}/>,
                                        amount : <TextField label="Amount" helperText={helperText(ItemKeys.amount)} error={fieldErrors.amount}  type="text" onChange={(event) => changeField(event, ItemKeys.amount)}/>}
                rows.push(field)
            }
            const headCells = [{ id: "concept", alignment: "left", label: <Translate id={`hospital.billing.item.concept`} /> },
                    { id: "type", alignment: "left", label: <Translate id={`hospital.billing.item.type`} /> },
                    { id: "amount", alignment: "left", label: <Translate id={`hospital.billing.item.amount`} /> }
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
                    <Grid item xs={12}>
                        <EnhancedTable headCells={headCells} rows={rows} 
                            actions={[{"type":"add", "func" : (indexItem:number) => addITem(indexItem)}]}/>
                    </Grid>
                </React.Fragment>
            )
        }
    }
    return(
        <Grid container>
            {
                renderPatient()
            }
            {
                renderItems()
            }
        </Grid>
    )
}