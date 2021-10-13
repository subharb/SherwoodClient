import React from 'react';

import SearchPatients from '../../pages/hospital/SearchPatients'
import { personal_data_investigation1, investigation_server } from "../example_data";
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Search Patients',
  component: SearchPatients,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <SearchPatients {...args} />; 

export const Basic = Template.bind({});
Basic.args = {
    personalFields : personal_data_investigation1(),
    investigations:[investigation_server()]
};
