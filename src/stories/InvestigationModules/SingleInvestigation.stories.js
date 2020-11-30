import React from 'react';
import SingleInvestigation from '../../components/investigation/show/single/single_investigation'
import ProviderSherwood from '../../providerSherwood';
import { basic_info1 } from '../example_data';

export default {
  title: 'Investigation/Modules/Single Investigation',
  component: SingleInvestigation,
  parameters: { actions: { argTypesRegex: '^callBack.*' } },
  argTypes: {
    typeUser: {
        control: {
        type: 'select',
        options: [
            'researcher', 
            'patient'
        ]
        }
    }
},
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <SingleInvestigation {...args} />;

export const Researcher = Template.bind({});
Researcher.args = {
    initialData : basic_info1(),
    typeUser : "researcher",
    callBackData : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)}
};

export const Patient = Template.bind({});
Patient.args = {
    initialData : basic_info1(),
    callBackData : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)}
};

 