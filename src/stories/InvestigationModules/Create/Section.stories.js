import React from 'react';
import Section from '../../../components/investigation/create/section'

import ProviderSherwood from '../../../providerSherwood';
import { edc_data1 } from '../../example_data';

export default {
    title: 'Investigation/Create/Section',
    component: Section,
    decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Section {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    callBackNewSection : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(JSON.stringify(values))}
};

export const Edit = Template.bind({});
Edit.args = {
    initialData :edc_data1() ,
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


