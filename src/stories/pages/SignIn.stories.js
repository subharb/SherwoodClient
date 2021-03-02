import React from 'react';
import SignIn from '../../pages/auth/SignIn'
import ProviderSherwood from '../../providerSherwood';
import { summary_info1 } from '../example_data';

export default {
  title: 'Pages/SignIn',
  component: SignIn,
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

const Template = (args) => <SignIn {...args} />;

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


    