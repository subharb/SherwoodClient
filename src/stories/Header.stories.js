import React from 'react';

import Header from '../components/general/header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default {
  title: 'Header',
  component: Header,
  decorators: [story => <BrowserRouter>{story()}</BrowserRouter>],
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    isLoggedIn: true,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
    isLoggedIn : false
};
