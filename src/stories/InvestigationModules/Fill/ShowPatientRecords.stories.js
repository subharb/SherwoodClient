import React from 'react';
import ShowPatientRecords from '../../../components/investigation/fill/show_patient_records';
import ProviderSherwood from '../../../providerSherwood';
import { records_patient1, edc_data1 } from '../../example_data';

export default {
    title: 'Investigation/Fill/ShowPatientRecords',
    component: ShowPatientRecords, 
    parameters: { actions: { argTypesRegex: '^callBack.*' } },
    argTypes: {
        initialData: {
            control: "object"
        },
        edc: {
            control: "object"
        },
        mode:{ control: {
            type: 'select',
            options: [
              'table', 
              'submissions'
            ],
          },
        },
        uuidInvestigation:{control : "string"}
},
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <ShowPatientRecords {...args} />;

export const Table = Template.bind({});
Table.args = {
    uuidInvestigation:"ff4b1de5-9163-4eb1-85fc-59d19f2741dd",
    patientID:"5fccaee78583362dd3d50248",
    edc:edc_data1(),
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};
export const Submissions = Template.bind({});
Submissions.args = {
    initialData : records_patient1(),
    uuidInvestigation:"ff4b1de5-9163-4eb1-85fc-59d19f2741dd",
    patientID:"5fccaee78583362dd3d50248",
    edc:edc_data1(),
    mode:"elements",
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};

 