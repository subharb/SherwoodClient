import React, { useEffect, useState } from 'react';
import { ReactGrid, Column, Row, CellChange, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { IPharmacyItem } from './types';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { Button, Grid } from '@material-ui/core';
import Loader from '../../../components/Loader';
import Pharmacy, { PharmacyType } from '.';
import axios from 'axios';
import Spreadsheet from "react-spreadsheet";
import LoadExcel from './LoadExcel';
import { ButtonAccept } from '../../../components/general/mini_components';

interface InventoryProps {
    uuidInvestigation: string,
    idPharmacy: number,
    typePharmacy: PharmacyType,
    pharmacyItemsInit: IPharmacyItem[]
}

const DEFAULT_ROWS: IPharmacyItem = {
    code: "",
    name: "",
    price: 0,    
    amount: 0,
    type: 0,
    unit: 0,
    provider: "",
    threshold: 0,
    activePrinciple: ""

};
const Inventory: React.FC<InventoryProps> = ({ uuidInvestigation, typePharmacy, idPharmacy, pharmacyItemsInit }) => {
    const [pharmacyItems, setPharmacyItems] = React.useState<IPharmacyItem[] | null>(pharmacyItemsInit ? pharmacyItemsInit : []);
    const [loading, setLoading] = React.useState<boolean>(false);

    function updateInventory(pharmacyItems: IPharmacyItem[]) {
        setLoading(true);
        axios.put(process.env.REACT_APP_API_URL + "/hospital/" + uuidInvestigation + "/pharmacy/" + idPharmacy + "/items", pharmacyItems, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                setPharmacyItems(response.data.pharmacyItems);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }
    

    if (!pharmacyItems) {
        return <Loader />
    }
    else {
        return <InventoryCoreLocalized loading={loading} pharmacyItemsInit={pharmacyItems} saveInventoryCallBack={(items) => updateInventory(items)} />
    }
}

export default Inventory;

interface InventoryLocalizedProps extends LocalizeContextProps {
    pharmacyItemsInit: IPharmacyItem[];
    loading: boolean;
    saveInventoryCallBack: (items: IPharmacyItem[]) => void
}

const applyChangesToPeople = (
    changes: CellChange<TextCell>[],
    prevPharmacyItem: IPharmacyItem[]
): IPharmacyItem[] => {
    changes.forEach((change) => {
        const personIndex = change.rowId as number;
        const fieldName = change.columnId as string;
        // @ts-ignore: Unreachable code error
        prevPharmacyItem[personIndex][fieldName] = change.newCell.text;
    });
    return [...prevPharmacyItem];
};

// const InventoryCore: React.FC<InventoryLocalizedProps> = ({ pharmacyItemsInit, translate, saveInventoryCallBack }) => {
//     const [pharmacyItems, setPharmacyItems] = useState<IPharmacyItem[]>(pharmacyItemsInit);
//     if(pharmacyItems.length === 0){
//         return (
//             <LoadExcel callbackExcelReady={(excel) => console.log(excel)} />
//        )
//     }
//     else{
//         return (<div></div>)
//     }
// }

const InventoryCore: React.FC<InventoryLocalizedProps> = ({ pharmacyItemsInit, loading, translate, saveInventoryCallBack }) => {
    const headerRow =  Object.keys(DEFAULT_ROWS).map((col) => {
        return { value: col }
    })
    const emptyRow = Object.keys(DEFAULT_ROWS).map((col) => {
        return { value: "" }
    });
    const [data, setData] = useState([
        headerRow,
        emptyRow
    ]);

    function checkValidData(data:any[]) {
        console.log(data);
        let pharmacyItems:IPharmacyItem[] = [] as IPharmacyItem[];
        const keysPharmacyItem = Object.keys(DEFAULT_ROWS);
        data.forEach((row, index) => {
            if(index !== 0){
                let currentPharmacyItem: IPharmacyItem = {} as IPharmacyItem;
                row.forEach((cell:{value:string | number}, indexCell:number) => {
                    const keyPharma = keysPharmacyItem[indexCell] as keyof IPharmacyItem ;
                    let currentValue = cell.value;
                    if(currentValue === ""){
                        // @ts-ignore: Unreachable code error
                        currentValue = DEFAULT_ROWS[keyPharma];
                    }
                    if(currentValue !== undefined && keyPharma !== undefined){
                        // @ts-ignore: Unreachable code error
                        currentPharmacyItem[keyPharma] = currentValue;
                    }
                    
                })
                if(currentPharmacyItem["code"]){
                    pharmacyItems.push(currentPharmacyItem);
                }
            }
        });
        saveInventoryCallBack(pharmacyItems);
    }
    useEffect(() => {
        
        const initPharmaItems:{value:string}[][] = [];
        pharmacyItemsInit.forEach((item) => {
            const row:{value:string}[] = []
            Object.keys(DEFAULT_ROWS).forEach((key) => {
                if(key !== "id"){
                    const value = item[key as keyof IPharmacyItem] as string;
                    
                    row.push({ value:  value});
                }
                
            })
            initPharmaItems.push(row);
        });
        let initData = [headerRow, ...initPharmaItems, emptyRow];
        
        
        
        setData(initData);

    }, [pharmacyItemsInit]);
    if(loading){
        return <Loader />
    }
    // @ts-ignore: Unreachable code error
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Spreadsheet data={data} onChange={setData} HeaderRowComponent />
            </Grid>
            <Grid item xs={12}>
                <ButtonAccept color="primary" onClick={() => checkValidData(data)}>Save</ButtonAccept>
            </Grid>
        </Grid>
    );
};

export const InventoryCoreLocalized = withLocalize(InventoryCore);


// const InventoryCore: React.FC<InventoryLocalizedProps> = ({ pharmacyItemsInit, translate, saveInventoryCallBack }) => {
//     const getColumns = (): Column[] => [
//         { columnId: "code", width: 150 },
//         { columnId: "name", width: 150 },
//         { columnId: "price", width: 150 },
//         { columnId: "amount", width: 150 },
//         { columnId: "type", width: 150 },
//         { columnId: "unit", width: 150 },
//         { columnId: "provider", width: 150 },
//         { columnId: "threshold", width: 150 },
//         { columnId: "activePrinciple", width: 150 }
//     ];
//     const headerRow: Row = {
//         rowId: "header",
//         cells: [
//             { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.code").toString() },
//             { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.name").toString() },
//             { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.price").toString() },
//             { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.amount").toString() },
//             { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.type").toString() },
//             { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.unit").toString() },
//             { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.provider").toString() },
//             { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.threshold").toString() },
//             { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.activePrinciple").toString() }
//         ]
//     };
//     const getRows = (pharmacyItems: IPharmacyItem[]): Row[] => [
//         headerRow,
//         ...pharmacyItems.map<Row>((item, idx) => ({
//             rowId: idx,
//             cells: [
//                 { type: "text", text: item.code },
//                 { type: "text", text: item.name },
//                 { type: "text", text: item.price.toString() },
//                 { type: "text", text: item.amount.toString() },
//                 { type: "text", text: item.type.toString() },
//                 { type: "text", text: item.unit.toString() },
//                 { type: "text", text: item.unit.toString() },
//                 { type: "text", text: item.threshold.toString() },
//                 { type: "text", text: item.activePrinciple },
//             ]
//         }))
//     ];
//     const [pharmacyItems, setPharmacyItems] = React.useState<IPharmacyItem[]>(pharmacyItemsInit);

//     const rows = getRows(pharmacyItems);
//     const columns = getColumns();

//     const handleChanges = (changes: CellChange<TextCell>[]) => {
//         setPharmacyItems((prevPeople) => applyChangesToPeople(changes, prevPeople));
//     };

//     function saveInventory() {
//         saveInventoryCallBack(pharmacyItems);
//     }

//     return (
//         <>
//             <Grid container spacing={3}>
//             <ReactGrid rows={rows} columns={columns}
//                 // @ts-ignore: Unreachable code error
//                 onCellsChanged={handleChanges}
//                 enableFullWidthHeader
//                 stickyTopRows={1}
//             />
//             </Grid>
//             <Button variant="contained" color="primary" onClick={saveInventory}>Save</Button>
//         </>);
// };

// export const InventoryCoreLocalized = withLocalize(InventoryCore);
