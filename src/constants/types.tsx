import { Color } from "@material-ui/lab"
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
    units:IUnit[],
    wards:IWard[]
}

export interface IUnit{
    uuid?:string,
    id?:number,
    name:string,
    department:IDepartment
}

export interface IDepartmentServer extends IDepartment{
    uuid:string
}

export interface IPersonalData{
    name: string,
    surnames: string,
    birthdate: string,
    sex: string,
    health_id ?:string
}

export interface IResearcher{
    name:string,
    surnames:string,
    units:IUnit[]
}

export interface ISurvey{
    uuid:string,
    name:string,
    unit:IUnit,
    type:number
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
    personalData: IPersonalData,
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
    MAKE_DISCOUNTS = "MAKE_DISCOUNTS",
    MANAGE_PHARMACY_CENTRAL = "MANAGE_PHARMACY_CENTRAL",
    MAKE_PHARMACY_REQUESTS = "MAKE_PHARMACY_REQUESTS",
    UPDATE_PHARMACY_CENTRAL = "UPDATE_PHARMACY_CENTRAL"
}

export enum FUNCTIONALITY {
    HOSPITALIZATION = "HOSPITALIZATION",
    BILLING = "BILLING",
    BILLING_DISCOUNTS = "BILLING_DISCOUNTS",
    PHARMACY_CENTRAL = "PHARMACY_CENTRAL",
    AESTHETICS = "AESTHETICS",
}

export interface ActionsEnhancedTable{
    type: string,
    func: (index: number) => void
}

export enum DepartmentType{
    MEDICAL = 0,
    PHARMACY = 1,
    SOCIAL = 2,
    SHOE = 3,
}

export enum TYPE_BILL_ITEM {
    CHARGE = 0,
    DISCOUNT_AMOUNT = 1,
    DISCOUNT_PERCENT = 2,
    SERVICE = 3,
}

export const TYPES_DISCOUNT = [TYPE_BILL_ITEM.DISCOUNT_AMOUNT, TYPE_BILL_ITEM.DISCOUNT_PERCENT]

export enum SnackbarTypeSeverity {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
}
