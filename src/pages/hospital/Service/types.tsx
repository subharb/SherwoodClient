import { IResearcher } from "../../../constants/types"

export interface IService{
    id:number,
    name:string,
    type:number,
    code:string
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

export interface IRequest{
    id:number,
    researcher:IResearcher,
    status : RequestStatus,
    createdAt:string,
    updatedAt:string,
}

export enum RequestStatus {
    PENDING = 0,
    PENDING_PAYMENT = 1,
    ACCEPTED = 2,
    DENIED = 3,
    CANCELED = 4,// Cancelado por el usuario
    EXPIRED = 5,
    COMPLETED = 6,
    IN_PROGRESS = 7,
    INCOMPLETE = 8,
    INCOMPLETE_ACCEPTED = 9, //Pensada para farmacia
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
    serviceInvestigation:IServiceInvestigation,
}

export enum ServiceType{
    "LABORATORY" = 0,
    "IMAGING" = 1,    
}