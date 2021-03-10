import { patients_personal_data_decryptedCypress, loginResearcherA, records_patient1, records_patient2 } from '../../src/stories/example_data';
import { URL_BASE } from "../support";

describe('Testing create an investigation', () => {
    // it('Researcher Adds patients', () => {
            
    //     cy.visit(URL_BASE+'/investigations/live');
    //     //cy.visit('https://dashboard.sherwood.science/');

    //     cy.loginResearcher(loginResearcherA);

    
    //     cy.get('.investigation').first().find('button[data-testid="open"]').click();
        
    //     patients_personal_data_decryptedCypress().forEach(patient =>{
    //         cy.get('button[data-testid="add-patient"]')
    //         .click();
    //         Object.keys(patient).forEach(key =>{
    //             if(key !== "birthdate"){
    //                 cy.get('input[name="'+key+'"]')
    //                     .type(patient[key])
    //                     .should('have.value', patient[key]);
    //             }
    //             else{
    //                 const targetDate = Cypress.moment()
    //                     .subtract(1, 'year')
    //                     .subtract(1, 'month')
    //                     .subtract(1, 'day')
    //                     .format('MM/DD/YYYY');
    //                 cy.get('input[id="birthdate"]')
    //                     .clear()
    //                     .type(`${targetDate}{enter}`) 
    //             }
                
    //         });
    //         cy.get('button[data-testid="continue"]')
    //             .click();
    //     }) 
    // })
    it('Researcher Fills Investigation', () => {
        
        cy.visit(URL_BASE+'/investigations/live');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.loginResearcher(loginResearcherA);

    
        cy.get('.investigation').first().find('button[data-testid="open"]').click();
            
        cy.get('button[data-testid="add-element"]').eq(2)
            .click();
        
        cy.fillPatient(records_patient2());

        
        cy.get('button[data-testid="add-element"]').eq(1)
            .click();
        //cy.fillPatient(records_patient2())


    })

})