import React from 'react';
import { HOSPITAL_WARD_ROUTE, OUTPATIENTS_ROUTE } from '../../routes';
import { AddPatientComponent } from '../../pages/hospital/AddPatient'
import { personal_data_investigation1, investigation_server } from "../example_data";
import ProviderSherwood from '../../providerSherwood';

export default {
  title: 'Hospital/Add Patients',
  component: AddPatientComponent,
  argTypes: {
    name: { control: 'string' },
    surnames: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <AddPatientComponent {...args} />; 

export const Basic = Template.bind({});
Basic.args = {
    investigations:{data:[investigation_server()],
        loading:false, error:null}
};

export const Edit = Template.bind({});
Edit.args = {
    patient:{
        id:3, 
        personalData:{
            email:"Ppetrelli@gmail.com",
            name:"Peter",
            surnames:"Petrelli",
            birthdate : "02/03/1987",
            phone:"+988899",
            national_id:"aaaa",
            sex:"male",
        }
    },
    investigations:{data:[investigation_server()],
                    loading:false, error:null}
};
