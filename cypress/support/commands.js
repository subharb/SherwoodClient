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

Cypress.Commands.add('loginResearcher', () => {
    cy.get('input[name="email"]')
        .type('dshaikhurbina@gmail.com')
        .should('have.value', 'dshaikhurbina@gmail.com');

    cy.get('input[name="password"]')
        .type('Cabezadesherwood2')
        .should('have.value', 'Cabezadesherwood2');

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
            cy.get('#modal1').within(() => {
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
    cy.get('input[name="name"]')
            .type('COVID Nose')
            .should('have.value', 'COVID Nose');

    cy.get('input[name="acronym"]')
        .type('CN')
        .should('have.value', 'CN');
    
    cy.get('[aria-labelledby^="type"]')
        .click()
        cy.contains("Clinical Trial").click();
        
    cy.get('input[name="principal_researcher"]')
        .type('Pedro Rodríguez')
        .should('have.value', 'Pedro Rodríguez');

    cy.get('input[name="institution"]')
        .type('Oxford University')
        .should('have.value', 'Oxford University');
    
    cy.get('input[name="contact"]')
        .type('testing@test.email')
        .should('have.value', 'testing@test.email');
    
    cy.get('input[name="ethics_body"]')
        .type('123456')
        .should('have.value', '123456');

    cy.get('[aria-labelledby^="reference_number_state"]')
        .click()
    cy.contains("Approved").click();

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
        });
    });
    cy.get('button[data-testid="back"]').first()
        .click();
});   