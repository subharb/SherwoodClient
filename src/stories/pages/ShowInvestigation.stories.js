import React from 'react';
import {ShowInvestigation} from '../../components/investigation/show/single/index'
import ProviderSherwood from '../../providerSherwood';
import { investigation_server, investigation_server_no_patitents, fake_submissions_reducer, patients_no_access_data, patients_personal_data_decrypted, investigation_server_read_access, patient_personal_data_default_key, records_patient1, records_patient2 } from '../example_data';

export default {
  title: 'Pages/Show Investigation',
  component: ShowInvestigation,
  argTypes: {
    uuid: { control: 'string' },
  },
  decorators: [story => 
                <ProviderSherwood>    
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <ShowInvestigation {...args} />
                            

export const NoPatients = Template.bind({});
NoPatients.args = {
    investigation : investigation_server_no_patitents(),
    patients:[],
    uuid : "ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const SharedNoPersonalDataAccess = Template.bind({});
SharedNoPersonalDataAccess.args = {
    investigation : investigation_server_read_access(),
    patients:patients_no_access_data,
    uuid : "ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

// let investigationWithRecords = {...investigation_server()};
// investigationWithRecords.surveys[0].records = [...records_patient1().submissions, ...records_patient2().submissions];

export const WithPatients = Template.bind({});
WithPatients.args = {
    investigation : investigation_server(),
    patients:patients_personal_data_decrypted(),
    submissions:fake_submissions_reducer,
    uuid : "ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};
// const investigationWithRecordsDefaultKey = {...investigationWithRecords};
// investigationWithRecordsDefaultKey.patientsPersonalData = patient_personal_data_default_key;
// export const WithPatientsDefaultKey = Template.bind({});
// WithPatientsDefaultKey.args = {
//     initialData : { investigation : investigationWithRecordsDefaultKey},
//     uuid : "ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
//     callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
// };

export const RemoteData = Template.bind({});
RemoteData.args = {
    uuid : "86ab4ecd-b338-4b79-b5db-bb4aa187d81a",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};