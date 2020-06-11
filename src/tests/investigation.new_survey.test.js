import React from 'react';
import { fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import NewSurvey from '../components/investigation/new_survey';
import {FIELDS, renderWithRedux} from "./helpers";

test("Testing Creating a survey", async() => {
    const myMockFn = jest.fn();
    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
            <NewSurvey callBackData={myMockFn} />
    );
    //Introducimos un título en la investigación
    const titleInput = getByTestId("title");
    fireEvent.change(titleInput, {
        target: { value: "My first investigation" }
    });
    //Introducimos un título en la investigación
    const descriptionInput = getByTestId("description");
    fireEvent.change(descriptionInput, {
        target: { value: "My first investigation Description" } 
    });
    const addFieldButton = getByTestId("add-field");
    
    const testData = {
        is_personal_data : [true, true, false, false],
        name : ["name", "surnames", "hemo", "heart_rate"],
        type : ["text", "text", "number", "number"],
        question : ["¿cuál es su nombre?", "¿Apellidos?", "Hemoglobina", "Pulsaciones por minuto"]
    }
    //Introduzco los datos en el formulario
    for(let i = 0;i < testData.length; i++){
        //Hacemos click en añadir un paciente
        fireEvent.click(addFieldButton);
        await waitForDomChange();
        console.log("Modal abierto");
        //Introducimos los datos en el form
        for(let j = 0; j < Object.keys(FIELDS);j++){
            const label = Object.keys(FIELDS)[j];
            fireEvent.change(getByLabelText(label), {
                target: { value: testData[label].value }
            });
        }
        //Añado el campo
        fireEvent.click(getByTestId("submit-form"));
        await waitForDomChange();
    }

    fireEvent.click(getByTestId("save-investigation"));
    expect(myMockFn.mock.calls.length).toBe(1);

    //debug();
});
