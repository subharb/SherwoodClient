import React from 'react';
import ShareInvestigation from '../../components/investigation/share'
import { researchers_to_share, sharedResearchers, investigation_server } from '../example_data';
import ProviderSherwood from '../../providerSherwood';
import UserRoles from '../../components/investigation/share/UserRoles';

export default {
    title: 'Pages/Share Investigation',
    component: ShareInvestigation,
    argTypes: {
        uuid:{ control: {
            type: 'string'
          },
        },
      },
    decorators: [story => 
        <ProviderSherwood>
                {story()}
        </ProviderSherwood>],
};

const Template = (args) => <ShareInvestigation {...args} />;
const TemplateUserRoles = (args) => <UserRoles {...args} />;
const uuidInvestigation = "00287041-3df4-438f-b60a-e1d85dbe25b9";


let investigationNoResearchers = investigation_server();
investigationNoResearchers.sharedResearchers = [];

export const NoResearchers = Template.bind({});
NoResearchers.args = {
    uuid : uuidInvestigation,
    initialState : {investigation : investigationNoResearchers},
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const PreviousResearchers = Template.bind({});
PreviousResearchers.args = {
    uuid : uuidInvestigation,
    initialState : {investigation : investigation_server()},
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const NewResearchers = Template.bind({});
NewResearchers.args = {
    uuid : uuidInvestigation,
    initialState : {investigation : investigationNoResearchers, newResearchers : researchers_to_share},
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const PreviousAndNewResearchers = Template.bind({});
PreviousAndNewResearchers.args = {
    uuid : uuidInvestigation,
    initialState : {investigation : investigation_server(), newResearchers : researchers_to_share},
    callBackData : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const UserRolesComponent = TemplateUserRoles.bind({});


