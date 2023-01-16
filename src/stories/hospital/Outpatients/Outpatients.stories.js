import React from 'react';
import { MY_SCHEDULE_ROUTE, SEARCH_PATIENT_ROUTE } from '../../../routes';
import HomeSchedule from '../../../pages/hospital/HomeSchedule'
import ProviderSherwood from '../../../providerSherwood';

import {FormAppointmentCore} from '../../../pages/hospital/Outpatients/FormAppointment';

export default {
  title: 'Hospital/Outpatients',
  component: HomeSchedule,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' },
    department: { control: 'string' },
    institution: { control: 'string' },
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <FormAppointmentCore {...args} />; 

export const AppointmentFormNoDepartments = Template.bind({});
AppointmentFormNoDepartments.args = {
    departmentsWithAgenda:[],
    agendas:[{
        name: "Pedriatrics",
        department:null,
        daysWeek:["M"],
        slotsPerDay:20,
        box: "A",
        turn:[[9,0], [14,30]]
    }]
};
