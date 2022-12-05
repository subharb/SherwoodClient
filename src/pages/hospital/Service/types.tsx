import { IPatient, IResearcher, ISurvey, IUnit } from "../../../constants/types"
import { IPharmacyItem } from "../Pharmacy/types";

export interface IService{
    id:number,
    name:string,
    type:number,
    code:string,
    category:string,
}

export interface IServiceInvestigation{
    id:number,
    name:string,
    type:number,
    code:string,
    service:IService,
    price:number,
    external:number,
    survey:any,
    billable:any
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



export enum RequestType {
    LABORATORY = 0,
    IMAGING = 1,
    PHARMACY = 2,
    SHOE = 3,
    INTERCONSULT = 4,
}

export interface IRequestServiceInvestigation{
    id:number,
    request:IRequest,
    status : RequestStatus,
    patientInvestigation:IPatient,
    serviceInvestigation:IServiceInvestigation,
    survey:ISurvey | null,
}

export interface IRequestPharmacy{
    id:number,
    status:RequestStatus,
    amountApproved:number,
    amountRequested:number,
    pharmacyItem:IPharmacyItem,
}

export interface IRequest{
    id:number,
    submissionPatient:any,
    type:number,
    status : RequestStatus,
    investigation:any,
    researcher:IResearcher,
    requestsPharmacy:IRequestPharmacy[],
    unitRequest:IUnit,
    requestsServiceInvestigation: IRequestServiceInvestigation[];
    surveyRequest:ISurvey,
    createdAt: Date;
    updatedAt: Date;
}

export enum ServiceType{
    "LABORATORY" = 0,
    "IMAGING" = 1,    
}