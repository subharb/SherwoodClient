import React from 'react';
import { HOSPITAL_WARD_ROUTE, OUTPATIENTS_ROUTE } from '../../routes';
import ListPatients from '../../pages/hospital/ListPatients'
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/List Patients',
  component: ListPatients,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' },

  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <ListPatients {...args} />; 

export const HospitalWard = Template.bind({});
HospitalWard.args = {
    initialState:{pathname:OUTPATIENTS_ROUTE},
    name:"Pedro",
    surnames:"Rodríguez"
};

export const Outpatients = Template.bind({});
Outpatients.args = {
    initialState:{pathname:HOSPITAL_WARD_ROUTE},
};