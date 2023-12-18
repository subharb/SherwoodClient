import type { Meta, StoryObj } from '@storybook/react';

import DICOMViewer from '../pages/hospital/patient/DICOMViewer';

const meta: Meta<typeof DICOMViewer> = {
  title: 'Hospital/Patient/DICOM Viewer',
  component: DICOMViewer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DICOMViewer>;

export const LoggedIn: Story = {
  args: {
    
  },
};

export const LoggedOut: Story = {};
