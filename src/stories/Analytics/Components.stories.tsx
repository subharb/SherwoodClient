import type { Meta, StoryObj } from '@storybook/react';
import { getInvestigation, patients_personal_data_decrypted, personal_data_investigation1, billables, edc_data1 } from '../example_data';
import DatesSelector from '../../pages/dashboards/Analytics/DatesSelector';


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
type Story = StoryObj<typeof DatesSelector>;

export const DateSelector: Story = {
  args: {
    onCallBack: (dates:Date[]) => {alert(`Dates selected ${dates[0]} ${dates[1]}`)},
  },
  decorators: [
    (Story) =>  (<Story />),
  ],
};