import React from 'react';

import PatientButton  from '../../../components/general/PatientButton';
import ProviderSherwood from '../../../providerSherwood';

export default {
  title: 'Basic Elements/Buttons/Patient',
  component: PatientButton,
  argTypes: {
    type: {
        control: {
        type: 'select',
        options: [
            'ward', 
            'oupatients'
        ]
        }
    },
    name : { control: 'text' },
    surnames : { control: 'text' },
    age : { control: 'text' },
    gender : {
        control: {
        type: 'select',
        options: [
            'male', 
            'female'
        ]
        }
    },
    stay :  { control: 'text' },
    number : { control: 'text' }
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
    stay: "30 days",
    number:"1a",
    onClick: () => {console.log("You clicked!")} 
};

export const Free = Template.bind({});
Free.args = {
    type:'ward',
    onClick: () => {console.log("You clicked!")} 
};