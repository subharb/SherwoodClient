import React from 'react';
import { Provider } from 'react-redux';
import { configure, addDecorator, storiesOf } from '@storybook/react'
import Form from '../components/general/form';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore({}, {}, applyMiddleware(thunk));

export default {
  title: 'Sections',
  component: Form,
  decorators:  [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
};

const Template = (args) => <Form {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  
};

storiesOf('Signup form', module)
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('empty form', () => <Form />);



