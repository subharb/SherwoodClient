import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange, waitForElementToBeRemoved } from '@testing-library/react';
import SingleInvestigation from '../components/investigation/show/single/single_investigation';
import { screen, waitForElement } from '@testing-library/dom'
import { InvestigationConsents, renderWithRedux } from './utils';
import axiosMock from './__mocks__/axios';

afterEach(cleanup);
  
test("Consents appear", async() => {
    const { debug, getByTestId, getByText, getByLabelText } = renderWithRedux(
            <SingleInvestigation investigation = {InvestigationConsents} 
                             />
    );
    console.log("Comprobamos que los consentimientos firmados aparecen");
    InvestigationConsents.consents.forEach(consent => {
        getByText(consent.value)
    });

});