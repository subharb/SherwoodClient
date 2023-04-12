import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@material-ui/core';
import { green, orange, red } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useMemo } from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import { InventoryLocalizedProps } from '.';
import { EnhancedTable } from '../../../../components/general/EnhancedTable';
import Form from '../../../../components/general/form';
import { FormValues, IForm } from '../../../../components/general/formTSFunction';
import { ButtonAccept, ButtonCancel, ButtonContinue, FieldWrapper } from '../../../../components/general/mini_components';
import { ColourChip } from '../../../../components/general/mini_components-ts';

import Modal from '../../../../components/general/modal';
import Loader from '../../../../components/Loader';
import { ChipContainer } from '../../Service/RequestInfo';
import { IPharmacyItem } from '../types';

const InventoryListCore: React.FC<InventoryLocalizedProps> = ({ pharmacyItems, showAddPharmacyItem, loading, showSnackbar, translate, addPharmacyItemCallBack, updatePharmacyItemCallBack, deleteItemCallback: callbackDeleteItem }) => {
    const [filteredItems, setFilteredItems] = React.useState<IPharmacyItem[]>(pharmacyItems);
    const [lowStatusFilter, setLowStatusFilter] = React.useState<boolean>(false);
    const [finishedStatusFilter, setFinishedStatusFilter] = React.useState<boolean>(false);
    const [nameFilter, setNameFilter] = React.useState<string>("");
    const [modalInfo, setModalInfo] = React.useState({showModal: false, type:""});
    const [editItem, setEditItem] = React.useState<FormValues>({});
    const [deleteItem, setDeleteItem] = React.useState<IPharmacyItem | null>(null);
    const [providerOptions, setProviderOptions] = React.useState<{value:string, label:string}[]>([]);
    const [providerFilter, setProviderFilter] = React.useState<string>("");
    const [currentPage, setCurrentPage] = React.useState<number>(0);

    useEffect(() => {
        setFilteredItems(pharmacyItems.filter((item: IPharmacyItem) => {
            return (item.name.toLocaleLowerCase().includes(nameFilter) &&
                (finishedStatusFilter ? item.amount === 0 : true) && (lowStatusFilter ? item.amount < item.threshold : true) 
                && (providerFilter !== "" ? item.provider === providerFilter : true))
        }));
        setCurrentPage(0);
    }, [nameFilter, lowStatusFilter, providerFilter, finishedStatusFilter, pharmacyItems]);

    useEffect(() => {
        if(showSnackbar.severity === "success"){
            setModalInfo({showModal: false, type:""});
        }
    }, [showSnackbar])

    useEffect(() => {
        if(showAddPharmacyItem){
            setModalInfo({showModal: true, type:"add"});
        }
    }, [showAddPharmacyItem])

    useEffect(() => {
        // Set the option of a select from the providers of pharmacyItems but not repeated providers
        const providers = pharmacyItems.map((item: IPharmacyItem) => item.provider);
        const providersSet = new Set(providers);
        const providersArray = Array.from(providersSet);
        const providersOptions = providersArray.map((provider: string) => ({value: provider, label: provider}));
        setProviderOptions(providersOptions);
        
    }, [pharmacyItems])

    const FORM_ADD = useMemo(() => {
        return {
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
                required : true,
                name:"type",
                type:"select",
                numberColumnsLg:3,
                numberColumnsXs:3,
                label:"pages.hospital.pharmacy.pharmacy_items.type",
                shortLabel: "pages.hospital.pharmacy.pharmacy_items.type",
                validation : "textMin2",
                options: [
                    {value: "MED", label: "pages.hospital.pharmacy.pharmacy_items.options.type.MED"},
                    {value: "MDS", label: "pages.hospital.pharmacy.pharmacy_items.options.type.MDS"},
                    {value: "SGP", label: "pages.hospital.pharmacy.pharmacy_items.options.type.SGP"},
                    {value: "PN", label: "pages.hospital.pharmacy.pharmacy_items.options.type.PN"},
                    {value: "IMZ", label: "pages.hospital.pharmacy.pharmacy_items.options.type.IMZ"},
                    {value: "CMD", label: "pages.hospital.pharmacy.pharmacy_items.options.type.CMD"},
                ]
            }, 
            "dossageForm" : {
                required : true,
                name:"dossageForm",
                type:"select",
                numberColumnsLg:3,
                numberColumnsXs:3,
                label:"pages.hospital.pharmacy.pharmacy_items.dossage_form",
                shortLabel: "pages.hospital.pharmacy.pharmacy_items.dossage_form",
                validation : "textMin2",
                options: [    {"value": "TAB", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.TAB"},    {"value": "CAP", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.CAP"},    {"value": "LIQ", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.LIQ"},    {"value": "INJ", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.INJ"},    {"value": "TOP", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.TOP"},    {"value": "INH", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.INH"},    {"value": "SUP", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.SUP"},    {"value": "PAT", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.PAT"},    {"value": "EYE", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.EYE"},    {"value": "NAS", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.NAS"},    {"value": "OTH", "label": "pages.hospital.pharmacy.pharmacy_items.options.dossage_form.OTH"}]
            },  
            "routeAdmin" : {
                required : true,
                name:"routeAdmin",
                type:"select",
                numberColumnsLg:3,
                numberColumnsXs:3,
                label:"pages.hospital.pharmacy.pharmacy_items.routes",
                shortLabel: "pages.hospital.pharmacy.pharmacy_items.routes",
                validation : "textMin2",
                options: [    {"value": "PO", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.PO"},    {"value": "TOP", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.TOP"},    {"value": "INH", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.INH"},    {"value": "IV", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.IV"},    {"value": "IM", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.IM"},    {"value": "SC", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.SC"},    {"value": "PR", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.PR"},    {"value": "PV", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.PV"},    {"value": "NS", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.NS"},    {"value": "OPH", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.OPH"},    {"value": "OTH", "label": "pages.hospital.pharmacy.pharmacy_items.options.routes.OTH"}]
            },  
            "category" : {
                required : true,
                name:"category",
                type:"select",
                numberColumnsLg:3,
                numberColumnsXs:3,
                label:"pages.hospital.pharmacy.pharmacy_items.category",
                shortLabel: "pages.hospital.pharmacy.pharmacy_items.category",
                validation : "textMin2",
                options: [    {"value": "ALG", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.ALG"},    {"value": "ANE", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.ANE"},    {"value": "ALL", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.ALL"},    {"value": "HTN", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.HTN"},    {"value": "ARR", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.ARR"},    {"value": "ABX", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.ABX"},    {"value": "ACG", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.ACG"},    {"value": "DPR", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.DPR"},    {"value": "DBT", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.DBT"},    {"value": "EME", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.EME"},    {"value": "EPL", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.EPL"},    {"value": "AFG", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.AFG"},    {"value": "MLR", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.MLR"},    {"value": "ANEPC", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.ANEPC"},    {"value": "PRK", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.PRK"},    {"value": "ARV", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.ARV"},    {"value": "SPM", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.SPM"},    {"value": "ULC", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.ULC"},    {"value": "AVR", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.AVR"},    {"value": "BEN", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.BEN"},    {"value": "BRN", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.BRN"},    {"value": "DRT", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.DRT"},    {"value": "HRM", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.HRM"},    {"value": "INMUNO", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.INMUNO"},    {"value": "LAX", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.LAX"},    {"value": "VIT", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.VIT"},    {"value": "OTH", "label": "pages.hospital.pharmacy.pharmacy_items.options.category.OTH"}]
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
    }, [])

    const FORM_EDIT = useMemo(() => {
        const tempEdit:IForm = {...FORM_ADD};
        tempEdit.id =  {
            required : true,
            name:"id",
            type:"hidden",
            label:"pages.hospital.pharmacy.pharmacy_items.code",
            shortLabel: "pages.hospital.pharmacy.pharmacy_items.code",
            validation : "number"
        }
        return tempEdit;
    }, [FORM_ADD]);
    
    function resetModal(){
        setModalInfo({showModal: false, type:""});
    }

    function showDeleteItem(id: number){
        const findItem = pharmacyItems.find((item: IPharmacyItem) => item.id === id);
        if(findItem){
            setDeleteItem(findItem);
            setModalInfo({showModal: true, type:"delete"});
        }
    }
    function showEditItem(id: number){
        const findItem = pharmacyItems.find((item: IPharmacyItem) => item.id === id);
        if(findItem){
            setEditItem({...findItem});
            setModalInfo({showModal: true, type:"edit"});
        } 
    }
    function filterItems(value: string){
        setNameFilter(value.toLocaleLowerCase());
    }
    function filterStatusLow(){
        if(!lowStatusFilter){
            setFinishedStatusFilter(false);
        }
        setLowStatusFilter(!lowStatusFilter);
        
    }
    function filterStatusFinished(){
        if(!finishedStatusFilter){
            setLowStatusFilter(false);
        }
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
        else if( modalInfo.type === "add"){
            return(
                <Form fullWidth={true} callBackForm={addPharmacyItemCallBack}
                    fields = {FORM_ADD}
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
            id: item.id,
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
                <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells} 
                    currentPage={currentPage} changePageCallback={(page: number) => setCurrentPage(page)}
                    actions={[{ "type": "delete", "func": (id: number) => showDeleteItem(id)}, { "type": "edit", "func": (id: number) => showEditItem(id) }]} />
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
