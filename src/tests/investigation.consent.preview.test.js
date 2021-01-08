import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import PreviewConsent from '../components/consent/preview';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

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

test("Testing Data appears in summary", async() => {
    const testData = {
        consents: {
            name: {
                value: 'Identification purposes1',
                required: true,
                is_personal_data: true
            },
            surnames: {
                value: 'Identification purposes2',
                required: true,
                is_personal_data: true
                },
            '1hgqrcsn1gv81fh52yd1z': { value: 'Store biological material', is_personal_data: false }
        },
        fields : [
            {   "is_personal_data":{
                    value:true,
                    label:"investigation.create.edc.personal_info",
                    shortLabel: "investigation.table.is_personal_data",
                },
                "name" : {
                    value : "name",
                    label:"investigation.create.edc.name_field",
                    shortLabel: "investigation.table.name",
                },
                "type" : {
                    value:"text",
                    label : "investigation.create.edc.choose",
                    shortLabel: "investigation.table.type"                                                
                },
                "question" : {
                    value : "¿cuál es su nombre?",
                    label : "investigation.create.edc.question_field",
                    shortLabel: "investigation.table.question",
                }
            },
            {   "is_personal_data":{
                    value:true,
                    label:"investigation.create.edc.personal_info",
                    shortLabel: "investigation.table.is_personal_data",
                    
                },
                "name" : {
                    value : "surnames",
                    label:"investigation.create.edc.name_field",
                    shortLabel: "investigation.table.name",
                },
                "type" : {
                    value:"text",
                    label : "investigation.create.edc.choose",
                    shortLabel: "investigation.table.type"                                                
                },
                "question" : {
                    value : "¿cuáles son sus apellidos",
                    label : "investigation.create.edc.question_field",
                    shortLabel: "investigation.table.question",
                }
            },
            {   "is_personal_data":{
                    value:false,
                    label:"investigation.create.edc.personal_info",
                    shortLabel: "investigation.table.is_personal_data",
                },
                "name" : {
                    value : "hemo",
                    label:"investigation.create.edc.name_field",
                    shortLabel: "investigation.table.name",
                },
                "type" : {
                    value:"text",
                    label : "investigation.create.edc.choose",
                    shortLabel: "investigation.table.type"                                                
                },
                "question" : {
                    value : "Hemoglobina",
                    label : "investigation.create.edc.question_field",
                    shortLabel: "investigation.table.question",
                }
            }
        ]
    }
    const filteredFields = testData.fields.filter(field => field["is_personal_data"].value);
    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
            <PreviewConsent {...testData} personalFields={filteredFields} />
    );
    //Comprobamos que aparecen toda la info
    Object.values(testData.consents).forEach(consent => {
        getByText(new RegExp(consent.value, "i"));
    });

});