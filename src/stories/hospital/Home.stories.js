import React from 'react';
import HomeSchedule from '../../pages/hospital/HomeSchedule'
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Home',
  component: Home,
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

export const Default = Template.bind({});
Default.args = {
    name:"Pedro",
    surnames: "Rodríguez",
    department: "Cardiology",
    institution: "Hospital Gregorio Marañón"
};

