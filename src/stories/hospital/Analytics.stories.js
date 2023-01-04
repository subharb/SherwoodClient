import React from 'react';

import { firstmonitoring } from "../data/hospitalStatsService";
import ProviderSherwood from '../../providerSherwood';
import HospitalStatsComponent from '../../pages/hospital/Analytics/HospitalStats';
import DatesSelector from '../../pages/dashboards/Analytics/DatesSelector';

export default {
  title: 'Hospital/Analytics',
  component: HospitalStatsComponent,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const TemplateHospital = (args) => <HospitalStatsComponent {...args} />; 
const TemplateDateSelector = (args) => <DatesSelector {...args} />; 

export const HospitalStats = TemplateHospital.bind({});
HospitalStats.args = {
    stats : firstmonitoring
};

export const DateSelector = TemplateDateSelector.bind({});
DateSelector.args = {
    onCallBack : (dates) => {console.log(dates)}
};
