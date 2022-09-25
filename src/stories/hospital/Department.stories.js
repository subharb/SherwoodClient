import React from 'react';


import {  departmentsInfo, hospital, investigationsShowAll, investigation_server } from "../example_data";
import ProviderSherwood from '../../providerSherwood';
import DepartmentsAccordion from '../../pages/hospital/departments/DepartmentsAccordion';
import { DepartmentLocalized } from '../../pages/hospital/departments/Admin';
import { departments, researchers } from '../data/departmentsService';

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
const TemplateDepartments = (args) => <DepartmentLocalized {...args} />; 

export const DepartmentsWard = Template.bind({});
DepartmentsWard.args = {
    departments:departmentsInfo.departments,
    mode:"ward-selection",
    selectWardCallBack:(uuid) => console.log("selectWard!"+uuid)

};

export const DepartmentsHome = TemplateDepartments.bind({});
DepartmentsHome.args = {
    investigation:investigation_server(), 
    departments:departments,
    researchers:researchers,
    admin : true,
    loading:false,
    selectWardCallBack:(uuid) => console.log("selectWard!"+uuid)

};

