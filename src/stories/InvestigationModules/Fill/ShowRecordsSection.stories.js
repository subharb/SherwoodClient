import React from 'react';
import ShowRecordsSection from '../../../components/investigation/fill/show_records_section';
import ProviderSherwood from '../../../providerSherwood';
import { edc_data1, records_patient1} from '../../example_data';
import { findSubmissionsFromSection } from '../../../utils';

export default {
    title: 'Investigation/Fill/ShowRecordsSection',
    component: ShowRecordsSection, 
    parameters: { actions: { argTypesRegex: '^callBack.*' } },
    argTypes: {
        initialData: {
            control: "object"
        },
        edc: {
            control: "object"
        },
        indexSubmission: {
            control: "number"
        },
        mode:{ control: {
            type: 'select',
            options: [
              'table', 
              'elements'
            ],
          },
        },
        uuidInvestigation:{control : "string"}
},
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};


const sectionNonLongitudinalID = "5fccaedb8583362dd3d50247";
const sectionLongitudinalID = "5fccaedb8583362dd3d50246";

const sectionNonLongitudinal = edc_data1().sections.filter(section => {
    return sectionNonLongitudinalID === section._id
})

 const sectionLongitudinal = edc_data1().sections.filter(section => {
    return sectionLongitudinalID === section._id
}) 

const submissionsNonLongitudinal = findSubmissionsFromSection(records_patient1().records, sectionNonLongitudinalID);

const submissionsLongitudinal = findSubmissionsFromSection(records_patient1().records, sectionLongitudinalID);

const Template = (args) => <ShowRecordsSection {...args} />;

export const NonLongitudinal = Template.bind({});
NonLongitudinal.args = {
    section :sectionNonLongitudinal[0],
    submissions:submissionsNonLongitudinal,
    indexSubmission:0,
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Longitudinal = Template.bind({});
Longitudinal.args = {
    section :sectionLongitudinal[0],
    submissions:submissionsLongitudinal,
    indexSubmission:0,
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};
 