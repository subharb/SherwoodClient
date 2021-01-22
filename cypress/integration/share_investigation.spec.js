import { loginResearcherA, loginResearcherB, records_patient1, records_patient2 } from '../../src/stories/example_data';

describe('Testing sharing an investigation', () => {
    it('Introduces info on each field', () => {
        //cy.visit('http://localhost:3000/investigations/live');
        //cy.visit('https://dashboard.sherwood.science/');

        //cy.loginResearcher(loginResearcherA);

        //cy.shareWithResearchers();

        //Accept investigation
        //cy.logOut();

        // cy.visit('http://localhost:3000/investigations/pending');
        // cy.loginResearcher(loginResearcherB);
        
        // cy.get('.investigation').first().find('button[data-testid="accept"]').click();
        
        //Introduce datos de pacientes
        cy.visit('http://localhost:3000/investigations/live');
        cy.loginResearcher(loginResearcherB);
        cy.get('.investigation').first().find('button[data-testid="open"]').click();
        cy.get('button[data-testid="add-element"]').eq(2)
            .click();
        
        cy.fillPatient(records_patient1())
    })
})