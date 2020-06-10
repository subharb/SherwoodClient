import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import AddPatients from '../components/investigation/add_patients';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from "redux";
import configureStore from 'redux-mock-store';
import { reducer as formReducer } from "redux-form";

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

test("Testing Adding/Removing One Patient", async() => {
    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
        
            <AddPatients />
        
    );
    const addEmailButton = getByTestId("add-email"); 
    //Hacemos click en añadir un paciente
    fireEvent.click(addEmailButton);
    await waitForDomChange();
    console.log("Modal abierto, metemos valor en email");
    const emailInput = getByTestId("email");
   
    //Introducimos un email incorrecto
    const invalidEmail = 'notvalidemailtest';
    const correctEmail = "david@sherwood.science";
    const emailLabel = "Missing translationId: investigation.create.add_patients.email for language: ${ languageCode }";
    const errorEmailLabel = "Missing translationId: investigation.errors.error_email for language: ${ languageCode }";
    fireEvent.change(getByLabelText(emailLabel), {
        target: { value: invalidEmail }
    });
    const submitFormButton = getByTestId("submit-form"); 
    expect(getByTestId("form")).toHaveFormValues({email : invalidEmail});
    //Hacemos click en guardar
    fireEvent.click(submitFormButton);
    //El paciente/email no se añade
    getByText(errorEmailLabel);
    //Introducimos un email válido
    fireEvent.change(emailInput, { target: {value : correctEmail}});
    expect(getByTestId("form")).toHaveFormValues({email : correctEmail});
    //Hacemos click en guardar
    fireEvent.click(submitFormButton); 
    //Borramos un email
    const deleteButton = getByTestId("delete"); 
    fireEvent.click(deleteButton);
    waitForElementToBeRemoved(() => getByText(correctEmail)).catch(err =>
        console.log(err)
    );

    debug();
});

test("Testing Adding and saving One Patient", async() => {
    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
        <AddPatients />
    );
    const addEmailButton = getByTestId("add-email"); 
    //Hacemos click en añadir un paciente
    fireEvent.click(addEmailButton);
    await waitForDomChange();
    console.log("Modal abierto, metemos valor en email");
    const emailInput = getByTestId("email");
    const correctEmail = "david@sherwood.science";
    //Introducimos un email válido
    fireEvent.change(emailInput, { target: {value : correctEmail}});
    expect(getByTestId("form")).toHaveFormValues({email : correctEmail});
    //Hacemos click en añadir paciente
    const submitFormButton = getByTestId("submit-form"); 
    fireEvent.click(submitFormButton); 
    const savePatientsButton = getByTestId("save-patients"); 
    fireEvent.click(savePatientsButton);
    debug();
});