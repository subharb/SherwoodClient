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

test("Testing Adding/Removing One Patient", async() => {
    const testData = {
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
        ],
        patientsEmail:[
            "david@sherwood.science",
            "Pedro.rodriguez@hotmail.com"
        ]
    }
    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
            <Summary {...testData} />
    );
    //Comprobamos que estén todos los emails
    testData.patientsEmail.forEach(email => {
        getByText(email)
    });
    
    // const addEmailButton = getByTestId("add-email"); 
    // //Hacemos click en añadir un paciente
    // fireEvent.click(addEmailButton);
    // await waitForDomChange();
    // console.log("Modal abierto, metemos valor en email");
    // const emailInput = getByTestId("email");
   
    // //Introducimos un email incorrecto
    // const invalidEmail = 'notvalidemailtest';
    // const correctEmail = "david@sherwood.science";
    // const emailLabel = "Missing translationId: investigation.create.add_patients.email for language: ${ languageCode }";
    // const errorEmailLabel = "Missing translationId: investigation.errors.error_email for language: ${ languageCode }";
    // fireEvent.change(getByLabelText(emailLabel), {
    //     target: { value: invalidEmail }
    // });
    // const submitFormButton = getByTestId("submit-form"); 
    // expect(getByTestId("form")).toHaveFormValues({email : invalidEmail});
    // //Hacemos click en guardar
    // fireEvent.click(submitFormButton);
    // //El paciente/email no se añade
    // getByText(errorEmailLabel);
    // //Introducimos un email válido
    // fireEvent.change(emailInput, { target: {value : correctEmail}});
    // expect(getByTestId("form")).toHaveFormValues({email : correctEmail});
    // //Hacemos click en guardar
    // fireEvent.click(submitFormButton); 
    // //Borramos un email
    // const deleteButton = getByTestId("delete"); 
    // fireEvent.click(deleteButton);
    // waitForElementToBeRemoved(() => getByText(correctEmail)).catch(err =>
    //     console.log(err)
    // );

    debug();
});