import React from 'react';
import BasicInfo from '../components/investigation/create/basic_info2'
import Form from '../components/general/form';
import ProviderSherwood from '../providerSherwood';


export default {
  title: 'BasicInfo',
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
    callBackBasicInfo : (values) => {console.log(JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    initialData : {"name":"COVID Nose ",
                    "acronym":"CN","type":"audit","researcher":"Pedro Rodriguez",
                    "institution":"Oxford University","contact":"test@email.com",
                    "ethics_body":"12345","reference_number_state":"1"
                },
    callBackBasicInfo : (values) => alert(values) 
};

