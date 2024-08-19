import type { Meta, StoryObj } from '@storybook/react';
import PatientAppointmentInfo, { PatientAppointmentInfoLocalized } from '../../pages/hospital/Outpatients/PatientAppointmentInfo';


const meta: Meta<typeof PatientAppointmentInfo> = {
  title: 'Outpatients/Patient Appointment',
  component: PatientAppointmentInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
 
  },
};

export default meta;



const Template = (args) => <PatientAppointmentInfo {...args} />
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
const TemplateTable = (args: PatientAppointmentInfoLocalizedProps) => <PatientAppointmentInfoLocalized {...args} />
// ... existing code ...
TemplateTable.args = {
    uuidPatient: '1234',
};

export const Standard = Template.bind({});
Standard.args = {
    type:"treatment", 
    country:"es",
    mode:'form',
    slaves:[
        {
            name:"frecuency",
        },
        {
            name:"dose",
        },
        {
            name:"frecuency",
        }
    ],
};


  // Define the play function
const play = async ({ page }) => {
    // Interact with the page here
    // For example, to click a button:
    // await page.click('button');
  };
  
  Standard.play = play;