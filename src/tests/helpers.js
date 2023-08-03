import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from "redux";
import { render } from '@testing-library/react';
import { reducer as formReducer } from "redux-form";

export const renderWithRedux = (
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


export const FIELDS = {
    "encrypted":{
        required : false,
        type:"checkbox",
        label:"investigation.create.edc.personal_info",
        shortLabel: "investigation.create.edc.personal_info",
        validation : "notEmpty",
        value : true
    },
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.edc.name_field",
        shortLabel: "investigation.create.edc.name_field",
        validation : "textMin2",
        value: "edad"
    },
    "type" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "investigation.create.edc.choose",
        shortLabel: "investigation.create.edc.choose",
        defaultOption:{"text" : "investigation.create.choose", "value" : ""},
        options:[{"label" : "investigation.create.type_text", "value" : "text"},
                {"label": "investigation.create.type_number", "value" : "number"}, 
                {"label": "investigation.create.type_date", "value" : "date"}],
        value:"text"
                                        
    },
    "label" : {
        required : false,
        type:"text",
        label : "investigation.create.edc.question_field",
        shortLabel: "investigation.table.question",
        validation : "textMin6", 
        size : "s6",
        value:"¿qué edad tienes?"
    }
}

