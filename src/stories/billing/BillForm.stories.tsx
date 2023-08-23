import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, billables } from '../example_data';
import { BillForm } from '../../pages/hospital/Billing/bill_form';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import ProviderSherwood from '../../providerSherwood';
import * as types from "../../constants";

const composeEnhancers = composeWithDevTools({});

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

export const Standard: Story = {
  args: {
    updatingBill: false,
    billableCombos:[{
            id:1,
            name: "Combo 1",
            billables:[
                billables[0],
                billables[1],
                billables[2],
            ]
        },
        {
            id:2,
            name: "Combo 2",
            billables:[
                billables[0],
                billables[1],
                billables[2],
                billables[3],
            ]
        }
    ],
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
    billables:billables,
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
                        billables[0],
                        billables[1],
                        billables[2],
                    ]
                },
                {
                    id:2,
                    name: "Combo 2",
                    billables:[
                        billables[0],
                        billables[1],
                        billables[2],
                        billables[3],
                    ]
                }
            ],
                billItems:[
                {
                    amount : "12", concept: "test"
                }
            ]}
        }]
    }> <Story /> </ProviderSherwood>),
  ],
};


export const LoggedOut: Story = {};
