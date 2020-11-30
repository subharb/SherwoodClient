import React from 'react';
import AllInvestigations from '../../components/investigation/show/all'
import ProviderSherwood from '../../providerSherwood';
import { summary_info1 } from '../example_data';
export default {
    title: 'Investigation/Modules/All Investigations',
    component: AllInvestigations,
    typeUser: {
        control: {
          type: 'select',
          options: [
            'researcher', 
            'patient'
          ]
        }
    },
    decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <AllInvestigations {...args} />;

export const Edit = Template.bind({});
Edit.args = {
    initialData : summary_info1(),
    typeUser: "researcher",
    stepBack : () => alert("Hit StepBack"),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

