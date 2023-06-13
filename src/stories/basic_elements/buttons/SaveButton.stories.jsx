import React from 'react';

import { ButtonSave } from '../../../components/general/mini_components';
import ProviderSherwood from '../../../providerSherwood';

export default {
  title: 'Basic Elements/Buttons/ButtonSave',
  component: ButtonSave,
  argTypes: {
    disabled: { control: 'boolean' },
    show : { control: 'boolean' }
  },
  decorators: [story => 
    <ProviderSherwood>
            {story()}
    </ProviderSherwood>],
};

const Template = (args) => <ButtonSave {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children:'Save',
    onClick: () => {console.log("You clicked!")} 
};