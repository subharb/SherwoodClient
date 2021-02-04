import { researcherA_data } from '../../src/stories/example_data';

describe('Testing create an investigation', () => {
    it('Register a Researcher', () => {
        cy.visit('http://localhost:3000/auth/sign-up');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.registerResearcher(researcherA_data);
    })
})