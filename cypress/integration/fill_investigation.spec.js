import { patients_personal_data_decrypted, loginResearcherA, records_patient1, records_patient2 } from '../../src/stories/example_data';

describe('Testing create an investigation', () => {
    it('Introduces info on each field', () => {
        cy.visit('http://localhost:3000/investigations/live');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.loginResearcher(loginResearcherA);

     
        cy.get('.investigation').first().find('button[data-testid="open"]').click();
        

        patients_personal_data_decrypted().forEach(patient =>{
            cy.get('button[data-testid="add-patient"]')
            .click();
            Object.keys(patient).forEach(key =>{
                cy.get('input[name="'+key+'"]')
                .type(patient[key])
                .should('have.value', patient[key]);
            });
            cy.get('button[data-testid="continue"]')
                .click();
        })             
        cy.get('button[data-testid="add-element"]').eq(2)
            .click();
        
        cy.fillPatient(records_patient1())

        cy.get('button[data-testid="add-element"]').eq(1)
            .click();
        cy.fillPatient(records_patient2())
    })
})