import type { Meta, StoryObj } from '@storybook/react';
import { RequestStatus } from '../../pages/hospital/Service/types';
import MultiAgenda, { MultiAgendaProps } from '../../pages/hospital/Outpatients/Appointments/MultiAgenda';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { agendas, appointmentsAllAgendas, patients } from './example_data';

const meta: Meta<typeof MultiAgenda> = {
  title: 'Outpatients/MultiAgenda',
  component: MultiAgenda,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
 
  },
};

export default meta;



const Template = (args: MultiAgendaProps) => <MultiAgenda {...args} />


export const Standard = Template.bind({});
Standard.args = {
    appointments : appointmentsAllAgendas().appointments,
    agendas : agendas(),
    patients : patients(),
    date : new Date(2024,7, 21),
    cancelCallback: (uuidAppointment:string) => console.log("Cancel", uuidAppointment),
    showUpCallback: (uuidAppointment:string) => console.log("Show Up", uuidAppointment)

};


  // Define the play function
const play = async ({ page }) => {
    // Interact with the page here
    // For example, to click a button:
    // await page.click('button');
  };
  
  Standard.play = play;