import type { Meta, StoryObj } from '@storybook/react';

import { getInvestigation, personal_data_investigation1, personal_data_with_insurances, records_patient1 } from './example_data';
import {keyInvestigation} from '../../.storybook/preview'
import SurveyRecordsTable from '../pages/hospital/SurveyRecordsTable';

const meta: Meta<typeof SurveyRecordsTable> = {
  title: 'Hospital/Survey Records',
  component: SurveyRecordsTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SurveyRecordsTable>;

export const Standard: Story = {
  args: {
    fields: getInvestigation.investigation.surveys[0].sections[0].fields,
    submissions: records_patient1().submissions,
  },
};


export const LoggedOut: Story = {};
