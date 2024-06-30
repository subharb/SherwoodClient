import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, billables, edc_data1, billsExample } from '../example_data';
import BillsTable from '../../pages/hospital/Billing/BillsTable';

const meta: Meta<typeof BillsTable> = {
  title: 'Hospital/Billing',
  component: BillsTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BillsTable>;

export const BillsTableS: Story = {
  args: {
    hasBudgets: true,
    bills: billsExample,
    languageCode: "fr",
    currency: "CFA",
    patients: patients_personal_data_decrypted(),
    makeActionBillCallBack: () => {console.log("Bill validated")},
  },
};

