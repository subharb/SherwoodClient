import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import Login from './components/login';

const store = createStore(reducers, {}, applyMiddleware(thunk));

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
            <Route exact path="/login" children={<Login />} />
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);