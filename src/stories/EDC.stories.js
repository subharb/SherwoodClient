import React from 'react';
import Sections from '../components/investigation/create/edc'
import Form from '../components/general/form';
import ProviderSherwood from '../providerSherwood';




export default {
  title: 'EDC',
  component: Form,
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Sections {...args} />;

export const Basic = Template.bind({});
Basic.args = {

};

export const Edit = Template.bind({});
Edit.args = {
    initialState : {sections : [{
        name:"Personal Data", repeats : false, 
                fields : [{required : true, 
                            is_personal_data:true, 
                            name : "name", 
                            question : "¿cual es tu nombre?", 
                            type:"text"}]
    }], addingSection:false, editingIndexSection:false}
};


