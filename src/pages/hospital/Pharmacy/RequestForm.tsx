import React from 'react';
import { IDepartment } from '../../../constants/types';
import { BillItems } from '../Billing/BillItems';
import { Billable, BillItemModes } from '../Billing/types';
import { IPharmacyItem } from './types';

interface RequestFormProps {
    departments:IDepartment[],
    uuidInvestigation:string,
    pharmacyItemsInit:IPharmacyItem[]
}

const RequestForm: React.FC<RequestFormProps> = ({ uuidInvestigation, pharmacyItemsInit, departments }) => {
    // @ts-ignore: Unreachable code error
    const billables:Billable[] = pharmacyItemsInit.map((pharmaItem) => {
        return{
            concept : pharmaItem.name,
            id: pharmaItem.id
        }
    })
    return (
        <>
            <BillItems 
                // @ts-ignore: Unreachable code error
                columns={[{name:"concept", type:"autocomplete", validation:""}, {name:"quantity", type:"number", validation:""}]} 
                mode={BillItemModes.GENERAL} billables={billables}
                currency="" print={false} bill={null} updatingBill={false}
                error={undefined} withDiscount={false} onBillItemsValidated={(items) => console.log("Validated", items)}
                onCancelBill={() => console.log("Cancelada")}
                uuidInvestigation={uuidInvestigation} />
        </>
    );
};

export default RequestForm;
