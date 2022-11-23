import React from 'react';
import { MY_SCHEDULE_ROUTE, SEARCH_PATIENT_ROUTE } from '../../../routes';
import HomeSchedule from '../../../pages/hospital/HomeSchedule'
import ProviderSherwood from '../../../providerSherwood';
import InventoryPharmacy from '../../../pages/hospital/Pharmacy/Inventory';
import { pharmacyItemsInit } from './data';
import RequestForm from '../../../pages/hospital/Pharmacy/RequestForm';

export default {
  title: 'Hospital/Pharmacy',
  component: HomeSchedule,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' },
    department: { control: 'string' },
    institution: { control: 'string' },
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <InventoryPharmacy {...args} />; 
const TemplateRequest = (args) => <RequestForm {...args} />; 

export const Inventory = Template.bind({});
Inventory.args = {
    pharmacyItemsInit:pharmacyItemsInit,
    saveInventoryCallBack:(items) => console.log(items)
};

export const Request = TemplateRequest.bind({});
Request.args = {
    pharmacyItemsInit:pharmacyItemsInit,
    saveInventoryCallBack:(items) => console.log(items)
};