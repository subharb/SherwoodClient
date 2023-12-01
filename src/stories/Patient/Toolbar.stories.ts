import type { Meta, StoryObj } from '@storybook/react';

import { getInvestigation, personal_data_investigation1, personal_data_with_insurances } from '../example_data';
import {keyInvestigation} from '../../../.storybook/preview'
import { PatientToolBarComponent } from '../../pages/hospital/patient/toolbar';
import { CATEGORY_DEPARTMENT_MEDICAL, CATEGORY_DEPARTMENT_NURSE, CATEGORY_DEPARTMENT_SHOE, CATEGORY_DEPARTMENT_SOCIAL } from '../../constants';

const meta: Meta<typeof PatientToolBarComponent> = {
  title: 'Hospital/Patient/Toolbar',
  component: PatientToolBarComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PatientToolBarComponent>;


export const Standard: Story = {
    args: {
      sex:"male",
      patientID:1,
      years: 34,
      readMedicalPermission:true,
      writeMedicalPermission:true,
      categorySelected:2,
      categoriesAvailable:[CATEGORY_DEPARTMENT_MEDICAL, CATEGORY_DEPARTMENT_SHOE, CATEGORY_DEPARTMENT_SOCIAL, CATEGORY_DEPARTMENT_NURSE],
      enableAddButton: true,
      editCallBack: () => {console.log("editCallBack")},
    },
  };

