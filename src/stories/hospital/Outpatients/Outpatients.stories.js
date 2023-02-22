import React from 'react';
import { MY_SCHEDULE_ROUTE, SEARCH_PATIENT_ROUTE } from '../../../routes';
import HomeSchedule from '../../../pages/hospital/HomeSchedule'
import ProviderSherwood from '../../../providerSherwood';

import {FormAppointmentCore} from '../../../pages/hospital/Outpatients/FormAppointment';
import Outpatients from '../../../pages/hospital/Outpatients';
import EditOutpatientsLocalized from '../../../pages/hospital/Outpatients/EditOutpatients';
import { boxes, departments, researchers } from '../../data/departmentsService';
import { services } from '../Services/data';
import { SingleAgendaCore } from '../../../pages/hospital/Outpatients/SingleAgenda';
import { AppointmentsCore } from '../../../pages/hospital/Outpatients/Appointments';

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
const TemplateSingleAgenda = (args) => <SingleAgendaCore {...args} />; 
const TemplateAppointments = (args) => <AppointmentsCore {...args} />; 

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

export const Appointments = TemplateAppointments.bind({});
    Appointments.args = {
        showSnackbar:{
            show:false,
        },
        mode:0,
        loadingAppointments:false,
        patientsPersonalData:[
            {
                "id": 6016,
                "uuid": "663a70f3-48ff-4ea2-86ee-c5f55a2447e8",
                personalData:{
                    "name" : "PEter",
                    "surnames" : "Parker",
                    sex : "Male",
                    birthdate:new Date(2011,11,30)
                }

            },
            {
                "id": 6016,
                "uuid": "1a2a733c-f6fa-4397-bf27-af8f735aad43",
                personalData:{
                    "name" : "Jane",
                    "surnames" : "Fonda",
                    sex : "Female",
                    birthdate:new Date(1981,11,30)
                }

            }
        ],
        "appointments": [
                {
                    "id": 4,
                    "uuid": "58c31f2b-9fbe-423f-b04b-07648d171888",
                    "order": 1,
                    "type": 0,
                    "startDateTime": "2023-02-23T19:44:00.000Z",
                    "createdAt": "2023-02-22T19:44:32.523Z",
                    "updatedAt": "2023-02-22T19:44:32.523Z",
                    "deletedAt": null,
                    "patient": {
                        "id": 6016,
                        "uuid": "663a70f3-48ff-4ea2-86ee-c5f55a2447e8",
                        "patientId": 6016,
                        "patientIdInvestigation": 569
                    },
                    "requestAppointment": {
                        "id": 27,
                        "type": 4,
                        "status": 0,
                        "createdAt": "2023-02-22T19:44:32.477Z",
                        "updatedAt": "2023-02-22T19:44:32.477Z",
                        "deletedAt": null
                    }
                },
                {
                    "id": 5,
                    "uuid": "b4972e76-0690-4107-8572-de85157f7aae",
                    "order": 1,
                    "type": 0,
                    "startDateTime": "2023-02-23T19:46:00.000Z",
                    "createdAt": "2023-02-22T19:46:54.388Z",
                    "updatedAt": "2023-02-22T19:46:54.388Z",
                    "deletedAt": null,
                    "patient": {
                        "id": 6015,
                        "uuid": "1a2a733c-f6fa-4397-bf27-af8f735aad43",
                        "patientId": 6015,
                        "patientIdInvestigation": 568
                    },
                    "requestAppointment": {
                        "id": 28,
                        "type": 4,
                        "status": 0,
                        "createdAt": "2023-02-22T19:46:54.335Z",
                        "updatedAt": "2023-02-22T19:46:54.335Z",
                        "deletedAt": null
                    }
                },
                {
                    "id": 6,
                    "uuid": "f8e7eed3-042c-43c9-ac9e-cddecd4c35f4",
                    "order": 1,
                    "type": 0,
                    "startDateTime": "2023-02-23T19:47:00.000Z",
                    "createdAt": "2023-02-22T19:48:02.220Z",
                    "updatedAt": "2023-02-22T19:48:02.220Z",
                    "deletedAt": null,
                    "patient": {
                        "id": 6015,
                        "uuid": "1a2a733c-f6fa-4397-bf27-af8f735aad43",
                        "patientId": 6015,
                        "patientIdInvestigation": 568
                    },
                    "requestAppointment": {
                        "id": 29,
                        "type": 4,
                        "status": 0,
                        "createdAt": "2023-02-22T19:48:02.178Z",
                        "updatedAt": "2023-02-22T19:48:02.178Z",
                        "deletedAt": null
                    }
                }
            ]
};

export const SingleAgenda = TemplateSingleAgenda.bind({});
    SingleAgenda.args = {
        agenda:{
            name: "Pedriatrics",
            department:null,
            daysWeek:["M", "T", "W", "R", "F"],
            slotsPerDay:3,
            box:{
                name:"A",
                department:null,
                uuid:"1234"
            },
            principalResearcher: {
                name:"Juan",
                surnames:"Perez",
            },
            turn:[[9,0], [14,30]],
        }
};
