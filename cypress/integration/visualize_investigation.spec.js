import { patients_personal_data, edc_data1, records_patient1, records_patient2 } from '../../src/stories/example_data';

describe('Testing create an investigation', () => {
    it('Introduces info on each field', () => {
        cy.visit('http://localhost:3000/dashboard')

        cy.loginResearcher();

        cy.contains('Live investigations').click();

        cy.wait(2000);
        cy.get('.investigation').first().find('.btn').click();
        

        // patients_personal_data().forEach(patient =>{
        //     cy.get('button[data-testid="add-patient"]')
        //     .click();
        //     Object.keys(patient.personalData).forEach(key =>{
        //         cy.get('input[name="'+key+'"]')
        //         .type(patient.personalData[key])
        //         .should('have.value', patient.personalData[key]);
        //     });
        //     cy.get('button[data-testid="continue"]')
        //         .click();
        // })  
        cy.contains('td', edc_data1().surveys[0].name)  // gives you the cell 
                .parent()                              // gives you the row
                .within($tr => {                       // filters just that row
                    cy.get('button')                         // finds the buttons cell of that row
                    .click()
                })
        cy.contains('Next').click();
        cy.contains('Prev').click();
    })
})