import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, personal_data_with_insurances } from '../example_data';
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
    updatingBill: false,
    patients: patients_personal_data_decrypted(),
    personalFields: personal_data_investigation1(),
    currency:"CFA",
    uuidInvestigation: getInvestigation.investigation.uuid,
    idBillingInfo:1,
    locale:{
        name: "French",
        code: "fr",
        active: true
      },
    bill:null,
    billables:[],
    onCancelBill: () => {console.log("Cancel bill")},
    onBillSuccesfullyCreated: () => {console.log("Bill created")},
  },
};


export const LoggedOut: Story = {};
