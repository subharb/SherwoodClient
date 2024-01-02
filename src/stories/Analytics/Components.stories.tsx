import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, billables, edc_data1 } from '../example_data';
import DatesSelector from '../../pages/dashboards/Analytics/DatesSelector';
import BillingBarChart from '../../pages/dashboards/Analytics/BillingBarChart';
import { statsBilling } from './stats';
import BillingInsuranceBars from '../../pages/dashboards/Analytics/BillingInsuranceBars';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof DatesSelector> = {
  title: 'Hospital/Analytics',
  component: DatesSelector,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};


export default meta;

const Template = (args) => <DatesSelector {...args} country="ml" />
export const DateSelectorTe = Template.bind({});
DateSelectorTe.args = {
    onCallBack: (dates:Date[]) => {alert(`Dates selected ${dates[0]} ${dates[1]}`)},
  }
  // Define the play function
const play = async ({ page }) => {
    // Interact with the page here
    // For example, to click a button:
    // await page.click('button');
  };
  
  DateSelectorTe.play = play;


  const TemplateBilling = (args) => <BillingBarChart {...args} />
  export const BillingChart = TemplateBilling.bind({});
  BillingChart.args = {
        stats:statsBilling(),
        currency:"XAF",
        departments:[{
            name:"Department 1",
            uuid:"82c0a34c-0598-43ce-b02d-4f1021e021b8"
        },
        {
            name:"Department 2",
            uuid:"1c655e29-100e-4fce-ad9f-5eb63d495338"
        },
        {
            name:"No department",
            uuid:"no-department"
        }],
    }

const TemplateBillingInsurance = (args) => <BillingInsuranceBars {...args} />
export const BillingBars = TemplateBillingInsurance.bind({});
BillingBars.args = {
        stats:{
            "PAL": 344800,
            "PAF": 2106000,
            "IPM": 30000,
            "Personnel": 10000
        },
        currency:"XAF",
        insurances:[{
            name:"Insurance 1",
            code:"PAL"
            },
            {
                name:"Insurance 2",
                code:"PAF"
            },
            {
                name:"Insurance 3",
                code:"IPM"
            },
            {
                name:"Insurance 4",
                code:"Personnel"
            }
        ],
    }