import { number } from 'prop-types';
import React, { useState } from 'react';
import Loader from '../../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { createUpdateBillingInfo, updateBillables } from '../../../redux/actions/investigationsActions';
import { createUpdateBillingInfoService } from '../../../services/billing';
import props from '../../../theme/props';
import { TabsSherwood } from '../../components/Tabs';
import EditBillables from './EditBillables';
import EditBillingInfo from './EditBillingInfo';
import { BillItem, EditBillingProps } from './types';




const EditBilling: React.FC<EditBillingProps> = ({ billables, uuidInvestigation, billingInfo, onBillingInfoSuccesfullyUpdated }) => {
    const dispatch = useDispatch();
    const investigations = useSelector((state:any) => state.investigations);

    async function callbackUpdateBillingInfo(billingInfo:any){
        await dispatch(
            createUpdateBillingInfo(uuidInvestigation, billingInfo)
        );
        onBillingInfoSuccesfullyUpdated('bill');
    }
    async function onBillablesCreated(billables:BillItem[]){
        console.log(billables);
        await dispatch(
            updateBillables(uuidInvestigation, billingInfo.id, billables)
        );
        onBillingInfoSuccesfullyUpdated('billable');
    }

    if(investigations.loading){
        return <Loader />
    }
    if(billingInfo){
        return (
            <TabsSherwood name="Billing Info" 
                labels={["hospital.billing.billing_info.title", "hospital.billing.billables.title"]} >
                <EditBillingInfo billingInfo={{...investigations.currentInvestigation.billingInfo, hospitalName:investigations.currentInvestigation.name}} 
                    callbackUpdate={callbackUpdateBillingInfo} />
                <EditBillables uuidInvestigation={uuidInvestigation} billables={billables}
                    billingInfo={billingInfo} onBillablesCreated={onBillablesCreated} />
            </TabsSherwood>
        );
    }
    else{
        return <EditBillingInfo billingInfo={{...investigations.currentInvestigation.billingInfo, hospitalName:investigations.currentInvestigation.name}} 
                callbackUpdate={callbackUpdateBillingInfo}/>
    }
    
};

export default EditBilling;
