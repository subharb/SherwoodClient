import React from 'react';

import {PatientToolBar} from '../../pages/hospital/patient/toolbar'
import { listPatientsHospitalWard, edc_data1, investigation_server } from "../example_data";
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Patient',
  component: PatientToolBar,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <PatientToolBar {...args} />; 
const testPatient = listPatientsHospitalWard[0];
export const Toolbar = Template.bind({});
Toolbar.args = {
    personalData:testPatient.personalData,
    years:34,
    showMedical:true,
    action:{},
    typeSurveySelected:0,
    hospitalize:() => console.log("Hospitalize")
};
