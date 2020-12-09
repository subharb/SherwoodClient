import React from 'react';
import SingleInvestigation from '../../components/investigation/show/single/index';
import ProviderSherwood from '../../providerSherwood';
import { investigation_server_no_patitents } from '../example_data';

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
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};


export const Live = Template.bind({});
Live.args = {
    investigation : investigation_server_no_patitents(),
    typeUser:"researcher",
    callBackForm : (values) => {console.log("Callback BasicInfo", JSON.stringify(values));alert(values)} 
};
 