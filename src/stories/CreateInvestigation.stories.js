import React from 'react';
import NewInvestigation from '../components/investigation/create/index'
import ProviderSherwood from '../providerSherwood';
import { summary_info1 } from './example_data';

export default {
  title: 'Pages/Create Investigation',
  component: NewInvestigation,
  argTypes: {
    step: { control: 'number' },
    error: { control: 'boolean' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <NewInvestigation {...args} />;

export const Pristine = Template.bind({});
Pristine.args = {
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const WithData = Template.bind({});
WithData.args = {
    initialState : {
        "investigation": summary_info1(),
        "addingSection": false,
        "editingIndexSection": false,
        "error" : false,
        step : 0,
    },
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


