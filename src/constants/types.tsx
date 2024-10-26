import { Color } from "@mui/lab"
import { BillingReducer } from "../redux/reducers/billingReducer"

export interface ReduxStore{
    themeReducer : any
  authReducer : any
  investigations: any,
  submissions: any,
  patients: any,
  patientsSubmissions: any,
  offline: any,
  profile: any,
  hospital: any,
  requests:any,
  billing: BillingReducer,
  form:any
}

export interface IDrug{
    "id": number,
    "cis": string,
    "name": string,
    "search_name": string,
    "country": string
}

export interface ISubmission{
    id:number,
    createdAt:Date,
    updatedAt:Date,
    researcher:IResearcher,
    uuidSurvey:string,
    surveyName:string,
    surveyRecords: ISurveyRecord[],
}

export interface ISurveyRecord{
    id: number,
    value: string,
    surveySection:any,
    surveyField:IField,
}

export interface IBed{
    id:number,
    gender:number,
    name:string,
    active:boolean,
    order:number,
    busy:boolean,
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
    code:string,
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
    agendas?:IAgenda[]
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
    listServicesInvestigation:{id:number}[]
}

export interface RequestService {
    id: number;
    type: number;
    status: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    researcher: IResearcher;
    surveyRequest: null;
    departmentRequest: IDepartment;
    requestsPharmacy: any[]; // Replace with appropriate type
    requestsServiceInvestigation: RequestServiceInvestigation[];
    submissionPatient: null;
}

export interface RequestServiceInvestigation {
    id: number;
    status: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    patientInvestigation: any;
    serviceInvestigation: ServiceInvestigation;
    billItem: any;
}

interface ServiceInvestigation {
    id: number;
    description: string;
    active: boolean;
    category: string;
    external: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    service: {
      id: number;
      code: string;
      name: string;
      type: number;
      category: string;
    };
    billable: {
      id: number;
      type: number;
      concept: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    };
    survey: null;
  }

export interface IRequestAppointment{
    status:number,
    type:RequestStatus,
}

export enum RequestStatus {
    PENDING_APPROVAL = 0,
    PENDING_PAYMENT = 1,
    ACCEPTED = 2,
    SOME_ACCEPTED = 3,
    DENIED = 4,
    CANCELED = 5,// Cancelado por el usuario
    EXPIRED = 6,
    COMPLETED = 7,
    IN_PROGRESS = 8,
    INCOMPLETE = 9,
    INCOMPLETE_ACCEPTED = 10, //Pensada para farmacia
}

export interface IAppointment{
    id:number,
    uuid:string,
    startDateTime:number,
    endDateTime:number,
    duration:number,
    patient:IPatient,
    order:number,
    agenda:IAgenda,
    agendaId:number,
    reasonVisit:string,
    notes:string,
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
    phone: string,
    health_id ?:string,
    automated_health_id ?:string,
    insurance:number | null,
}

export enum OutpatientsVisualizationMode{
    ADMIN = 0,
    CONSULT = 1,
}

export interface SnackbarType{ 
    show: boolean; message?: string; severity?: Color; }

export interface IResearcher{
    id?:number,
    uuid:string,
    name:string,
    email:string,
    surnames:string,
    units:IUnit[]
}

export interface ISurvey{
    uuid:string,
    name:string,
    unit:IUnit,
    type:number,
    order:number,
    category:number,
    isActive:boolean,
    sections: ISection[],
}
export interface ISection{
    id:number,
    uuid:string,
    name:string,
    order:number,
    fields: IField[],
}
export interface IField{
    id:number,
    name:string,
    type:string,
    label:string,
    required:boolean,
    order:number,
    encrypted:boolean,
    validation:string,
    options:OptionField[],
    isActive:boolean,
    extraField:null | IField,

}

export interface EnhanceTableAction{
    type: string,
    check?: (index: number) => boolean,
    func: (index: number) => void
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

export interface IInsurance{
    id:number,
    name:string,
    code:string,
    active:boolean,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date,
}

export interface IOutpatientsInfo{
    params: IOutpatientsParams,
}
export interface IOutpatientsParams {
    type: "date" | "date_time",
    extraForm ?: number
}

export enum OutpatientsTypes{
    DATE = "date",
    DATE_TIME = "date_time"
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
    DISCOUNT_ADDITIONAL_INFO = 4,
    HIDDEN_VALUE = 5
}

export const TYPES_DISCOUNT = [TYPE_BILL_ITEM.DISCOUNT_AMOUNT, TYPE_BILL_ITEM.DISCOUNT_PERCENT]

export enum SnackbarTypeSeverity {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
}
