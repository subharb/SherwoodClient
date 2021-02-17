import React from 'react';

import PatientButton  from '../../../components/general/PatientButton';
import ProviderSherwood from '../../../providerSherwood';

export default {
  title: 'Basic Elements/Buttons/Patient',
  component: PatientButton,
  argTypes: {
    type: { control: 'string' },
    name : { control: 'string' },
    surnames : { control: 'string' },
    age : { control: 'string' },
    gender : { control: 'string' },
    days :  { control: 'string' },
    number : { control: 'string' }
  },
  decorators: [story => 
    <ProviderSherwood>
            {story()}
    </ProviderSherwood>],
};

const Template = (args) => <PatientButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    type:'ward',
    name : "Peter", 
    id: "KI132",
    surnames: "Petrelli",
    age : "30 years",
    gender : "male",
    days: "30 days",
    number:"1a",
    onClick: () => {console.log("You clicked!")} 
};