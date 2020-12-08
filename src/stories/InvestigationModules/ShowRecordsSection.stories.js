import React from 'react';
import ShowRecordsSection from '../../components/investigation/fill/show_records_section'
import ProviderSherwood from '../../providerSherwood';
import { summary_info1 } from '../example_data';
export default {
    title: 'Investigation/Modules/All Investigations',
    component: ShowRecordsSection,
    argTypes: {
        initialData: {
            control: "object"
        },
    },
    decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <ShowRecordsSection {...args} />;

export const Edit = Template.bind({});
Edit.args = {
    initialData : summary_info1(),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


