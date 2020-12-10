import React from 'react';
import NewInvestigation from '../components/investigation/create/index'
import ProviderSherwood from '../providerSherwood';
import { summary_info1 } from './example_data';

export default {
  title: 'Pages/Create Investigation',
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

export const New = Template.bind({});
New.args = {
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    
    initialState : {
        "investigation": summary_info1(),
        "addingSection": false,
        "editingIndexSection": false,
        step : 0,
    },
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


