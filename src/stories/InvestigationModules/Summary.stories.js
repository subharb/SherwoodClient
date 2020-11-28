import React from 'react';
import Summary from '../../components/investigation/create/summary'
import ProviderSherwood from '../../providerSherwood';
import { summary_info1 } from '../example_data';
export default {
    title: 'Investigation/Modules/Summary',
    component: Summary,
    decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Summary {...args} />;

export const Edit = Template.bind({});
Edit.args = {
    initialData : summary_info1(),
    stepBack : () => alert("Hit StepBack"),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


