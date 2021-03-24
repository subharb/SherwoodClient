import React from 'react';
import { HOSPITAL_WARD_ROUTE, OUTPATIENTS_ROUTE } from '../../routes';
import Patient from '../../pages/hospital/Patient'
import { listPatientsHospitalWard, edc_data1, investigation_server } from "../example_data";
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Patient',
  component: Patient,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Patient {...args} />; 
const testPatient = listPatientsHospitalWard[0];
export const Basic = Template.bind({});
Basic.args = {
    name:testPatient.patient.name,
    surnames:testPatient.patient.surnames,
    gender:testPatient.patient.gender,
    dateOfBirth:testPatient.patient.dateOfBirth,
    dateIn: testPatient.dateIn,
    number:testPatient.number,
    patientId:testPatient.id,
    investigation: investigation_server(),
    dataCollections:edc_data1().surveys
};
