import { IPharmacyItem } from "../../../pages/hospital/Pharmacy/types";

export const pharmacyItemsInit:IPharmacyItem[] = [
    {
        id:89,
        code: "AE01",
        name: "Paracetamol",
        type: 0,
        activePrinciple: "IBUPROF",
        amount : 500,
        price:11.50,
        unit:1,
        provider:"Farmacia Lugo",
        threshold:10
    },
    {
        id:91,
        code: "AE02",
        name: "Biodramina",
        type: 0,
        activePrinciple: "Biodra",
        amount : 500,
        price: 11.50,
        unit:1,
        provider:"Farmacia Lugo",
        threshold:10
    },
    {
        id:94,
        code: "AE03",
        name: "Amoxicilina",
        type: 0,
        activePrinciple: "amox",
        amount : 100,
        price: 12.50,
        unit:1,
        provider:"Farmacia Lugo",
        threshold:10
    }
]