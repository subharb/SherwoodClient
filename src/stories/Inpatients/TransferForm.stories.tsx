import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, billables, edc_data1 } from '../example_data';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import TransferWardForm from '../../pages/hospital/departments/Ward/TransferWardForm';



//ESTE STORY ESTÁ INCOMPLETO, FALTA AÑADIR SURVEYS Y OTROS DATOS A LA STORY!!!

const meta: Meta<typeof TransferWardForm> = {
  title: 'Inpatients/Transfer Form',
  component: TransferWardForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
 
  },
};

export default meta;

const Template = (args) => <TransferWardForm {...args} />

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