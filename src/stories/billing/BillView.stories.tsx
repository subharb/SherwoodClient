import type { Meta, StoryObj } from '@storybook/react';
import { patients_personal_data_decrypted, personal_data_investigation1, billables, billsExample, BillingInfo } from '../example_data';
import ProviderSherwood from '../../providerSherwood';
import * as types from "../../constants";
import { TYPE_BILL_ITEM } from '../../constants/types';
import { Bill, DocumentStatus, DocumentType } from '../../pages/hospital/Billing/types';
import BillView from '../../pages/hospital/Billing/BillView';

const meta: Meta<typeof BillView> = {
  title: 'Hospital/Billing',
  component: BillView,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BillView>;

export const ViewBill: Story = {
  args: {
    bill:billsExample[0],
    hasBudgets: true,
    billStatus: DocumentStatus.DRAFT,
    billType: DocumentType.INVOICE,
    currency:"CFA",
    canUpdateBill: true,
    patient : patients_personal_data_decrypted()[0],
    patients: patients_personal_data_decrypted(),
    withDiscount : true,
    uuidInvestigation : "1",
    hospitalName: "Hospital Storybook",
    personalFields : personal_data_investigation1(),
    billingInfo : BillingInfo,
    idDocument : 57,
    section : 'view',
    locale:"fr",
    surveyAdditionalInfo : undefined,
    bills : billsExample, loading : false, uuidPatient : "",
    onBillSuccesfullyCreated : (bill: Bill) => console.log("Bill created", bill),
    onCreateBill : () => console.log("Go to Create bill"),
    onPatientSelected : (uuid:string) => console.log("Patient selected", uuid),
    navigateToHomeBilling : () => console.log("navigateToHomeBilling"),
    onCancelBill : () =>console.log("Cancel bill")
  },
  decorators: [
    (Story) =>  (<ProviderSherwood initStore={
        [{
            type: types.INITIALIZE_BILLING,
            payload: {
                billables:billables,
                billItems:[{
                    concept:"Item 1",
                    type:TYPE_BILL_ITEM.CHARGE,
                    quantity:2,
                    amount:200,
                    updatedAt: new Date(),
                },
                {
                    concept:"Item 2",
                    type:TYPE_BILL_ITEM.CHARGE,
                    quantity:3,
                    amount:400,
                    updatedAt: new Date(),
                },
                {
                    concept:"Descuento 1",
                    type:TYPE_BILL_ITEM.DISCOUNT_AMOUNT,
                    quantity:1,
                    amount:20,
                    updatedAt: new Date(),
                },
                {
                    concept:"Descuento 2 %",
                    type:TYPE_BILL_ITEM.DISCOUNT_ADDITIONAL_INFO,
                    quantity:1,
                    amount:10,
                    updatedAt: new Date(),
                },]
        }
        }, {
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


