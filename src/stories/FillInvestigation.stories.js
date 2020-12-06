import React from 'react';
import FillInvestigation from '../components/investigation/fill/index'
import ProviderSherwood from '../providerSherwood';
import { investigation_server, investigation_server_no_patitents, patient_data1 } from './example_data';

export default {
  title: 'Pages/Fill Investigation',
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

export const Basic = Template.bind({});
Basic.args = {
    initialData : investigation_server_no_patitents(),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    initialData : investigation_server(),
    patientInfo : patient_data1(),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

