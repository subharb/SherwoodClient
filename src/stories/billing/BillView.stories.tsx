import type { Meta, StoryObj } from '@storybook/react';
import { patients_personal_data_decrypted, personal_data_investigation1, billables, edc_data1, billsExample, BillingInfo } from '../example_data';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import ProviderSherwood from '../../providerSherwood';
import * as types from "../../constants";

import { TYPE_BILL_ITEM } from '../../constants/types';

import { Bill, DocumentStatus, DocumentType } from '../../pages/hospital/Billing/types';

import BillView from '../../pages/hospital/Billing/BillView';

const meta: Meta<typeof BillView> = {
  title: 'Hospital/Billing',
  component: BillView,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BillView>;

export const ViewBill: Story = {
  args: {
    bill:billsExample[0],
    billStatus: DocumentStatus.CLOSED,
    billType: DocumentType.INVOICE,
    currency:"CFA",
    canUpdateBill: false,
    patient : patients_personal_data_decrypted()[0],
    patients: patients_personal_data_decrypted(),
    withDiscount : true,
    uuidInvestigation : "1",
    hospitalName: "Hospital Storybook",
    personalFields : personal_data_investigation1(),
    billingInfo : BillingInfo,
    idDocument : 57,
    section : 'view',
    locale:"fr",
    surveyAdditionalInfo : undefined,
    bills : billsExample, loading : false, uuidPatient : "",
    onBillSuccesfullyCreated : (bill: Bill) => console.log("Bill created", bill),
    onCreateBill : () => console.log("Go to Create bill"),
    onPatientSelected : (uuid:string) => console.log("Patient selected", uuid),
    navigateToHomeBilling : () => console.log("navigateToHomeBilling"),
    onCancelBill : () =>console.log("Cancel bill")
  },
  decorators: [
    (Story) =>  (<ProviderSherwood initStore={
        [{
            type: types.INITIALIZE_BILLING,
            payload: {
                billables:billables,
                billItems:[{
                    concept:"Item 1",
                    type:TYPE_BILL_ITEM.CHARGE,
                    quantity:2,
                    amount:200,
                    updatedAt: new Date(),
                },
                {
                    concept:"Item 2",
                    type:TYPE_BILL_ITEM.CHARGE,
                    quantity:3,
                    amount:400,
                    updatedAt: new Date(),
                },
                {
                    concept:"Descuento 1",
                    type:TYPE_BILL_ITEM.DISCOUNT_AMOUNT,
                    quantity:1,
                    amount:20,
                    updatedAt: new Date(),
                },
                {
                    concept:"Descuento 2 %",
                    type:TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO,
                    quantity:1,
                    amount:10,
                    updatedAt: new Date(),
                },]
        }
        }]
    }> <Story /> </ProviderSherwood>),
  ],
};


