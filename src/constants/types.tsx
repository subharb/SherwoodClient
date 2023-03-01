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
    type:DepartmentType,
    name:string,
    units:IUnit[],
    wards:IWard[]
}

export interface IBox{
    uuid:string,
    name:string,
    type:number,
    department:IDepartment | null,
    createdAt?:Date,
}

export interface IAgenda{
    uuid:string,
    name:string,
    department?:IDepartment,
    daysWeek:string[],
    blockedDates:number[],
    principalResearcher:IResearcher,
    slotsPerDay:number,
    appointments?: IAppointment[]
    box:IBox | string,
    datesOccupancy:{[date:string]:number}
    turn: number[][],
    serviceInvestigationFirstVisit:{id:number}
}

export interface IRequestAppointment{
    status:number,
    type:number,
}

export interface IAppointment{
    id:number,
    uuid:string,
    startDateTime:number,
    patient:IPatient,
    order:number,
    agenda:IAgenda,
    requestAppointment:IRequestAppointment,
    type:number,//0 first visit, 1 follow up
    createdAt:number,
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
    birthdate: Date,
    sex: string,
    health_id ?:string
}

export enum OutpatientsVisualizationMode{
    ADMIN = 0,
    CONSULT = 1,
}

export interface SnackbarType{ 
    show: boolean; message?: string; severity?: Color; }

export interface IResearcher{
    uuid:string,
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
    birthdate ?: Date,
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

export interface IOutpatientsInfo{
    params: IOutpatientsParams,
}
export interface IOutpatientsParams {
    type: "date" | "date_time"
}
export enum FUNCTIONALITY {
    HOSPITALIZATION = "HOSPITALIZATION",
    BILLING = "BILLING",
    BILLING_DISCOUNTS = "BILLING_DISCOUNTS",
    PHARMACY_CENTRAL = "PHARMACY_CENTRAL",
    AESTHETICS = "AESTHETICS",
    OUTPATIENTS = "OUTPATIENTS", 
    REQUESTS = "REQUESTS",
    SHOE_SHOP = 'SHOE_SHOP'
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
