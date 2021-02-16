import React from 'react';
import { MY_SCHEDULE_ROUTE, SEARCH_PATIENT_ROUTE } from '../../routes';
import HomeSchedule from '../../pages/hospital/HomeSchedule'
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Home',
  component: HomeSchedule,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' },
    department: { control: 'string' },
    institution: { control: 'string' },
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <HomeSchedule {...args} />; 

export const Home = Template.bind({});
Home.args = {
    initialState:{pathname:"/"},
    name:"Pedro",
    surnames: "Rodríguez",
    department: "Cardiology",
    institution: "Hospital Gregorio Marañón"
};

export const Schedchule = Template.bind({});
Schedchule.args = {
    initialState:{pathname:MY_SCHEDULE_ROUTE},
    name:"Pedro",
    surnames: "Rodríguez",
    department: "Cardiology",
    institution: "Hospital Gregorio Marañón"
};