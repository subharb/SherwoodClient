import type { Meta, StoryObj } from '@storybook/react';
import { RequestStatus } from '../../pages/hospital/Service/types';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { agendas, appointmentsAllAgendas, patients } from './example_data';
import { FormAppointmentCore } from '../../pages/hospital/Outpatients/FormAppointment';
import { OutpatientsVisualizationMode } from '../../constants/types';

const meta: Meta<typeof FormAppointmentCore> = {
  title: 'Outpatients/FormAppointment',
  component: FormAppointmentCore,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
 
  },
};

export default meta;



const Template = (args: FormAppointmentCoreProps) => <FormAppointmentCore {...args} />


export const Standard = Template.bind({});
Standard.args = {
    uuidPatient: "123",
    dateTimeAppointment : true,
    mode: OutpatientsVisualizationMode.ADMIN,
    agendas : agendas(),
    departmentsWithAgenda: [{
        uuid:"3243a9c0-54ea-4593-8e4f-47d468fea134",
        code:"DERM",
        name:"Dermatology",
        units:[],
        wards:[]
    }, 
    {
        uuid:"ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
        code:"FISIO",
        name:"Fisiotherapy",
        units:[],
        wards:[]
    }],
    infoAppointmentCallback: (uuidAgenda:string, date:Date) => console.log("infoAppointmentCallback", uuidAgenda, date),
};


  // Define the play function
const play = async ({ page }) => {
    // Interact with the page here
    // For example, to click a button:
    // await page.click('button');
  };
  
  Standard.play = play;