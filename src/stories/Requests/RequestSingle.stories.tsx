import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, billables, edc_data1 } from '../example_data';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import * as types from "../../constants";
import RequestSingle from '../../pages/hospital/Service/RequestSingle';
import { PERMISSION } from '../../components/investigation/share/user_roles';
import ProviderSherwood from '../../providerSherwood';
import { patientInfo, requestService } from './example_data';


//ESTE STORY ESTÁ INCOMPLETO, FALTA AÑADIR SURVEYS Y OTROS DATOS A LA STORY!!!

const meta: Meta<typeof RequestSingle> = {
  title: 'Hospital/Request',
  component: RequestSingle,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    mockData: [
        {
            url: 'http://localhost:5001/hospital/c08a7e49-56a5-4881-87df-86404f0203c8/request/1',
            method: 'GET',
            status: 200,
            response: requestService
        },
    ],
  },
};


export default meta;

const Template = (args) => <RequestSingle {...args} />
export const Service = Template.bind({});
Service.args = {
    permissions:[PERMISSION.UPDATE_LAB_REQUESTS],
    idRequest:1,
    uuidInvestigation:getInvestigation.investigation.uuid,
    surveys:[],
    country:"ml",
    researcher:null,
    requestSentCallBack: (type:string) => {console.log(`Request sent ${type}`)},
}
Service.decorators = [
    (Story) =>  (<ProviderSherwood initStore={
        [
            {
            type: types.INITIALIZE_INVESTIGATIONS,
            payload: {
                investigations: [getInvestigation.investigation],
            }
        },
        {
            type: types.INITIALIZE_PATIENTS,
            payload: {
                uuidInvestigation: Service.args.uuidInvestigation,
                patients: patientInfo,
            }
        }]
    }> <Story /> </ProviderSherwood>),
  ]


  // Define the play function
const play = async ({ page }) => {
    // Interact with the page here
    // For example, to click a button:
    // await page.click('button');
  };
  
  Service.play = play;