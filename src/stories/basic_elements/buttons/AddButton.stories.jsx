import React from 'react';

import { ButtonAdd } from '../../../components/general/mini_components';
import ProviderSherwood from '../../../providerSherwood';

export default {
  title: 'Basic Elements/Buttons/AddButton',
  component: ButtonAdd,
  argTypes: {
    disabled: { control: 'boolean' },
    show : { control: 'boolean' }
  },
  decorators: [story => 
    <ProviderSherwood>
            {story()}
    </ProviderSherwood>],
};

const Template = (args) => <ButtonAdd {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onClick: () => {console.log("You clicked!")} 
};


