import type { Meta, StoryObj } from '@storybook/react';
import { AddPatientComponent } from '../pages/hospital/AddPatient/View';
import { getInvestigation, personal_data_investigation1, personal_data_with_insurances } from './example_data';
import {keyInvestigation} from '../../.storybook/preview'

const meta: Meta<typeof AddPatientComponent> = {
  title: 'Hospital/Add Patient',
  component: AddPatientComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AddPatientComponent>;

export const Standard: Story = {
  args: {
    investigations: {
        loading: false,
    },
    patients: {
      loading: false,
    },
    personalFields: personal_data_investigation1()
  },
};

export const WithInsurances: Story = {
    args: {
      investigations: {
          loading: false,
          currentInvestigation:getInvestigation.investigation
      },
      error:0,
      patientsInvestigation: [],
      patients: {
        data:[],
        loading: false,
      },
      callbackSavePatient: (data) => {
        console.log("Save Patient", data);
      },
      keyResearcherInvestigation:keyInvestigation,
      personalFields: personal_data_with_insurances()
    },
  };

export const LoggedOut: Story = {};
