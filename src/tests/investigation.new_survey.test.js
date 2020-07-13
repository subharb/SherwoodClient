import React from 'react';
import { fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import NewSurvey from '../components/investigation/create/index';
import {FIELDS, renderWithRedux} from "./helpers";

test("Testing Creating a survey", async() => {
    const myMockFn = jest.fn(); 
    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
            <NewSurvey callBackData={myMockFn} />
    );
    //Introducimos un título en la investigación
    console.log("Introducimos un título en la investigación");
    const titleInput = getByTestId("title");
    fireEvent.change(titleInput, {
        target: { value: "My first investigation" }
    });
    //Introducimos una description
    const descriptionInput = getByTestId("description");
    fireEvent.change(descriptionInput, {
        target: { value: "My first investigation Description" } 
    });
    const addFieldButton = getByTestId("add-field");
    
    const testData = [
        {
            is_personal_data :true,
            name : "name",
            type : "text",
            question: "¿cuál es su nombre?"
        },
        {
            is_personal_data :true,
            name : "surnames",
            type : "text",
            question: "¿Apellidos?"
        },
        {
            is_personal_data :false,
            name : "hemo",
            type : "text",
            question: "Hemoglobina"
        },
        {
            is_personal_data :false,
            name : "heart_rate",
            type : "number",
            question: "Pulsaciones por minuto"
        }
    ]
    
    //Introduzco los datos en el formulario
    for(let i = 0;i < testData.length; i++){
        //Hacemos click en añadir un paciente
        fireEvent.click(addFieldButton);
        await waitForDomChange();
        console.log("añadimos campo");
        const testField = testData[i];
        //Introducimos los datos en el form
        const dataKeys = Object.keys(testField);
        for(let j = 0; j < dataKeys.length;j++){
            const key = dataKeys[j];
            const field = FIELDS[key];
            field.value = testField[key];
            console.log("field", field);
            fireEvent.change(getByLabelText(field.label, { exact: false }), {
                target: { value: field.value }
            });
        }
        //Añado el campo
        fireEvent.click(getByTestId("submit-form"));
        await waitForDomChange();
    }

    fireEvent.click(getByTestId("save-investigation"));
    expect(myMockFn.mock.calls.length).toBe(1);

    debug();
});
