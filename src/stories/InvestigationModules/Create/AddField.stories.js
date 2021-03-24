import React from 'react';
import Form from '../../../components/general/form'
import ProviderSherwood from '../../../providerSherwood';
import { FIELDS_FORM } from '../../../utils';
export default {
    title: 'Investigation/Create/Form Field',
    component: Form,
    argTypes: {
        
    },
    decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Form {...args} />;

export const Edit = Template.bind({});
Edit.args = {
    fields:FIELDS_FORM, 
    callBackForm:(values) => {alert(JSON.stringify(values))}
};


