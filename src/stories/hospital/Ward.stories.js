import React from 'react';

import { AddPatientComponent } from '../../pages/hospital/AddPatient'
import { personal_data_investigation1, investigation_server, wardInfo, patients_personal_data_decrypted } from "../example_data";
import WardForm from '../../pages/hospital/departments/Ward/WardForm';
import ProviderSherwood from '../../providerSherwood';
import Ward from '../../pages/hospital/departments/Ward';
import { BedButton, BedButtonAssignBed, BedButtonEdit } from '../../components/general/BedButton';

export default {
  title: 'Hospital/Ward',
  component: WardForm,
  argTypes: {
    loading: { control: 'boolean' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <WardForm {...args} />; 

const TemplateWard = (args) => <Ward {...args} />; 

const TemplateBedEdit = (args) => <BedButtonEdit {...args} />; 
const TemplateBedAssigned = (args) => <BedButtonAssignBed {...args} />; 

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
