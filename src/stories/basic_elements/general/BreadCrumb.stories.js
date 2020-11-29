import React from 'react';
import BreadCrumb from '../../../components/general/breadcrumb';
import ProviderSherwood from '../../../providerSherwood';


export default {
    title: 'Basic Elements/General/BreadCrumb',
  component: BreadCrumb,
  argTypes: {
    selected: { control: 'number' },
    stages: { control: 'array' }
  },
  parameters: { actions: { argTypesRegex: '^callBack.*' } },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const testStages = ["investigation.create.steps.basic_info", "investigation.create.steps.sections", "investigation.create.steps.patient_sheet" ];

const Template = (args) => <BreadCrumb {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    stages : testStages,
    callBack : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};