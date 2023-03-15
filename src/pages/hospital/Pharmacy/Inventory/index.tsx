import React, { useEffect, useState } from 'react';
import { ReactGrid, Column, Row, CellChange, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { IPharmacyItem } from '../types';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { Button, Grid, Snackbar } from '@material-ui/core';
import Loader from '../../../../components/Loader';
import Pharmacy, { PharmacyType } from '..';
import axios from 'axios';
import Spreadsheet from "react-spreadsheet";
import LoadExcel from '../LoadExcel';
import { ButtonAccept } from '../../../../components/general/mini_components';
import { useSnackBarState } from '../../../../hooks';
import { Alert, Color } from '@material-ui/lab';
import { InventoryExcel } from './InventoryExcel';
import {InventoryList} from './InventoryList';

interface InventoryProps {
    uuidInvestigation: string,
    idPharmacy: number,
    typePharmacy: PharmacyType,
    pharmacyItemsInit: IPharmacyItem[]
}

export const DEFAULT_ROWS: IPharmacyItem = {
    code: "",
    name: "",
    activePrinciple: "",
    amount: 0,
    price: 0,
    unit: 0,
    provider: "",     
    type: 0,    
    threshold: 0,
};
const Inventory: React.FC<InventoryProps> = ({ uuidInvestigation, typePharmacy, idPharmacy, pharmacyItemsInit }) => {
    const [pharmacyItems, setPharmacyItems] = React.useState<IPharmacyItem[] | null>(pharmacyItemsInit ? pharmacyItemsInit : []);
    
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();

    function updateInventory(pharmacyItems: IPharmacyItem[]) {
        setLoading(true);
        axios.put(process.env.REACT_APP_API_URL + "/hospital/" + uuidInvestigation + "/pharmacy/" + idPharmacy + "/items", pharmacyItems, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                //setPharmacyItems(response.data.pharmacyItems);
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.success", severity:"success"});
            })
            .catch((error) => {
                console.log(error);
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.success", severity:"error"});
            });
    }
    function deleteItemCallback(id:number){
        setLoading(true);
        axios.delete(process.env.REACT_APP_API_URL + "/hospital/" + uuidInvestigation + "/pharmacy/" + idPharmacy + "/item/"+id, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.success", severity:"error"});
            });
    }
    function updatePharmacyItem(pharmacyItem:IPharmacyItem){
        setLoading(true);
        axios.put(process.env.REACT_APP_API_URL + "/hospital/" + uuidInvestigation + "/pharmacy/" + idPharmacy + "/item/"+pharmacyItem.id, pharmacyItem, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
                setShowSnackbar({show:true, message:"pages.hospital.pharmacy.success", severity:"error"});
            });
    }
    

    if (!pharmacyItems) {
        return <Loader />
    }
    else {
        return <InventoryComponentLocalized editAsExcel={pharmacyItems.length === 0} 
                    showSnackbar={showSnackbar} loading={loading} pharmacyItems={pharmacyItems} saveInventoryCallBack={(items) => updateInventory(items)}
                    updatePharmacyItemCallBack={(item) => updatePharmacyItem(item)} deleteItemCallback={(id) => deleteItemCallback(id)}
                 />
    }
}

export default Inventory;

export interface InventoryLocalizedProps extends LocalizeContextProps {
    pharmacyItems: IPharmacyItem[];
    loading: boolean;
    editAsExcel?: boolean;
    showSnackbar:{
        show: boolean;
        message?: string | undefined;
        severity?: Color | undefined;
    },
    saveInventoryCallBack?: (items: IPharmacyItem[]) => void,
    deleteItemCallback?: (id: number) => void,
    updatePharmacyItemCallBack?: (item: IPharmacyItem) => void
}

const InventoryComponent: React.FC<InventoryLocalizedProps> = ({ editAsExcel, pharmacyItems, loading, showSnackbar, updatePharmacyItemCallBack, saveInventoryCallBack, deleteItemCallback}) => {
    
    if(editAsExcel && saveInventoryCallBack){
        return <InventoryExcel  showSnackbar={showSnackbar} loading={loading} pharmacyItems={pharmacyItems} saveInventoryCallBack={ (items) => saveInventoryCallBack(items)} />
    }
    else if(updatePharmacyItemCallBack && deleteItemCallback){
        return <InventoryList pharmacyItems={pharmacyItems} showSnackbar={showSnackbar}  loading={loading} deleteItemCallback={(idPharmacyItem) => deleteItemCallback(idPharmacyItem)} updatePharmacyItemCallBack={ (items) => updatePharmacyItemCallBack(items)}  />
    }
    else{
        return null
    }
}

export const InventoryComponentLocalized = withLocalize(InventoryComponent);