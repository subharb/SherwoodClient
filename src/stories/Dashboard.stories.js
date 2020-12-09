import React from 'react';
import Dashboard from '../components/dashboard/index'
import ProviderSherwood from '../providerSherwood';
import { investigation_server, investigation_server_no_patitents, patient_data1 } from './example_data';

export default {
  title: 'Dashboard',
  component: Dashboard,
  argTypes: {
    action:{
        control: {
        type: 'select',
        options: [
            'create', 
            'show',
            'draft',
            'live'
        ]
        }
    },
    uuid : {control:"string"}
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Dashboard {...args} />;

export const Home = Template.bind({});
Home.args = {
    action:null
};

export const ShowAllInvestigations = Template.bind({});
ShowAllInvestigations.args = {
    action:"show"
};

export const ShowInvestigation = Template.bind({});
ShowInvestigation.args = {
    action:"show",
    uuid: "ff4b1de5-9163-4eb1-85fc-59d19f2741dd"
};
