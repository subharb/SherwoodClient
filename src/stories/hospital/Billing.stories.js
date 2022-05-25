import React from 'react';

import Billing from '../../pages/hospital/Billing'
import { BillForm } from '../../pages/hospital/Billing/bill_form'
import { FindPatient } from '../../pages/hospital/Billing/find_patient'
import { listDecryptedPatients, listPatientsHospitalWard, personal_data_investigation1,} from "../example_data";
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
export const Billing_Section = Template.bind({});
Billing_Section.args = {
  patients : listDecryptedPatients,
  personalFields : personal_data_investigation1(),
  currency : "€"
};

export const Bill_Form = TemplateBillForm.bind({});
Bill_Form.args = {
  patients : listDecryptedPatients,
  personalFields : personal_data_investigation1(),
  currency : "€"
};

export const Find_Patient = TemplateFindPatient.bind({});
Find_Patient.args = {
    patients : listDecryptedPatients,
    personalFields : personal_data_investigation1()
};


