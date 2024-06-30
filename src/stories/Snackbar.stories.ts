import type { Meta, StoryObj } from '@storybook/react';
import SnackbarComponent from './Snackbar';



// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SnackbarComponent> = {
  title: 'Example/SnackbarComponent',
  component: SnackbarComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    
  },
};

export default meta;
type Story = StoryObj<typeof SnackbarComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
   
  },
};

export const Secondary: Story = {
  args: {
    
  },
};

export const Large: Story = {
  args: {
    
  },
};

export const Small: Story = {
  args: {

  },
};
