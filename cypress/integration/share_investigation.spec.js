import { loginResearcherA, loginResearcherB, loginResearcherC, records_patient2, researcherD_data, researcherC_data } from '../../src/stories/example_data';
import { URL_BASE } from "../support";

describe('Testing sharing an investigation', () => {
    it('Researcher A shares with Researcher B, C and D', () => {
        cy.visit(URL_BASE+'/investigations/live');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.loginResearcher(loginResearcherA);

        cy.shareWithResearchers();

        cy.logOut();

    })
    it('Researcher B accepts investigation', () => {
        //Accept investigation
        cy.visit(URL_BASE+'/investigations/pending');
        cy.loginResearcher(loginResearcherB);
        
        cy.acceptInvestigation();

        //Introduce datos de pacientes
        
        cy.get('button[data-testid="add-element"]').eq(2)
            .click();
        
        cy.fillPatient(records_patient2())
    })
    it('Register Researcher C', () => {
        cy.visit(URL_BASE+'/auth/sign-up');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.registerResearcher(researcherC_data);

    });

    it('Researcher C accepts Investigation', () => {
        cy.visit(URL_BASE+'/investigations/pending');
        cy.loginResearcher(loginResearcherC);
        
        cy.intercept('PUT', '**/researcher/investigation/**/answer').as('answerInvestigation');
        cy.get('.investigation').first().find('button[data-testid="accept"]').click();
        cy.wait('@answerInvestigation');

    });
})