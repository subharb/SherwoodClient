import { blue, cyan, orange, purple } from "@mui/material/colors";
import { BillItem, DocumentStatus, DocumentType } from "../pages/hospital/Billing/types";
import { stringDatePostgresToDate } from ".";


export function calculateTotalBill(items:BillItem[], withoutTypes:number[] = [], officialPrices = false){
    let amountSeparation = [0,0,0,0,0, 0];
    for(let i = 0; i < items.length; i++){
        const currentBillItem = items[i];
        if(!withoutTypes.includes(currentBillItem.type ? parseInt(currentBillItem.type) : 0)){
            const amount = currentBillItem.amountAlter && !officialPrices ? Number(currentBillItem.amountAlter) : Number(currentBillItem.amount);
            amountSeparation[currentBillItem.type ? currentBillItem.type : 0] += Number(amount) * Number(currentBillItem.quantity);  
        }
    }
    const firstAmount = (amountSeparation[0] + amountSeparation[3] + amountSeparation[5]) - (amountSeparation[1]);
    let discountAmount = 0;
    if(!withoutTypes.includes(2)){
        discountAmount = (firstAmount*amountSeparation[2])/100;
    }
    const total = firstAmount - discountAmount;
    //Redondeo a dos decimales
    return  Math.round(total * 100) / 100
}

export function documentTypeToColor(type:DocumentType){
    switch(type){
        case DocumentType.BUDGET:
            return blue[500];
        case DocumentType.SUMMARY:
            return orange[500];
        case DocumentType.INVOICE:
            return purple[500];
    }
}

export function documentStatusToColor(type:DocumentStatus){
    switch(type){
        case DocumentStatus.DRAFT:
            return cyan[500];
        case DocumentStatus.CLOSED:
            return "#000";
    }
}

export function documentTypeToString(type:DocumentType){
    switch(type){
        case DocumentType.BUDGET:
            return "budget";
        case DocumentType.SUMMARY:
            return "summary";
        case DocumentType.INVOICE:
            return "invoice";
    }
}

export function getDateFromStringOrDate(date:string | Date){
    if(typeof date === "string" || date instanceof String){
        return stringDatePostgresToDate(date)
    }
    else{
        return date;
    }
}
