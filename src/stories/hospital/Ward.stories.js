import React from 'react';

import { AddPatientComponent } from '../../pages/hospital/AddPatient'
import { personal_data_investigation1, investigation_server, wardInfo } from "../example_data";
import WardForm from '../../pages/hospital/departments/Ward/WardForm';
import ProviderSherwood from '../../providerSherwood';
import Ward from '../../pages/hospital/departments/Ward';

export default {
  title: 'Hospital/Ward',
  component: WardForm,
  argTypes: {
    loading: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <WardForm {...args} />; 

const TemplateWard = (args) => <Ward {...args} />; 


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

export const WardFormStorySelect = Template.bind({});
WardFormStorySelect.args = {
    loading:false,
    name: "Test Ward",
    mode:"select",
    selectWardCallBack:() => console.log("Select!"), 
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
    edit:true,
    editCallBack:(ward) => console.log("Editar!", ward), 
    deleteCallBack:(ward) => console.log("Delete!", ward), 
    saveOrderCallBack:(beds) => console.log("Save new order!", beds), 
  
};
