import React from 'react';
import ShowSurveysPatient from '../../../components/investigation/show/single/show_surveys_patient';
import ProviderSherwood from '../../../providerSherwood';
import { records_patient1, edc_data1, patient_data_decrypted1 } from '../../example_data';

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
        level : {control : "number"},
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

export const Add = Template.bind({});
Add.args = {
    uuidInvestigation:"ff4b1de5-9163-4eb1-85fc-59d19f2741dd",
    patient:patient_data_decrypted1(),
    mode:"add",
    records:records_patient1().records,
    surveys:edc_data1().surveys,
    level : 0,
    updateLevel : (level) => alert("updateLevel "+level),
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};
export const View = Template.bind({});
View.args = {
    initialData : records_patient1(),
    uuidInvestigation:"ff4b1de5-9163-4eb1-85fc-59d19f2741dd",
    patient:patient_data_decrypted1(),
    surveys:edc_data1().surveys,
    display:"elements",
    level : 0,
    updateLevel : (level) => alert("updateLevel "+level),
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};

 