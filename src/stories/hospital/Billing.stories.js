import React from 'react';

import Billing from '../../pages/hospital/Billing'
import { BillForm } from '../../pages/hospital/Billing/bill_form'
import { FindPatient } from '../../pages/hospital/Billing/find_patient'
import { listPatientsHospitalWard,} from "../example_data";
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Billing',
  component: Billing,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Billing {...args} />; 
const TemplateBillForm = (args) => <BillForm {...args} />; 
const TemplateFindPatient = (args) => <FindPatient {...args} />; 
const testPatient = listPatientsHospitalWard[0];
export const Toolbar = Template.bind({});
Toolbar.args = {
    personalData:testPatient.personalData,
    years:34,
    showMedical:true,
    action:{},
    typeSurveySelected:0,
    hospitalize:() => console.log("Hospitalize")
};

export const Bill_Form = TemplateBillForm.bind({});
Bill_Form.args = {
    personalData:testPatient.personalData,
    years:34,
    showMedical:true,
    action:{},
    typeSurveySelected:0,
    hospitalize:() => console.log("Hospitalize")
};

export const Find_Patient = TemplateFindPatient.bind({});
Find_Patient.args = {
    patients : [{personalData: {name : "Peter", surnames:"Petrelli"}, dateCread : 2222}]
};


