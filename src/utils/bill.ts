import { BillItem } from "../pages/hospital/Billing/types";


export function calculateTotalBill(items:BillItem[]){
    let amountSeparation = [0,0,0,0,0];
    for(let i = 0; i < items.length; i++){
        const currentBillItem = items[i];

        amountSeparation[currentBillItem.type ? currentBillItem.type : 0] += Number(currentBillItem.amount) * Number(currentBillItem.quantity);  
    }
    const firstAmount = (amountSeparation[0] + amountSeparation[3]) - (amountSeparation[1]+amountSeparation[4]);
    const discountAmount = (firstAmount*amountSeparation[2])/100;
    const total = firstAmount - discountAmount;
    //Redondeo a dos decimales
    return  Math.round(total * 100) / 100
}