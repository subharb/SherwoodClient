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
        daysWeek:["M", "T", "W", "R", "F"],
        slotsPerDay:3,
        box: "A",
        datesOccupancy:{
            "2023-01-25": 1,
            "2023-01-26": 2,
            "2023-01-27": 3,
        },
        appointments:[{
            startDateTime: 1674112966190,
            type:0
        }],
        blockedDates:[1674112966190],
        turn:[[9,0], [14,30]]
    }]
};
