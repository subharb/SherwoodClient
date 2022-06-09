import { BillingLocalized } from '../../pages/hospital/Billing'

import { BillForm } from '../../pages/hospital/Billing/bill_form'
import { FindPatient } from '../../pages/hospital/Billing/find_patient'
import { bills, listDecryptedPatients, listPatientsHospitalWard, personal_data_investigation1,} from "../example_data";
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Billing',
  component: BillingLocalized,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <BillingLocalized {...args} />; 
const TemplateBillForm = (args) => <BillForm {...args} />; 
const TemplateFindPatient = (args) => <FindPatient {...args} />; 


const testPatient = listPatientsHospitalWard[0];

export const Billing_Section = Template.bind({});
Billing_Section.args = {
  patients : listDecryptedPatients,
  personalFields : personal_data_investigation1(),
  uuidInvestigation : "64d46bc7-6a86-44dd-a7d5-6b00a2a0cb59",
  currency : "€",
  bills : bills
};

export const Bill_Form = TemplateBillForm.bind({});
Bill_Form.args = {
  patients : listDecryptedPatients,
  personalFields : personal_data_investigation1(),
  locale: {code:"es"},
  currency : "€"
};

export const Bill_Form_View = TemplateBillForm.bind({});
Bill_Form_View.args = {
  updatingBill:true,
  bill: {...bills[0], patientInvestigation : testPatient},
  locale: {code:"es"},
  currency : "€"
};

export const Find_Patient = TemplateFindPatient.bind({});
Find_Patient.args = {
    patients : listDecryptedPatients,
    personalFields : personal_data_investigation1()
};


