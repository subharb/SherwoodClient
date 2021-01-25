import React from 'react';
import Register from '../pages/auth/SignUp'
import ProviderSherwood from '../providerSherwood';
import { summary_info1 } from './example_data';

export default {
  title: 'Pages/Register',
  component: Register,
  argTypes: {
    typeUser:{ control: {
        type: 'select',
        options: [
          'researcher', 
          'patient'
        ],
      },
    },
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Register {...args} />;

export const Researcher = Template.bind({});
Researcher.args = {
    typeUser:"researcher",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Patient = Template.bind({});
Patient.args = {
    typeUser:"patient",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


    