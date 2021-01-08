import { edc_data1 } from '../../../src/stories/example_data';

describe('Testing EDC creation', () => {
    it('Introduces info on each field', () => {
        cy.visit('http://localhost:6006/iframe.html?id=investigation-create-edc--basic&viewMode=story');
        cy.createEDC(edc_data1().surveys);
    })
})