import { ReactElement } from "react"
import { LocalizeContextProps } from "react-localize-redux"
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
    amount:number | string,
    used?: boolean,
    paid?: boolean
}
export interface BillItemTable{
    id:number,
    concept:ReactElement,
    type?:ReactElement,
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
    billables:Billable[],
    hospitalName:string
}

export interface EditBillingInfoProps {
    callbackUpdate : (values:any) => void
    billingInfo:BillingInfo,
}

export interface EditBillablesProps {
    billables : Billable[],
    billingInfo:BillingInfo,
    uuidInvestigation : string,
    withDiscount : boolean,
    onBillablesCreated:(billItems:BillItem[]) =>void
}

export interface EditBillingProps extends LocalizeContextProps, Omit<EditBillablesProps, | 'onBillablesCreated' >, Omit<EditBillingInfoProps, 'callbackUpdate'> {
    onBillingInfoSuccesfullyUpdated : (type:BillItemModes) => void;
}

export interface BillingInfoServiceResponse {
    status:number, billingInfo:BillingInfo
}

export interface BillablesServiceResponse {
    status: number, billables: Billable[] 
}

export type BillItemModes = 'bill' | 'billable';