import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import AcceptConsents from '../components/investigation/show/single/accept_consents';
import { screen, waitForElement } from '@testing-library/dom'
import { InvestigationConsents, renderWithRedux } from './utils';
import axiosMock from './__mocks__/axios';

afterEach(cleanup);

// import API mocking utilities from Mock Service Worker
// import { rest } from 'msw'
// import { setupServer } from 'msw/node';


// // declare which API requests to mock
// const server = setupServer(
//     // capture "GET /greeting" requests
//     rest.get('/patient', (req, res, ctx) => {
//       // respond using a mocked JSON body
//       return res(ctx.json({ greeting: 'hello there' }))
//     })
//   )
  
//   // establish API mocking before all tests
//   beforeAll(() => server.listen())
//   // reset any request handlers that are declared as a part of our tests
//   // (i.e. for testing one-time error scenarios)
//   afterEach(() => server.resetHandlers())
//   // clean up once the tests are done
//   afterAll(() => server.close())




  
test("Accept all consents and add data", async() => {
    axiosMock.put.mockResolvedValueOnce({ data: { greeting: "hello there" }, status:200 });

    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
            <AcceptConsents investigation = {InvestigationConsents} 
                             />
    );
    //Busco que estén los patientConsents y marco los checks
    Object.values(InvestigationConsents.consents).forEach(consent => {
        fireEvent.click(getByTestId(consent.id+"_check"));
    });
    //Pongo los datos en los datos personales
    Object.values(InvestigationConsents.consents).forEach(consent => {
        if(consent.is_personal_data){
            fireEvent.change(getByLabelText(consent.value), {
                target: { value: "TEST" }
            });
        }
    });
    
    const saveConsentsButton = getByTestId("save-consents"); 
    fireEvent.click(saveConsentsButton);
    debug()
    await waitForDomChange();
    //Compruebo que se ha añadido a la web
    getByTestId("resolved");

    //expect(resolvedSpan).toHaveTextContent("success"); 
    expect(axiosMock.put).toHaveBeenCalledTimes(1);   
    //screen.getByTestId("loading")
});
