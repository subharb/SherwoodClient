import React from 'react';
import { ReactGrid, Column, Row, CellChange, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { IPharmacyItem } from './types';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { Button } from '@material-ui/core';

interface InventoryProps extends LocalizeContextProps {
    pharmacyItemsInit: IPharmacyItem[];
}


const applyChangesToPeople = (
    changes: CellChange<TextCell>[],
    prevPharmacyItem: IPharmacyItem[]
  ): IPharmacyItem[] => {
    changes.forEach((change) => {
      const personIndex = change.rowId as number;
      const fieldName = change.columnId as string;
      prevPharmacyItem[personIndex][fieldName] = change.newCell.text;
    });
    return [...prevPharmacyItem];
  };

const Inventory: React.FC<InventoryProps> = ({ pharmacyItemsInit, translate }) => {
   

    const getColumns = (): Column[] => [
        { columnId: "code", width: 150 },
        { columnId: "name", width: 150 },
        { columnId: "price", width: 150 },
        { columnId: "amount", width: 150 },
        { columnId: "type", width: 150 },
        { columnId: "unit", width: 150 },
        { columnId: "provider", width: 150 },
        { columnId: "threshold", width: 150 },
        { columnId: "activePrinciple", width: 150 }
    ];
    const headerRow: Row = {
        rowId: "header",
        cells: [
            { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.code").toString() },
            { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.name").toString() },
            { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.price").toString() },
            { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.amount").toString() },
            { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.type").toString() },
            { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.unit").toString() },
            { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.provider").toString() },
            { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.threshold").toString() },
            { type: "header", text: translate("pages.hospital.pharmacy.pharmacy_items.activePrinciple").toString() }
        ]
    };
    const getRows = (pharmacyItems: IPharmacyItem[]): Row[] => [
        headerRow,
        ...pharmacyItems.map<Row>((item, idx) => ({
            rowId: idx,
            cells: [
                { type: "text", text: item.code },
                { type: "text", text: item.name },
                { type: "text", text: item.price.toString() },
                { type: "text", text: item.amount.toString() },
                { type: "text", text: item.type.toString() },
                { type: "text", text: item.unit.toString() },
                { type: "text", text: item.unit.toString() },
                { type: "text", text: item.threshold.toString() },
                { type: "text", text: item.activePrinciple },
            ]
        }))
    ];
    const [pharmacyItems, setPharmacyItems] = React.useState<IPharmacyItem[]>(pharmacyItemsInit);

    const rows = getRows(pharmacyItems);
    const columns = getColumns();

    const handleChanges = (changes: CellChange<TextCell>[]) => { 
        setPharmacyItems((prevPeople) => applyChangesToPeople(changes, prevPeople)); 
      }; 
    

    return(
        <>
            <ReactGrid rows={rows} columns={columns} 
                onCellsChanged={handleChanges} 
                stickyTopRows={1}
                />
            <Button variant="contained" color="primary" onClick={() => console.log(pharmacyItems)}>Save</Button>
        </>);
};

export default withLocalize(Inventory);
