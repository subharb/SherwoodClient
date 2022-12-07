import { Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { ButtonAdd, ButtonContinue, ButtonEdit } from '../../../components/general/mini_components';
import { IDepartment, IUnit } from '../../../constants/types';
import { useUnitSelector } from '../../../hooks';
import { BillItems } from '../Billing/BillItems';
import { Billable, BillItem, BillItemModes } from '../Billing/types';
import { IPharmacyItem, IPharmacyRequest, RequestPharmacyItem } from './types';

interface RequestFormProps {
    units:IUnit[],
    uuidInvestigation:string,
    pharmacyItemsInit:IPharmacyItem[],
    makePharmacyRequestCallback:(request:IPharmacyRequest) => void
}



export const PHARMACY_ITEM_REQUEST_COLUMNS = [{name:"concept", type:"autocomplete", validation:""}, {name:"amount", type:"number", validation:"pharmacyItem"}];


const RequestForm: React.FC<RequestFormProps> = ({ uuidInvestigation, pharmacyItemsInit, units, makePharmacyRequestCallback }) => {
    const [addingPharmacyItems, setAddingPharmacyItems] = React.useState<boolean>(false);
    const {unitSelected, renderUnitSelector, markAsErrorUnit} = useUnitSelector(units);
    
    const [requestPharmacyItems, setRequestPharmacyItems] = React.useState<RequestPharmacyItem[]>([]);
    // @ts-ignore: Unreachable code error
    const billables:Billable[] = pharmacyItemsInit.map((pharmaItem) => {
        return{
            concept : pharmaItem.name,
            id: pharmaItem.id,
            quantity:pharmaItem.amount
        }
    })

    function onBillItemsValidated(items:BillItem[]){
        const newRequestPharmacyItems:RequestPharmacyItem[] = items.map((item) => {
            return {
                id: item.id as number,
                name: item.concept,
                amountApproved: 0,
                amountRequested: item.amount as number
            }
        });
        setRequestPharmacyItems(newRequestPharmacyItems);
        setAddingPharmacyItems(false);
    }
    function validateRequest(){
        if(unitSelected === null){
            markAsErrorUnit();
            return;
        }
        if(requestPharmacyItems.length === 0){
            alert("Add at least one item");
            return;
        }
        makePharmacyRequestCallback({uuidUnit:unitSelected, requestPharmacyItems});
    }
    function renderPharmcyItems(){
        if(addingPharmacyItems){
            // @ts-ignore: Unreachable code error
            const pharmacyRequestItems:BillItem[] = requestPharmacyItems.map((pharmaItem) => {
                return {
                    concept: pharmaItem.name,
                    amount: pharmaItem.amountRequested,
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
                <Grid item xs={12}>
                    <Typography variant="body2"><span><Translate id="pages.hospital.pharmacy.request.select_items" /><ButtonAdd onClick={() => setAddingPharmacyItems(true)}/></span></Typography>
                </Grid>)
        }
        else{
            let  headCells = PHARMACY_ITEM_REQUEST_COLUMNS.map((col) => {
                return { id: col.name, alignment: "left", label: <Translate id={`hospital.billing.item.${col.name}`} />}
            })
            const rows = requestPharmacyItems.map((item) => {
                return {
                    id: item.id,
                    concept: item.name,
                    amount: item.amountRequested
                }
            });
            return(
                <>
                    <Grid item xs={12}>
                        <Typography variant="body2"><span><Translate id="pages.hospital.pharmacy.request.edit_items_request" /></span><ButtonEdit onClick={() => setAddingPharmacyItems(true)}/></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <EnhancedTable noFooter noHeader noSelectable headCells={headCells} rows={rows} />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonContinue onClick={validateRequest}><Translate id="pages.hospital.pharmacy.request.make_request" /></ButtonContinue>
                    </Grid>
                </>
                )
        }
    }

    function renderCore(){
        if(units.length > 0){
            return(
                <>
                {
                    renderUnitSelector()
                }
                {
                    renderPharmcyItems()
                }
                </>
            )
            
        }
        else{
            return(
                <Typography variant="body2"><Translate id="pages.hospital.pharmacy.no_departments" /></Typography>
            )
        }
    }
    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>  
                    <Grid item xs={12}>
                        <Typography variant="h6">Request Form</Typography>
                    </Grid>
                    {
                        renderCore()
                    }
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RequestForm;
