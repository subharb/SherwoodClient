import React from 'react';
import FillInvestigation from '../components/investigation/show/single/index'
import ProviderSherwood from '../providerSherwood';
import { investigation_server, investigation_server_no_patitents, patient_data1, records_patient1, records_patient2 } from './example_data';

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

let investigationWithRecords = investigation_server();
investigationWithRecords.surveys[0].records = [...records_patient1().records, ...records_patient2().records];

export const WithPatients = Template.bind({});
WithPatients.args = {
    investigation : investigationWithRecords,
    patientInfo : patient_data1(),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

