import React from 'react';
import ShowPatientRecords from '../../../components/investigation/show/single/show_patient_records';
import ProviderSherwood from '../../../providerSherwood';
import { records_patient1, edc_data1, records_patient2, patients_personal_data } from '../../example_data';

export default {
    title: 'Investigation/Fill/ShowPatientRecords - BORRAR',
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
    patient:{
        "id": "5fccaee78583362dd3d50248",
        "name": "John",
        "surname": "Hopkins",
        "email": "patient@sherwood.science",
        "phone": "+34 545454"
    },
    initialData:records_patient1().records,
    survey:edc_data1().surveys[0],
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};
export const Submissions = Template.bind({});

const recordsPatients = [...records_patient1().records, ...records_patient2().records];
Submissions.args = {
    
    uuidInvestigation:"238b181e-28fd-47a1-bae6-a973c08c8684",
    patient:patients_personal_data()[0],
    initialData:recordsPatients,
    survey:edc_data1().surveys[0],
    mode:"elements",
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};

 