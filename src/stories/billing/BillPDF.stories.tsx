import type { Meta, StoryObj } from '@storybook/react';
import { patients_personal_data_decrypted, personal_data_investigation1, billables, billsExample, BillingInfo, researcherA_data } from '../example_data';
import ProviderSherwood from '../../providerSherwood';
import * as types from "../../constants";
import { TYPE_BILL_ITEM } from '../../constants/types';
import { Bill, DocumentStatus, DocumentType } from '../../pages/hospital/Billing/types';
import BillPDF from '../../pages/hospital/Billing/BillPDF';

const meta: Meta<typeof BillPDF> = {
  title: 'Hospital/Billing',
  component: BillPDF,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BillPDF>;

export const BillPDFT: Story = {
  args: {
    bill:billsExample[0],
    type:DocumentType.BUDGET,
    uuidInvestigation:"cd54d9d8-23af-439b-af94-616fd8e24308",
    currency:"CFA",
    uuidPrescribingDoctor:"e3ff2e08-3a7c-46fd-9a81-8965c388c404",
    patient : patients_personal_data_decrypted()[0],
    hospitalName: BillingInfo.hospitalName,
    address: BillingInfo.address,
    phone: BillingInfo.phone,
    email: BillingInfo.email,
    logoBlob: BillingInfo.logoBlob,
    
    locale:"fr",
    onClose : () =>console.log("Close bill")
  },
  decorators: [
    (Story) =>  (<ProviderSherwood initStore={
        [
            {
                type: types.INITIALIZE_SUBMISSION_PATIENT,
                payload: {
                    "uuidSurvey": "e294dfc6-e9f0-4561-8c46-eb59c16ba376",
                    "uuidPatient": "3e886463-1eee-47ed-b910-ccad1db0d31f",
                    "id": 21920,
                    "uuidUnit": null,
                    "researcher": {
                        "uuid": "9c6dd74a-2362-4a30-b826-10330f250c07",
                        "name": "Pedro ",
                        "surnames": "- Sherwood Staff"
                    },
                    "surveyRecords": [
                        {
                            "id": 124811,
                            "value": "dkv seguros",
                            "createdAt": "2023-11-23T17:12:45.099Z",
                            "updatedAt": "2023-11-23T17:12:45.099Z",
                            "surveySection": {
                                "id": 1406,
                                "uuid": "8f6948d6-02e9-4e4c-a2dd-fc937a5e12a6",
                                "name": "Mutuelle",
                                "repeats": false,
                                "isActive": true,
                                "order": 0
                            },
                            "surveyField": {
                                "id": 7469,
                                "type": "text",
                                "name": "insurance",
                                "encrypted": false,
                                "required": false,
                                "validation": "notEmpty",
                                "label": "Nom de l'organisme",
                                "order": 0,
                                "isActive": true,
                                "typeCombo": 0,
                                "createdAt": "2023-09-11T05:17:26.048Z",
                                "updatedAt": "2023-09-11T06:58:06.755Z"
                            }
                        },
                        {
                            "id": 124812,
                            "value": "10",
                            "createdAt": "2023-11-23T17:12:45.107Z",
                            "updatedAt": "2023-11-23T17:12:45.107Z",
                            "surveySection": {
                                "id": 1406,
                                "uuid": "8f6948d6-02e9-4e4c-a2dd-fc937a5e12a6",
                                "name": "Mutuelle",
                                "repeats": false,
                                "isActive": true,
                                "order": 0
                            },
                            "surveyField": {
                                "id": 7470,
                                "type": "text",
                                "name": "Pourcentage de prise en charge",
                                "encrypted": false,
                                "required": false,
                                "validation": "notEmpty",
                                "label": "Pourcentage de prise en charge",
                                "order": 1,
                                "isActive": true,
                                "typeCombo": 0,
                                "createdAt": "2023-09-11T05:17:26.053Z",
                                "updatedAt": "2023-09-11T06:58:06.769Z"
                            }
                        },
                        {
                            "id": 124813,
                            "value": "10000",
                            "createdAt": "2023-11-23T17:12:45.114Z",
                            "updatedAt": "2023-11-23T17:12:45.114Z",
                            "surveySection": {
                                "id": 1406,
                                "uuid": "8f6948d6-02e9-4e4c-a2dd-fc937a5e12a6",
                                "name": "Mutuelle",
                                "repeats": false,
                                "isActive": true,
                                "order": 0
                            },
                            "surveyField": {
                                "id": 7471,
                                "type": "number",
                                "name": "amount",
                                "encrypted": false,
                                "required": false,
                                "validation": "notEmpty",
                                "label": "Montant",
                                "order": 2,
                                "isActive": true,
                                "typeCombo": 0,
                                "createdAt": "2023-09-11T05:17:26.059Z",
                                "updatedAt": "2023-09-11T06:58:06.779Z"
                            }
                        },
                        {
                            "id": 124814,
                            "value": "1091291209100",
                            "createdAt": "2023-11-23T18:14:48.727Z",
                            "updatedAt": "2023-11-23T18:14:48.727Z",
                            "surveySection": {
                                "id": 1406,
                                "uuid": "8f6948d6-02e9-4e4c-a2dd-fc937a5e12a6",
                                "name": "Mutuelle",
                                "repeats": false,
                                "isActive": true,
                                "order": 0
                            },
                            "surveyField": {
                                "id": 7472,
                                "type": "number",
                                "name": "letter_number",
                                "encrypted": false,
                                "required": false,
                                "validation": "notEmpty",
                                "label": "Numéro de la lettre de garantie",
                                "order": 3,
                                "isActive": true,
                                "typeCombo": 0,
                                "createdAt": "2023-09-11T05:17:26.064Z",
                                "updatedAt": "2023-09-11T06:58:06.789Z"
                            }
                        },
                        {
                            "id": 124815,
                            "value": new Date("2023-11-23"),
                            "createdAt": "2023-11-23T18:14:48.746Z",
                            "updatedAt": "2023-11-23T18:14:48.746Z",
                            "surveySection": {
                                "id": 1406,
                                "uuid": "8f6948d6-02e9-4e4c-a2dd-fc937a5e12a6",
                                "name": "Mutuelle",
                                "repeats": false,
                                "isActive": true,
                                "order": 0
                            },
                            "surveyField": {
                                "id": 7473,
                                "type": "date",
                                "name": "date_emission",
                                "encrypted": false,
                                "required": false,
                                "validation": "notEmpty",
                                "label": "Date d'emission de la lettre de garantie",
                                "order": 4,
                                "isActive": true,
                                "typeCombo": 0,
                                "createdAt": "2023-09-11T05:17:26.069Z",
                                "updatedAt": "2023-09-11T06:58:06.801Z"
                            }
                        },
                        {
                            "id": 124816,
                            "value": "2024-08-08T23:00:00.000Z",
                            "createdAt": "2023-11-23T18:14:48.752Z",
                            "updatedAt": "2023-11-23T18:14:48.752Z",
                            "surveySection": {
                                "id": 1406,
                                "uuid": "8f6948d6-02e9-4e4c-a2dd-fc937a5e12a6",
                                "name": "Mutuelle",
                                "repeats": false,
                                "isActive": true,
                                "order": 0
                            },
                            "surveyField": {
                                "id": 7474,
                                "type": "date",
                                "name": "date_surgery",
                                "encrypted": false,
                                "required": false,
                                "validation": "notEmpty",
                                "label": "Date de l'intervention",
                                "order": 5,
                                "isActive": true,
                                "typeCombo": 0,
                                "createdAt": "2023-09-11T05:17:26.074Z",
                                "updatedAt": "2023-09-11T06:58:06.812Z"
                            }
                        },
                        {
                            "id": 124817,
                            "value": "MILE MILLIONI",
                            "createdAt": "2023-11-23T18:14:48.758Z",
                            "updatedAt": "2023-11-23T18:14:48.758Z",
                            "surveySection": {
                                "id": 1406,
                                "uuid": "8f6948d6-02e9-4e4c-a2dd-fc937a5e12a6",
                                "name": "Mutuelle",
                                "repeats": false,
                                "isActive": true,
                                "order": 0
                            },
                            "surveyField": {
                                "id": 7475,
                                "type": "text",
                                "name": "Montant (en lettres)",
                                "encrypted": false,
                                "required": false,
                                "validation": "notEmpty",
                                "label": "Montant (en lettres)",
                                "order": 6,
                                "isActive": true,
                                "typeCombo": 0,
                                "createdAt": "2023-09-11T05:17:26.079Z",
                                "updatedAt": "2023-09-11T06:58:06.822Z"
                            }
                        }
                    ],
                    "createdAt": "2023-11-23T17:12:45.081Z",
                    "updatedAt": "2023-11-23T18:14:48.784Z"
                }
            },
        {
            type: types.INITIALIZE_INSURANCES,
            payload: [
                {
                    "id": 1,
                    "name": "PAF",
                    "code": "PAF",
                    "active": true,
                    "createdAt": "2023-09-10T16:18:46.063Z",
                    "updatedAt": "2023-09-10T16:18:46.063Z",
                    "deletedAt": null
                },
                {
                    "id": 2,
                    "name": "IPM",
                    "code": "IPM",
                    "active": true,
                    "createdAt": "2023-09-10T16:18:46.075Z",
                    "updatedAt": "2023-09-10T16:18:46.075Z",
                    "deletedAt": null
                }
            ]
        },{
            type: types.INITIALIZE_BILLING,
            payload: {
                billables:billables,
            }},
            {
            type: types.INITIALIZE_HOSPITAL,
            payload: {
                researchers:[{
                    "name": "Doctor",
                    "uuid": "1e7111be-27bc-402a-9281-2c05a2ce17d4",
                    "surnames": "Suave",
                    "status": 2,
                    "email": "suave@gmail.com",
                    "permissions": [],
                    "units": [
                        {
                            "id": 9,
                            "uuid": "e3ff2e08-3a7c-46fd-9a81-8965c388c404",
                            "code": "MOB",
                            "name": "Mobile Clinic",
                            "createdAt": "2022-09-28T05:34:49.732Z",
                            "updatedAt": "2022-09-28T05:34:49.732Z",
                            "deletedAt": null,
                            "department": {
                                "id": 35,
                                "uuid": "1c655e29-100e-4fce-ad9f-5eb63d495338",
                                "code": "",
                                "name": "Service de Médecine",
                                "type": 0,
                                "createdAt": "2022-09-28T05:29:32.273Z",
                                "updatedAt": "2022-09-28T05:29:32.273Z",
                                "deletedAt": null
                            }
                        },
                        {
                            "id": 7,
                            "uuid": "00458227-2c27-4797-81d8-c40e86e11a23",
                            "code": "DERM",
                            "name": "Dermatologie",
                            "createdAt": "2022-09-28T05:33:43.387Z",
                            "updatedAt": "2022-09-28T05:33:43.387Z",
                            "deletedAt": null,
                            "department": {
                                "id": 35,
                                "uuid": "00458227-2c27-4797-81d8-c40e86e11a23",
                                "code": "",
                                "name": "Service de Dermatologie",
                                "type": 0,
                                "createdAt": "2022-09-28T05:29:32.273Z",
                                "updatedAt": "2022-09-28T05:29:32.273Z",
                                "deletedAt": null
                            }
                        },
                ]},
                {
                    "name": "Pedro",
                    "uuid": "e3ff2e08-3a7c-46fd-9a81-8965c388c404",
                    "surnames": "Rodriguez",
                    "status": 2,
                    "email": "pedro@gmail.com",
                    "permissions": [],
                    "units": [
                        {
                            "id": 9,
                            "uuid": "e3ff2e08-3a7c-46fd-9a81-8965c388c404",
                            "code": "MOB",
                            "name": "Mobile Clinic",
                            "createdAt": "2022-09-28T05:34:49.732Z",
                            "updatedAt": "2022-09-28T05:34:49.732Z",
                            "deletedAt": null,
                            "department": {
                                "id": 35,
                                "uuid": "1c655e29-100e-4fce-ad9f-5eb63d495338",
                                "code": "",
                                "name": "Service de Médecine",
                                "type": 0,
                                "createdAt": "2022-09-28T05:29:32.273Z",
                                "updatedAt": "2022-09-28T05:29:32.273Z",
                                "deletedAt": null
                            }
                        },
                ]},
            ],
                departments:[{
                    "id": 35,
                    "uuid": "1c655e29-100e-4fce-ad9f-5eb63d495338",
                    "code": "",
                    "name": "Service de Médecine",
                    "type": 0,
                    "createdAt": "2022-09-28T05:29:32.273Z",
                    "updatedAt": "2022-09-28T05:29:32.273Z",
                    "deletedAt": null,
                }, 
                {
                    "id": 36,
                    "uuid": "00458227-2c27-4797-81d8-c40e86e11a23",
                    "code": "",
                    "name": "Service de Dermatologie",
                    "type": 0,
                    "createdAt": "2022-09-28T05:29:32.273Z",
                    "updatedAt": "2022-09-28T05:29:32.273Z",
                    "deletedAt": null,
                }],
            }

        }]
    }> <Story /> </ProviderSherwood>),
  ],
};


