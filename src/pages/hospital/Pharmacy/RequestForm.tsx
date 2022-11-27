import { Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { ButtonAdd, ButtonContinue, ButtonEdit } from '../../../components/general/mini_components';
import { IDepartment } from '../../../constants/types';
import { BillItems } from '../Billing/BillItems';
import { Billable, BillItem, BillItemModes } from '../Billing/types';
import { IPharmacyItem, IPharmacyRequest, RequestPharmacyItem } from './types';

interface RequestFormProps {
    departments:IDepartment[],
    uuidInvestigation:string,
    pharmacyItemsInit:IPharmacyItem[],
    makePharmacyRequestCallback:(request:IPharmacyRequest) => void
}



const PHARMACY_ITEM_REQUEST_COLUMNS = [{name:"concept", type:"autocomplete", validation:""}, {name:"amount", type:"number", validation:""}];


const RequestForm: React.FC<RequestFormProps> = ({ uuidInvestigation, pharmacyItemsInit, departments, makePharmacyRequestCallback }) => {
    const [addingPharmacyItems, setAddingPharmacyItems] = React.useState<boolean>(false);
    const [uuidDepartment, setUuidDepartment] = React.useState<string | null>(null);
    const [errorDepartment, setErrorDepartment] = React.useState<Boolean>(false);
    const [errorPharmacyItems, setErrorPharmacyItems] = React.useState<Boolean>(false);
    const [requestPharmacyItems, setRequestPharmacyItems] = React.useState<RequestPharmacyItem[]>([]);
    // @ts-ignore: Unreachable code error
    const billables:Billable[] = pharmacyItemsInit.map((pharmaItem) => {
        return{
            concept : pharmaItem.name,
            id: pharmaItem.id
        }
    })

    function onBillItemsValidated(items:BillItem[]){
        const newRequestPharmacyItems:RequestPharmacyItem[] = items.map((item) => {
            return {
                id: item.id,
                name: item.concept,
                amount: item.amount as number
            }
        });
        setRequestPharmacyItems(newRequestPharmacyItems);
        setAddingPharmacyItems(false);
    }
    function validateRequest(){
        if(uuidDepartment === null){
            setErrorDepartment(true);
            return;
        }
        if(requestPharmacyItems.length === 0){
            alert("Add at least one item");
            return;
        }
        makePharmacyRequestCallback({uuidDepartment, requestPharmacyItems});
    }
    function renderPharmcyItems(){
        if(addingPharmacyItems){
            // @ts-ignore: Unreachable code error
            const pharmacyRequestItems:BillItem[] = requestPharmacyItems.map((pharmaItem) => {
                return {
                    concept: pharmaItem.name,
                    amount: pharmaItem.amount,
                }
            });
            return(
                <Grid item xs={12}>
                    <BillItems 
                        // @ts-ignore: Unreachable code error
                        columns={PHARMACY_ITEM_REQUEST_COLUMNS} 
                        mode={BillItemModes.EDIT} billables={billables} initItems={pharmacyRequestItems}
                        currency="" print={false} bill={null} updatingBill={false}
                        repeatBillItems={false} showTotal={false}
                        error={undefined} withDiscount={false} onBillItemsValidated={(items) => onBillItemsValidated(items)}
                        onCancelBill={() => setAddingPharmacyItems(false)}
                        uuidInvestigation={uuidInvestigation} />
                </Grid>
            ) 
        }
        else if(requestPharmacyItems.length === 0){
            return(
                <>
                    <Typography variant="body2">Select the elements of your request</Typography><ButtonAdd onClick={() => setAddingPharmacyItems(true)}/>
                </>)
        }
        else{
            let  headCells = PHARMACY_ITEM_REQUEST_COLUMNS.map((col) => {
                return { id: col.name, alignment: "left", label: <Translate id={`hospital.billing.item.${col.name}`} />}
            })
            const rows = requestPharmacyItems.map((item) => {
                return {
                    id: item.id,
                    concept: item.name,
                    amount: item.amount
                }
            });
            return(
                <>
                    <Grid item xs={12}>
                        <Typography variant="body2"><span>Edit pharmacy items</span><ButtonEdit onClick={() => setAddingPharmacyItems(true)}/></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <EnhancedTable noFooter noHeader noSelectable headCells={headCells} rows={rows} />
                    </Grid>
                        <Grid item xs={12}>
                    <ButtonContinue onClick={validateRequest}>Make Request</ButtonContinue>
                    </Grid>
                </>
                )
        }
    }
    function renderDepartmentSelector(){
        if(departments.length === 1){
            setErrorDepartment(false);
            return(
                <Grid item xs={12}>
                    {departments[0].name}
                </Grid>
            );
        }
        else{
            const optionsArray = departments.map((department) => {
                return <MenuItem value={department.uuid}>{department.name}</MenuItem>
            })
            return(
                <Grid item xs={12}>
                    <FormControl mt={3} style={{minWidth: 120}} fullWidth variant="outlined" error={errorDepartment} >
                    <InputLabel id="department">Seleccione el departamento</InputLabel>
                        <Select 
                            labelId="department"
                            id="department"
                            label="department"
                            value={uuidDepartment}
                            onChange={(event) => {
                                setErrorDepartment(false);
                                setUuidDepartment(event.target.value as string)}}
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                </Grid>
            )
        }
    }
    useEffect(() =>{
        if(departments.length === 1){
            setUuidDepartment(departments[0].uuid as string);
        }
    }, [])
    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>  
                    <Grid item xs={12}>
                        <Typography variant="h6">Request Form</Typography>
                    </Grid>
                    {
                        renderDepartmentSelector()
                    }
                    {
                        renderPharmcyItems()
                    }
                </Grid>
            </CardContent>
        </Card>
            
          
    );
};

export default RequestForm;
