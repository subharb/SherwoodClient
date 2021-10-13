export interface IBed{
    id:number,
    gender:number,
    name:string,
    active:boolean,
    order:number
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