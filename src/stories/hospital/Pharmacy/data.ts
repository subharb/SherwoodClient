import { IPharmacyItem } from "../../../pages/hospital/Pharmacy/types";

export const pharmacyItemsInit:IPharmacyItem[] = [
    {
        id:89,
        
        name: "Paracetamol",
        type: 0,
        activePrinciple: "IBUPROF",
        amount : 500,
        price:11.50,
        unit:1,
        provider:"Farmacia Coruña",
        threshold:10
    },
    {
        id:91,
        
        name: "Biodramina",
        type: 0,
        activePrinciple: "Biodra",
        amount : 500,
        price: 11.50,
        unit:1,
        provider:"Farmacia Luganes",
        threshold:10
    },
    {
        id:94,
        
        name: "Amoxicilina",
        type: 0,
        activePrinciple: "amox",
        amount : 9,
        price: 12.50,
        unit:1,
        provider:"Farmacia Lugo",
        threshold:10
    }
]