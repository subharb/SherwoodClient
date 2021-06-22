import React from 'react';
import PersonalData from '../../../components/investigation/create/personal_data'
import ProviderSherwood from '../../../providerSherwood';
import { selected_personal_data } from '../../example_data';

export default {
  title: 'Investigation/Create/Choose Personal Data',
  component: PersonalData,
  parameters: { actions: { argTypesRegex: '^callBack.*' } },
  decorators: [story =>  
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <PersonalData {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    callBackData : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    initialData : selected_personal_data,
    callBackData : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)}
};

 