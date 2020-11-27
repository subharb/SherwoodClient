import React from 'react';
import BasicInfo from '../../components/investigation/create/basic_info2'
import Form from '../../components/general/form';
import ProviderSherwood from '../../providerSherwood';
import { basic_info1 } from '../example_data';

export default {
  title: 'Investigation/Modules/Basic Info',
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
    callBackBasicInfo : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    initialData : basic_info1(),
    callBackBasicInfo : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

 