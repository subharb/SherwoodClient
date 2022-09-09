import React from 'react';
import Form from '../../../components/general/form';
import { EditBillablesProps, EditBillingInfoProps } from './types';

const BILLING_INFO_FORM = {
    "logo" : {
        required : false,
        type:"file_base64",
        label:"hospital.billing.billing_info.logo",
        shortLabel: "hospital.billing.billing_info.logo",
        validation : "textMin2"
    },
    "address" : {
        required : true,
        type:"text",
        label:"hospital.billing.billing_info.address",
        shortLabel: "hospital.billing.billing_info.address",
        validation : "textMin2"
    },
    "email" : {
        required : true,
        type:"text",
        label:"hospital.billing.billing_info.email",
        shortLabel: "hospital.billing.billing_info.email",
        validation : "textMin2"
    },
    "phone" : {
        required : true,
        type:"text",
        label:"hospital.billing.billing_info.phone",
        shortLabel: "hospital.billing.billing_info.phone",
        validation : "textMin2"
    },
    "currency" : {
        required : true,
        type:"text",
        label:"hospital.billing.billing_info.currency",
        shortLabel: "hospital.billing.billing_info.currency",
        validation : "textMin2"
    },
}

const EditBillingInfo: React.FC<EditBillingInfoProps> = ({ callbackUpdate }) => {
    function callBack(values:any){
        console.log(values);
        callbackUpdate(values);
    }
    return (
        <Form fields={BILLING_INFO_FORM} fullWidth callBackForm={(field:any) => callBack(field)} 
            dataTestid="save-field" />
    );
};

export default EditBillingInfo;
