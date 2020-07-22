import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { render, cleanup, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import Summary from '../components/investigation/create/summary';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loadingReducer from '../reducers/loadingReducer';


const renderWithRedux = (
    component,
    {
        initialState,
        store = createStore(
            combineReducers({ form: formReducer, loading:loadingReducer }),
            initialState
        )
        } = {} 
    ) => {
    return {
        ...render(<Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>)
    };
  };

test("Testing Data appears in summary", async() => {
    const testData = {
        survey : {
            title : "My first investigation",
            description: "My first description",
            fields : [
                {   "is_personal_data": true,
                    "name" : "name",
                    "type" : "text",
                    "question" :"¿cuál es su nombre?"
                },
                {   "is_personal_data": true,
                    "name" : "surnames",
                    "type" : "text",
                    "question" : "¿cuáles son sus apellidos"
                },   
                {   "is_personal_data": false,
                    "name" : "hemo",
                    "type" : "text",
                    "question" : "Hemoglobina"
                }
            ]
        },
        patientsEmail:[
            {"email" : "david@sherwood.science", 
                   "keyPatientEncr" : "", "tempKey" :""},
            {"email" : "Pedro.rodriguez@hotmail.com",
                "keyPatientEncr" : "", "tempKey" : ""}
        ]
    }
    const myMockFnSave = jest.fn();
    const myMockFnSend = jest.fn();
    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
            <Summary investigation={testData} saveForLater={myMockFnSave} saveAndSend={myMockFnSend} />
    );
    //Comprobamos que aparecen todos los campos
    getByText(new RegExp(testData.survey.title, "i"));
    getByText(new RegExp(testData.survey.description, "i"));
    //Comprobamos que estén todos los emails
    testData.patientsEmail.forEach(email => {
        getByText(email)
    });
    //Hacemos click en solo Guardar 
    fireEvent.click(getByTestId("save-for-later-investigation"));
    expect(myMockFnSave.mock.calls.length).toBe(1);
   

    //debug();
});