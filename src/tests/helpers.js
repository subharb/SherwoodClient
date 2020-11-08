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
        label:"investigation.create.survey.personal_info",
        shortLabel: "investigation.create.survey.personal_info",
        validation : "notEmpty",
        value : true
    },
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.survey.name_field",
        shortLabel: "investigation.create.survey.name_field",
        validation : "textMin2",
        value: "edad"
    },
    "type" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "investigation.create.survey.choose",
        shortLabel: "investigation.create.survey.choose",
        defaultOption:{"text" : "investigation.create.choose", "value" : ""},
        options:[{"text" : "investigation.create.type_text", "value" : "text"},
                {"text": "investigation.create.type_number", "value" : "number"}, 
                {"text": "investigation.create.type_date", "value" : "date"}],
        value:"text"
                                        
    },
    "question" : {
        required : false,
        type:"text",
        label : "investigation.create.survey.question_field",
        shortLabel: "investigation.table.question",
        validation : "textMin6", 
        size : "s6",
        value:"¿qué edad tienes?"
    }
}