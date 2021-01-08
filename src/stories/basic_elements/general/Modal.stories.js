import React from 'react';
import Modal from '../../../components/general/modal';
import ProviderSherwood from '../../../providerSherwood';
import SuccessComponent from '../../../components/general/success_component';

export default {
    title: 'Basic Elements/General/Modal',
  component: Modal,
  parameters: { actions: { argTypesRegex: '^callBack.*' } },
  argTypes: {
    show: { control: "boolean"},
    title : {control: "string"}
  },
  decorators: [story => 
                <ProviderSherwood>
                        {story()}
                </ProviderSherwood>],
};


const Template = (args) => <Modal {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    show : true,
    children:"LALALa",
    title:"title",
    callBack : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};

export const Success = Template.bind({});
Success.args = {
    show : true,
    children:<SuccessComponent />,
    title:"title",
    callBack : (values) => {console.log("Callback EDC", JSON.stringify(values));alert(values)}
};