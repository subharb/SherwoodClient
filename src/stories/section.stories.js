import React from 'react';
import { Provider } from 'react-redux';
import Section from '../components/investigation/create/section'
import Form from '../components/general/form';
import ProviderSherwood from '../providerSherwood';


export default {
  title: 'Section',
  component: Form,
  parameters: { actions: { argTypesRegex: '^callBack.*' } },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};

const Template = (args) => <Section {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    addNewSection : (values) => alert(JSON.stringify(values)),
    closeNewSection : () => alert("Closing!")
};

export const Edit = Template.bind({});
Edit.args = {
    initialData:{name:"Personal Data", repeats : false, 
                fields : [{required : true, 
                            encrypted:true, 
                            name : "name", 
                            label : "¿cual es tu nombre?", 
                            type:"text"}]},
    addingField: false,
    callBackNewSection : (values) => alert(JSON.stringify(values))
};

