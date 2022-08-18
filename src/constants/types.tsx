import { ReactElement } from "react"

export interface IBed{
    id:number,
    gender:number,
    name:string,
    active:boolean,
    order:number,
    stays?:any
}

export interface IWard{
    uuid?:string,
    name:string,
    beds:IBed[]
    
}

export interface IDepartment{
    uuid?:string,
    id?:number,
    name:string,
    wards:IWard[]
}

export interface IDepartmentServer extends IDepartment{
    uuid:string
}

export interface IResearcher{
    name:string,
    surnames:string,
    departments:IDepartment[]
}

export interface PersonalData{
    name ?: string,
    email ?: string,
    phone ?: string,
    surnames ?: string,
    birthdate ?: string,
    health_id?:string,
    sex:string,   
}

export interface OptionField{
    id:number,
    value:string,
    label:string,
    isActive:boolean
}

export interface PersonalField{
    id:number,
    name:string,
    type:string,
    required:boolean,
    order:number,
    label:string,
    encrypted:boolean,
    validation:string,
    options:OptionField[]
}

export interface IPatient{
    uuid:string,
    id:number,
    personalData: PersonalData,
    dateCreated:Date
}

export enum PERMISSION {
    MEDICAL_WRITE = "MEDICAL_WRITE",
    MEDICAL_READ = "MEDICAL_READ",
    PERSONAL_ACCESS = "PERSONAL_ACCESS",
    BUSINESS_READ = "BUSINESS_READ",
    BUSINESS_WRITE = "BUSINESS_WRITE",
    SHARE_RESEARCHERS = "SHARE_RESEARCHERS",
    EDIT_SUBMISSIONS = "EDIT_SUBMISSIONS",
    EDIT_INVESTIGATION = "EDIT_INVESTIGATION",
}

export enum FUNCTIONALITY {
    HOSPITALIZATION = "HOSPITALIZATION",
    BILLING = "BILLING"
}

export interface ActionsEnhancedTable{
    type: string,
    func: (index: number) => void
}

export enum TYPE_BILL_ITEM {
    CHARGE = 0,
    DISCOUNT_AMOUNT = 1,
    DISCOUNT_PERCENT = 2,
}

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
    insurance:string,
    type: number
}

export interface BillItem{
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