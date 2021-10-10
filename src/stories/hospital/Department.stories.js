import React from 'react';
import { HOSPITAL_WARD_ROUTE, OUTPATIENTS_ROUTE } from '../../routes';
import { AddPatientComponent } from '../../pages/hospital/AddPatient'
import { personal_data_investigation1, investigation_server, wardInfo } from "../example_data";
import WardForm from '../../pages/hospital/departments/Ward/WardForm';
import ProviderSherwood from '../../providerSherwood';
import Ward from '../../pages/hospital/departments/Ward';

export default {
  title: 'Hospital/Departments/Ward',
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
    editCallBack:() => console.log("Editar!"), 
    viewCallBack:() => console.log("View!"), 
    beds : {
        total:14,
        male:3,
        female:11
    }
};

export const WardEditStory = TemplateWard.bind({});
WardEditStory.args = {
    loading:false,
    ward:wardInfo,
    edit:true,
    editCallBack:() => console.log("Editar!"), 
    viewCallBack:() => console.log("View!"), 
  
};
