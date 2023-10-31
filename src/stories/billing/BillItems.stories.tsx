import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, billables, edc_data1 } from '../example_data';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import ProviderSherwood from '../../providerSherwood';
import * as types from "../../constants";
import { BillItems } from '../../pages/hospital/Billing/BillItems';
import { TYPE_BILL_ITEM } from '../../constants/types';

const composeEnhancers = composeWithDevTools({});

const meta: Meta<typeof BillItems> = {
  title: 'Hospital/Billing',
  component: BillItems,
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
type Story = StoryObj<typeof BillItems>;

export const BillItemsT: Story = {
  args: {
    canUpdateBill: false,
    columns : [{name:"concept", type:"autocomplete", validation:""}, {name:"type", type:"type", validation:""}, {name:"quantity", type:"number", validation:""}, {name:"amount", type:"amount", validation:""}], 
    uuidPatient:"",
    initItems:[],
    repeatBillItems:true, showTotal:true,
    currency:"CFA",
    uuidInvestigation: getInvestigation.investigation.uuid,
    withDiscount: true,
    surveyAdditionalInfo:edc_data1().surveys[1],
    bill:null,
    onBillItemsValidated: () => {console.log("Bill validated")},
    onCancelBill: () => {console.log("Cancel bill")},
  },
  decorators: [
    (Story) =>  (<ProviderSherwood initStore={
        [{
            type: types.INITIALIZE_BILLING,
            payload: {
                billItems:[{
                    concept:"Item 1",
                    type:TYPE_BILL_ITEM.CHARGE,
                    quantity:2,
                    amount:200,
                    
                },
                {
                    concept:"Item 2",
                    type:TYPE_BILL_ITEM.CHARGE,
                    quantity:3,
                    amount:400,
                    
                },
                {
                    concept:"Descuento 1",
                    type:TYPE_BILL_ITEM.DISCOUNT_AMOUNT,
                    quantity:1,
                    amount:20,
                    
                },
                {
                    concept:"Descuento 2 %",
                    type:TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO,
                    quantity:1,
                    amount:10,
                    
                },]
        }
        }]
    }> <Story /> </ProviderSherwood>),
  ],
};

