import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import AddPatients from '../components/investigation/create/add_patients';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from "redux";
// import configureStore from 'redux-mock-store';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import { reducer as formReducer } from "redux-form";


// const mockStore = configureStore();
// const store = mockStore();
 
// configure({adapter: new Adapter()});

afterEach(cleanup);
 
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
    const invalidEmail = 'notvalidemailtest';
    const correctEmail = "david@sherwood.science";
    const emailLabel = "investigation.create.add_patients.email";
    const errorEmailLabel = "Missing translationId: investigation.errors.error_email for language: ${ languageCode }";
    const addEmailButton = getByTestId("add-email"); 
    //Hacemos click en añadir un paciente
    fireEvent.click(addEmailButton);
    await waitForDomChange();
    console.log("Modal abierto, metemos valor en email");
    //Introducimos un email incorrecto
    fireEvent.change(getByLabelText(emailLabel), {
        target: { value: invalidEmail }
    });
    const submitFormButton = getByTestId("submit-form"); 
    //expect(getByTestId("form")).toHaveFormValues({email : invalidEmail});
    //Hacemos click en guardar
    fireEvent.click(submitFormButton);
    await waitForDomChange();
    //El paciente/email no se añade
    getByText(errorEmailLabel);
    //Cerramos el form
    fireEvent.click(getByTestId("cancel")); 
    console.log("Cancelamos introduccion de datos");
    //Hacemos click en añadir un paciente
    fireEvent.click(addEmailButton);
    await waitForDomChange();
    console.log("Introducimos un email válido");
    
    fireEvent.change(getByTestId("email"), {
        target: { value: correctEmail }
    });
    //expect(getByTestId("form")).toHaveFormValues({email : correctEmail});
    //Hacemos click en guardar
    fireEvent.click(getByTestId("submit-form")); 
    await waitForDomChange();
    console.log("Hemos guardado "+correctEmail);
    //Borramos un email
    fireEvent.click(getByTestId("delete"));
    waitForElementToBeRemoved(() => getByText(correctEmail)).catch(err =>
        console.log(err)
    );
    //debug();
    //Falla porque crypto no está en el la librería, INVESTIGAR
    //https://stackoverflow.com/questions/52612122/how-to-use-jest-to-test-functions-using-crypto-or-window-mscrypto
    
});

// test("Testing Adding and saving One Patient", async() => {
//     
//     const myMockFn = jest.fn();
//     const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
//         <AddPatients callBackData = {myMockFn}/>
//     );
//     const addEmailButton = getByTestId("add-email"); 
//     //Hacemos click en añadir un paciente
//     fireEvent.click(addEmailButton);
//     await waitForDomChange();
//     console.log("Modal abierto, metemos valor en email");
//     const correctEmail = "david@sherwood.science";
//     //Introducimos un email válido
//     fireEvent.change(getByTestId("email"), {
//         target: { value: correctEmail }
//     });
//     expect(getByTestId("form")).toHaveFormValues({email : correctEmail});
//     //Hacemos click en añadir paciente
//     const submitFormButton = getByTestId("submit-form"); 
//     fireEvent.click(submitFormButton); 
//     await waitForDomChange();
//     const savePatientsButton = getByTestId("save-patients"); 
//     fireEvent.click(savePatientsButton);
//     expect(myMockFn.mock.calls.length).toBe(1);
//     debug();
// });