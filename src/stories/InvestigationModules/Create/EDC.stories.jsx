import React from 'react';
import EDC from '../../../components/investigation/create/edc'
import Form from '../../../components/general/form';
import ProviderSherwood from '../../../providerSherwood';
import { edc_data1 } from '../../example_data';

export default {
    title: 'Investigation/Create/EDC',
    component: EDC,
    decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <EDC {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(JSON.stringify(values))}
};

export const Edit = Template.bind({});
Edit.args = {
    initialData :edc_data1() ,
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(JSON.stringify(values))}
};


