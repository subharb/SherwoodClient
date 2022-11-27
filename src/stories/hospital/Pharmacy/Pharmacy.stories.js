import React from 'react';
import { MY_SCHEDULE_ROUTE, SEARCH_PATIENT_ROUTE } from '../../../routes';
import HomeSchedule from '../../../pages/hospital/HomeSchedule'
import ProviderSherwood from '../../../providerSherwood';
import InventoryPharmacy from '../../../pages/hospital/Pharmacy/Inventory';
import { pharmacyItemsInit } from './data';
import RequestForm from '../../../pages/hospital/Pharmacy/RequestForm';
import LoadExcelComponent from '../../../pages/hospital/Pharmacy/LoadExcel';

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
const TemplateLoadExcel = (args) => <LoadExcelComponent {...args} />; 

export const Inventory = Template.bind({});
Inventory.args = {
    pharmacyItemsInit:pharmacyItemsInit,
    saveInventoryCallBack:(items) => console.log(items)
};

export const LoadExcel = TemplateLoadExcel.bind({});
LoadExcel.args = {
    
};

export const Request = TemplateRequest.bind({});
Request.args = {
    departments : [{uuid:"asdfasd", name:"Dermatologia"}, {uuid:"234324", name:"Neurologia"}],
    pharmacyItemsInit:pharmacyItemsInit,
    makePharmacyRequestCallback:(request) => console.log(request)
};