import React from 'react';
import { HOSPITAL_WARD_ROUTE, OUTPATIENTS_ROUTE } from '../../routes';
import AddPatient from '../../pages/hospital/AddPatient'
import { personal_data1, investigation_server } from "../example_data";
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Add Patients',
  component: AddPatient,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <AddPatient {...args} />; 

export const Basic = Template.bind({});
Basic.args = {
    investigations:[investigation_server()]
};
