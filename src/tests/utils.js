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
    "uuid": "538e9dde-d81c-4f49-b22f-b7d791af4119",
    "description": "My first description",
    "survey": {
        "fields": [
            {
                "encrypted": {
                    "value": true,
                    "label": "investigation.create.edc.personal_info",
                    "shortLabel": "investigation.table.is_personal_data"
                },
                "name": {
                    "value": "name",
                    "label": "investigation.create.edc.name_field",
                    "shortLabel": "investigation.table.name"
                },
                "type": {
                    "value": "text",
                    "label": "investigation.create.edc.choose",
                    "shortLabel": "investigation.table.type"
                },
                "question": {
                    "value": "¿cuál es su nombre?",
                    "label": "investigation.create.edc.question_field",
                    "shortLabel": "investigation.table.question"
                }
            },
            {
                "encrypted": {
                    "value": true,
                    "label": "investigation.create.edc.personal_info",
                    "shortLabel": "investigation.table.is_personal_data"
                },
                "name": {
                    "value": "surnames",
                    "label": "investigation.create.edc.name_field",
                    "shortLabel": "investigation.table.name"
                },
                "type": {
                    "value": "text",
                    "label": "investigation.create.edc.choose",
                    "shortLabel": "investigation.table.type"
                },
                "question": {
                    "value": "¿cuáles son sus apellidos",
                    "label": "investigation.create.edc.question_field",
                    "shortLabel": "investigation.table.question"
                }
            },
            {
                "encrypted": {
                    "value": false,
                    "label": "investigation.create.edc.personal_info",
                    "shortLabel": "investigation.table.is_personal_data"
                },
                "name": {
                    "value": "hemo",
                    "label": "investigation.create.edc.name_field",
                    "shortLabel": "investigation.table.name"
                },
                "type": {
                    "value": "text",
                    "label": "investigation.create.edc.choose",
                    "shortLabel": "investigation.table.type"
                },
                "question": {
                    "value": "Hemoglobina",
                    "label": "investigation.create.edc.question_field",
                    "shortLabel": "investigation.table.question"
                }
            }
        ],
        "_id": "5f3be145b5588a3509a59ae1",
        "created_At": "2020-08-18T14:10:13.859Z",
        "updated_At": "2020-08-18T14:10:13.859Z",
        "__v": 0
    },
    "status": 1,
    "patientsEmail": [
        "Pedro.rodriguez@hotmail.com",
        "david@sherwood.science"
    ],
    "consents": [
        {
            "value": "name",
            "text": "Identification purposes",
            "id": 310,
            "required": true,
            "is_personal_data": true
        },
        {
            "value": "surnames",
            "text": "Identification purposes",
            "id": 311,
            "required": true,
            "is_personal_data": true
        },
        {
            "value": "1hgqrcsn1gv81fh52yd1z",
            "text": "Store biological material",
            "id": 312,
            "required": false,
            "is_personal_data": false
        }
    ],
    "patientConsents": {
        "224": [
            {
                "accepted": true,
                "value": "David",
                "idPatInv": 224,
                "consentInv": 310
            },
            {
                "accepted": true,
                "value": "Shaikh",
                "idPatInv": 224,
                "consentInv": 311
            },
            {
                "accepted": true,
                "value": null,
                "idPatInv": 224,
                "consentInv": 312
            }
        ]
    }
}