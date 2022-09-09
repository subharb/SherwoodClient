import { ReactElement } from "react"
import { IPatient } from "../../../constants/types"

export interface Bill{
    id:number,
    patientInvestigation:IPatient,
    billItems:BillItem[],
    paid:null | Date,
    used: null | Date,
    total:number,
    totalPaid:number,
    createdAt:Date
}

export interface Billable{
    id:number,
    concept:string,
    amount:number,
    insurance:string | null,
    type: number
}

export interface BillItem{
    billableId?:number,
    concept:string,
    type:number,
    amount:number,
    used?: boolean,
    paid?: boolean
}
export interface BillItemTable{
    id:number,
    concept:ReactElement,
    //type:ReactElement,
    amount:ReactElement,
    delete : JSX.Element,
    used?: JSX.Element,
    paid?: JSX.Element
}

export enum BillItemKeys{
    concept = "concept",
    amount = "amount",
    type = "type"
}

export interface BillingInfo{
    id:number,
    address:string,
    currency:string,
    phone:string,
    email:string,
    logoBlob:string,
    hospitalName:string
}
export interface EditBillingInfoProps {
    billables : Billable[],
    billingInfo:BillingInfo
}

export interface EditBillablesProps {
    billables : Billable[],
    billingInfo:BillingInfo
}