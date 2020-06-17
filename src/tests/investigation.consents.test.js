import React from 'react';
import { render, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import AddConsent from '../components/investigation/consent';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from "redux";
// import configureStore from 'redux-mock-store';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import { reducer as formReducer } from "redux-form";

const reasonPersonalData = ["Identification purposes", "Identification purposes"];
const OTHER_CONSENT = ["Store biological material"];
const PERSONAL_FIELDS = 
     [
    {   "is_personal_data":{
            value:true,
            label:"investigation.create.survey.personal_info",
            shortLabel: "investigation.table.is_personal_data",
        },
        "name" : {
            value : "name",
            label:"investigation.create.survey.name_field",
            shortLabel: "investigation.table.name",
        },
        "type" : {
            value:"text",
            label : "investigation.create.survey.choose",
            shortLabel: "investigation.table.type"                                                
        },
        "question" : {
            value : "¿cuál es su nombre",
            label : "investigation.create.survey.question_field",
            shortLabel: "investigation.table.question",
        }
    },
    {   "is_personal_data":{
            value:true,
            label:"investigation.create.survey.personal_info",
            shortLabel: "investigation.table.is_personal_data",
            
        },
        "name" : {
            value : "surnames",
            label:"investigation.create.survey.name_field",
            shortLabel: "investigation.table.name",
        },
        "type" : {
            value:"text",
            label : "investigation.create.survey.choose",
            shortLabel: "investigation.table.type"                                                
        },
        "question" : {
            value : "¿cuáles son sus apellidos",
            label : "investigation.create.survey.question_field",
            shortLabel: "investigation.table.question",
        }
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
    
    const addConsentButtons = getAllByTestId("add-personal-consent");
    for(let i = 0;i < addConsentButtons.length;i++){
        //Recorremos todos los botones y añadimos un consentimiento para los campos personales
        const aButton = addConsentButtons[i];
        fireEvent.click(aButton);
        //Meto un consentimiento en el form
        fireEvent.change(getByLabelText("Missing translationId: investigation.create.consent.reason for language: ${ languageCode }"), {
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
        fireEvent.change(getByLabelText("Missing translationId: investigation.create.consent.consent for language: ${ languageCode }"), {
            target: { value: OTHER_CONSENT[j] }
        });
        //Añado el campo
        fireEvent.click(getByTestId("submit-form"));
        await waitForDomChange();
        //Compruebo que se ha añadido a la web
        getByText(new RegExp(OTHER_CONSENT[j], "i"));
    }
    fireEvent.click(getByTestId("save-consents")); 
    expect(myMockFn.mock.calls.length).toBe(1);
    //debug();
});
