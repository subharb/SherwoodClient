import type { Meta, StoryObj } from '@storybook/react';
import File from '../../../components/general/File';
import { DICOMServerResponse, ImageServerResponse } from './example_data';
import { url } from 'inspector';

const meta: Meta<typeof File> = {
  title: 'Basic Elements/Fields/File',
  component: File,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    mockData: [
        {
            url: 'http://localhost:5001/files/hospitals_1714743240508-544002788',
            method: 'GET',
            status: 200,
            response: ImageServerResponse
        },
        {
            url: 'http://localhost:5001/files/DICOM1',
            method: 'GET',
            status: 200,
            response: DICOMServerResponse
        }
    ],
  },
};

export default meta;

const Template = (args) => <File {...args} />

export const FileImage = Template.bind({});
FileImage.args = {
    mode:"show", 
    value:[{
        file : "hospitals_1714743240508-544002788",
        file_type : "image/jpeg",
    }],
};

export const FileDicom = Template.bind({});
FileDicom.args = {
    mode:"show", 
    value:[{
        file : "DICOM1",
        file_type : "DICOM",
    }],
};

  // Define the play function
const play = async ({ page }) => {
    // Interact with the page here
    // For example, to click a button:
    // await page.click('button');
  };
  
  FileDicom.play = play;