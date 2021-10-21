import React from 'react';


import {  departmentsInfo } from "../example_data";
import ProviderSherwood from '../../providerSherwood';
import DepartmentsAccordion from '../../pages/hospital/departments/DepartmentsAccordion';


export default {
  title: 'Hospital/Departments',
  component: DepartmentsAccordion,
  argTypes: {
    loading: { control: 'string' }
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <DepartmentsAccordion {...args} />; 

export const DepartmentWard = Template.bind({});
DepartmentsAccordion.args = {
    departments:departmentsInfo.departments,
    mode:"ward-selection",
    selectWardCallBack:(uuid) => console.log("selectWard!"+uuid)

};

