import React from 'react';
import { Provider } from 'react-redux';
import Sections from '../components/investigation/create/sections';
import { createStore, applyMiddleware } from 'redux';

export default {
  title: 'Sections',
  component: Sections,
}; 

const store = createStore(reducers, {}, applyMiddleware(thunk));
const Template = (args) =>  <Provider store={store><Sections {...args} /></Provider>;

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: 'Primary',
};
