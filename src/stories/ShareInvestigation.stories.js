import React from 'react';
import ShareInvestigation from '../components/investigation/share'
import { researchers_to_share } from './example_data';
import ProviderSherwood from '../providerSherwood';

export default {
    title: 'Pages/Share Investigation',
    component: ShareInvestigation,
    argTypes: {
        uuid:{ control: {
            type: 'string'
          },
        },
      },
    decorators: [story => 
        <ProviderSherwood>
                {story()}
        </ProviderSherwood>],
};

const Template = (args) => <ShareInvestigation {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    uuid : "68a8b4d4-3e09-471a-812d-9354d60edd9c",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Data = Template.bind({});
Data.args = {
    uuid : "68a8b4d4-3e09-471a-812d-9354d60edd9c",
    initialState : {researchers_to_share},
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};