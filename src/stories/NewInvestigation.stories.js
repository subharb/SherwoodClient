import React from 'react';
import NewInvestigation from '../components/investigation/create/index'
import ProviderSherwood from '../providerSherwood';
import { summary_info1 } from './example_data';

export default {
  title: 'Pages/New Investigation',
  component: NewInvestigation,
  argTypes: {
    step: { control: 'number' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <NewInvestigation {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    step : 0,
    initialData : {
        "investigation": summary_info1(),
        "addingSection": false,
        "editingIndexSection": false
    },
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


