import React from 'react';
import Sections from '../../components/investigation/create/edc'
import Form from '../../components/general/form';
import ProviderSherwood from '../../providerSherwood';
import { edc_data1 } from '../example_data';

export default {
    title: 'Investigation/Modules/EDC',
    component: Form,
    decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Sections {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Edit = Template.bind({});
Edit.args = {
    initialData :edc_data1() ,
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


