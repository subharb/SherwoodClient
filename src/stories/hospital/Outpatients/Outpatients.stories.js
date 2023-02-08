import React from 'react';
import { MY_SCHEDULE_ROUTE, SEARCH_PATIENT_ROUTE } from '../../../routes';
import HomeSchedule from '../../../pages/hospital/HomeSchedule'
import ProviderSherwood from '../../../providerSherwood';

import {FormAppointmentCore} from '../../../pages/hospital/Outpatients/FormAppointment';
import Outpatients from '../../../pages/hospital/Outpatients';
import EditOutpatientsLocalized from '../../../pages/hospital/Outpatients/Edit';
import { boxes, departments, researchers } from '../../data/departmentsService';
import { services } from '../Services/data';

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
const TemplateOutpatients = (args) => <Outpatients {...args} />; 
const TemplateEditOutpatients = (args) => <EditOutpatientsLocalized {...args} />; 

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

export const OutpatientsHome = TemplateOutpatients.bind({});
    OutpatientsHome.args = {
};

export const Edit = TemplateEditOutpatients.bind({});
    Edit.args = {
        departments:departments,
        boxes:boxes,
        researchers:researchers,
        services:services
};

