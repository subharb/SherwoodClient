import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import Summary from '../components/investigation/summary';
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
        survey : {
            title : "My first investigation",
            description: "My first description",
            fields : [
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
                },
                {   "is_personal_data":{
                        value:false,
                        label:"investigation.create.survey.personal_info",
                        shortLabel: "investigation.table.is_personal_data",
                    },
                    "name" : {
                        value : "hemo",
                        label:"investigation.create.survey.name_field",
                        shortLabel: "investigation.table.name",
                    },
                    "type" : {
                        value:"text",
                        label : "investigation.create.survey.choose",
                        shortLabel: "investigation.table.type"                                                
                    },
                    "question" : {
                        value : "Hemoglobina",
                        label : "investigation.create.survey.question_field",
                        shortLabel: "investigation.table.question",
                    }
                }
            ]
        },  
        patientsEmail:[
            "david@sherwood.science",
            "Pedro.rodriguez@hotmail.com"
        ]
    }
    const myMockFnSave = jest.fn();
    const myMockFnSend = jest.fn();
    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
            <Summary {...testData} saveForLater={myMockFnSave} saveAndSend={myMockFnSend} />
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