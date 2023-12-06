import type { Meta, StoryObj } from '@storybook/react';
import { patients_personal_data_decrypted, personal_data_investigation1, billables, billsExample, BillingInfo, researcherA_data, edc_data1 } from '../example_data';
import ProviderSherwood from '../../providerSherwood';
import * as types from "../../constants";
import { TYPE_BILL_ITEM } from '../../constants/types';
import { Bill, DocumentStatus, DocumentType } from '../../pages/hospital/Billing/types';
import SubmissionPDF from '../../pages/hospital/patient/SubmissionPDF';


const meta: Meta<typeof SubmissionPDF> = {
  title: 'Hospital/Patient/Prescription',
  component: SubmissionPDF,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SubmissionPDF>;

export const Prescription: Story = {
  args: {
    hospitalName: BillingInfo.hospitalName,
    address: BillingInfo.address,
    phone: BillingInfo.phone,
    email: BillingInfo.email,
    city: BillingInfo.city,
    logoBlob: BillingInfo.logoBlob,
    currentSurvey:edc_data1().surveys.filter(s=>s.name==="Prescription")[0],
    submission:{
        "id": 21936,
        "uuidUnit": null,
        "createdAt": "2023-12-05T18:55:31.235Z",
        "updatedAt": "2023-12-05T18:55:31.235Z",
        "researcher": "Pedro  - Sherwood Staff - ",
        "uuidSurvey": "3e99c0f8-3bed-47e1-a4e9-3b8e8b6c9641",
        "uuidPatient": "8c19a93d-20cf-4580-bbd7-933587f89a95",
        "surveyRecords": [
            {
                "id": 124900,
                "value": false,
                "createdAt": "2023-12-05T18:55:31.252Z",
                "updatedAt": "2023-12-05T18:55:31.252Z",
                "surveyField": {
                    "id": 7993,
                    "name": "treatment",
                    "type": "treatment",
                    "label": "Treatment",
                    "order": 0,
                    "isActive": true,
                    "required": false,
                    "createdAt": "2023-11-30T16:05:57.590Z",
                    "encrypted": false,
                    "typeCombo": 1,
                    "updatedAt": "2023-12-04T06:52:33.627Z",
                    "validation": "arrayOrFalse"
                },
                "surveySection": {
                    "id": 1588,
                    "name": "Prescription",
                    "uuid": "2e15bb07-b10d-438e-a64c-df9465088cf9",
                    "order": 0,
                    "repeats": false,
                    "isActive": true
                }
            },
            {
                "id": 124901,
                "value": "<p>poiop</p>",
                "createdAt": "2023-12-05T18:55:31.263Z",
                "updatedAt": "2023-12-05T18:55:31.263Z",
                "surveyField": {
                    "id": 7999,
                    "name": "comments",
                    "type": "textarea",
                    "label": "Comments",
                    "order": 1,
                    "isActive": true,
                    "required": false,
                    "createdAt": "2023-11-30T16:05:57.663Z",
                    "encrypted": false,
                    "typeCombo": 0,
                    "updatedAt": "2023-12-04T06:52:33.641Z",
                    "validation": "notEmpty"
                },
                "surveySection": {
                    "id": 1588,
                    "name": "Prescription",
                    "uuid": "2e15bb07-b10d-438e-a64c-df9465088cf9",
                    "order": 0,
                    "repeats": false,
                    "isActive": true
                }
            }
        ],
        "surveyName": "Prescription",
        "uuidResearcher": "9c6dd74a-2362-4a30-b826-10330f250c07",
        "typeSurvey": 13
    },
    locale:"fr",
    onClose : () =>console.log("Close bill")
  },
};


