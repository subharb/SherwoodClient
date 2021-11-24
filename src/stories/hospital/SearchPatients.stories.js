import React from 'react';

import { SearchPatientsComponent } from '../../pages/hospital/SearchPatients'
import { personal_data_investigation1, patients_personal_data_decrypted } from "../example_data";
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Search Patients',
  component: SearchPatientsComponent,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <SearchPatientsComponent {...args} />;  

export const Basic = Template.bind({});
Basic.args = {
    personalFields : personal_data_investigation1(),
    showResults:true,
    patients:patients_personal_data_decrypted(),
    searchPatientCallBack:() => console.log("searchPatientCallBack "),
    backToSearchCallBack:() => console.log("backToSearchCallBack "),
    patientSelectedCallBack:() => console.log("patientSelectedCallBack "),
    hospitalizePatientCallBack:(i) => console.log("hospitalizePatientCallBack "+i)
};
