import type { Meta, StoryObj } from '@storybook/react';

import { getInvestigation, personal_data_investigation1, personal_data_with_insurances } from './example_data';
import {keyInvestigation} from '../../.storybook/preview'
import { BillForm } from '../../pages/hospital/Billing/bill_form';

const meta: Meta<typeof BillForm> = {
  title: 'Hospital/Create Bill',
  component: BillForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BillForm>;

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


export const LoggedOut: Story = {};
