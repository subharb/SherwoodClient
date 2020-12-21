import React from 'react';
import FillInvestigation from '../components/investigation/show/single/index'
import ProviderSherwood from '../providerSherwood';
import { investigation_server, investigation_server_no_patitents, patient_data1 } from './example_data';

export default {
  title: 'Pages/Show Investigation',
  component: FillInvestigation,
  argTypes: {
    step: { control: 'number' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <FillInvestigation {...args} />;

export const NoPatients = Template.bind({});
NoPatients.args = {
    investigation : investigation_server_no_patitents(),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const WithPatients = Template.bind({});
WithPatients.args = {
    investigation : investigation_server(),
    patientInfo : patient_data1(),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

