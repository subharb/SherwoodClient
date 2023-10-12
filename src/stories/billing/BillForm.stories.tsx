import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, billables, edc_data1 } from '../example_data';
import { BillForm } from '../../pages/hospital/Billing/BillForm';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import ProviderSherwood from '../../providerSherwood';
import * as types from "../../constants";

const composeEnhancers = composeWithDevTools({});

const meta: Meta<typeof BillForm> = {
  title: 'Hospital/Billing',
  component: BillForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

// Create a mock reducer for demonstration purposes
const rootReducer = (state = {
    billing: {data : {
        billItems:[
            {
                amount : "12", concept: "test"
            }
        ]
    }}
}, action) => state;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default meta;
type Story = StoryObj<typeof BillForm>;

export const CreateBill: Story = {
  args: {
    updatingBill: false,
    patients: patients_personal_data_decrypted(),
    personalFields: personal_data_investigation1(),
    currency:"CFA",
    uuidInvestigation: getInvestigation.investigation.uuid,
    idBillingInfo:1,
    withDiscount: true,
    surveyAdditionalInfo:edc_data1().surveys[1],
    locale:{
        name: "French",
        code: "fr",
        active: true
      },
    bill:null,
    onCancelBill: () => {console.log("Cancel bill")},
    onBillSuccesfullyCreated: () => {console.log("Bill created")},
  },
  decorators: [
    (Story) =>  (<ProviderSherwood initStore={
        [{
            type: types.INITIALIZE_BILLING,
            payload: {
                billableCombos:[{
                    id:1,
                    name: "Combo 1",
                    billables:[
                        {id : billables[0].id},
                        { id : billables[1].id },
                        { id : billables[2].id },
                    ]
                },
                {
                    id:2,
                    name: "Combo 2",
                    billables:[
                        { id : billables[0].id },
                        { id : billables[1].id },
                        { id : billables[2].id },
                        { id : billables[3].id },
                    ]
                }
            ],
            billables: billables,
        }
        }]
    }> <Story /> </ProviderSherwood>),
  ],
};

