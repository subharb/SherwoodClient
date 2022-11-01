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

export enum ServiceType{
    "LABORATORY" = 0,
    "IMAGING" = 1,    
}