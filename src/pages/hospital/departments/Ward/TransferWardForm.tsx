

import { Grid, Typography } from '@mui/material';
import React from 'react';
import { ButtonCancel, ButtonContinue } from '../../../../components/general/mini_components';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { IBed, IDepartment, IPatient } from '../../../../constants/types';
import Form from '../../../../components/general/form';
import { patientFullName } from '../../../../utils';

interface TransferWardFormProps extends LocalizeContextProps{
    currentWard: string;
    departments: IDepartment[];
    patientToTransfer: IPatient;
    currentDepartment: string;
    currentBed: IBed;
    patients: IPatient[];
    beds: IBed[];
    resetModal: () => void;
    transferWardConfirm : (uuidDepartmentDestination: string, uuidWardDestination: string, idBed:number) => void;
}

const TransferWardForm: React.FC<TransferWardFormProps> = ({ patientToTransfer, currentBed, currentWard, departments, patients, translate, resetModal, transferWardConfirm }) => {
    const wardsDepartments = departments.flatMap((department) => department.wards.map((ward) => ({department: department, ward: ward})));
    const selectWardValues = wardsDepartments.map((value) => value.department.uuid +"&"+ value.ward.uuid);
    const selectWardOptions = wardsDepartments.map((value) => ({ label: value.department.name +" - " +value.ward.name, value: value.department.uuid +"&"+ value.ward.uuid }));
    const activatedSelectWardBeds = wardsDepartments.reduce((acc, value) => {
            const ward = value.ward;
            const key = value.department.uuid +"&"+ value.ward.uuid;
            const bedsValue = [{
                name : "bed_selected",
                required : true,
                type:"select",
                validation : "notEmpty",
                label : "hospital.ward.choose-bed",
                shortLabel: "hospital.ward.choose-bed",
                options : ward.beds.filter((bed) => !(ward.uuid === currentWard && bed.id === currentBed.id)).sort((bedA, bedB) => bedA.name.toLowerCase().localeCompare(bedB.name.toLocaleLowerCase())).map((bed: any) => {
                    if(bed.busy){
                        const currentStayIndex = bed.stays.findIndex((stay) => stay.dateOut === null);
                        if(currentStayIndex !== -1){
                            const stay = bed.stays[currentStayIndex];
                            const patient = patients.find((patient) => patient.id === stay.patientInvestigation.patientIdInvestigation);
                            const patientName = patientFullName(patient!.personalData)
                            return ({label: "Bed "+bed.name + " - swap with " +patientName, value: bed.id})
                        }
                    }
                    return ({label: "Bed "+bed.name, value: bed.id})
                }),
            }];
            acc[key] = bedsValue;
            return acc;
        }, {});
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom 
                    dangerouslySetInnerHTML={{__html : translate("hospital.ward.transfer-ward-patient").toString().replace("%X", patientFullName(patientToTransfer.personalData)) }}>
                </Typography>
                <Form fields={{
                    "department_ward_selected":{
                        name : "department_ward_selected",
                        required : true,
                        type:"select",
                        label:"hospital.ward.select-ward-transfer",
                        validation : "notEmpty",
                        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
                        options : selectWardOptions,
                        value: "",
                        conditionalValues : selectWardValues,
                        conditionalFields: activatedSelectWardBeds
                    }
                    ,
                }} typeMargin="normal" 
                    key="form"
                    callBackForm={(values) => transferWardConfirm(values.department_ward_selected.split('&')[0], values.department_ward_selected.split('&')[1], values.bed_selected)} 
                    closeCallBack = {resetModal}
                    submitText={"hospital.ward.select-ward-transfer"} />
            </Grid>
            
        </Grid>
    );
};

export default withLocalize(TransferWardForm);
