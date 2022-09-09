import { number } from 'prop-types';
import React, { useState } from 'react';
import { updateBillingInfo } from '../../../services/billing';
import { TabsSherwood } from '../../components/Tabs';
import EditBillables from './EditBillables';
import EditBillingInfo from './EditBillingInfo';
import { EditBillablesProps, BillingInfo, BillingInfoServiceResponse } from './types';




const EditBilling: React.FC<EditBillablesProps> = ({ billables, uuidInvestigation, billingInfo }) => {
    const [loading, setLoading] = useState(false);

    async function callbackUpdateBillingInfo(values:any){
        setLoading(true);
        const response:BillingInfoServiceResponse = await updateBillingInfo(uuidInvestigation, values);
            

        if (response.status === 200 && response.billingInfo) {
            onBillSuccesfullyCreated(response.bill);
        }

    }
    if(billingInfo){
        return (
            <TabsSherwood name="Billing Info" 
                labels={["hospital.billing.bills", "hospital.billing.metrics"]} >
                <EditBillingInfo callbackUpdate={callbackUpdateBillingInfo} />
                <EditBillables billables={billables} billingInfo={billingInfo} />
            </TabsSherwood>
        );
    }
    else{
        return <EditBillingInfo callbackUpdate={callbackUpdateBillingInfo}/>
    }
    
};

export default EditBilling;
