import React from 'react';
import { IDepartment } from '../../../constants/types';
import { BillItems } from '../Billing/BillItems';
import { BillItemModes } from '../Billing/types';

interface RequestFormProps {
    departments:IDepartment[],
    uuidInvestigation:string
}

const RequestForm: React.FC<RequestFormProps> = ({ uuidInvestigation, departments }) => {
    return (
        <>
            <BillItems mode={BillItemModes.BILLABLE} billables={[]}
                currency="" print={false} bill={null} updatingBill={false}
                error={undefined} withDiscount={false} onBillItemsValidated={() => console.log("Validated")}
                onCancelBill={() => console.log("Cancelada")}
                uuidInvestigation={uuidInvestigation} />
        </>
    );
};

export default RequestForm;
