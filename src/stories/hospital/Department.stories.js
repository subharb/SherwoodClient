import React from 'react';
import { HOSPITAL_WARD_ROUTE, OUTPATIENTS_ROUTE } from '../../routes';
import { AddPatientComponent } from '../../pages/hospital/AddPatient'
import { personal_data_investigation1, investigation_server } from "../example_data";
import Ward from '../../pages/hospital/departments/Ward';
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Departments',
  component: Ward,
  argTypes: {
    loading: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Ward {...args} />; 


export const WardStory = Template.bind({});
WardStory.args = {
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
