import React from 'react';
import { TabsSherwood } from '../../components/Tabs';
import EditBillables from './EditBillables';
import EditBillingInfo from './EditBillingInfo';
import { EditBillablesProps } from './types';




const EditBilling: React.FC<EditBillablesProps> = ({ billables, billingInfo }) => {
    return (
        <TabsSherwood name="Billing Info" 
            labels={["hospital.billing.bills", "hospital.billing.metrics"]} >
            <EditBillingInfo />
            <EditBillables billables={billables} billingInfo={billingInfo} />
        </TabsSherwood>
    );
};

export default EditBilling;
