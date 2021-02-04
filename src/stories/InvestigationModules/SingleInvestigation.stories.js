import React from 'react';
import SingleInvestigation from '../../components/investigation/show/single/index';
import ProviderSherwood from '../../providerSherwood';
import { investigation_server, investigation_server_no_patitents } from '../example_data';

export default {
    title: 'Investigation/Modules/SingleInvestigation',
    component: SingleInvestigation, 
    parameters: { actions: { argTypesRegex: '^callBack.*' } },
    argTypes: {
        investigation: {
            control: "object"
        },
        typeUser: {
            control: {
            type: 'select',
            options: [
                'researcher', 
                'patient'
            ]
            }
        }
},
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <SingleInvestigation {...args} />;

let investigationDraft = {...investigation_server_no_patitents()};
investigationDraft.status = 0;

export const Draft = Template.bind({}); 
Draft.args = {
    investigation : investigationDraft,
    typeUser:"researcher",
    initialData : { investigation : investigation_server_no_patitents()},
    uuid : "ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};

let investigationLive = {...investigation_server()};
investigationDraft.status = 1;

export const Live = Template.bind({});
Live.args = {
    investigation : investigationLive,
    typeUser:"researcher",
    initialData : { investigation : investigation_server_no_patitents()},
    uuid : "ebe64225-023b-4ce9-9d21-37d1c2a26ebf",
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};
 