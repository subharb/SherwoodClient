import type { Meta, StoryObj } from '@storybook/react';
import { patients_personal_data_decrypted, personal_data_investigation1, billables, billsExample, BillingInfo } from '../example_data';
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
    currency:"CFA",
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
        [{
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


