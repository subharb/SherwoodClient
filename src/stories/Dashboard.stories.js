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

export const CreateInvestigation = Template.bind({});
CreateInvestigation.args = {
    action:"create"
};

export const ShowAllInvestigations = Template.bind({});
ShowAllInvestigations.args = {
    action:"show"
};

export const ShowInvestigationLive = Template.bind({});
ShowInvestigationLive.args = {
    action:"show",
    uuid: "96b17ef9-5a8e-4db8-b8a6-c17080ae13ba"
};

export const ShowInvestigationDraft = Template.bind({});
ShowInvestigationDraft.args = {
    action:"show",
    uuid: "5658bf1c-7b50-4850-b0b6-2450ca4b9b05"
};