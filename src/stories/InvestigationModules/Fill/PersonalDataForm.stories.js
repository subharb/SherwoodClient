import React from 'react';
import PersonalDataForm from '../../../components/investigation/show/single/personal_data'
import ProviderSherwood from '../../../providerSherwood';
import { personal_data_investigation1, patient_data_decrypted1, patient_data1 } from '../../example_data';

export default {
  title: 'Investigation/Fill/Personal Data',
  component: PersonalDataForm,
  parameters: { actions: { argTypesRegex: '^callBack.*' } },
  argTypes: {
    fields: { control: "array"}
    },
  decorators: [story =>  
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <PersonalDataForm {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    fields : personal_data_investigation1(),
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    fields : personal_data_investigation1(),
    initialData:patient_data_decrypted1(),
    callBackForm : (values) => {
        console.log("Callback BasicInfo", JSON.stringify(values));
    }
};

 