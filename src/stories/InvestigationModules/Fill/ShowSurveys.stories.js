import React from 'react';
import ShowSurveysPatient from '../../../components/investigation/show/fill/show_surveys_patient';
import ProviderSherwood from '../../../providerSherwood';
import { records_patient1, edc_data1 } from '../../example_data';

export default {
    title: 'Investigation/Fill/ShowSurveysPatient',
    component: ShowSurveysPatient, 
    parameters: { actions: { argTypesRegex: '^callBack.*' } },
    argTypes: {
        initialData: {
            control: "object"
        },
        edc: {
            control: "object"
        },
        display:{ control: {
            type: 'select',
            options: [
              'table', 
              'submissions'
            ],
          },
        },
        display:{ control: {
            type: 'select',
            options: [
              'view', 
              'add'
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

const Template = (args) => <ShowSurveysPatient {...args} />;

export const Table = Template.bind({});
Table.args = {
    uuidInvestigation:"ff4b1de5-9163-4eb1-85fc-59d19f2741dd",
    patient:{
        "id": "5fccaee78583362dd3d50248",
        "personalData": {
            "name": "John",
            "surname": "Hopkins",
            "email": "patient@sherwood.science",
            "phone": "+34 545454"
        }
    },
    mode:"add",
    records:records_patient1().records,
    surveys:edc_data1().surveys,
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};
export const Submissions = Template.bind({});
Submissions.args = {
    initialData : records_patient1(),
    uuidInvestigation:"ff4b1de5-9163-4eb1-85fc-59d19f2741dd",
    patient:{
        "id": "5fccaee78583362dd3d50248",
        "personalData": {
            "name": "John",
            "surname": "Hopkins",
            "email": "patient@sherwood.science",
            "phone": "+34 545454"
        }
    },
    surveys:edc_data1(),
    display:"elements",
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};

 