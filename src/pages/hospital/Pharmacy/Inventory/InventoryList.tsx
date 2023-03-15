import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@material-ui/core';
import { green, orange, red } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import { InventoryLocalizedProps } from '.';
import { EnhancedTable } from '../../../../components/general/EnhancedTable';
import Form from '../../../../components/general/form';
import { FormValues } from '../../../../components/general/formTSFunction';
import { ButtonAccept, ButtonCancel, ButtonContinue, FieldWrapper } from '../../../../components/general/mini_components';
import { ColourChip } from '../../../../components/general/mini_components-ts';

import Modal from '../../../../components/general/modal';
import Loader from '../../../../components/Loader';
import { ChipContainer } from '../../Service/RequestInfo';
import { IPharmacyItem } from '../types';

interface InventoryListProps {
    
}

const InventoryListCore: React.FC<InventoryLocalizedProps> = ({ pharmacyItems, loading, showSnackbar, translate, updatePharmacyItemCallBack, deleteItemCallback: callbackDeleteItem }) => {
    const [filteredItems, setFilteredItems] = React.useState<IPharmacyItem[]>(pharmacyItems);
    const [lowStatusFilter, setLowStatusFilter] = React.useState<boolean>(false);
    const [finishedStatusFilter, setFinishedStatusFilter] = React.useState<boolean>(false);
    const [nameFilter, setNameFilter] = React.useState<string>("");
    const [modalInfo, setModalInfo] = React.useState({showModal: false, type:""});
    const [editItem, setEditItem] = React.useState<FormValues>({});
    const [deleteItem, setDeleteItem] = React.useState<IPharmacyItem | null>(null);
    const [providerOptions, setProviderOptions] = React.useState<{value:string, label:string}[]>([]);
    const [providerFilter, setProviderFilter] = React.useState<string>("");

    useEffect(() => {
        setFilteredItems(pharmacyItems.filter((item: IPharmacyItem) => {
            return (item.name.toLocaleLowerCase().includes(nameFilter) &&
                (finishedStatusFilter ? item.amount === 0 : true) && (lowStatusFilter ? item.amount < item.threshold : true) 
                && (providerFilter !== "" ? item.provider === providerFilter : true))
        }));

    }, [nameFilter, lowStatusFilter, providerFilter, pharmacyItems]);

    useEffect(() => {
        if(showSnackbar.severity === "success"){
            setModalInfo({showModal: false, type:""});
        }
    }, [showSnackbar])

    useEffect(() => {
        // Set the option of a select from the providers of pharmacyItems but not repeated providers
        const providers = pharmacyItems.map((item: IPharmacyItem) => item.provider);
        const providersSet = new Set(providers);
        const providersArray = Array.from(providersSet);
        const providersOptions = providersArray.map((provider: string) => ({value: provider, label: provider}));
        setProviderOptions(providersOptions);
        
    }, [pharmacyItems])

    const FORM_EDIT = {
        "id" : {
            required : true,
            name:"id",
            type:"hidden",
            label:"pages.hospital.pharmacy.pharmacy_items.code",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.code",
            validation : "number"
        },
        "code" : {
            required : true,
            name:"code",
            type:"text",
            numberColumnsLg:2,
            numberColumnsXs:2,
            label:"pages.hospital.pharmacy.pharmacy_items.code",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.code",
            validation : "textMin2"
        },
        "name" : {
            required : true,
            name:"name",
            type:"text",
            numberColumnsLg:10,
            numberColumnsXs:6,
            label:"pages.hospital.pharmacy.pharmacy_items.name",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.name",
            validation : "textMin2"
        },         
        "activePrinciple" : {
            required : true,
            name:"activePrinciple",
            type:"text",
            numberColumnsLg:6,
            numberColumnsXs:6,
            label:"pages.hospital.pharmacy.pharmacy_items.activePrinciple",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.activePrinciple",
            validation : "textMin2"
        },
        "provider" : {
            required : true,
            name:"provider",
            type:"text",
            numberColumnsLg:6,
            numberColumnsXs:6,
            label:"pages.hospital.pharmacy.pharmacy_items.provider",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.provider",
            validation : "textMin2"
        },
        "amount" : {
            required : true,
            name:"amount",
            type:"text",
            numberColumnsLg:3,
            numberColumnsXs:3,
            label:"pages.hospital.pharmacy.pharmacy_items.amount",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.amount",
            validation : "number"
        },
        "price" : {
            required : true,
            name:"price",
            type:"text",
            numberColumnsLg:3,
            numberColumnsXs:3,
            label:"pages.hospital.pharmacy.pharmacy_items.price",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.price",
            validation : "number"
        },
        "unit" : {
            required : true,
            name:"unit",
            type:"text",
            numberColumnsLg:3,
            numberColumnsXs:3,
            label:"pages.hospital.pharmacy.pharmacy_items.unit",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.unit",
            validation : "textMin2"
        },
        "type" : {
            required : false,
            name:"type",
            type:"text",
            numberColumnsLg:3,
            numberColumnsXs:3,
            label:"pages.hospital.pharmacy.pharmacy_items.type",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.type",
            validation : "textMin2"
        },
        
       
        "threshold" : {
            required : true,
            name:"threshold",
            type:"text",
            numberColumnsLg:6,
            numberColumnsXs:6,
            label:"pages.hospital.pharmacy.pharmacy_items.threshold",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.threshold",
            validation : "number"
        },
    }
    
    function resetModal(){
        setModalInfo({showModal: false, type:""});
    }

    function showDeleteItem(id: number){
        setDeleteItem(pharmacyItems[id]);
        setModalInfo({showModal: true, type:"delete"});
    }
    function showEditItem(id: number){
        setEditItem({...pharmacyItems[id]});
        setModalInfo({showModal: true, type:"edit"});
    }
    function filterItems(value: string){
        setNameFilter(value.toLocaleLowerCase());
    }
    function filterStatusLow(){
        setLowStatusFilter(!lowStatusFilter);
    }
    function filterStatusFinished(){
        setFinishedStatusFilter(!finishedStatusFilter);
    }
    function renderModal(){
        if(loading){
            return <div style={{width:'20rem', display:'flex', justifyContent:'center'}}><Loader /></div>
        }
        else if( modalInfo.type === "edit"){
            return(
                <Form fullWidth={true} callBackForm={updatePharmacyItemCallBack}
                    initialData={editItem} fields = {FORM_EDIT}
                    closeCallBack={() => resetModal()}/> 
            )
        }
        else if(modalInfo.type === "delete" && deleteItem){
            return(
                <>
                    <Typography variant="body1"><Translate id="pages.hospital.pharmacy.modal.message.delete" /></Typography>
                    <Typography variant="body2" style={{fontWeight:'bold'}}>{deleteItem.name}</Typography>
                    <Grid item xs={12} style={{paddingTop:'1rem'}}>
                        <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                            <Translate id="general.cancel" />
                        </ButtonCancel>
                        <ButtonContinue onClick={callbackDeleteItem ? () => callbackDeleteItem(deleteItem.id as number) : ""} data-testid="continue-modal" color="green">
                            <Translate id="general.continue" />
                        </ButtonContinue>
                    </Grid>
                </>
            )
        }
           
    }
    function renderTable(){
        const headCells = [{ id: "code", alignment: "left", label: <Translate id={`pages.hospital.pharmacy.pharmacy_items.code`} /> },
                        { id: "name", alignment: "left", label: <Translate id={`pages.hospital.pharmacy.pharmacy_items.name`} /> },
                        { id: "activePrinciple", alignment: "left", label: <Translate id={`pages.hospital.pharmacy.pharmacy_items.activePrinciple`} /> },
                        { id: "amount", alignment: "left", label: <Translate id={`pages.hospital.pharmacy.pharmacy_items.amount`} /> },
                        { id: "price", alignment: "left", label: <Translate id={`pages.hospital.pharmacy.pharmacy_items.price`} /> },
                        { id: "unit", alignment: "left", label: <Translate id={`pages.hospital.pharmacy.pharmacy_items.unit`} /> },
                        { id: "provider", alignment: "left", label: <Translate id={`pages.hospital.pharmacy.pharmacy_items.provider`} /> },
                        { id: "type", alignment: "left", label: <Translate id={`pages.hospital.pharmacy.pharmacy_items.type`} /> },
                        { id: "status", alignment: "left", label: <Translate id={`pages.hospital.pharmacy.pharmacy_items.status`} /> },
                ];
        const rows = filteredItems.map((item, idx) => ({
            id: idx,
            code: item.code,
            name: item.name,
            activePrinciple: item.activePrinciple,
            amount: item.amount,
            price: item.price,
            unit: item.unit,
            provider: item.provider,
            type: item.type,
            status: item.amount === 0 ? <ColourChip label={translate("pages.hospital.pharmacy.pharmacy_items.status_values.finished")} rgbcolor={red[500]} />  : item.amount < item.threshold ? <ColourChip label={translate("pages.hospital.pharmacy.pharmacy_items.status_values.low")} rgbcolor={orange[500]} /> : <ColourChip label={translate("pages.hospital.pharmacy.pharmacy_items.status_values.normal")} rgbcolor={green[500]} />,
        }));
        if(filteredItems.length === 0){
            return (
                <Box>
                    <Typography variant="body2">
                        <Translate id="pages.hospital.pharmacy.filter_box.no_items" />
                    </Typography>
                </Box>);
        }
        return (
            <>
                <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells} actions={[{ "type": "delete", "func": (id: number) => showDeleteItem(id)}, { "type": "edit", "func": (id: number) => showEditItem(id) }]} />
            </>
        );
    }
    return (
        <>  
            <Modal key="modal" medium size="sm" open={modalInfo.showModal} title={translate(`pages.hospital.pharmacy.modal.title.${modalInfo.type}`)} closeModal={() => resetModal()}>
                <>  
                    
                    {
                        renderModal()
                    }

                </>
            </Modal>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSnackbar.show}
                autoHideDuration={4000}
                >
                    <div>
                    {
                        showSnackbar.message && 
                        <>
                        {
                            (showSnackbar.message && showSnackbar.severity) &&
                            <Alert severity={showSnackbar.severity}>
                                <Translate id={showSnackbar.message} />
                            </Alert>
                        }
                        </>
                    }
                    </div>
            </Snackbar>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{padding:"1rem", marginTop:'1rem'}} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid item xs={6}>
                                    <TextField fullWidth onChange={(event) => filterItems(event.target.value)} variant="outlined" label={translate("pages.hospital.pharmacy.filter_box.search_item")} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container alignItems='center'>
                                <Grid item zeroMinWidth>
                                    <Typography variant="body2" component="span">Filter:</Typography>
                                    <ChipContainer><ColourChip clickable rgbcolor={orange[500]} onClick={filterStatusLow} label={translate("pages.hospital.pharmacy.pharmacy_items.status_values.low")}  /></ChipContainer> 
                                    <ChipContainer><ColourChip clickable rgbcolor={red[500]} onClick={filterStatusFinished} label={translate("pages.hospital.pharmacy.pharmacy_items.status_values.finished")}  /></ChipContainer> 
                                </Grid>
                                <Grid xs={4} item  >
                                    <div style={{paddingLeft:'1rem'}}>
                                        <FormControl fullWidth variant="outlined" margin="dense"  >
                                            <InputLabel id="provider">{providerFilter ? providerFilter : "Provider"}</InputLabel>
                                                <Select
                                                    labelId="provider"
                                                    id="provider"
                                                    label={providerFilter}
                                                    onChange={(event) => setProviderFilter(event.target.value as string)}
                                                >
                                                { providerOptions.map((option) => {
                                                    return <MenuItem value={option.value}>{option.label}</MenuItem>
                                                }) }
                                                </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    {
                        renderTable()
                    }
                </Grid>
            </Grid>
        </>
    );
};

export const InventoryList = withLocalize(InventoryListCore);
