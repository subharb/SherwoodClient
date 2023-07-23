import type { Meta, StoryObj } from '@storybook/react';
import AddPatientComponent from '../pages/hospital/AddPatient/View';
import Test  from '../pages/hospital/AddPatient/test';
import { personal_data_investigation1 } from './example_data';

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

export const LoggedIn: Story = {
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

export const LoggedOut: Story = {};
