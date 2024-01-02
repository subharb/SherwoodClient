import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, billables, edc_data1 } from '../example_data';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import SmartFields from '../../../components/general/SmartFields';
import { drugs } from './example_data';


//ESTE STORY ESTÁ INCOMPLETO, FALTA AÑADIR SURVEYS Y OTROS DATOS A LA STORY!!!

const meta: Meta<typeof SmartFields> = {
  title: 'Basic Elements/Fields/Smartfields',
  component: SmartFields,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    mockData: [
        {
            url: 'http://localhost:5001/hospital/search/drug/es/test',
            method: 'GET',
            status: 200,
            response: {
                status:200,
                drugs:drugs
            }
        },
    ],
  },
};

export default meta;

const Template = (args) => <SmartFields {...args} />

export const SmartFieldForm = Template.bind({});
SmartFieldForm.args = {
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

export const SmartFieldShow = Template.bind({});
SmartFieldShow.args = {
    type:"treatment", 
    country:"es",
    mode:'show',
    initialState:{
        addingElements:false,
        listElements:[{
            "treatment" : "LEUCEMIAS AGUDAS",
            "treatment-posology": "1", 
            "treatment-dose": "1", 
            "treatment-start" : "2021-05-01",
            "treatment-finish" : "2021-05-01",
            }
        ]
    },
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
  
  SmartFieldShow.play = play;