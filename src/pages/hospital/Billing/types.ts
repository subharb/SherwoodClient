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
    insurance?:string,
    type: number,
    quantity?:number,
}

export interface BillableCombo{
    id:number,
    name:string,
    billables:{id:number}[]
}

export interface BillItem{
    id?:number
    billableId?:number,
    concept:string,
    type:number,
    quantity:number,
    additionalInfoId?:number,
    relatedBillables?:number[],
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
    type = "type",
    quantity = "quantity",
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

export enum BillItemModes{
    SHOW = "SHOW",
    EDIT = "EDIT",
    // BILL = "bill",
    // BILLABLE = "billable",
    // GENERAL = "general"
}
