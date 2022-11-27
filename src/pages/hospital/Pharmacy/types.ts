export interface IPharmacyItem{
    id?:number,
    code: string;
    name: string;
    type: number;
    activePrinciple: string;
    amount: number;
    price: number;
    unit: number;
    provider: string;
    threshold: number;
}