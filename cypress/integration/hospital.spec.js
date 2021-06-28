import { researcherA_data, patient_hospital_personal_data_decryptedCypress, loginResearcherPedro, loginResearcherC,
    researcherB_data, basic_info1, personal_data_investigation1, edc_data1, researcherC_data, records_patient1, records_patient2, researcherD_data, loginResearcherD } from '../../src/stories/example_data';

import { URL_BASE } from "../support";

describe('Testing Hospital Features', () => {
    context('iphone-5 resolution', () => {
        beforeEach(() => {
          // run these tests as if in a mobile browser
          // and ensure our responsive UI is correct
          cy.viewport('iphone-5')
        })
        it('Doctor signs in', () => {
            cy.visit(URL_BASE+'/auth/sign-in');
            //cy.visit('https://dashboard.sherwood.science/');
            cy.loginResearcher(loginResearcherPedro);
            // //Add patient
            cy.get('button[data-testid="add-patient"]')
                .click();

            const patient = patient_hospital_personal_data_decryptedCypress()[0];
            Object.keys(patient)
                .forEach(key =>{
                    if(key !== "birthdate"){
                        if(key === "sex"){
                            cy.get('[aria-labelledby^="sex"]')
                                .click();
                            cy.contains(patient[key]).click(); 
                        }
                        else{
                            cy.get('input[name="'+key+'"]')
                            .type(patient[key])
                            .should('have.value', patient[key]);
                        }
                        
                    }
                    else{
                        const targetDate = Cypress.moment()
                            .subtract(1, 'year')
                            .subtract(1, 'month')
                            .subtract(1, 'day')
                            .format('DD/MM/YYYY');
                        cy.get('input[id="birthdate"]')
                            .clear()
                            .type(`${targetDate}{enter}`) 
                    }
                    
                });
            cy.get('button[data-testid="continue"]')
                .click();
                
            cy.get('button[data-testid="menu-hamburguer"]')
            .click();  

            
            cy.visit(URL_BASE+'/search-patient');
            cy.intercept('GET','**/researcher/investigation/all').as('getPatients');
            
            cy.wait('@getPatients');
            
            cy.get('input[name="name"]')
                .type(patient["name"])
                .should('have.value', patient["name"]);
            cy.get('button[data-testid="continue"]')
                .click();

            cy.get('tbody>tr>td').eq(1).click();

            cy.get('button[data-testid="add-record"]')
                .click();            
            cy.get('button[data-testid="C. externes - première visite"]')
            .click(); 

            cy.get('button[data-testid="Motif de la consultation"]')
            .click(); 

            cy.get('input[name="field_17"]')
                .type("Test testing")
                .should('have.value', 'Test testing');

            cy.intercept('POST','**/researcher/investigation/**/submission/**/survey/**').as('postSubmission');
        
            cy.get('button[data-testid="continue"]')
                .click();

            
            cy.wait('@postSubmission');
            
        })
  
    })
});