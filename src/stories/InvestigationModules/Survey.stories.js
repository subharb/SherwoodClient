import React from 'react';
import Survey from '../../components/investigation/show/fill/survey_form';
import ProviderSherwood from '../../providerSherwood';
import { edc_data1 } from '../example_data';

export default {
    title: 'Investigation/Fill/SurveyForm',
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
    patientName : "Peter Petrelli",
    uuidInvestigation:"96b17ef9-5a8e-4db8-b8a6-c17080ae13ba",
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};

 