export interface IBed{
    id:number,
    gender:number,
    name:string,
    active:boolean,
    order:number,
    stay?:any
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
export interface IPatient{
    uuid:string,
    id:number,
    personalData: PersonalData
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


