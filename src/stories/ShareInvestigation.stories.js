import React from 'react';
import ShareInvestigation from '../components/investigation/share'
import { researchers_to_share, sharedResearchers, investigation_server } from './example_data';
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
const uuidInvestigation = "00287041-3df4-438f-b60a-e1d85dbe25b9";

export const Basic = Template.bind({});
Basic.args = {
    uuid : uuidInvestigation,
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Data = Template.bind({});
Data.args = {
    uuid : uuidInvestigation,
    initialState : {newResearchers : researchers_to_share},
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const PreviousResearchers = Template.bind({});
PreviousResearchers.args = {
    uuid : uuidInvestigation,
    initialState : {investigation : investigation_server()},
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

