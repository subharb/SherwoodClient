import React from 'react';
import FillInvestigation from '../components/investigation/show/single/index'
import ProviderSherwood from '../providerSherwood';
import { investigation_server, investigation_server_no_patitents, investigation_server_read_access, patient_personal_data_default_key, records_patient1, records_patient2 } from './example_data';

export default {
  title: 'Pages/Show Investigation',
  component: FillInvestigation,
  argTypes: {
    uuid: { control: 'string' },
  },
  decorators: [story => 
                <ProviderSherwood>    
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <FillInvestigation {...args} />
                            

export const NoPatients = Template.bind({});
NoPatients.args = {
    initialData : { investigation : investigation_server_no_patitents()},
    uuid : "ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const SharedNoPersonalDataAccess = Template.bind({});
SharedNoPersonalDataAccess.args = {
    initialData : { investigation : investigation_server_read_access()},
    uuid : "ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

let investigationWithRecords = investigation_server();
investigationWithRecords.surveys[0].records = [...records_patient1().records, ...records_patient2().records];

export const WithPatients = Template.bind({});
WithPatients.args = {
    initialData : { investigation : investigationWithRecords},
    uuid : "ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};
const investigationWithRecordsDefaultKey = {...investigationWithRecords};
investigationWithRecordsDefaultKey.patientsPersonalData = patient_personal_data_default_key;
export const WithPatientsDefaultKey = Template.bind({});
WithPatientsDefaultKey.args = {
    initialData : { investigation : investigationWithRecordsDefaultKey},
    uuid : "ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const RemoteData = Template.bind({});
RemoteData.args = {
    uuid : "58713404-eac7-43f9-a7bc-b977633cf758",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};
