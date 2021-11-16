import React from 'react';

import { AddPatientComponent } from '../../pages/hospital/AddPatient'
import { personal_data_investigation1, investigation_server, wardInfo, patients_personal_data_decrypted, departmentsInfo } from "../example_data";

import ProviderSherwood from '../../providerSherwood';
import Ward, {WardFormEdit}  from '../../pages/hospital/departments/Ward';
import { BedButton, BedButtonAssignBed, BedButtonEdit, BedButtonViewPatient } from '../../components/general/BedButton';
import { InpatientsLocalized } from '../../pages/hospital/departments/Inpatients';

export default {
  title: 'Hospital/Ward',
  component: WardFormEdit,
  argTypes: {
    loading: { control: 'boolean' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <WardFormEdit {...args} />; 

const TemplateWard = (args) => <Ward {...args} />; 

const TemplateInPatients = (args) => <InpatientsLocalized {...args} />; 

const TemplateBedEdit = (args) => <BedButtonEdit {...args} />; 
const TemplateBedAssigned = (args) => <BedButtonAssignBed {...args} />; 
const TemplateBedView = (args) => <BedButtonViewPatient {...args} />; 

export const BedEdit = TemplateBedEdit.bind({});
BedEdit.args = {
    name:"Test Bed",
    gender:"female",
    mode:"edit",
    onClick:() => console.log("Se hace click"),
    deleteCallBack:() => console.log("Delete!"),
};

export const BedAssignBed = TemplateBedAssigned.bind({});
BedAssignBed.args = {
    name:"Test Bed",
    gender:"female",
    mode:"assign-patient",
    onClick:() => console.log("Se hace click"),
    deleteCallBack:() => console.log("Delete!"),
};

export const BedView = TemplateBedView.bind({});
BedView.args = {
    name:"Test Bed",
    gender:"male",
    mode:"view",
    stay:3,
    patient:patients_personal_data_decrypted()[0].personalData,
    onClick:() => console.log("Se hace click"),
    deleteCallBack:() => console.log("Delete!"),
};

export const WardFormStory = Template.bind({});
WardFormStory.args = {
    loading:false,
    name: "Test Ward",
    mode:"edit",
    editCallBack:() => console.log("Editar!"), 
    viewCallBack:() => console.log("View!"), 
    beds : {
        total:14,
        male:3,
        female:11
    }
};


export const WardSetBeds = TemplateWard.bind({});
WardSetBeds.args = {
    loading:false,
    ward:wardInfo,
    bedsProps:wardInfo.beds,
    mode:"edit",
    editCallBack:(ward) => console.log("Editar!", ward), 
    deleteCallBack:(ward) => console.log("Delete!", ward), 
    saveOrderCallBack:(beds) => console.log("Save new order!", beds), 
  
};

export const WardAssignBedPatient = TemplateWard.bind({});
WardAssignBedPatient.args = {
    mode:"assign-patient",
    loading:false,
    ward:wardInfo,
    bedsProps:wardInfo.beds,
    patient:patients_personal_data_decrypted()[0],
    assignBedPatientCallBack:(bed) => console.log("Bed Patient!", bed), 
  
};

export const WardView = TemplateWard.bind({});
WardView.args = {
    mode:"view",
    loading:false,
    ward:wardInfo,
    bedsProps:wardInfo.beds,
    patients:patients_personal_data_decrypted(),
    assignBedPatientCallBack:(bed) => console.log("Bed Patient!", bed), 
  
};

export const MyWards = TemplateInPatients.bind({});
MyWards.args = {
    departments:departmentsInfo
  
};