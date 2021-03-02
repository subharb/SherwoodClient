import React from 'react';
import AllInvestigations from '../../components/investigation/show/all'
import ProviderSherwood from '../../providerSherwood';
import { summary_info1, investigationsShowAll, pendingInvestigations } from '../example_data';
export default {
    title: 'Pages/All Investigations',
    component: AllInvestigations,
    argTypes: {
        typeUser: {
            control: {
            type: 'select',
            options: [
                'researcher', 
                'patient'
            ]
            }
        },
        filter : {
            control: {
            type: 'select',
            options: [
                'pending', 
                'ongoing',
                'draft',
                'live',
                'all'
            ]
            }
        }
    },
    decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <AllInvestigations {...args} />;

export const All = Template.bind({});
All.args = {
    initialState : summary_info1(),
    typeUser: "researcher",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Draft = Template.bind({});
Draft.args = {
    initialState : summary_info1(),
    typeUser: "researcher",
    filter:"draft",
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Live = Template.bind({});
Live.args = {
    initialState : summary_info1(),
    typeUser: "researcher",
    filter:"live",
    stepBack : () => alert("Hit StepBack"),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


export const Pending = Template.bind({});
Pending.args = {
    initialState : {investigations:pendingInvestigations},
    typeUser: "researcher",
    filter:"pending",
    stepBack : () => alert("Hit StepBack"),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const PendingRemote = Template.bind({});
PendingRemote.args = {
    typeUser: "researcher",
    filter:"pending",
    stepBack : () => alert("Hit StepBack"),
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};


