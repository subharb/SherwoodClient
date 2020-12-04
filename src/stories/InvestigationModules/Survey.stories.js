import React from 'react';
import Survey from '../../components/investigation/fill/survey_form';
import ProviderSherwood from '../../providerSherwood';
import { edc_data1 } from '../example_data';

export default {
    title: 'Investigation/Fill/Survey',
    component: Survey, 
    parameters: { actions: { argTypesRegex: '^callBack.*' } },
    argTypes: {
        initialData: {
            control: "object"
        }
},
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Survey {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    initialData : edc_data1(),
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};

 