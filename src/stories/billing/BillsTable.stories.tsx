import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, billables, edc_data1, billsExample } from '../example_data';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import ProviderSherwood from '../../providerSherwood';
import * as types from "../../constants";

import { TYPE_BILL_ITEM } from '../../constants/types';
import BillsTable from '../../pages/hospital/Billing/BillsTable';
import { DocumentStatus, DocumentType } from '../../pages/hospital/Billing/types';

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

