

import { Grid, Typography } from '@mui/material';
import React from 'react';
import { ButtonCancel, ButtonContinue } from '../../../../components/general/mini_components';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { IDepartment, IPatient } from '../../../../constants/types';
import Form from '../../../../components/general/form';
import { patientFullName } from '../../../../utils';

interface TransferWardFormProps extends LocalizeContextProps{
    currentWard: string;
    departments: IDepartment[];
    patientToTransfer: IPatient;
    resetModal: () => void;
    transferBedConfirm : (uuidWardDestination: string) => void;
}

const TransferWardForm: React.FC<TransferWardFormProps> = ({ patientToTransfer, departments, translate, resetModal, transferBedConfirm }) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom 
                    dangerouslySetInnerHTML={{__html : translate("hospital.ward.transfer-ward-patient").toString().replace("%X", patientFullName(patientToTransfer.personalData)) }}>
                </Typography>
                <Form fields={{
                    "ward_selected":{
                        name : "ward_selected",
                        required : true,
                        type:"select",
                        label:"hospital.ward.select-ward-transfer",
                        validation : "notEmpty",
                        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
                        options : departments.flatMap((department) => department.wards.map((ward) => ({ label: department.name +" - " +ward.name, value: ward.uuid }))),
                        value: ""
                    },
                }} typeMargin="normal" 
                    key="form"
                    callBackForm={(values) => transferBedConfirm(values.ward_selected.uuid)} 
                    closeCallBack = {resetModal}
                    submitText={"hospital.ward.select-ward-transfer"} />
            </Grid>
            
        </Grid>
    );
};

export default withLocalize(TransferWardForm);
