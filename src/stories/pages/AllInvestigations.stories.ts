import React from 'react';
import AllInvestigations from '../../components/investigation/show/all';
import ProviderSherwood from '../../providerSherwood';
import { summary_info1, investigationsShowAll, list_investigations } from '../example_data';
import { StoryObj, Meta } from '@storybook/react';


const meta: Meta<typeof AllInvestigations> = {
    component: AllInvestigations,
};
  
export default meta;
type Story = StoryObj<typeof AllInvestigations>;

export const All: Story = {
    args: {
        initialState: { investigations: list_investigations() },
        typeUser: 'researcher',
        callBackData: (values:any) => {
          console.log('Callback EDC', JSON.stringify(values));
          alert(values);
        },
    },
  };




// export const Draft = Template.bind({});
// Draft.args = {
//   initialState: { investigations: list_investigations() },
//   typeUser: 'researcher',
//   filter: 'draft',
//   callBackData: (values) => {
//     console.log('Callback EDC', JSON.stringify(values));
//     alert(values);
//   },
// };

// export const Live = Template.bind({});
// Live.args = {
//   initialState: { investigations: list_investigations() },
//   typeUser: 'researcher',
//   filter: 'live',
//   stepBack: () => alert('Hit StepBack'),
//   callBackData: (values) => {
//     console.log('Callback EDC', JSON.stringify(values));
//     alert(values);
//   },
// };

// export const Pending = Template.bind({});
// Pending.args = {
//   initialState: { investigations: list_investigations() },
//   typeUser: 'researcher',
//   filter: 'pending',
//   stepBack: () => alert('Hit StepBack'),
//   callBackData: (values) => {
//     console.log('Callback EDC', JSON.stringify(values));
//     alert(values);
//   },
// };

// export const PendingRemote = Template.bind({});
// PendingRemote.args = {
//   typeUser: 'researcher',
//   filter: 'pending',
//   stepBack: () => alert('Hit StepBack'),
//   callBackData: (values) => {
//     console.log('Callback EDC', JSON.stringify(values));
//     alert(values);
//   },
// };
