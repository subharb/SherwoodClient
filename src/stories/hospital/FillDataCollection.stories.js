import React from 'react';
import { HOSPITAL_WARD_ROUTE, OUTPATIENTS_ROUTE } from '../../routes';
import FillDataCollection from '../../pages/hospital/FillDataCollection'
import { listPatientsHospitalWard, edc_data1, investigation_server } from "../example_data";
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Fill Patient',
  component: FillDataCollection,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' },
    loading: { control: 'boolean'}
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <FillDataCollection {...args} />; 
const testPatient = listPatientsHospitalWard[0];
export const Basic = Template.bind({});
Basic.args = {
    patientId:testPatient.id,
    initialState : {loading:false, error:false, saved:true},
    sectionSelected: edc_data1().surveys[0].sections[0],
    dataCollection:edc_data1().surveys[0],
    callBackDataCollection : (values) => alert(JSON.stringify(values))
};
