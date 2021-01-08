import React from 'react';

import { ButtonCancel } from '../../../components/general/mini_components';
import ProviderSherwood from '../../../providerSherwood';

export default {
  title: 'Basic Elements/Buttons/ButtonCancel',
  component: ButtonCancel,
  argTypes: {
    disabled: { control: 'boolean' },
    show : { control: 'boolean' }
  },
  decorators: [story => 
    <ProviderSherwood>
            {story()}
    </ProviderSherwood>],
};

const Template = (args) => <ButtonCancel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    onClick: () => {console.log("You clicked!")} ,
    children:'Cancel'
};


