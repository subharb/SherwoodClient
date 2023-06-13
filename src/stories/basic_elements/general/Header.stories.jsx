import React from 'react';
import Header from '../../../components/general/header';
import ProviderSherwood from '../../../providerSherwood';


export default {
    title: 'Basic Elements/General/Header',
    component: Header,
    argTypes: {
        isLoggedIn: { control: 'boolean' },
        currentUrl:{control:'string'}
    },
    parameters: { actions: { argTypesRegex: '^callBack.*' } },
    decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Header {...args} />;

export const Logout = Template.bind({});
Logout.args = {
    isLoggedIn:false,
    callBack : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const LogResearcher = Template.bind({});
LogResearcher.args = {
    isLoggedIn:true,
    currentUrl:"create", 
    callBack : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};