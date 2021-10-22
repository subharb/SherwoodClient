export interface IBed{
    id:number,
    gender:number,
    name:string,
    active:boolean,
    order:number,
    empty?:boolean
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

interface PersonalData{
    name ?: string,
    email ?: string,
    phone ?: string,
    surnames ?: string,
    birthdate ?: string,
    
}
export interface IPatient{
    uuid:string,
    id:number,
    personalData: PersonalData
}