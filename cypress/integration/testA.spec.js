import { researcherA_data, loginResearcherA, loginResearcherB, loginResearcherC,
    researcherB_data, basic_info1, personal_data1, edc_data1, researcherC_data,
    patients_personal_data_decrypted, records_patient1, records_patient2, researcherD_data, loginResearcherD } from '../../src/stories/example_data';

describe('Testing create an investigation', () => {
    it('Register a Researcher', () => {
        cy.visit('http://localhost:3000/auth/sign-up');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.registerResearcher(researcherA_data);

    })
    it('Register Researcher B', () => {
        cy.visit('http://localhost:3000/auth/sign-up');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.registerResearcher(researcherB_data);

    });
    it('Researcher Logs in', () => {
        
        //cy.visit('https://dashboard.sherwood.science/');

        cy.visit('http://localhost:3000/investigations/live');
        //cy.visit('https://dashboard.sherwood.science/');
        cy.loginResearcher(loginResearcherA);

    });
    
    it('Researcher Creates an Investigation', () => {

        cy.visit('http://localhost:3000/investigation/create');
        cy.loginResearcher(loginResearcherA);
        
        cy.contains('Create investigation').click();


        cy.createInvestigation(basic_info1, personal_data1(),edc_data1() )  

    })
    it('Researcher Adds patients', () => {
        
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
    })
    it('Researcher Fills Investigation', () => {
        
        cy.visit('http://localhost:3000/investigations/live');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.loginResearcher(loginResearcherA);

     
        cy.get('.investigation').first().find('button[data-testid="open"]').click();
               
        cy.get('button[data-testid="add-element"]').eq(2)
            .click();
        
        cy.fillPatient(records_patient1());

        
        cy.get('button[data-testid="add-element"]').eq(1)
            .click();
        cy.fillPatient(records_patient2())
 

    })
    
    it('Researcher A shares with Researcher B, C and D', () => {
        cy.visit('http://localhost:3000/investigations/live');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.loginResearcher(loginResearcherA);

        cy.shareWithResearchers();

        cy.logOut();

    })
    it('Researcher B accepts investigation', () => {
        //Accept investigation
        cy.visit('http://localhost:3000/investigations/pending');
        cy.loginResearcher(loginResearcherB);
        
        cy.acceptInvestigation();

        //Introduce datos de pacientes
        
        cy.get('button[data-testid="add-element"]').eq(2)
            .click();
        
        cy.fillPatient(records_patient1())
    })
    it('Register Researcher C', () => {
        cy.visit('http://localhost:3000/auth/sign-up');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.registerResearcher(researcherC_data);

    });

    it('Researcher C accepts Investigation', () => {
        cy.visit('http://localhost:3000/investigations/pending');
        cy.loginResearcher(loginResearcherC);
        
        cy.intercept('PUT', '**/researcher/investigation/**/answer').as('answerInvestigation');
        cy.get('.investigation').first().find('button[data-testid="accept"]').click();
        cy.wait('@acceptInvestigation');

    });

    it('Register Researcher D', () => {
        cy.visit('http://localhost:3000/auth/sign-up');
        //cy.visit('https://dashboard.sherwood.science/');

        cy.registerResearcher(researcherD_data);

    });
     it('Researcher D DENIES Investigation', () => {
        cy.visit('http://localhost:3000/investigations/pending');
        cy.loginResearcher(loginResearcherD);
        
        cy.intercept('PUT', '**/researcher/investigation/**/answer').as('answerInvestigation');
        cy.get('.investigation').first().find('button[data-testid="deny"]').click();
        cy.wait('@answerInvestigation');

    });
})