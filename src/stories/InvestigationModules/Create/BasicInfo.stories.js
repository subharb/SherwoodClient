import React from 'react';
import BasicInfo from '../../../components/investigation/create/basic_info2'
import Form from '../../../components/general/form';
import ProviderSherwood from '../../../providerSherwood';
import { basic_info1 } from '../../example_data';

export default {
  title: 'Investigation/Create/Basic Info',
  component: Form,
  parameters: { actions: { argTypesRegex: '^callBack.*' } },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <BasicInfo {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    callBackData : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    initialData : basic_info1(),
    callBackData : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)}
};

 