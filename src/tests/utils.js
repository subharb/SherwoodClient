import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers, applyMiddleware } from "redux";
export const renderWithRedux = (
    component,
    {
        initialState,
        store = createStore(
            combineReducers({ form: formReducer}),
            initialState,
            applyMiddleware(thunk)
        )
        } = {} 
    ) => {
    return {
        ...render(<Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>)
    };
};

export const InvestigationConsents = {
    
    "title": "My first investigation",
    "uuid": "614f1b64-78d1-4a66-92d1-231ee6967a8f",
    "description": "My first description",
    "consents": [
        {
            "id": 292,
            "required": true,
            "text": "Identification purposes",
            "is_personal_data": true,
            "name": "name"
        },
        {
            "id": 293,
            "required": true,
            "text": "Identification purposes",
            "is_personal_data": true,
            "name": "surnames"
        },
        {
            "id": 294,
            "required": false,
            "text": "Store biological material",
            "is_personal_data": false,
            "name": "1hgqrcsn1gv81fh52yd1z"
        }
    ]
    
}