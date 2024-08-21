import type { Meta, StoryObj } from '@storybook/react';
import { RequestStatus } from '../../pages/hospital/Service/types';
import AgendaTimes from '../../pages/hospital/Outpatients/AgendaTimes';


const meta: Meta<typeof AgendaTimes> = {
  title: 'Outpatients/Patient Appointment',
  component: AgendaTimes,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
 
  },
};

export default meta;



const Template = (args) => <AgendaTimes {...args} />
type PatientAppointmentInfoLocalizedProps = {
    uuidPatient?: string;
    uuidInvestigation?: string;
    resetModal?: () => void;
    appointmentMadeCallback?: () => void;
    patientsAppointments?: any; // Replace 'any' with the actual type if known
    loadingPatientsAppointments?: boolean;
    deleteAppointmentCallback?: () => void;
    showUpPatientCallback?: () => void;
};
const TemplateTable = (args: PatientAppointmentInfoLocalizedProps) => <AgendaTimes {...args} />
// ... existing code ...
TemplateTable.args = {
    uuidPatient: '1234',
    patientsAppointments : []
};

export const Standard = TemplateTable.bind({});
Standard.args = {
    uuidPatient: '1234',
    outpatientsInfo : {type : "date"},
    patientsAppointments : []
};


  // Define the play function
const play = async ({ page }) => {
    // Interact with the page here
    // For example, to click a button:
    // await page.click('button');
  };
  
  Standard.play = play;