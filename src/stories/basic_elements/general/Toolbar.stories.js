import React from 'react';
import Toolbar from '../../../components/dashboard/toolbar';
import ProviderSherwood from '../../../providerSherwood';


export default {
    title: 'Basic Elements/General/Toolbar',
  component: Toolbar,
  parameters: { actions: { argTypesRegex: '^callBack.*' } },
  argTypes: {
    typeUser: {
        control: {
          type: 'select',
          options: [
            'researcher', 
            'patient'
          ]
        }
    }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const testStages = ["investigation.create.steps.basic_info", "investigation.create.steps.sections", "investigation.create.steps.patient_sheet" ];

const Template = (args) => <Toolbar {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    typeUser : "researcher",
    callBack : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};