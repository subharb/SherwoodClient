export interface IPharmacyItem{
    id?:number,
    code: string;
    name: string;
    type: number;
    activePrinciple: string;
    amountRequested: number;
    price: number;
    unit: number;
    provider: string;
    threshold: number;
}

export type RequestPharmacyItem = Pick<IPharmacyItem, 'id' | 'amountRequested' | 'name'>

export interface IPharmacyRequest{
    uuidDepartment:string, 
    requestPharmacyItems:RequestPharmacyItem[]
}
