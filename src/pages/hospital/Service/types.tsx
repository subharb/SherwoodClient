import { IPatient, IResearcher, ISurvey } from "../../../constants/types"

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
    status : RequestStatus,
    patientInvestigation:IPatient,
    serviceInvestigation:IServiceInvestigation,
    survey:ISurvey | null,
}


export interface IRequest{
    id:number,
    submissionPatient:any,
    type:number,
    status : RequestStatus,
    investigation:any,
    researcher:IResearcher,
    requestsServiceInvestigation: IRequestServiceInvestigation[];
    surveyRequest:ISurvey,
    createdAt: Date;
    updatedAt: Date;
}

export enum ServiceType{
    "LABORATORY" = 0,
    "IMAGING" = 1,    
}