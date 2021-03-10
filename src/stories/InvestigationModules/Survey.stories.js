import React from 'react';
import Survey from '../../components/investigation/show/single/survey_form';
import ProviderSherwood from '../../providerSherwood';
import { edc_data1 } from '../example_data';

export default {
    title: 'Investigation/Fill/SurveyForm - BORRAR',
    component: Survey, 
    parameters: { actions: { argTypesRegex: '^callBack.*' } },
    argTypes: {
        initialData: {
            control: "object"
        },
        patientName:{control : "string"}
},
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Survey {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    sections : edc_data1().surveys[0].sections,
    patientId:"5fdcd77b98125b1f1f0e627d",
    uuidInvestigation:"ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};

 