export interface IPharmacyItem{
    id?:number,
    name: string;
    type: number;
    activePrinciple: string;
    amount: number;
    price: number;
    unit: number;
    provider: string;
    threshold: number;
}

export interface RequestPharmacyItem {
    id:number
    name:string,
    amountRequested:number,
    amountApproved:number,
}

export interface IPharmacyRequest{
    uuidDepartment:string, 
    requestPharmacyItems:RequestPharmacyItem[]
}
