import React from 'react';
import ShowRecordsPatient from '../../../components/investigation/show/fill/show_records_section';
import ProviderSherwood from '../../../providerSherwood';
import { records_patient1, edc_data1, patient_data_decrypted1 } from '../../example_data';
import { filterRecordsFromSubmissions } from '../../../utils';

export default {
    title: 'Investigation/Fill/ShowRecordsPatientSection',
    component: ShowRecordsPatient, 
    parameters: { actions: { argTypesRegex: '^callBack.*' } },
    argTypes: {
        initialData: {
            control: "object"
        },
        edc: {
            control: "object"
        },
        level : {control : "number"},
        display:{ control: {
            type: 'select',
            options: [
              'table', 
              'submissions'
            ],
          },
        },
        display:{ control: {
            type: 'select',
            options: [
              'view', 
              'add'
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

const Template = (args) => <ShowRecordsPatient {...args} />;

const sectionNonLongitudinalUUID = "ef30d3f6-1436-47cd-ad5a-22321de4d3a7";
const sectionLongitudinalUUID = "21cc0d3a-0149-442d-bd24-c8eaa050223f";

const sectionNonLongitudinal = edc_data1().surveys[0].sections.find(section => {
    return sectionNonLongitudinalUUID === section.uuid
})
 
 const sectionLongitudinal = edc_data1().surveys[1].sections.find(section => {
    return sectionLongitudinalUUID === section.uuid
}) 

const submissionsNonLongitudinal = filterRecordsFromSubmissions(records_patient1().submissions, sectionNonLongitudinalUUID);

const submissionsLongitudinal = filterRecordsFromSubmissions(records_patient1().submissions, sectionLongitudinalUUID);
 

export const NonLongitudinal = Template.bind({});
NonLongitudinal.args = {
    section :sectionNonLongitudinal,
    submissions:submissionsNonLongitudinal,
    indexSubmission:0,
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};
export const Longitudinal = Template.bind({});
Longitudinal.args = {
    section :sectionLongitudinal,
    submissions:submissionsLongitudinal,
    indexSubmission:0,
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};




// const Template = (args) => <ShowRecordsSection {...args} />;

// export const NonLongitudinal = Template.bind({});
// NonLongitudinal.args = {
//     section :sectionNonLongitudinal,
//     submissions:submissionsNonLongitudinal,
//     indexSubmission:0,
//     callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
// };

// export const Longitudinal = Template.bind({});
// Longitudinal.args = {
//     section :sectionLongitudinal,
//     submissions:submissionsLongitudinal,
//     indexSubmission:0,
//     callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
// };

 