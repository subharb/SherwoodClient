import React from 'react';
import ShowSurveysRecords from '../../../components/investigation/show/single/show_all_records_survey';
import ProviderSherwood from '../../../providerSherwood';
import { edc_data1, records_patient1, records_patient2, patients_personal_data } from '../../example_data';

export default {
  title: 'Investigation/Fill/ShowSurveysRecords',
  component: ShowSurveysRecords,
  parameters: { actions: { argTypesRegex: '^callBack.*' } },
  argTypes: {
    fields: { control: "array"}
    },
  decorators: [story =>  
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <ShowSurveysRecords {...args} />;

//Combinamos los records de los dos pacientes
const recordsPatients = [...records_patient1().records, ...records_patient2().records];

export const Basic = Template.bind({});
Basic.args = {
    survey:edc_data1().surveys[0],
    patients:patients_personal_data(),
    records:recordsPatients,
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)}
};



 