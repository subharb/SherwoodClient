import React from 'react';
import { render, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import AddConsent from '../components/investigation/consent';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from "redux";
// import configureStore from 'redux-mock-store';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import { reducer as formReducer } from "redux-form";


// const mockStore = configureStore();
// const store = mockStore();

// configure({adapter: new Adapter()});

//afterEach(cleanup);

const renderWithRedux = (
    component,
    {
      initialState,
      store = createStore(
        combineReducers({ form: formReducer }),
        initialState
      )
    } = {}
  ) => {
    return {
      ...render(<Provider store={store}>{component}</Provider>)
    };
  };

test("Testing Adding/Removing Consents", async() => {
    const myMockFn = jest.fn();
    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
            <AddConsent callBackData={myMockFn}  />
    );
    

    debug();
});
