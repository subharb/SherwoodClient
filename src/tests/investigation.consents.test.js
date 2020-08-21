import React from 'react';
import { render, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import AddConsent from '../components/investigation/create/consent';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from "redux";
// import configureStore from 'redux-mock-store';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import { reducer as formReducer } from "redux-form";

const reasonPersonalData = ["Identification purposes", "Identification purposes"];
const OTHER_CONSENT = [{"value" : "Store biological material", "name" : "store_bio"}];
const PERSONAL_FIELDS =  
[
    {   "is_personal_data": true,
        "name" : "name",
        "type" : "text",
        "question" :"¿cuál es su nombre?"
    },
    {   "is_personal_data": true,
        "name" : "surnames",
        "type" : "text",
        "question" : "¿cuáles son sus apellidos"
    }
]

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
    const { debug, getByTestId, getByText, getAllByTestId, getByLabelText } = renderWithRedux(
            <AddConsent personalFields={PERSONAL_FIELDS} callBackData={myMockFn}  />
    );
    //Compruebo que los consentimientos de datos personales aparecen
    for(let i = 0; i < PERSONAL_FIELDS.length; i++){
        expect(getByText(PERSONAL_FIELDS[i].name)).toBeInTheDocument()
    }
    const addConsentButtons = getAllByTestId("add-personal-consent");
    
    for(let i = 0;i < addConsentButtons.length;i++){
        //Recorremos todos los botones y añadimos un consentimiento para los campos personales
        const aButton = addConsentButtons[i];
        fireEvent.click(aButton);
        console.log("Abro el modal"); 
        await waitForDomChange();
        //Meto un consentimiento en el form
        console.log("Reason", reasonPersonalData[i]);
        fireEvent.change(getByLabelText("investigation.create.consent.reason"), {
            target: { value: reasonPersonalData[i] }
        });
        //Añado el campo
        fireEvent.click(getByTestId("submit-form"));
        await waitForDomChange();
    }
    //Añado consentimientos para el otro tipo de consentimientos
    for(let j=0;j < OTHER_CONSENT.length; j++){
        fireEvent.click(getByTestId("add-consent"));
        //Meto un consentimiento en el form
        fireEvent.change(getByLabelText("investigation.create.consent.consent"), {
            target: { value: OTHER_CONSENT[j].value }
        });
        fireEvent.change(getByLabelText("investigation.create.consent.name"), {
            target: { value: OTHER_CONSENT[j].name }
        });
        //Añado el campo
        fireEvent.click(getByTestId("submit-form"));
        await waitForDomChange();
        //Compruebo que se ha añadido a la web
        getByText(new RegExp(OTHER_CONSENT[j].value, "i"));
    }
    fireEvent.click(getByTestId("save-consents")); 
    expect(myMockFn.mock.calls.length).toBe(1);
    debug();
});
