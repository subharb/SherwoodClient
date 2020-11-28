import React from 'react';
import Header from '../../../components/general/header';
import ProviderSherwood from '../../../providerSherwood';


export default {
    title: 'Basic Elements/General/Header',
    component: Header,
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

const Template = (args) => <Header {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    stages : testStages,
    callBack : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};