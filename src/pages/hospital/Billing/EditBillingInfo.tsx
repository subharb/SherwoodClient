import React from 'react';
import Billing from '.';
import Form from '../../../components/general/form';
import FormTSFunc from '../../../components/general/formTSFunction';
import { BillingInfo, EditBillingInfoProps } from './types';


const BILLING_INFO_FORM: {[key in keyof BillingInfo]?: any} = {
    "logoBlob": {
        required: true,
        type: "file_base64",
        label: "hospital.billing.billing_info.logo",
        shortLabel: "hospital.billing.billing_info.logo",
        validation: "textMin2"
    },
    "hospitalName": {
        required: true,
        type: "text",
        label: "hospital.billing.billing_info.hospitalName",
        shortLabel: "hospital.billing.billing_info.hospitalName",
        validation: "textMin2"
    },
    "address": {
        required: true,
        type: "text",
        label: "hospital.billing.billing_info.address",
        shortLabel: "hospital.billing.billing_info.address",
        validation: "textMin2"
    },
    "city": {
        required: true,
        type: "text",
        label: "hospital.billing.billing_info.city",
        shortLabel: "hospital.billing.billing_info.city",
        validation: "textMin2"
    },
    "email": {
        required: true,
        type: "text",
        label: "hospital.billing.billing_info.email",
        shortLabel: "hospital.billing.billing_info.email",
        validation: "validEmail"
    },
    "phone": {
        required: true,
        type: "text",
        label: "hospital.billing.billing_info.phone",
        shortLabel: "hospital.billing.billing_info.phone",
        validation: "textMin2"
    },
    "currency": {
        required: true,
        type: "text",
        label: "hospital.billing.billing_info.currency",
        shortLabel: "hospital.billing.billing_info.currency",
        validation: "textMin2"
    }
}

const EditBillingInfo: React.FC<EditBillingInfoProps> = ({ billingInfo, callbackUpdate }) => {
    function callBack(values:any){
        console.log(values);
        callbackUpdate(values);
    }
    
    let initialData:{[key in keyof BillingInfo]?: any}={};
    if(billingInfo){
        for (let key in billingInfo) {
            if (BILLING_INFO_FORM.hasOwnProperty(key)) {
                let value = billingInfo[key as keyof BillingInfo];
                initialData[key as keyof BillingInfo] = value;
            }
        }
    }
    
    return (
        <FormTSFunc fields={BILLING_INFO_FORM} initialData={initialData} fullWidth 
            callBackForm={(field:any) => callBack(field)} 
            dataTestid="save-field" />
    );
};

export default EditBillingInfo;
