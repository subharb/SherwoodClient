// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { researchers_to_share } from "../../src/stories/example_data";

Cypress.Commands.add('loginResearcher', (credentials) => {
    cy.get('input[name="email"]')
        .type(credentials.email)
        .should('have.value', credentials.email);

    cy.get('input[name="password"]')
        .type(credentials.password)
        .should('have.value', credentials.password);

    cy.get('button[data-testid="continue"]')
        .click();
});
Cypress.Commands.add('createEDC', (surveys) => {
    surveys.forEach(survey => {
    cy.get('button[data-testid="add_data_collections"]')
    .click();

    cy.get('input[name="name_data_collection"]')
    .type(survey.name)
    .should('have.value', survey.name);
    
    survey.sections.forEach(section => {
        cy.get('button[data-testid="add-sections"]')
            .click();
        cy.get('input[name="name"]')
            .type(section.name)
            .should('have.value', section.name);
        section.fields.forEach(field => {
            cy.get('button[data-testid="add-field"]')
                .click();
            cy.get('.MuiDialog-paper').within(() => {
                if(field.required){
                    cy.contains('Required').click();
                }
                if(field.is_personal_data){
                    cy.contains('Is it a personal data').click();
                }
                cy.get('input[name="name"]')
                    .type(field.name)
                    .should('have.value', field.name);
                cy.get('input[name="label"]')
                    .type(field.label)
                    .should('have.value', field.label);
            }); 
            cy.get('[aria-labelledby^="type"]')
                    .click();
            cy.contains(field.typeValueCypress).click(); 
    
            cy.get('button[data-testid="save-field"]')
                .click();
        });
        cy.get('button[data-testid="add-section"]')
            .click();
    });
    cy.get('button[data-testid="save_data_collection"]')
    .click();
    })
    cy.get('button[data-testid="save_surveys"]')
        .click();
});

Cypress.Commands.add('createBasicInfo', (basicInfo) => {  
      Object.keys(basicInfo).forEach(key => {
            const field = basicInfo[key];
            if(field.type === "textarea"){
                cy.get('.ql-editor')//Solo vale si solo hay un editor
                .type(field.value);
            }
            else if(field.type === "select"){
                cy.get('[aria-labelledby^="'+key+'"]') 
                    .click()
                cy.contains(field.textValue).click();
            }
            else{
                cy.get('input[name="'+key+'"]')
                    .type(field.value)
                    .should('have.value', field.value);
            }
      })
    

    // cy.get('input[name="acronym"]')
    //     .type('CN')
    //     .should('have.value', 'CN');
    // cy.get('.ql-editor')
    //     .type('Estudio sobre el impacto en la anosmia en pacientes de COVID19');
    
    // cy.get('[aria-labelledby^="type"]')
    //     .click()
    //     cy.contains("Clinical Trial").click();
        
    // cy.get('input[name="principal_researcher"]')
    //     .type('Pedro Rodríguez')
    //     .should('have.value', 'Pedro Rodríguez');

    // cy.get('input[name="institution"]')
    //     .type('Oxford University')
    //     .should('have.value', 'Oxford University');
    
    // cy.get('input[name="contact"]')
    //     .type('testing@test.email')
    //     .should('have.value', 'testing@test.email');
    
    // cy.get('input[name="ethics_body"]')
    //     .type('123456')
    //     .should('have.value', '123456');

    // cy.get('[aria-labelledby^="reference_number_state"]')
    //     .click()
    // cy.contains("Approved").click();

    cy.get('button[data-testid="continue"]')
        .click();
});

