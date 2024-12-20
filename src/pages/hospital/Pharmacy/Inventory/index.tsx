import React, { useEffect, useState } from 'react';
import { ReactGrid, Column, Row, CellChange, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { IPharmacyItem } from '../types';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { Button, Grid, Snackbar } from '@mui/material';
import Loader from '../../../../components/Loader';
import Pharmacy, { PharmacyType } from '..';
import axios from 'axios';
import Spreadsheet from "react-spreadsheet";
import LoadExcel from '../LoadExcel';
import { ButtonAccept } from '../../../../components/general/mini_components';
import { useSnackBarState } from '../../../../hooks';
import { Alert } from '@mui/material';
import { Color } from '@mui/lab';
import { InventoryExcel } from './InventoryExcel';
import {InventoryList} from './InventoryList';

interface InventoryProps {
    uuidInvestigation: string,
    idPharmacy: number,
    typePharmacy: PharmacyType,
    showAddPharmacyItem: boolean,
    setShowAddPharmacyItem: (show: boolean) => void,
    pharmacyItemsInit: IPharmacyItem[]
}

export const DEFAULT_ROWS: IPharmacyItem = {
    name: "",
    activePrinciple: "",
    amount: 0,
    price: 0,
    unit: 0,
    provider: "",     
    type: 0,    
    threshold: 0,
};
const Inventory: React.FC<InventoryProps> = ({ uuidInvestigation, showAddPharmacyItem,  setShowAddPharmacyItem, idPharmacy, pharmacyItemsInit }) => {
    const [pharmacyItems, setPharmacyItems] = React.useState<IPharmacyItem[] | null>(pharmacyItemsInit ? pharmacyItemsInit : []);
    
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();

    function updateInventory(pharmacyItems: IPharmacyItem[]) {
        setLoading(true);
        axios.put(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/pharmacy/" + idPharmacy + "/items", pharmacyItems, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                //setPharmacyItems(response.data.pharmacyItems);
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.success", severity:"success"});
            })
            .catch((error) => {
                console.log(error);
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.error", severity:"error"});
            });
    }
    function deleteItemCallback(id:number){
        setLoading(true);
        axios.delete(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/pharmacy/" + idPharmacy + "/item/"+id, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                //Remove from the list the item with the id
                let newPharmacyItems = pharmacyItems ? pharmacyItems.filter((item) => {
                    return item.id !== id;
                }) : [];
                setPharmacyItems(newPharmacyItems);
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.success", severity:"success"});
            })
            .catch((error) => {
                console.log(error);
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.error", severity:"error"});
            });
    }
    function addPharmacyItem(pharmacyItem:IPharmacyItem){
        setLoading(true);
        axios.post(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/pharmacy/" + idPharmacy + "/item/", pharmacyItem, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                // update the pharmacyItems with the date returned by the server
                const newPharmacyItem = pharmacyItems ? [...pharmacyItems, response.data.pharmacyItem] : [response.data.pharmacyItem];
                setPharmacyItems(newPharmacyItem);
                setShowAddPharmacyItem(false);
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.success", severity:"success"});
            })
            .catch((error) => {
                console.log(error);
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.error", severity:"error"});
            });
    }
    function updatePharmacyItem(pharmacyItem:IPharmacyItem){
        setLoading(true);
        axios.put(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/pharmacy/" + idPharmacy + "/item/"+pharmacyItem.id, pharmacyItem, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                // update the pharmacyItems with the date returned by the server
                let newPharmacyItems = pharmacyItems ? pharmacyItems.map((item) => {
                    if(item.id === pharmacyItem.id){
                        return response.data.pharmacyItem;
                    }
                    else{   
                        return item;
                    }
                }) : null;
                setPharmacyItems(newPharmacyItems);
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.success", severity:"success"});
            })
            .catch((error) => {
                console.log(error);
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.error", severity:"error"});
            });
    }
    

    if (!pharmacyItems) {
        return <Loader />
    }
    else {
        return <InventoryComponentLocalized editAsExcel={pharmacyItems.length === 0} 
                    showAddPharmacyItem={showAddPharmacyItem} setShowAddPharmacyItem = {setShowAddPharmacyItem}
                    showSnackbar={showSnackbar} loading={loading} pharmacyItems={pharmacyItems} saveInventoryCallBack={(items) => updateInventory(items)}
                    updatePharmacyItemCallBack={(item) => updatePharmacyItem(item)} deleteItemCallback={(id) => deleteItemCallback(id)}
                    addPharmacyItemCallBack={(item) => addPharmacyItem(item)}
                 />
    }
}

export default Inventory;

export interface InventoryLocalizedProps extends LocalizeContextProps {
    pharmacyItems: IPharmacyItem[];
    loading: boolean;
    editAsExcel?: boolean;
    showAddPharmacyItem?: boolean;
    showSnackbar:{
        show: boolean;
        message?: string | undefined;
        severity?: Color | undefined;
    },
    saveInventoryCallBack?: (items: IPharmacyItem[]) => void,
    deleteItemCallback?: (id: number) => void,
    setShowAddPharmacyItem?: (show: boolean) => void,
    updatePharmacyItemCallBack?: (item: IPharmacyItem) => void,
    addPharmacyItemCallBack?: (item: IPharmacyItem) => void,
}

const InventoryComponent: React.FC<InventoryLocalizedProps> = ({ editAsExcel, showAddPharmacyItem, pharmacyItems, loading, showSnackbar, setShowAddPharmacyItem, addPharmacyItemCallBack, updatePharmacyItemCallBack, saveInventoryCallBack, deleteItemCallback}) => {
    
    if(editAsExcel && saveInventoryCallBack){
        return <InventoryExcel  showSnackbar={showSnackbar} loading={loading} pharmacyItems={pharmacyItems} saveInventoryCallBack={ (items) => saveInventoryCallBack(items)} />
    }
    else if(updatePharmacyItemCallBack && deleteItemCallback && addPharmacyItemCallBack && setShowAddPharmacyItem){
        return <InventoryList pharmacyItems={pharmacyItems} showAddPharmacyItem={showAddPharmacyItem} addPharmacyItemCallBack={addPharmacyItemCallBack} 
            setShowAddPharmacyItem = {setShowAddPharmacyItem} showSnackbar={showSnackbar}  loading={loading} deleteItemCallback={(idPharmacyItem) => deleteItemCallback(idPharmacyItem)} updatePharmacyItemCallBack={ (items) => updatePharmacyItemCallBack(items)}  />
    }
    else{
        return null;
    }
}

export const InventoryComponentLocalized = withLocalize(InventoryComponent);