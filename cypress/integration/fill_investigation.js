import { patients_personal_data, edc_data1, records_patient1, records_patient2 } from '../../src/stories/example_data';

describe('Testing create an investigation', () => {
    it('Introduces info on each field', () => {
        //cy.visit('http://localhost:3000/dashboard')
        cy.visit('https://dashboard.sherwood.science/');

        cy.loginResearcher();

        cy.contains('Live investigations').click();

        cy.wait(2000);
        cy.get('.investigation').first().find('.btn').click();
        

        patients_personal_data().forEach(patient =>{
            cy.get('button[data-testid="add-patient"]')
            .click();
            Object.keys(patient.personalData).forEach(key =>{
                cy.get('input[name="'+key+'"]')
                .type(patient.personalData[key])
                .should('have.value', patient.personalData[key]);
            });
            cy.get('button[data-testid="continue"]')
                .click();
        })             
        cy.get('button[data-testid="add-element"]').first()
            .click();
        
        cy.fillPatient(records_patient1())

        cy.get('button[data-testid="add-element"]').eq(1)
            .click();
        cy.fillPatient(records_patient2())
    })
})