Cypress.Commands.add('fillPatient', (patient) => { 
    patient.records.forEach(record => {
        console.log(record.nameCypress);
        cy.get('table').then(($body) => {
            if($body.text().includes(record.nameCypress)){
                cy.contains('td', record.nameCypress)  // gives you the cell 
                    .parent()                              // gives you the row
                    .within($tr => {                       // filters just that row
                        cy.get('button')                         // finds the buttons cell of that row
                        .click()
                    })
            }
        })
    
        record.submission.forEach(submission => {
            cy.contains('td', submission.nameCypress)  // gives you the cell 
                .parent()                              // gives you the row
                .within($tr => {                       // filters just that row
                    cy.get('button')                         // finds the buttons cell of that row
                    .click()
                })
            Object.keys(submission.answers).forEach(key => {
                cy.get('input[name="'+key+'"]')
                .type(submission.answers[key])
                .should('have.value', submission.answers[key]);
            })
            cy.get('button[data-testid="continue"]').first()
                .click();
            cy.get('button[data-testid="back"]').first()
                .click();
        });
 
        
    });
    cy.get('button[data-testid="back"]').first()
        .click();
});   
Cypress.Commands.add('shareWithResearchers', () => { 
    cy.wait(2000);
    cy.get('.investigation').first().find('button[data-testid="share"]').click();
    cy.wait(2000);
    researchers_to_share.forEach(researcher =>{
        cy.get('button[data-testid="add_researcher"]')
            .click();
        
            cy.get('input[name="email"]')
                .type(researcher["email"])
                .should('have.value', researcher["email"]);
            cy.get('[aria-labelledby^="permission"]') 
                .click()
            cy.contains(researcher.permissionTextValue).click();
        
        cy.get('button[data-testid="continue"]')
            .click();
    });

    
    cy.get('button[data-testid="submit"]')
            .click();
    
    cy.intercept('POST','**/researcher/investigation/**/share').as('shareInvestigation');
    cy.get('button[data-testid="continue"]')
        .click();
    cy.wait('@shareInvestigation');
    
});
Cypress.Commands.add('logOut', () => { 
    cy.get('button[data-testid="account"]')
        .click();
    cy.get('li[data-testid="log_out"]')
        .click();
});

Cypress.Commands.add('registerResearcher', (researcher) => { 
    cy.get('input[name="name"]')
            .type(researcher["name"])
            .should('have.value', researcher["name"]);
    cy.get('input[name="surnames"]')
        .type(researcher["surnames"])
        .should('have.value', researcher["surnames"]);
    cy.get('[aria-labelledby^="country"]') 
        .click()
    cy.contains("españa").click();

    cy.get('button[data-testid="continue"]')
    .click();

    cy.get('input[name="email"]')
        .type(researcher["email"])
        .should('have.value', researcher["email"]);
    cy.get('input[name="phone"]')
        .type(researcher["phone"])
        .should('have.value', researcher["phone"]);
    
    cy.get('button[data-testid="continue"]')
        .click();

    cy.get('input[name="password"]')
        .type(researcher["password"])
        .should('have.value', researcher["password"]);
    cy.get('input[name="repeat_password"]')
        .type(researcher["password"])
        .should('have.value', researcher["password"]);

    cy.get('button[data-testid="continue"]')
        .click();

    cy.get('input[name="confirm"]')
        .type("CONFIRM")
        .should('have.value', "CONFIRM");

    cy.get('button[data-testid="continue"]')
            .click();
});

Cypress.Commands.add('createInvestigation', (basic_info, personal_data, edc_data) => { 

//Introducimos datos de BASIC INFO
    cy.createBasicInfo(basic_info);

    personal_data.forEach(pField => {
        cy.contains(pField, {matchCase: false}).click();    
    });
    
    cy.get('button[data-testid="continue"]')
        .click();

    cy.createEDC(edc_data.surveys);

    cy.get('button[data-testid="publish-investigation"]')
    .click(); 
});

Cypress.Commands.add('acceptInvestigation', () => {
    cy.intercept('POST', '**/researcher/investigation/**/answer').as('acceptInvestigation');
    cy.get('.investigation').first().find('button[data-testid="accept"]').click();
    cy.wait('@acceptInvestigation');
});
