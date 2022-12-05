import { number } from 'prop-types';
import React, { useState } from 'react';
import Loader from '../../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { createUpdateBillingInfoAction, updateBillables } from '../../../redux/actions/investigationsActions';
import { createUpdateBillingInfoService } from '../../../services/billing';
import props from '../../../theme/props';
import { TabsSherwood } from '../../components/Tabs';
import EditBillables from './EditBillables';
import EditBillingInfo from './EditBillingInfo';
import { BillItem, BillItemModes, EditBillingProps } from './types';
import { withLocalize } from 'react-localize-redux';




const EditBilling: React.FC<EditBillingProps> = ({ billables, uuidInvestigation, billingInfo, withDiscount, translate, onBillingInfoSuccesfullyUpdated }) => {
    const [tabSelected, setTabSelected] = useState(0);
    const dispatch = useDispatch();
    const investigations = useSelector((state:any) => state.investigations);

    async function callbackUpdateBillingInfo(billingInfo:any){
        await dispatch(
            createUpdateBillingInfoAction(uuidInvestigation, billingInfo)
        );
        onBillingInfoSuccesfullyUpdated(BillItemModes.SHOW);
    }
    async function onBillablesCreated(billables:BillItem[]){
        console.log(billables);
        await dispatch(
            updateBillables(uuidInvestigation, billingInfo.id, billables)
        );
        onBillingInfoSuccesfullyUpdated(BillItemModes.SHOW);
    }

    if(investigations.loading){
        return <Loader />
    }
    if(billingInfo){
        return (
            <TabsSherwood name="Billing Info" style={{  color: "white" }} tabChangeCallback={(tabSelected) => setTabSelected(tabSelected)}
                initTab = {tabSelected}
                labels={[translate("hospital.billing.billing_info.title").toString(), translate("hospital.billing.billables.title").toString()]} >
                <EditBillingInfo billingInfo={{...investigations.currentInvestigation.billingInfo, hospitalName:investigations.currentInvestigation.name}} 
                    callbackUpdate={callbackUpdateBillingInfo} />
                <EditBillables uuidInvestigation={uuidInvestigation} billables={billables} withDiscount={withDiscount}
                    billingInfo={billingInfo} onBillablesCreated={onBillablesCreated} />
            </TabsSherwood>
        );
    }
    else{
        return <EditBillingInfo billingInfo={{...investigations.currentInvestigation.billingInfo, hospitalName:investigations.currentInvestigation.name}} 
                callbackUpdate={callbackUpdateBillingInfo}/>
    }
    
};

export default withLocalize(EditBilling);
