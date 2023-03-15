import { Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { Translate, withLocalize } from "react-localize-redux";
import { Spreadsheet } from "react-spreadsheet";
import { DEFAULT_ROWS, InventoryLocalizedProps } from ".";
import { ButtonAccept } from "../../../../components/general/mini_components";
import Loader from "../../../../components/Loader";
import { IPharmacyItem } from "../types";

const InventoryExcelCore: React.FC<InventoryLocalizedProps> = ({ pharmacyItems: pharmacyItemsInit, loading, showSnackbar, saveInventoryCallBack }) => {
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
        saveInventoryCallBack ? saveInventoryCallBack(pharmacyItems) : console.log("No callback");
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
    
    return (
        <>
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
        
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Spreadsheet data={data} 
                        // @ts-ignore: Unreachable code error
                        onChange={setData} HeaderRowComponent />
                </Grid>
                <Grid item xs={12}>
                    <ButtonAccept color="primary" onClick={() => checkValidData(data)}>Save</ButtonAccept>
                </Grid>
            </Grid>
        </>
    );
};

export const InventoryExcel = withLocalize(InventoryExcelCore);