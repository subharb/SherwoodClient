import React from 'react';
import Form from '../../../components/general/form';
import { EditBillablesProps } from './types';

const BILLING_INFO_FORM = {
    "logo" : {
        required : true,
        type:"file_base64",
        label:"investigation.create.sections.LOGO",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "address" : {
        required : true,
        type:"text",
        label:"investigation.create.sections.section",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "email" : {
        required : true,
        type:"text",
        label:"investigation.create.sections.section",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "phone" : {
        required : true,
        type:"text",
        label:"investigation.create.sections.section",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "currency" : {
        required : true,
        type:"text",
        label:"investigation.create.sections.section",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
}

const EditBillingInfo: React.FC<EditBillablesProps> = ({  }) => {
    function callBack(values:any){
        console.log(values);
    }
    return (
        <Form fields={BILLING_INFO_FORM} fullWidth callBackForm={(field:any) => callBack(field)} 
            dataTestid="save-field" />
    );
};

export default EditBillingInfo;
