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
    "is_personal_data":{
        required : false,
        type:"checkbox",
        label:"investigation.create.personal_info",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty",
        value : true
    },
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.name_field",
        shortLabel: "investigation.table.name",
        validation : "textMin2",
        value: "edad"
    },
    "type" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "investigation.create.choose",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.choose", "value" : ""},
        options:[{"text" : "investigation.create.type_text", "value" : "text"},
                {"text": "investigation.create.type_number", "value" : "number"}, 
                {"text": "investigation.create.type_date", "value" : "date"}],
        value:"text"
                                        
    },
    "question" : {
        required : false,
        type:"text",
        label : "investigation.create.question_field",
        shortLabel: "investigation.table.question",
        validation : "textMin6", 
        size : "s6",
        value:"¿qué edad tienes?"
    }
}