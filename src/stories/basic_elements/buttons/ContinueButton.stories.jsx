import React from 'react';

import { ButtonContinue } from '../../../components/general/mini_components';
import ProviderSherwood from '../../../providerSherwood';

export default {
  title: 'Basic Elements/Buttons/ButtonContinue',
  component: ButtonContinue,
  argTypes: {
    disabled: { control: 'boolean' },
    show : { control: 'boolean' }
  },
  decorators: [story => 
    <ProviderSherwood>
            {story()}
    </ProviderSherwood>],
};

const Template = (args) => <ButtonContinue {...args} />;

export const Primary = Template.bind({}); 
Primary.args = {
    onClick: () => {console.log("You clicked!")} ,
    children:'Continue'
};


