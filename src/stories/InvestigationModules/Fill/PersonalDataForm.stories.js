import React from 'react';
import PersonalDataForm from '../../../components/investigation/fill/personal_data'
import ProviderSherwood from '../../../providerSherwood';
import { personal_data1, patient_data1 } from '../../example_data';

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
    fields : ["name", "surname", "address"],
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    fields : personal_data1(),
    initialData:patient_data1(),
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)}
};

 