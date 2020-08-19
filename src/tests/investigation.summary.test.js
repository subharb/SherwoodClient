import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import Summary from '../components/investigation/create/summary';
import axiosMock from 'axios';
import { renderWithRedux } from './utils';

const testData = {
    survey : {
        title : "My first investigation",
        description: "My first description",
        fields : [
            {   "is_personal_data": true,
                "name" : "name",
                "type" : "text",
                "question" :"¿cuál es su nombre?"
            },
            {   "is_personal_data": true,
                "name" : "surnames",
                "type" : "text",
                "question" : "¿cuáles son sus apellidos"
            },   
            {   "is_personal_data": false,
                "name" : "hemo",
                "type" : "text",
                "question" : "Hemoglobina"
            }
        ]
    },
    patients:[
        {"email" : "david@sherwood.science", 
            "keyPatInvEncr" : "U2FsdGVkX18UwefjYdNNYrbOXGfhaosgCltu1Rf7YeALN4SA57aQbejaIP2iczRDOPzzu+WJuJQIon1giKE7uQ==", "tempKey" :"ffu2wyexjxbw6n3sn3tngh"},
        {"email" : "Pedro.rodriguez@hotmail.com",
            "keyPatInvEncr" : "U2FsdGVkX1/h++4ISsIqAUMsgn6LByXuSlYe5XZLv/IDxPZVK2Sa404sfjyEz5RSubMxp3a5P2YDd5RtK2p/lA==", "tempKey" : "2h1n2cg3inci9irlqugur"}
    ]
}

test("Testing Data appears in summary", async() => {
    axiosMock.post.mockResolvedValueOnce({ data: { greeting: "hello there" }, status:200 });

    const { debug, getByTestId, getByText } = renderWithRedux(
            <Summary investigation={testData} />, {loading : false}
    );
    //Comprobamos que aparecen todos los campos
    getByText(new RegExp(testData.survey.title, "i"));
    getByText(new RegExp(testData.survey.description, "i"));
    //Comprobamos que estén todos los emails
    testData.patients.forEach(patient => {
        console.log(patient.email);
        getByText(patient.email)
    });
    //Hacemos click en solo Guardar 
    fireEvent.click(getByTestId("save-for-later-investigation"));
    //getByText("Success!");
    //expect(myMockFnSave.mock.calls.length).toBe(1);
    expect(axiosMock.post).toHaveBeenCalledTimes(1);  
    debug(); 
});