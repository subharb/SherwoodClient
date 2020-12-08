import React from 'react';
import ShowRecordsSection from '../../components/investigation/fill/show_records_section';
import ProviderSherwood from '../../providerSherwood';
import { edc_data1, records_patient1} from '../example_data';

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

let submissionsNonLongitudinal = [];
for(let i = 0; i < records_patient1().records.length; i++){
    const patientRecord = records_patient1().records[i];
    for(let j = 0; j < patientRecord.submission.length;j++){
        const submission = patientRecord.submission[j];
        if(submission.id_section === sectionNonLongitudinalID){
            submissionsNonLongitudinal.push(submission);
            
        }
    }
}

const submissionsLongitudinal = [];
for(let i = 0; i < records_patient1().records.length; i++){
    const patientRecord = records_patient1().records[i];
    for(let j = 0; j < patientRecord.submission.length;j++){
        const submission = patientRecord.submission[j];
        if(submission.id_section === sectionLongitudinalID){
            submissionsLongitudinal.push(submission);
            
        }
    }
}

const Template = (args) => <ShowRecordsSection {...args} />;

export const NonLongitudinal = Template.bind({});
NonLongitudinal.args = {
    section :sectionNonLongitudinal,
    submissions:submissionsNonLongitudinal,
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Longitudinal = Template.bind({});
Longitudinal.args = {
    section :sectionLongitudinal,
    submissions:submissionsLongitudinal,
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};
 